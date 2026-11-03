import { Link, Outlet } from 'react-router'
import { ProjectNavigation } from './project-navigation'

export function AppLayout() {
  return (
    <div className="min-h-svh bg-background text-foreground">
      <a
        href="#main-content"
        className="sr-only rounded-md bg-background p-3 focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50"
      >
        Skip to content
      </a>

      <div className="min-h-svh md:grid md:grid-cols-[15rem_minmax(0,1fr)]">
        <aside className="border-b bg-muted/30 p-5 md:border-r md:border-b-0">
          <Link
            to="/app/projects"
            className="flex items-center gap-3 rounded-md focus-visible:outline-2 focus-visible:outline-ring"
          >
            <span
              aria-hidden="true"
              className="flex size-9 items-center justify-center rounded-lg bg-primary font-bold text-primary-foreground"
            >
              S
            </span>
            <span className="text-lg font-semibold">ShipTrack</span>
          </Link>

          <div className="hidden md:block">
            <ProjectNavigation />
          </div>

          <details className="mt-4 md:hidden">
            <summary className="cursor-pointer rounded-md px-3 py-2 text-sm font-medium focus-visible:outline-2 focus-visible:outline-ring">
              Workspace navigation
            </summary>
            <ProjectNavigation />
          </details>

          <p className="mt-6 text-xs text-muted-foreground">Sample workspace</p>
        </aside>

        <main id="main-content" tabIndex={-1} className="min-w-0 p-5 sm:p-8 lg:p-10">
          <div className="mx-auto max-w-6xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}