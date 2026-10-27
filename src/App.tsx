import { ProjectCard } from '@/components/project-card'
import { Button } from '@/components/ui/button'
import { sampleProjects } from '@/data/sample-projects'

function App() {
  return (
    <div className="min-h-svh bg-background text-foreground">
      <a
        href="#overview"
        className="sr-only rounded-md bg-background p-3 focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50"
      >
        Skip to content
      </a>

      <div className="min-h-svh md:grid md:grid-cols-[15rem_minmax(0,1fr)]">
        <aside className="border-b bg-muted/30 p-5 md:border-r md:border-b-0">
          <div className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className="flex size-9 items-center justify-center rounded-lg bg-primary font-bold text-primary-foreground"
            >
              S
            </span>
            <span className="text-lg font-semibold">ShipTrack</span>
          </div>

          <nav aria-label="Main navigation" className="mt-6 flex flex-wrap gap-2 md:flex-col">
            <a
              href="#overview"
              className="rounded-md px-3 py-2 text-sm hover:bg-muted focus-visible:outline-2 focus-visible:outline-ring"
            >
              Overview
            </a>
            <a
              href="#projects"
              className="rounded-md bg-secondary px-3 py-2 text-sm font-medium focus-visible:outline-2 focus-visible:outline-ring"
            >
              Projects
            </a>
          </nav>

          <p className="mt-6 text-xs text-muted-foreground">Sample workspace</p>
        </aside>

        <main id="overview" tabIndex={-1} className="min-w-0 p-5 sm:p-8 lg:p-10">
          <div className="mx-auto max-w-6xl">
            <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
                  Workspace
                </p>
                <h1 className="mt-2 text-3xl font-semibold tracking-tight">Projects</h1>
                <p className="mt-2 text-sm text-muted-foreground">
                  Keep your work organised, one issue at a time.
                </p>
              </div>

              <div>
                <Button type="button" disabled aria-describedby="creation-note">
                  New project
                </Button>
                <p id="creation-note" className="mt-2 max-w-52 text-xs text-muted-foreground">
                  Project creation will be added in the next milestone.
                </p>
              </div>
            </header>

            <section
              id="projects"
              aria-label="Project list"
              className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
            >
              {sampleProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </section>

            <p className="mt-6 text-sm text-muted-foreground">
              These are sample projects. Your saved projects will appear here once the database is connected.
            </p>
          </div>
        </main>
      </div>
    </div>
  )
}

export default App
