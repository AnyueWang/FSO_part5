import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const LoginPage = ({ username, pwd, onChangeUsername, onChangePwd, onClickLogin }) => {
  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={onClickLogin}>
        <div>
          <label htmlFor="username">Username: </label>
          <input type="text" id='username' onChange={onChangeUsername} value={username} />
        </div>
        <div>
          <label htmlFor="pwd">Password: </label>
          <input type="password" id='pwd' onChange={onChangePwd} value={pwd} />
        </div>
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}

const BlogsPage = ({ blogs, user, title, author, url, onChangeTitle, onChangeAuthor, onChangeUrl, onClickLogout, onClickCreate }) => {
  return (
    <div>
      <h2>Blogs</h2>
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <p>{user.name} logged in.</p>
        <button onClick={onClickLogout}>Logout</button>
      </div>
      <h2>Create a new blog</h2>
      <div>
        <form>
          <div>
            <label htmlFor="title">Title:</label>
            <input type="text" id='title' onChange={onChangeTitle} value={title} />
          </div>
          <div>
            <label htmlFor="author">Author:</label>
            <input type="text" id='author' onChange={onChangeAuthor} value={author} />
          </div>
          <div>
            <label htmlFor="url">Url:</label>
            <input type="text" id='url' onChange={onChangeUrl} value={url} />
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

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [pwd, setPwd] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const strLoggedinUser = "loggedinUser"

  const onChangeUsername = (event) => {
    setUsername(event.target.value)
  }
  const onChangePwd = (event) => {
    setPwd(event.target.value)
  }
  const onChangeTitle = (event) => {
    setTitle(event.target.value)
  }
  const onChangeAuthor = (event) => {
    setAuthor(event.target.value)
  }
  const onChangeUrl = (event) => {
    setUrl(event.target.value)
  }
  const onClickLogin = (event) => {
    event.preventDefault()
    loginService
      .login(username, pwd)
      .then(loggedinUser => {
        setUser(loggedinUser)
        blogService.setUserToken(loggedinUser.token)
        localStorage.setItem(strLoggedinUser, JSON.stringify(loggedinUser))
      })
    setUsername('')
    setPwd('')
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }
  const onClickLogout = (event) => {
    event.preventDefault()
    localStorage.removeItem(strLoggedinUser)
    setUser(null)
    blogService.setUserToken(null)
  }
  const onClickCreate = (event) => {
    event.preventDefault()
    blogService
      .create({ title, author, url })
      .then(newBlog => {
        const updatedBlogs = blogs.concat(newBlog)
        setBlogs(updatedBlogs)
      })
      setTitle('')
      setAuthor('')
      setUrl('')
  }

  useEffect(() => {
    const loggedinUser = localStorage.getItem(strLoggedinUser)
    if (loggedinUser) {
      const user = JSON.parse(loggedinUser)
      setUser(user)
      blogService.setUserToken(user.token)
      blogService.getAll().then(blogs =>
        setBlogs(blogs)
      )
    }
  }, [])

  return (
    <div>
      {
        user === null
          ? (<LoginPage
            username={username}
            pwd={pwd}
            onChangeUsername={onChangeUsername}
            onChangePwd={onChangePwd}
            onClickLogin={onClickLogin}
          />)
          : (<BlogsPage
            blogs={blogs}
            user={user}
            title={title}
            author={author}
            url={url}
            onChangeTitle={onChangeTitle}
            onChangeAuthor={onChangeAuthor}
            onChangeUrl={onChangeUrl}
            onClickLogout={onClickLogout}
            onClickCreate={onClickCreate}
          />)
      }
    </div>
  )
}

export default App