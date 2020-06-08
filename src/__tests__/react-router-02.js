import React from 'react'
import {render, fireEvent} from '@testing-library/react'
import {Main} from '../main'
import {Router} from 'react-router-dom'
import {createMemoryHistory} from 'history'

describe('router : ', () => {
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
  test('landing on a bad page shows no match component', () => {
    const history = createMemoryHistory({
      initialEntries: ['/somthing-that-does-not-match'],
    })
    const {debug, container, getByRole, getByTestId} = render(
      <Router history={history}>
        <Main />
      </Router>,
    )
    // console.log(history)
    // debug(container)
    expect(getByRole('heading')).toHaveTextContent(/404/i)
  })
})
