import type { IssueSummary } from '@/features/issues/issue-types'

export const sampleIssues: IssueSummary[] = [
  {
    id: 'website-1',
    projectId: 'website',
    title: 'Make the signup form usable with a keyboard',
    status: 'todo',
    priority: 'high',
    dueDate: '2026-11-20',
    assigneeName: 'Sample owner',
  },
  {
    id: 'website-2',
    projectId: 'website',
    title: 'Review navigation labels on narrow screens',
    status: 'in_progress',
    priority: 'medium',
    dueDate: null,
    assigneeName: null,
  },
  {
    id: 'website-3',
    projectId: 'website',
    title: 'Replace the old homepage illustration',
    status: 'done',
    priority: 'low',
    dueDate: '2026-11-10',
    assigneeName: 'Sample owner',
  },
  {
    id: 'mobile-1',
    projectId: 'mobile',
    title: 'Check the welcome screen on a small phone with a very long translated heading',
    status: 'todo',
    priority: 'medium',
    dueDate: null,
    assigneeName: null,
  },
]