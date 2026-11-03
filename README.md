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

## Project status and next steps

This repository currently contains the initial interface only. Authentication, project and issue editing, persistent storage, and deployment are planned future work. The longer-term product plan is in [`plan.md`](./plan.md), with the original concept in [`descr.md`](./descr.md).

There is no live demo link or configured backend at this stage.
