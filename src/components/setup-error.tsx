type SupabaseConfigErrorProps = {
  issues: string[]
}

export default function SupabaseConfigError({
  issues,
}: SupabaseConfigErrorProps) {
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-10">
      <section className="w-full max-w-2xl rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h1 className="mb-4 text-2xl font-bold tracking-tight text-slate-900">
          ShipTrack needs Supabase configuration
        </h1>

        <ul className="mb-6 list-disc space-y-2 pl-5 text-sm text-red-700">
          {issues.map((issue, index) => (
            <li key={`${issue}-${index}`} className="wrap-break-word">
              {issue}
            </li>
          ))}
        </ul>

        <h2 className="mb-3 text-lg font-semibold text-slate-900">
          Recovery steps
        </h2>

        <ol className="mb-8 list-decimal space-y-3 pl-5 text-sm leading-relaxed text-slate-700">
          <li>
            If <code>.env.local</code> doesn’t exist, copy{' '}
            <code>.env.example</code> to <code>.env.local</code> in the project
            root; otherwise, edit the existing file.
          </li>
          <li>
            Set <code>VITE_SUPABASE_URL</code> to your Supabase project URL and{' '}
            <code>VITE_SUPABASE_PUBLISHABLE_KEY</code> to your publishable key.
          </li>
          <li>
            Stop the development server and run{' '}
            <code>npm run dev</code> again.
          </li>
        </ol>

        <aside className="rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm text-blue-900">
          <h2 className="mb-2 font-semibold">
            Hosted environment
          </h2>
          <p>
            If this issue occurs on a deployed site, configure the same
            environment variables in your hosting project's environment
            settings, then rebuild and redeploy the application.
          </p>
          <p className="mt-2">
            Creating a local <code>.env.local</code> file will not fix a
            deployed site. Visitors cannot change the hosting configuration.
          </p>
        </aside>
      </section>
    </main>
  )
}
