import React from 'react'
import {render} from '@testing-library/react'
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

    const {rerender} = render(
      <ErrorBoundary>
        <Bomb />
      </ErrorBoundary>,
    )

    // debug(container)

    rerender(
      <ErrorBoundary>
        <Bomb shouldThrow={true} />
      </ErrorBoundary>,
    )
    const error = expect.any(Error)
    const info = {componentStack: expect.stringContaining('Bomb')}
    expect(mockReportError).toHaveBeenCalledWith(error, info)
    expect(mockReportError).toHaveBeenCalledTimes(1)

    expect(console.error).toHaveBeenCalledTimes(2)
  })
})
