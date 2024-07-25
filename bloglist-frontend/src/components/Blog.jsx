import { useState } from 'react'
import View from './View'

const Blog = ({ blog, addLike, removeBlog, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  const [detailsVisibile, setDetailsVisible] = useState(false)
  const showWhenVisible = { display: detailsVisibile ? '' : 'none' }
  const buttonTag = detailsVisibile ? 'Hide' : 'View'
  const toggleVisibility = () => setDetailsVisible(!detailsVisibile)
  const handleLike = () => addLike(blog)
  const handleRemove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      removeBlog(blog)
    }
  }
  return (
    <div style={blogStyle} className='blog'>
      <div>
        {blog.title} - <i>{blog.author}</i>
        <View toggleVisibility={toggleVisibility} buttonTag={buttonTag} />
      </div>
      <div style={showWhenVisible}>
        <p>Url: {blog.url}</p>
        <p>Likes: {blog.likes} <button onClick={handleLike}>like</button></p>
        <p>User: {blog.user ? blog.user.name : ''}</p>
        <button onClick={handleRemove} hidden={blog.user ? blog.user.username !== user.username : true} >Remove</button>
      </div>
    </div>
  )
}

export default Blog
