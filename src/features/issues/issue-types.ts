export const ISSUE_STATUSES = ['todo', 'in_progress', 'done'] as const
export const ISSUE_PRIORITIES = ['low', 'medium', 'high'] as const

export type IssueStatus = (typeof ISSUE_STATUSES)[number]
export type IssuePriority = (typeof ISSUE_PRIORITIES)[number]

export type IssueSummary = {
  id: string
  projectId: string
  title: string
  status: IssueStatus
  priority: IssuePriority
  dueDate: string | null
  assigneeName: string | null
}

export const DEFAULT_ISSUE_STATUS: IssueStatus = 'todo'
export const DEFAULT_ISSUE_PRIORITY: IssuePriority = 'medium'

export const statusLabels: Record<IssueStatus, string> = {
  todo: 'Todo',
  in_progress: 'In Progress',
  done: 'Done',
}

export const priorityLabels: Record<IssuePriority, string> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
}

