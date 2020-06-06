import React from 'react'
import {render, fireEvent, wait} from '@testing-library/react'
import {Redirect as MockRedirect} from 'react-router'
import {fake, build, sequence} from 'test-data-bot'
import {savePost as mockSavePost} from '../api'
import {Editor} from '../post-editor-07-error-state'

jest.mock('react-router', () => {
  return {
    Redirect: jest.fn(() => null),
  }
})
jest.mock('../api')

afterEach(() => {
  jest.clearAllMocks()
})

const postBuilder = build('Post').fields({
  title: fake(f => f.lorem.words()),
  content: fake(f => f.lorem.paragraphs().replace(/\r/gi, '')),
  tags: fake(f => [f.lorem.word(), f.lorem.word()]),
})
const userBuilder = build('user').fields({
  id: sequence(s => `user-${s}`),
})
test('render a form with title,content,submit,tags', async () => {
  mockSavePost.mockResolvedValueOnce()
  const fakeUser = userBuilder()
  const {getByText, getByLabelText} = render(<Editor user={fakeUser} />)
  const fakePost = postBuilder()

  const preDate = new Date().getTime()
  getByLabelText(/title/i).value = fakePost.title
  getByLabelText(/content/i).value = fakePost.content
  getByLabelText(/tags/i).value = fakePost.tags.join(', ')
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
test('renders an error message from the server', async () => {
  const fakeUser = userBuilder()
  const testError = 'test Error'
  mockSavePost.mockRejectedValueOnce({data: {error: testError}})

  const {getByText, findByRole, debug, container} = render(
    <Editor user={fakeUser} />,
  )

  const submit = getByText(/submit/i)

  fireEvent.click(submit)
  expect(submit).toBeDisabled()

  const postError = await findByRole('alert')
  // debug(container)
  expect(postError).toHaveTextContent(testError)
  // console.log(mockSavePost)
})
