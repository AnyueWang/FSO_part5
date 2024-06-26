import Blog from './Blog'

const BlogsPage = ({ blogs, user, newBlogInfo, onChangeNewBlogInfo, onClickLogout, onClickCreate }) => {
    return (
      <div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <p>{user.name} logged in.</p>
          <button onClick={onClickLogout}>Logout</button>
        </div>
        <h2>Create a new blog</h2>
        <div>
          <form>
            <div>
              <label htmlFor="title">Title:</label>
              <input type="text" id='title' onChange={onChangeNewBlogInfo.onChangeTitle} value={newBlogInfo.title} />
            </div>
            <div>
              <label htmlFor="author">Author:</label>
              <input type="text" id='author' onChange={onChangeNewBlogInfo.onChangeAuthor} value={newBlogInfo.author} />
            </div>
            <div>
              <label htmlFor="url">Url:</label>
              <input type="text" id='url' onChange={onChangeNewBlogInfo.onChangeUrl} value={newBlogInfo.url} />
            </div>
            <button type='submit' onClick={onClickCreate}>Create</button>
          </form>
        </div>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    )
  }

  export default BlogsPage