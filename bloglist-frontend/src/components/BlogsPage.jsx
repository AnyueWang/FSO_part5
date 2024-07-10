import Blog from './Blog'
import NewBlog from './NewBlog'
import NewBlogForm from './NewBlogForm'

const BlogsPage = ({ blogs, user, onClickLogout, createBlog }) => {
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
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default BlogsPage