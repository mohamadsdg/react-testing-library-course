import React from 'react'
import {render as rtlRender, fireEvent} from '@testing-library/react'
import {Main} from '../main'
import {Router} from 'react-router-dom'
import {createMemoryHistory} from 'history'

function render(
  ui,
  {
    route = '/',
    history = createMemoryHistory({initialEntries: [route]}),
    ...renderOptions
  } = {},
) {
  function wrapper({children}) {
    return <Router history={history}>{children}</Router>
  }

  return {
    ...rtlRender(ui, {wrapper, ...renderOptions}),
    history,
  }
}

describe('router : ', () => {
  test('main renders about and home and I can navigate to those pages with history', () => {
    const {getByRole, getByTestId, history} = render(<Main />, {
      history: createMemoryHistory({initialEntries: ['/']}),
    })

    expect(getByRole('heading')).toHaveTextContent(/home/i)
    fireEvent.click(getByTestId(/about/i))
    expect(getByRole('heading')).toHaveTextContent(/about/i)
  })

  test('landing on a bad page shows no match component', () => {
    const {getByRole, history} = render(<Main />, {
      route: '/somthing-that-does-not-match',
    })
    expect(getByRole('heading')).toHaveTextContent(/404/i)
  })
})
