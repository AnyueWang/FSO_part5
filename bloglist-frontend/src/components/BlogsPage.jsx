import Blog from './Blog'
import NewBlog from './NewBlog'

const BlogsPage = ({ blogs, user, onClickLogout, createBlog, addLike, removeBlog }) => {
  return (
    <div>
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <p>{user.name} logged in.</p>
        <button onClick={onClickLogout}>Logout</button>
      </div>
      <NewBlog createBlog={createBlog} />
      {blogs.sort((a, b) => b.likes - a.likes).map(blog => {
        return <Blog key={blog.id} blog={blog} addLike={addLike} removeBlog={removeBlog} user={user} />
      }
      )}
    </div>
  )
}

export default BlogsPage