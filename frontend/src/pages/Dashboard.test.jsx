import { test, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import Dashboard from './Dashboard'

beforeEach(() => {
  sessionStorage.clear()
})

test('displays sign in message when user is not logged in', () => {
  render(<Dashboard />)

  expect(
    screen.getByText('Please sign in to access your dashboard.')
  ).toBeTruthy()
})