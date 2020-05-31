import React from 'react'
import {render, fireEvent, wait} from '@testing-library/react'
import {HiddenMessage} from '../hidden-message'

jest.mock('react-transition-group', () => {
  return {
    CSSTransition: prop => {
      //   console.log(prop)
      return prop.in ? prop.children : null
    },
  }
})

describe('shows hidden message', () => {
  //   test('shows hidden message when toggle is clicked async version', async () => {
  //     const myMessage = 'hello world'
  //     const {getByText, queryByText, debug, container} = render(
  //       <HiddenMessage>{myMessage}</HiddenMessage>,
  //     )
  //     const toggleBtn = getByText(/toggle/i)
  //     expect(queryByText(myMessage)).not.toBeInTheDocument()
  //     fireEvent.click(toggleBtn)
  //     expect(getByText(myMessage)).toBeInTheDocument()
  //     fireEvent.click(toggleBtn)

  //     await wait(() => expect(queryByText(myMessage)).not.toBeInTheDocument())
  //   })

  test('shows hidden message when toggle is clicked mock version', () => {
    const myMessage = 'hello world'
    const {getByText, queryByText, debug, container} = render(
      <HiddenMessage>{myMessage}</HiddenMessage>,
    )
    const toggleBtn = getByText(/toggle/i)
    expect(queryByText(myMessage)).not.toBeInTheDocument()
    fireEvent.click(toggleBtn)
    expect(getByText(myMessage)).toBeInTheDocument()
    fireEvent.click(toggleBtn)

    expect(queryByText(myMessage)).not.toBeInTheDocument()
  })
})
