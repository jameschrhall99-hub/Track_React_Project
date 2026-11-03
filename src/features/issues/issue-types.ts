export type IssueStatus = 'todo' | 'in_progress' | 'done'
export type IssuePriority = 'low' | 'medium' | 'high'

export type IssueSummary = {
  id: string
  projectId: string
  title: string
  status: IssueStatus
  priority: IssuePriority
  dueDate: string | null
  assigneeName: string | null
}

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