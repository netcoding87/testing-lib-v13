import React from 'react'

import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react'
import App from './App'

it('should show data', async () => {
  render(<App />)

  expect(
    screen.getByRole('heading', { name: /Hello CodeSandbox/ })
  ).toBeVisible()

  await screen.findByTestId(/loading/)

  await waitForElementToBeRemoved(screen.queryByTestId(/loading/))

  expect(screen.getByText(/123/)).toBeVisible()
})
