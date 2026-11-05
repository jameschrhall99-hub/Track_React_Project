-- 1. Tables: profiles, projects, issues

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text,
  created_at timestamptz not null default now(),
  constraint profiles_display_name_length
    check (display_name is null or char_length(display_name) <= 80)
);

create table public.projects (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null
    references public.profiles (id) on delete cascade,
  name text not null,
  description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint projects_name_length
    check (char_length(name) between 1 and 80),
  constraint projects_description_length
    check (description is null or char_length(description) <= 1000)
);

create table public.issues (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null
    references public.projects (id) on delete cascade,
  title text not null,
  description text,
  status text not null default 'todo',
  priority text not null default 'medium',
  assignee_id uuid
    references public.profiles (id) on delete set null,
  due_date date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint issues_title_length
    check (char_length(title) between 1 and 160),
  constraint issues_description_length
    check (description is null or char_length(description) <= 5000),
  constraint issues_status_valid
    check (status in ('todo', 'in_progress', 'done')),
  constraint issues_priority_valid
    check (priority in ('low', 'medium', 'high'))
);

-- 2. Lookup indexes for the foreign keys used by normal project/issue queries.
create index projects_owner_id_idx on public.projects (owner_id);
create index issues_project_id_idx on public.issues (project_id);

-- 3. Normalization, timestamp, and integrity functions/triggers.
-- This migration defines supported edge whitespace as ASCII space, tab, LF,
-- CR, form feed, and vertical tab.
create function public.normalize_profile_row()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
  if tg_op = 'INSERT' then
    new.created_at := now();
  else
    if new.id is distinct from old.id then
      raise exception 'Profile id cannot be changed';
    end if;
    if new.created_at is distinct from old.created_at then
      raise exception 'Profile creation time cannot be changed';
    end if;
  end if;

  if new.display_name is not null then
    new.display_name := nullif(btrim(new.display_name, E' \t\n\r\f\v'), '');
  end if;
  return new;
end;
$$;

create trigger profiles_normalize_row
before insert or update on public.profiles
for each row execute function public.normalize_profile_row();

create function public.normalize_project_row()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
  if tg_op = 'INSERT' then
    new.created_at := now();
  else
    if new.id is distinct from old.id then
      raise exception 'Project id cannot be changed';
    end if;
    if new.owner_id is distinct from old.owner_id then
      raise exception 'Project owner cannot be changed';
    end if;
    if new.created_at is distinct from old.created_at then
      raise exception 'Project creation time cannot be changed';
    end if;
  end if;

  new.name := btrim(new.name, E' \t\n\r\f\v');
  if new.description is not null then
    new.description := nullif(btrim(new.description, E' \t\n\r\f\v'), '');
  end if;
  new.updated_at := now();
  return new;
end;
$$;

create trigger projects_normalize_row
before insert or update on public.projects
for each row execute function public.normalize_project_row();

create function public.normalize_issue_row()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
declare
  project_owner_id uuid;
begin
  if tg_op = 'INSERT' then
    new.created_at := now();
  else
    if new.id is distinct from old.id then
      raise exception 'Issue id cannot be changed';
    end if;
    if new.project_id is distinct from old.project_id then
      raise exception 'Issue project cannot be changed';
    end if;
    if new.created_at is distinct from old.created_at then
      raise exception 'Issue creation time cannot be changed';
    end if;
  end if;

  select p.owner_id
    into project_owner_id
    from public.projects as p
   where p.id = new.project_id;

  if not found then
    raise exception 'Project is unavailable';
  end if;
  if new.assignee_id is not null
     and new.assignee_id is distinct from project_owner_id then
    raise exception 'Assignee must be the project owner';
  end if;

  new.title := btrim(new.title, E' \t\n\r\f\v');
  if new.description is not null then
    new.description := nullif(btrim(new.description, E' \t\n\r\f\v'), '');
  end if;
  new.updated_at := now();
  return new;
end;
$$;

create trigger issues_normalize_row
before insert or update on public.issues
for each row execute function public.normalize_issue_row();

-- 4. Signup profile function/trigger and existing-user backfill.
create function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id) values (new.id);
  return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

insert into public.profiles (id)
select id from auth.users
on conflict (id) do nothing;

-- 5. Enable RLS on every application table.
alter table public.profiles enable row level security;
alter table public.projects enable row level security;
alter table public.issues enable row level security;

-- 6. Remove broad client grants, then grant only the required operations and
-- writable columns. No anonymous client access is granted to these tables.
revoke all on table public.profiles, public.projects, public.issues
  from public, anon, authenticated;

grant usage on schema public to authenticated;

grant select on table public.profiles, public.projects, public.issues
  to authenticated;
grant update (display_name) on table public.profiles to authenticated;

grant insert (owner_id, name, description), delete
  on table public.projects to authenticated;
grant update (name, description)
  on table public.projects to authenticated;

grant insert (
  project_id, title, description, status, priority, assignee_id, due_date
), delete on table public.issues to authenticated;
grant update (
  title, description, status, priority, assignee_id, due_date
) on table public.issues to authenticated;

-- 7. Policies: profile access is self-only; project and issue access follows
-- project ownership. USING checks existing rows; WITH CHECK checks new values.
create policy profiles_select_own
on public.profiles for select to authenticated
using (id = (select auth.uid()));

create policy profiles_update_own
on public.profiles for update to authenticated
using (id = (select auth.uid()))
with check (id = (select auth.uid()));

create policy projects_select_owned
on public.projects for select to authenticated
using (owner_id = (select auth.uid()));

create policy projects_insert_owned
on public.projects for insert to authenticated
with check (owner_id = (select auth.uid()));

create policy projects_update_owned
on public.projects for update to authenticated
using (owner_id = (select auth.uid()))
with check (owner_id = (select auth.uid()));

create policy projects_delete_owned
on public.projects for delete to authenticated
using (owner_id = (select auth.uid()));

create policy issues_select_owned
on public.issues for select to authenticated
using (
  exists (
    select 1
      from public.projects as p
     where p.id = issues.project_id
       and p.owner_id = (select auth.uid())
  )
);

create policy issues_insert_owned
on public.issues for insert to authenticated
with check (
  exists (
    select 1
      from public.projects as p
     where p.id = issues.project_id
       and p.owner_id = (select auth.uid())
  )
);

create policy issues_update_owned
on public.issues for update to authenticated
using (
  exists (
    select 1
      from public.projects as p
     where p.id = issues.project_id
       and p.owner_id = (select auth.uid())
  )
)
with check (
  exists (
    select 1
      from public.projects as p
     where p.id = issues.project_id
       and p.owner_id = (select auth.uid())
  )
);

create policy issues_delete_owned
on public.issues for delete to authenticated
using (
  exists (
    select 1
      from public.projects as p
     where p.id = issues.project_id
       and p.owner_id = (select auth.uid())
  )
);

-- Trigger functions are internal database hooks, not callable RPC endpoints.
revoke execute on function public.normalize_profile_row()
  from public, anon, authenticated;
revoke execute on function public.normalize_project_row()
  from public, anon, authenticated;
revoke execute on function public.normalize_issue_row()
  from public, anon, authenticated;
revoke execute on function public.handle_new_user()
  from public, anon, authenticated;
