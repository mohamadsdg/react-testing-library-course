import React from 'react'
import user from '@testing-library/user-event'
import {render} from '@testing-library/react'
import {FavoriteNumber} from '../favorite-number'
import '@testing-library/jest-dom'

test('entering an invalid value shows an error message part1', () => {
  const {getByLabelText, debug, getByRole, rerender} = render(
    <FavoriteNumber />,
  )
  const input = getByLabelText(/favorite number/i)
  user.type(input, '10')
  expect(getByRole(/alert/i)).toHaveTextContent(/The number is invalid/i)
  //   debug(input)
  rerender(<FavoriteNumber max="10" />)
  //   debug(input)
})

test('entering an new props shows an null', () => {
  const {getByLabelText, getByRole, rerender, queryByRole, debug} = render(
    <FavoriteNumber />,
  )
  const input = getByLabelText(/favorite number/i)
  user.type(input, '10')
  expect(getByRole(/alert/i)).toHaveTextContent(/The number is invalid/i)
  //   debug()
  rerender(<FavoriteNumber max="10" />)
  //   debug()
  expect(queryByRole(/alert/i)).toBeNull()
})
