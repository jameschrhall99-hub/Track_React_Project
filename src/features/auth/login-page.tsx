import { Link } from 'react-router'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export function LoginPage() {
  return (
    <main className="flex min-h-svh items-center justify-center bg-background p-5">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>
            <h1 className="text-2xl font-semibold">Sign in to ShipTrack</h1>
          </CardTitle>
          <CardDescription>
            Account sign-in will be available in the authentication milestone.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Link
            to="/app/projects"
            className="rounded-sm text-sm underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-ring"
          >
            View sample projects
          </Link>
        </CardContent>
      </Card>
    </main>
  )
}