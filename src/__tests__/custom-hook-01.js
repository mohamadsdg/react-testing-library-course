import React from 'react'
import {render, act} from '@testing-library/react'
import {useCounter} from '../use-counter'

test('expose the count and increment/decrement functions', () => {
  let result
  function TestComponent() {
    result = useCounter()
    return null
  }
  render(<TestComponent />)
  console.log(result)
  expect(result.count).toBe(0)
  act(() => result.increment())
  expect(result.count).toBe(1)
  act(() => result.increment())
  expect(result.count).toBe(2)
})
