import {renderHook, act} from '@testing-library/react-hooks'
import {useCounter} from '../use-counter'

test('expose the count and increment/decrement functions', () => {
  const {result} = renderHook(useCounter)

  expect(result.current.count).toBe(0)
  act(() => result.current.increment())
  expect(result.current.count).toBe(1)
  act(() => result.current.increment())
  expect(result.current.count).toBe(2)
})

test('allows customization of the initial count', () => {
  const {result} = renderHook(useCounter, {initialProps: {initialCount: 1}})

  expect(result.current.count).toBe(1)
  act(() => result.current.increment())
  expect(result.current.count).toBe(2)
  act(() => result.current.increment())
  expect(result.current.count).toBe(3)
})
