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

- Node.js (a current LTS release is recommended)
- npm

## Getting started

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Vite prints the local URL in the terminal. To create and preview a production build:

```bash
npm run build
npm run preview
```

Run the linter with:

```bash
npm run lint
```

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
