import { Link, NavLink } from 'react-router'
import { sampleProjects } from '@/data/sample-projects'

export function ProjectNavigation() {
  return (
    <nav aria-label="Main navigation" className="mt-4 space-y-1">
      <NavLink
        to="/app/projects"
        end
        className={({ isActive }) =>
          `block rounded-md px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-ring ${
            isActive ? 'bg-secondary font-medium' : 'hover:bg-muted'
          }`
        }
      >
        All projects
      </NavLink>
      <p className="px-3 pt-4 pb-2 text-xs font-medium text-muted-foreground">Sample projects</p>
      {sampleProjects.map((project) => (
        <NavLink
          key={project.id}
          to={`/app/projects/${project.id}`}
          className={({ isActive }) =>
            `block wrap-break-word rounded-md px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-ring ${
              isActive ? 'bg-secondary font-medium' : 'hover:bg-muted'
            }`
          }
        >
          {project.name}
        </NavLink>
      ))}
      <Link to="/login" className="block rounded-md px-3 py-2 text-sm hover:bg-muted focus-visible:outline-2 focus-visible:outline-ring">
        Login
      </Link>
    </nav>
  )
}