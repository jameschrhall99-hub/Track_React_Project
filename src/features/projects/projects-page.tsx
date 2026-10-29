import { ProjectCard } from '@/components/project-card'
import { Button } from '@/components/ui/button'
import { sampleProjects } from '@/data/sample-projects'

export function ProjectsPage() {
  return (
    <>
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
    </>
  )
}