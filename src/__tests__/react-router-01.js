import React from 'react'
import {render, fireEvent} from '@testing-library/react'
import {Main} from '../main'
import {Router, MemoryRouter} from 'react-router-dom'
import {createMemoryHistory} from 'history'

describe('', () => {
  test('main renders about and home and I can navigate to those pages with history', () => {
    const history = createMemoryHistory({initialEntries: ['/']})
    const {debug, container, getByRole, getByTestId} = render(
      <Router history={history}>
        <Main />
      </Router>,
    )
    // console.log(history)
    expect(getByRole('heading')).toHaveTextContent(/home/i)
    fireEvent.click(getByTestId(/about/i))
    expect(getByRole('heading')).toHaveTextContent(/about/i)
  })
  test('main renders about and home and I can navigate to those pages with MemoryRouter', () => {
    const {debug, container, getByRole, getByTestId} = render(
      <MemoryRouter initialEntries={['/']}>
        <Main />
      </MemoryRouter>,
    )

    expect(getByRole('heading')).toHaveTextContent(/home/i)
    fireEvent.click(getByTestId(/about/i))
    expect(getByRole('heading')).toHaveTextContent(/about/i)
  })
})
