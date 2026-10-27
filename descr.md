build a mini SaaS issue-tracking app — think a lightweight combination of Linear and Trello, with a real backend, authentication, and a polished interface.

For a full-stack developer role, this is a strong one-week project because it demonstrates more than frontend skills: database design, API development, authentication, validation, testing, and deployment.
Recommended project: ShipTrackcan you 
 

The concept: Users can create projects, manage issues, assign work, change statuses, and track activity. A recruiter can open the live demo and immediately see a functioning application rather than a static portfolio page.
The tech stack I'd choose
React Logo, Interactive, JavaScript, Web Development, Library PNG
 

React + TypeScript + Vite

Frontend, reusable components, and type safety.
Logo Tailwind CSS – Logos PNG
 

Tailwind CSS + shadcn/ui

Build a polished, consistent interface quickly.
Supabase SVG Icon - Free Supabase PNG & SVG Download
 

Supabase + PostgreSQL

Database, authentication, and access controls without spending days building infrastructure.
Vitest Logo PNG,  Vector (AI, EPS, CDR, PDF, SVG) - iconLogoVector
 

Vitest + React Testing Library

Test core business logic and important user interactions.
How to Use Vercel - Getting Started Guide (2026) | Delv
 

Vercel + GitHub

Deploy the app and keep the repository ready for review.

Why this stack? It lets you spend your limited week building meaningful functionality instead of configuring servers. React and TypeScript demonstrate frontend engineering; PostgreSQL and Supabase give you real database and authentication experience.

One trade-off: Supabase handles much of the backend infrastructure. If a job specifically requires Node.js, Express, or NestJS, a custom backend would be a useful follow-up project. Don't try to squeeze every technology into this one-week build.
Features to build

Prioritise these features in order. The first four are your must-haves.

1. Authentication and user accounts

Sign up, log in, log out, and protect authenticated pages.
Must-have

2. Projects and issue management

Create, edit, assign, prioritise, and delete issues. Track Todo, In Progress, and Done states.
Must-have

3. Persistent PostgreSQL database

Data survives refreshes and is correctly associated with the relevant user and project.
Must-have

4. Secure data access

Use Supabase Row Level Security policies so users cannot read or modify another user's private project data.
Must-have

5. Dashboard and search

Show open issues, completed issues, overdue tasks, and filtering by status or priority.

6. Activity history

Record important events, such as an issue being created or its status changing.

Don't add real-time collaboration, payments, email notifications, or complex permissions during the first week. Finish the core product first.
Your seven-day development plan

Day 1

Set up the foundation

Create the React app, configure TypeScript and styling, design the database schema, and build the main dashboard layout.

Day 2

Database and authentication

Configure Supabase, sign-up/login flows, database tables, relationships, and Row Level Security.

Day 3

Projects and issues

Implement create, read, update, and delete operations with validation and useful error messages.

Day 4

Polished interface

Build issue lists or a Kanban board, filters, search, modals, loading states, and responsive layouts.

Day 5

Dashboard and tests

Add summary metrics and write tests for key interactions and business logic.

Day 6

Deploy and fix bugs

Deploy to Vercel, configure environment variables, verify production authentication, and test the live app.

Day 7

Portfolio presentation

Write a strong README, add screenshots, document architectural decisions, and prepare a short demo.
How to make it stand out to employers

The difference between an ordinary portfolio project and a compelling one is usually the quality of execution.

    Use a realistic data model: profiles, projects, project_members (if time permits), issues, and activity_logs.

    Handle failure properly: failed requests, empty lists, invalid forms, expired sessions, and loading states.

    Write meaningful tests: especially around permissions and issue status updates.

    Show your engineering decisions: explain your database relationships, security policies, and component structure in your README.

    Make it easy to try: provide seeded sample data and a clearly documented demo experience. Never commit credentials or service-role keys.

    Make the repository presentable: meaningful commit history, no unused files, clear installation steps, and a working live link.

Your README should include a project overview, screenshots, a live demo, the technology stack, setup instructions, database architecture, security decisions, tests, and known limitations.
What if you want to demonstrate backend engineering more directly?

If the roles you're applying for emphasise building APIs rather than using a backend-as-a-service, use this alternative:

Layer
	

Technology

Frontend
	

React + TypeScript

Backend
	

Node.js + Express

Database
	

PostgreSQL

ORM
	

Prisma

Authentication
	

Secure session cookies

Testing
	

Vitest + Supertest

Deployment
	

A suitable app host + managed PostgreSQL

That version gives you more to discuss in backend interviews, but it carries more setup and deployment work. For a strict one-week deadline, I'd stick with Supabase unless you're already comfortable building and deploying APIs.
My final recommendation

Build ShipTrack with React, TypeScript, Supabase, and Vercel. Aim for a smaller, genuinely working product with good security and tests, rather than a large collection of unfinished features.

A useful next step is to choose how you want to build the backend:

    Option A: Supabase — fastest path to a finished, deployable project.

    Option B: Node.js + Express + PostgreSQL — stronger demonstration of custom backend development.

Either is valid for full-stack roles; the better choice depends on the technologies appearing in the job descriptions you're targeting.