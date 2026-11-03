import { Badge } from '@/components/ui/badge'
import { priorityLabels, statusLabels } from './issue-types'
import type { IssueSummary } from './issue-types'

type IssueListProps = {
  issues: IssueSummary[]
}

export function IssueList({ issues }: IssueListProps) {
  if (issues.length === 0) {
    return (
      <section aria-labelledby="empty-heading" className="mt-6 rounded-lg border p-6">
        <h2 id="empty-heading" className="font-semibold">No issues yet</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          This sample project has no issues. Issue creation will be added later.
        </p>
      </section>
    )
  }

  return (
    <section aria-labelledby="issues-heading" className="mt-6">
      <h2 id="issues-heading" className="text-lg font-semibold">
        Issues ({issues.length})
      </h2>
      <ul className="mt-3 space-y-3">
        {issues.map((issue) => (
          <li key={issue.id} className="min-w-0 rounded-lg border bg-card p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <h3 className="min-w-0 wrap-break-word font-medium">{issue.title}</h3>
              <div className="flex shrink-0 flex-wrap gap-2">
                <Badge variant="secondary">{statusLabels[issue.status]}</Badge>
                <Badge variant="outline">{priorityLabels[issue.priority]} priority</Badge>
              </div>
            </div>
            <dl className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm">
              <div>
                <dt className="text-muted-foreground">Assignee</dt>
                <dd>{issue.assigneeName ?? 'Unassigned'}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Due date</dt>
                <dd>
                  {issue.dueDate ? (
                    <time dateTime={issue.dueDate}>{issue.dueDate}</time>
                  ) : 'No due date'}
                </dd>
              </div>
            </dl>
          </li>
        ))}
      </ul>
    </section>
  )
}