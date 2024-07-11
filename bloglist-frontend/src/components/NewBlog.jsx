import { useState } from 'react'

const NewBlog = (props) => {
  const [createNewBlogVisible, setCreateNewBlogVisible] = useState(false)
  const hideWhenVisible = { display: createNewBlogVisible ? 'none' : '' }
  const showWhenVisible = { display: createNewBlogVisible ? '' : 'none' }
  const toggleNewNote = () => setCreateNewBlogVisible(!createNewBlogVisible)

  return (
    <div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleNewNote}>Cancel</button>
      </div>
      <div style={hideWhenVisible}>
        <button onClick={toggleNewNote}>New Blog</button>
      </div>
      <p></p>
    </div>
  )
}

export default NewBlog