import React from 'react'
import {render} from '@testing-library/react'
import {axe} from 'jest-axe'

function Form() {
  return (
    <form>
      <label htmlFor="username">username</label>
      <input id="username" placeholder="username" name="username" />
    </form>
  )
}

test('the form is accessible', async () => {
  const {container} = render(<Form />)
  // console.log(container.innerHTML)
  const result = await axe(container)
  // console.log(result)
  expect(result).toHaveNoViolations()
})
