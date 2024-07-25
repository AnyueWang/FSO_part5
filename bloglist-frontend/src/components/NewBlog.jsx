import { useState } from 'react'
import NewBlogForm from './NewBlogForm'

const NewBlog = (props) => {
  const [createNewBlogVisible, setCreateNewBlogVisible] = useState(false)
  const hideWhenVisible = { display: createNewBlogVisible ? 'none' : '' }
  const showWhenVisible = { display: createNewBlogVisible ? '' : 'none' }
  const toggleNewBlog = () => setCreateNewBlogVisible(!createNewBlogVisible)

  return (
    <div>
      <div style={showWhenVisible}>
        <NewBlogForm createBlog={props.createBlog} toggleNewBlog={toggleNewBlog} />
        <button onClick={toggleNewBlog}>Cancel</button>
      </div>
      <div style={hideWhenVisible}>
        <button onClick={toggleNewBlog}>New Blog</button>
      </div>
      <p></p>
    </div>
  )
}

export default NewBlog