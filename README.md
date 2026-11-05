# ShipTrack

ShipTrack is a lightweight project and issue tracking interface built with React and TypeScript. The current version presents a responsive projects workspace populated with sample project data. It is an early frontend prototype: project creation and database-backed saving are not implemented yet.

## Current features

- Responsive workspace layout with overview and projects navigation.
- Sample project cards with status and summary details.
- Reusable UI components styled with Tailwind CSS and shadcn conventions.
- Geist Variable typography and light/dark theme tokens.

## Tech stack

- React 19 and TypeScript
- Vite
- Tailwind CSS 4
- shadcn/ui component conventions, Base UI, and Lucide icons
- Geist Variable

## Requirements

- Node.js (development environment: `v24.22.1`)
- npm

## Getting started

For an existing checkout with the committed `package-lock.json`, install the locked dependencies and start the development server:

```bash
npm ci
npm run dev
```

Vite prints the local URL in the terminal. To create and preview a production build:

```bash
npm run build
npm run preview
```

## Supabase environment setup

The app needs a Supabase project URL and publishable key to start. For local development, create `.env.local` in the project root from the committed template. Run the copy command only for initial setup; if `.env.local` already exists, edit it so you do not overwrite your local values.

```powershell
Copy-Item .env.example .env.local
# Edit .env.local, save it, then start or restart the server:
npm run dev
```

Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` in `.env.local`. Get both values from the same Supabase development project. Use the project's Connect dialog for connection details and its API Keys settings for the publishable key; see the [Supabase API keys guide](https://supabase.com/docs/guides/getting-started/api-keys).

`.env.example` documents the required variable names; Vite does not load it automatically. Vite reads `.env.local` for local configuration. Restart the development server after changing the file. Values with the `VITE_` prefix are included in browser code at build time, so changes to hosting environment settings require a new build and deployment. Updating those settings does not change JavaScript that has already been built.

If the setup screen still appears, check the variable spelling and confirm Windows did not add `.txt` to the filename (for example, `.env.local.txt`). Restart Vite after edits. Also check whether a shell environment variable or a mode-specific Vite env file is overriding the value.

## Development commands

Run these commands from the project directory:

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite development server; stop it with Ctrl+C. |
| `npm run build` | Check TypeScript and create the production bundle in `dist`. |
| `npm run lint` | Check the configured ESLint code rules. |
| `npm run typecheck` | Check TypeScript without bundling the application. |
| `npm test` | Run tests in watch mode, rerunning them when files change; stop with `q` or Ctrl+C. |
| `npm run test:run` | Run tests once and exit automatically, suitable for non-interactive checks and CI. |
| `npm run preview` | Serve the existing production build locally; run `npm run build` first. |

Lint, typecheck, build, and `test:run` finish automatically and return a nonzero exit code if they fail.

## Project structure

```text
src/
  components/      Shared project and UI components
  data/            Sample project data
  lib/             Shared utilities
  App.tsx          Main workspace screen
  index.css        Tailwind setup and shadcn theme tokens
  main.tsx         Application entry point
```

## Agreed data rules

These rules guide the planned forms and database; database enforcement is not implemented yet.

| Field | Rule |
| --- | --- |
| Issue status | `todo` (Todo), `in_progress` (In Progress), or `done` (Done). Default: `todo`. Any transition is allowed, including reopening completed issues. |
| Issue priority | `low` (Low), `medium` (Medium), or `high` (High). Default: `medium`. |
| Project name / issue title | Required; trim surrounding whitespace before checking lengths of 1–80 / 1–160 characters. |
| Project / issue description | Optional plain text; maximum 1,000 / 5,000 characters. Trim surrounding whitespace and save blank values as `null`. |
| Profile display name | Optional; maximum 80 characters. Trim surrounding whitespace and save blank values as `null`. |
| Due date | Optional real calendar date stored as `YYYY-MM-DD`, or `null` when blank. Past dates are allowed. |
| Assignee | Unassigned (`null`) or the owning project's owner. Default: unassigned. |

Store status/priority values rather than their display labels. Both fields must be non-null; changing status leaves other fields unchanged. Open means Todo or In Progress. Overdue means unfinished with a due date before today in the user's local calendar; due today is not overdue.

Projects are private to their owner. Project ownership and an issue's project cannot change in the first release. Deleting a project deletes its issues after UI confirmation. The database will generate IDs and manage timestamps. Forms will provide helpful validation, while database constraints and access rules will independently reject invalid or unauthorized writes.

### Shared values and normalization

- Keep status/priority arrays, types, labels, and defaults together in `src/features/issues/issue-types.ts`. Badges, form options, and filters should reuse them.
- Status describes progress; priority describes relative importance. Any supported priority is valid with any supported status.
- “All statuses” and “All priorities” are filter choices, not values saved on an issue. Completed and overdue counts are derived from existing fields, not additional stored statuses.
- Trim surrounding spaces, tabs, and line breaks before validating text; preserve internal spaces. Reject whitespace-only required fields and convert blank optional fields to `null`.
- Implement matching whitespace and character-count behavior in forms and PostgreSQL. Length limits count characters rather than storage bytes; verify Unicode/emoji boundaries when implementing validators.
- Validate that a due date actually exists: a string matching `YYYY-MM-DD` can still contain an impossible date such as `2026-02-30`.

### Relationships and protected fields

- A profile owns many projects, and a project contains many issues. New projects must belong to the authenticated user; issues must reference an existing project owned by that user.
- Use UUIDs for real database IDs. Current fixture IDs are temporary. Save assignment as `assignee_id`, referencing a profile; `assigneeName` is display data only.
- Offer only “Unassigned” and “Assign to me” in assignment controls. Enforce the same restriction in the database.
- Generate `created_at` and manage `updated_at` in the database, preventing client overrides. Display the returned timestamps.
- Planned account deletion cascades from the auth user to their profile, owned projects, and issues. The optional assignee reference uses `ON DELETE SET NULL`. Verify the combined foreign-key behavior during database implementation; account deletion UI is deferred.
- If activity history is added, deleting a project deletes its logs. Deleting an issue retains its logs with `issue_id = null`.

### Planned validation and database enforcement

TypeScript catches development mistakes; runtime form validation provides helpful feedback; the database independently protects stored data even when a request bypasses the interface. Zod is the planned form-validation library.

| Rule | Form/API behavior | Database enforcement |
| --- | --- | --- |
| Required text, length limits, and optional blanks | Trim, validate, and normalize before submission | `NOT NULL` for required fields; matching text checks and normalization |
| Allowed status/priority values | Validate against shared allowed values | Text columns with named `CHECK` constraints and `NOT NULL` |
| New-issue defaults | Initialize create controls with shared defaults | `DEFAULT 'todo'` / `DEFAULT 'medium'` when insert fields are omitted; explicit `null` remains invalid |
| Valid optional due date | Validate a real calendar date; blank becomes `null` | Nullable PostgreSQL `date` column |
| Existing project/profile references | Send validated IDs | Foreign keys |
| Private records and correct project ownership | Use the current session and selected project | Grants and Row Level Security (RLS), including checks on resulting rows after writes |
| Fixed owner/project and protected timestamps | Exclude protected changes from editable inputs | Column privileges and/or triggers |
| Owner-only assignment | Offer only the allowed assignee options | Trigger checks the owning project; a simple `CHECK` cannot query another table |
| Deletion behavior | Explain and confirm project deletion | Foreign-key cascade and set-null rules |

Keep SQL constraints aligned with the frontend values through reviewed migrations and database tests. Generate database TypeScript types after migrations, but retain runtime validation: generated text columns may still have the broad `string` type.

### Planned form behavior and data conversion

- Create forms use shared defaults; edit forms load saved values.
- Empty optional controls may hold `''`; convert this to `null` before saving. For example, title `"  Fix login  "` and due date `""` become `title: "Fix login"` and `due_date: null`.
- Keep camelCase UI models and snake_case database payloads, with conversion in feature API modules.
- Keep due dates as calendar strings rather than converting them through UTC timestamps, which can shift the displayed day.
- Show errors next to labelled controls, preserve inputs after failed saves, and allow retry. Disable duplicate submissions while a save is pending.
- Update visible saved data after server confirmation. Translate failures into useful messages without displaying raw SQL errors or internal details.

### Acceptance examples for later implementation

These examples describe expected behavior; they are not claims of completed database verification.

| Example | Expected result |
| --- | --- |
| Whitespace-only title | Rejected by form and database |
| Trimmed title of 160 / 161 characters | Accepted / rejected |
| Status `in_progress` / `In Progress`, or priority `urgent` | Accept `in_progress` and display “In Progress”; reject the other values |
| Omitted status/priority on insert / explicitly supplied `null` | Apply defaults / reject |
| Change status from `done` to `todo` | Accept without changing other fields |
| Blank, past, today's, or impossible due date | Save `null`; accept past; accept today without marking overdue; reject impossible dates |
| Unassigned / project owner / unrelated profile as assignee | Accept / accept / reject |
| Change project owner or an existing issue's project | Reject, including direct database requests |
| Another account requests private project data | Expose no private rows; reject unauthorized writes |

Later tests must also cover project-name and description limits, clearing optional text, matching whitespace/Unicode behavior, deletion relationships, and unchanged data after denied writes.

## Project status and next steps

This repository currently contains the initial interface only. Authentication, project and issue editing, persistent storage, and deployment are planned future work. The longer-term product plan is in [`plan.md`](./plan.md), with the original concept in [`descr.md`](./descr.md).

There is no live demo link or configured backend at this stage.
