import React from 'react'
import {render, act} from '@testing-library/react'
import {useCounter} from '../use-counter'

function setup({initialProps} = {}) {
  const result = {}
  function TestComponent(props) {
    result.current = useCounter(props)
    return null
  }
  render(<TestComponent {...initialProps} />)
  return result
}

test('expose the count and increment/decrement functions', () => {
  const result = setup()

  expect(result.current.count).toBe(0)
  act(() => result.current.increment())
  expect(result.current.count).toBe(1)
  act(() => result.current.increment())
  expect(result.current.count).toBe(2)
})

test('allows customization of the initial count', () => {
  const result = setup({initialProps: {initialCount: 1}})

  expect(result.current.count).toBe(1)
  act(() => result.current.increment())
  expect(result.current.count).toBe(2)
  act(() => result.current.increment())
  expect(result.current.count).toBe(3)
})
