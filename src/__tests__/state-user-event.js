import React from 'react'
import user from '@testing-library/user-event'
import {render} from '@testing-library/react'
import {FavoriteNumber} from '../favorite-number'
import '@testing-library/jest-dom'

test('entering an invalid value shows an error message', () => {
  const {getByLabelText, debug, getByRole} = render(<FavoriteNumber />)
  const input = getByLabelText(/favorite number/i)
  user.type(input, '10')
  expect(getByRole(/alert/i)).toHaveTextContent(/The number is invalid/i)

  //   debug(input)
})
