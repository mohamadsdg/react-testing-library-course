import React from 'react'
import {render, fireEvent} from '@testing-library/react'
import {ErrorBoundary} from '../error-boundary'
import {reportError as mockReportError} from '../api'

jest.mock('../api')

function Bomb({shouldThrow}) {
  if (shouldThrow) {
    throw new Error('💣')
  } else {
    return null
  }
}

beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {})
})

afterAll(() => {
  console.error.mockRestore()
  // console.error('after all runner')
})

afterEach(() => {
  jest.clearAllMocks()
  // console.log('afterEach')
})
describe('about reportError', () => {
  test('calls reportError and renders that there was a problem', () => {
    mockReportError.mockResolvedValueOnce({success: true})

    const {
      rerender,
      queryByRole,
      getByText,
      getByRole,
      queryByText,
    } = render(<Bomb />, {wrapper: ErrorBoundary})

    // debug(container)

    rerender(<Bomb shouldThrow={true} />)
    const error = expect.any(Error)
    const info = {componentStack: expect.stringContaining('Bomb')}
    expect(mockReportError).toHaveBeenCalledWith(error, info)
    expect(mockReportError).toHaveBeenCalledTimes(1)

    // debug(container)
    expect(getByRole('alert').textContent).toMatchInlineSnapshot(
      `"There was a problem."`,
    )

    mockReportError.mockClear()
    console.error.mockClear()

    rerender(<Bomb />)

    fireEvent.click(getByText(/try again/i))

    expect(mockReportError).not.toHaveBeenCalled()
    expect(console.error).not.toHaveBeenCalled()
    expect(queryByRole('alert')).not.toBeInTheDocument()
    expect(queryByText(/try agine/i)).not.toBeInTheDocument()
  })
})
