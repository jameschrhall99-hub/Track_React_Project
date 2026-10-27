import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import type { ProjectSummary } from '@/data/sample-projects'

type ProjectCardProps = {
  project: ProjectSummary
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="h-full min-w-0">
      <CardHeader>
        <CardTitle>
          <h2 className="wrap-break-word">{project.name}</h2>
        </CardTitle>
        <CardDescription className="wrap-break-word">
          {project.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="mt-auto flex flex-wrap items-center gap-3">
        <Badge variant="secondary">{project.openIssues} open</Badge>
        <span className="text-sm text-muted-foreground">
          {project.completedIssues} completed
        </span>
      </CardContent>
    </Card>
  )
}