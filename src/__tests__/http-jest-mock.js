import React from 'react'
import {render, fireEvent, wait} from '@testing-library/react'
import {loadGreeting as mockLoadGreeting} from '../api'
import {GreetingLoader} from '../greeting-loader-01-mocking'

// jest.mock('../api',()=>{
//     return{
//         loadGreeting: jest.fn((subject)=> Promise.resolve({data:{greeting:`Hi ${subject}`}}))
//     }
// })
jest.mock('../api')

test('loads greetings on click', async () => {
  const {container, debug, getByLabelText, getByText} = render(
    <GreetingLoader />,
  )

  const testGreeting = 'TEST_GREETING'
  // console.log(mockLoadGreeting)

  mockLoadGreeting.mockResolvedValueOnce({data: {greeting: testGreeting}})
  const nameInput = getByLabelText(/name/i)
  const loadButton = getByText(/Load/i)
  nameInput.value = 'mohamad'
  fireEvent.click(loadButton)
  expect(mockLoadGreeting).toHaveBeenCalledWith('mohamad')
  expect(mockLoadGreeting).toHaveBeenCalledTimes(1)

  await wait(() => {
    expect(getByLabelText(/greeting/i)).toHaveTextContent(testGreeting)
  })
})
