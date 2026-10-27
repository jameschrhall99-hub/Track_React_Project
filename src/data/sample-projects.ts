export type ProjectSummary = {
  id: string
  name: string
  description: string
  openIssues: number
  completedIssues: number
}

export const sampleProjects: ProjectSummary[] = [
  {
    id: 'website',
    name: 'Website redesign',
    description: 'Refresh the public website and improve the signup journey.',
    openIssues: 8,
    completedIssues: 4,
  },
  {
    id: 'mobile',
    name: 'Mobile app',
    description: 'Plan and build the first mobile experience for customers.',
    openIssues: 5,
    completedIssues: 2,
  },
  {
    id: 'tools',
    name: 'Internal tools',
    description: 'Make everyday support and reporting tasks easier.',
    openIssues: 3,
    completedIssues: 7,
  },
]