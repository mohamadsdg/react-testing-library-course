import React from 'react'
import {createStore} from 'redux'
import {render as rtlRender, fireEvent} from '@testing-library/react'
import {Provider} from 'react-redux'
import {Counter} from '../redux-counter'

import {reducer} from '../redux-reducer'

function render(
  ui,
  {
    initialState,
    store = createStore(reducer, initialState),
    ...rtlOptions
  } = {},
) {
  function Wrapper({children}) {
    return <Provider store={store}>{children}</Provider>
  }
  return {
    ...rtlRender(ui, {wrapper: Wrapper, ...rtlOptions}),
    store,
  }
}

test('can render with redux with defaults', () => {
  const {getByLabelText, getByText} = render(<Counter />)

  fireEvent.click(getByText('+'))
  expect(getByLabelText(/count/i)).toHaveTextContent('1')
})

test('can render with redux with custom initial state', () => {
  const {getByLabelText, getByText} = render(<Counter />, {
    initialState: {count: 2},
  })

  fireEvent.click(getByText('+'))
  expect(getByLabelText(/count/i)).toHaveTextContent('3')
})
