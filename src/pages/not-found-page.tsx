import { Link } from 'react-router'

export function NotFoundPage() {
  return (
    <main className="flex min-h-svh items-center justify-center bg-background p-5">
      <div className="max-w-md space-y-4">
        <p className="text-sm text-muted-foreground">404</p>
        <h1 className="text-3xl font-semibold">Page not found</h1>
        <p className="text-muted-foreground">
          Check the address or return to your projects.
        </p>
        <Link
          to="/app/projects"
          className="inline-block rounded-sm underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-ring"
        >
          Back to projects
        </Link>
      </div>
    </main>
  )
}