import React from 'react'
import {render, fireEvent, wait} from '@testing-library/react'
import {Redirect as MockRedirect} from 'react-router'
import {savePost as mockSavePost} from '../api'
import {Editor} from '../post-editor-05-dates'

jest.mock('react-router', () => {
  return {
    Redirect: jest.fn(() => null),
  }
})
jest.mock('../api')

afterEach(() => {
  jest.clearAllMocks()
})

test('render a form with title,content,submit,tags', async () => {
  const fakeUser = {id: 'user-1'}
  const {getByText, getByLabelText} = render(<Editor user={fakeUser} />)
  const fakePost = {
    title: 'Test Title',
    content: 'Test content',
    tags: ['tag1', 'tag2'],
  }
  const preDate = new Date().getTime()
  getByLabelText(/title/i).value = fakePost.title
  getByLabelText(/content/i).value = fakePost.content
  getByLabelText(/tags/i).value = fakePost.tags.join(',')
  const submit = getByText(/submit/i)

  fireEvent.click(submit)
  expect(submit).toBeDisabled()

  expect(mockSavePost).toHaveBeenCalledWith({
    ...fakePost,
    date: expect.any(String),
    authorId: fakeUser.id,
  })
  expect(mockSavePost).toHaveBeenCalledTimes(1)

  await wait(() => {
    expect(MockRedirect).toHaveBeenCalledTimes(1)
    expect(MockRedirect).toHaveBeenCalledWith({to: '/'}, {})
  })

  const postDate = new Date().getTime()
  //   console.log(mockSavePost.mock.calls)
  const date = new Date(mockSavePost.mock.calls[0][0].date).getTime()
  //   console.log(date, postDate, preDate)
  expect(date).toBeGreaterThanOrEqual(preDate)
  expect(date).toBeLessThanOrEqual(postDate)
})
