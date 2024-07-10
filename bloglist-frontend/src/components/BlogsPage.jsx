import Blog from './Blog'
import NewBlog from './NewBlog'
import NewBlogForm from './NewBlogForm'

const BlogsPage = ({ blogs, user, onClickLogout, createBlog, addLike, removeBlog }) => {
  return (
    <div>
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <p>{user.name} logged in.</p>
        <button onClick={onClickLogout}>Logout</button>
      </div>
      <NewBlog>
        <NewBlogForm
          createBlog={createBlog}
        />
      </NewBlog>
      {blogs.sort((a, b) => b.likes - a.likes).map(blog =>{
        return <Blog key={blog.id} blog={blog} addLike={addLike} removeBlog={removeBlog} />
      }
      )}
    </div>
  )
}

export default BlogsPage