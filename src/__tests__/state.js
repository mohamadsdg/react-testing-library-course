import React from 'react'
import {render, fireEvent} from '@testing-library/react'
import {FavoriteNumber} from '../favorite-number'
import '@testing-library/jest-dom'

test('entering an invalid value shows an error message', () => {
  const {getByLabelText, debug, getByRole} = render(<FavoriteNumber />)
  const input = getByLabelText(/favorite number/i)
  fireEvent.change(input, {target: {value: 10}})
  const getElmError = getByRole(/alert/i)
  expect(getElmError).toHaveTextContent(/The number is invalid/i)

  //   debug(input)
})
