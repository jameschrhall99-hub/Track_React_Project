import { sampleIssues } from '@/data/sample-issues'

export type ProjectSummary = {
  id: string
  name: string
  description: string
  openIssues: number
  completedIssues: number
}

function getIssueCounts(projectId: string) {
  const issues = sampleIssues.filter((issue) => issue.projectId === projectId)

  return {
    openIssues: issues.filter((issue) => issue.status !== 'done').length,
    completedIssues: issues.filter((issue) => issue.status === 'done').length,
  }
}

export const sampleProjects: ProjectSummary[] = [
  {
    id: 'website',
    name: 'Website redesign',
    description: 'Refresh the public website and improve the signup journey.',
    ...getIssueCounts('website'),
  },
  {
    id: 'mobile',
    name: 'Mobile app',
    description: 'Plan and build the first mobile experience for customers.',
    ...getIssueCounts('mobile'),
  },
  {
    id: 'tools',
    name: 'Internal tools',
    description: 'Make everyday support and reporting tasks easier.',
    ...getIssueCounts('tools'),
  },
]