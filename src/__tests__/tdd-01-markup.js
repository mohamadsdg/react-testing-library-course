import React from 'react'
import {render} from '@testing-library/react'
import Editor from '../post-editor-01-markup'

test('render a form with title,content,submit,tags', () => {
  const {getByText, getByLabelText} = render(<Editor />)
  getByLabelText(/title/i)
  getByLabelText(/content/i)
  getByLabelText(/tags/i)
  getByText(/submit/i)
})
