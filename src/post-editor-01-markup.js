import React from 'react'

function Editor() {
  return (
    <form>
      <label htmlFor="title-input">title</label>
      <input id="title-input" />

      <label htmlFor="content-input">content</label>
      <input id="content-input" />

      <label htmlFor="tag-input">tags</label>
      <input id="tag-input" />

      <button type="submit">submit</button>
    </form>
  )
}
export default Editor
