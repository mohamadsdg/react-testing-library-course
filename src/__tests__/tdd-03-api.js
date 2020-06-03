import React from 'react'
import {render, fireEvent} from '@testing-library/react'
import {Editor} from '../post-editor-03-api'
import {savePost as mockSavePost} from '../api'

jest.mock('../api')

test('render a form with title,content,submit,tags', () => {
  const fakeUser = {id: 'user-1'}
  const {getByText, getByLabelText} = render(<Editor user={fakeUser} />)
  const fakePost = {
    title: 'Test Title',
    content: 'Test content',
    tags: ['tag1', 'tag2'],
  }
  getByLabelText(/title/i).value = fakePost.title
  getByLabelText(/content/i).value = fakePost.content
  getByLabelText(/tags/i).value = fakePost.tags.join(',')
  const submit = getByText(/submit/i)

  fireEvent.click(submit)
  expect(submit).toBeDisabled()

  expect(mockSavePost).toHaveBeenCalledWith({
    ...fakePost,
    authorId: fakeUser.id,
  })
  expect(mockSavePost).toHaveBeenCalledTimes(1)
})
