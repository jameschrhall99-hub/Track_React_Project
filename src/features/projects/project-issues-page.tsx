import { Link, useParams } from 'react-router'
import { Button } from '@/components/ui/button'
import { sampleProjects } from '@/data/sample-projects'
import { sampleIssues } from '@/data/sample-issues'
import { IssueList } from '@/features/issues/issue-list'

export function ProjectIssuesPage() {
  const { projectId } = useParams()
  const project = sampleProjects.find((item) => item.id === projectId)

  if (!project) {
    return (
      <section className="space-y-4">
        <h1 className="text-2xl font-semibold">Project unavailable</h1>
        <p className="text-muted-foreground">
          This project could not be opened. Return to the project list to choose another.
        </p>
        <Link to="/app/projects" className="rounded-sm underline focus-visible:outline-2 focus-visible:outline-ring">
          Back to projects
        </Link>
      </section>
    )
  }

  const issues = sampleIssues.filter((issue) => issue.projectId === project.id)

  return (
    <>
      <Link to="/app/projects" className="rounded-sm text-sm underline focus-visible:outline-2 focus-visible:outline-ring">
        Back to projects
      </Link>
      <header className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <p className="text-sm text-muted-foreground">Sample project</p>
          <h1 className="mt-2 wrap-break-word text-3xl font-semibold">{project.name}</h1>
          <p className="mt-2 wrap-break-word text-sm text-muted-foreground">{project.description}</p>
        </div>
        <div className="shrink-0">
          <Button type="button" disabled aria-describedby="issue-creation-note">New issue</Button>
          <p id="issue-creation-note" className="mt-2 max-w-52 text-xs text-muted-foreground">
            Issue creation will be added in the editing milestone.
          </p>
        </div>
      </header>
      <p className="mt-4 text-sm text-muted-foreground">
        Example data only. These issues are not connected to a database.
      </p>
      <IssueList issues={issues} />
    </>
  )
}