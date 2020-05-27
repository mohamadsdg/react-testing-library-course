import React from 'react'
import ReactDOM from 'react-dom'
import {queries, getQueriesForElement} from '@testing-library/dom'
import {render as renderTLR} from '@testing-library/react'
import {FavoriteNumber} from '../favorite-number'

// simulate ender in @testing-library/react
function render(ui) {
  const container = document.createElement('div')
  ReactDOM.render(ui, container)
  //   const input = queries.getByLabelText(div, /favorite number/i)
  const query = getQueriesForElement(container)
  return {container, ...query}
}

test('renders a number input with a label "Favorite Number"', () => {
  //   const {getByLabelText} = render(<FavoriteNumber />)

  const {getByLabelText} = renderTLR(<FavoriteNumber />)

  const input = getByLabelText(/favorite number/i)
  expect(input).toHaveAttribute('type', 'number')
})
