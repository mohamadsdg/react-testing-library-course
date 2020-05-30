import React from 'react'
import {render, fireEvent, wait} from '@testing-library/react'
import {GreetingLoader} from '../greeting-loader-02-dependency-injection'


test('loads greetings on click DI', async () => {
  const mockLoadGreeting = jest.fn()
  const testGreeting = 'TEST_GREETING'
  
  mockLoadGreeting.mockResolvedValueOnce({data: {greeting: testGreeting}})

  const {container, debug, getByLabelText, getByText} = render(
    <GreetingLoader loadGreeting={mockLoadGreeting}/>
  )

  
  // console.log(mockLoadGreeting)

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
