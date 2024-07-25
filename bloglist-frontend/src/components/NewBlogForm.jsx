import { useState } from 'react'

const NewBlogForm = ({ createBlog, toggleNewBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addNewBlog = (event) => {
    event.preventDefault()
    createBlog({ title, author, url })

    setTitle('')
    setAuthor('')
    setUrl('')

    toggleNewBlog()
  }
  return (
    <div>
      <h2>Create a new blog</h2>
      <form>
        <div>
          <label htmlFor="title">Title:</label>
          <input type="text" id='title' onChange={event => setTitle(event.target.value)} value={title} />
        </div>
        <div>
          <label htmlFor="author">Author:</label>
          <input type="text" id='author' onChange={event => setAuthor(event.target.value)} value={author} />
        </div>
        <div>
          <label htmlFor="url">Url:</label>
          <input type="text" id='url' onChange={event => setUrl(event.target.value)} value={url} />
        </div>
        <button type='submit' onClick={addNewBlog}>Create</button>
      </form>
    </div>
  )
}

export default NewBlogForm