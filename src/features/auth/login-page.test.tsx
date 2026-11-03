import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router'
import { expect, test } from 'vitest'
import { LoginPage } from './login-page'

test('lets a visitor leave the login placeholder and view sample projects', async () => {
  const user = userEvent.setup()

  render(
    <MemoryRouter initialEntries={['/login']}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/app/projects"
          element={<h1>Sample projects destination</h1>}
        />
      </Routes>
    </MemoryRouter>,
  )

  expect(
    screen.getByRole('heading', { name: 'Sign in to ShipTrack' }),
  ).toBeInTheDocument()

  await user.click(screen.getByRole('link', { name: 'View sample projects' }))

  expect(
    await screen.findByRole('heading', { name: 'Sample projects destination' }),
  ).toBeInTheDocument()
  expect(
    screen.queryByRole('heading', { name: 'Sign in to ShipTrack' }),
  ).not.toBeInTheDocument()
})