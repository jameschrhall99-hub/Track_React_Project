import { Navigate, Route, Routes } from 'react-router'
import { AppLayout } from '@/app/app-layout'
import { LoginPage } from '@/features/auth/login-page'
import { ProjectsPage } from '@/features/projects/projects-page'
import { NotFoundPage } from '@/pages/not-found-page'
import { ProjectIssuesPage } from '@/features/projects/project-issues-page'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/app/projects" replace />} />
      <Route path="/login" element={<LoginPage />} />

      <Route path="/app" element={<AppLayout />}>
        <Route index element={<Navigate to="projects" replace />} />
        <Route path="projects" element={<ProjectsPage />} />
        <Route path="projects/:projectId" element={<ProjectIssuesPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default App