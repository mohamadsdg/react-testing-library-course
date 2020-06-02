import React from 'react'
import {render, fireEvent} from '@testing-library/react'
import {Editor} from '../post-editor-02-state'

test('render a form with title,content,submit,tags', () => {
  const {getByText, getByLabelText} = render(<Editor />)
  getByLabelText(/title/i)
  getByLabelText(/content/i)
  getByLabelText(/tags/i)
  const submit = getByText(/submit/i)

  fireEvent.click(submit)
  expect(submit).toBeDisabled()
})
