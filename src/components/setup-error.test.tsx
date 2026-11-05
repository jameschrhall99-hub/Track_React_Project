import { render, screen, within } from '@testing-library/react'
import { expect, test } from 'vitest'
import { validateSupabaseEnv } from '../lib/env'
import SetupError from './setup-error'

test('shows configuration issues and local and hosted recovery instructions', () => {
  const issues = [
    'VITE_SUPABASE_URL is missing.',
    'VITE_SUPABASE_PUBLISHABLE_KEY is missing.',
  ]

  render(<SetupError issues={issues} />)

  const main = screen.getByRole('main')
  expect(
    within(main).getByRole('heading', {
      level: 1,
      name: 'ShipTrack needs Supabase configuration',
    }),
  ).toBeInTheDocument()

  for (const issue of issues) {
    expect(within(main).getByText(issue)).toBeInTheDocument()
  }

  const recoverySteps = within(main).getAllByRole('list')[1]
  expect(recoverySteps.tagName).toBe('OL')
  const steps = within(recoverySteps).getAllByRole('listitem')
  expect(steps).toHaveLength(3)
  expect(steps[0]).toHaveTextContent(
    /copy \.env\.example to \.env\.local in the project root; otherwise, edit the existing file/,
  )
  expect(steps[1]).toHaveTextContent(
    /VITE_SUPABASE_URL.*project URL.*VITE_SUPABASE_PUBLISHABLE_KEY.*publishable key/,
  )
  expect(steps[2]).toHaveTextContent(
    /Stop the development server and run npm run dev again/,
  )

  const hostedNote = within(main).getByRole('complementary')
  expect(hostedNote).toHaveTextContent(/environment settings.*rebuild and redeploy/)
  expect(hostedNote).toHaveTextContent(
    /Creating a local \.env\.local file will not fix a deployed site/,
  )
})

test('shows validation issues without displaying the supplied configuration values', () => {
  const url = 'invalid-project-url'
  const publishableKey = 'invalid-private-key'
  const result = validateSupabaseEnv({ url, publishableKey })

  if (result.ok) throw new Error('Expected configuration validation to fail')

  render(<SetupError issues={result.issues} />)

  const main = screen.getByRole('main')
  for (const issue of result.issues) {
    expect(within(main).getByText(issue)).toBeInTheDocument()
  }
  expect(main).not.toHaveTextContent(url)
  expect(main).not.toHaveTextContent(publishableKey)
})
