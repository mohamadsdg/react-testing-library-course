import React from 'react'
import {createStore} from 'redux'
import {Counter} from '../redux-counter'
import {render, fireEvent} from '@testing-library/react'
import {Provider} from 'react-redux'
import {store as appStore} from '../redux-store'

import {reducer} from '../redux-reducer'

test('can render with redux with defaults', () => {
  const {getByLabelText, getByText} = render(
    <Provider store={appStore}>
      <Counter />
    </Provider>,
  )

  fireEvent.click(getByText('+'))
  expect(getByLabelText(/count/i)).toHaveTextContent('1')
})

test('can render with redux with custom initial state', () => {
  const store = createStore(reducer, {count: 2})
  //   console.log(store.getState())
  const {getByLabelText, getByText} = render(
    <Provider store={store}>
      <Counter />
    </Provider>,
  )

  //   fireEvent.click(getByText('+'))
  expect(getByLabelText(/count/i)).toHaveTextContent('2')
})
