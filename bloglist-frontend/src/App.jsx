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

const BlogsPage = ({ blogs }) => {
  return (
    <div>
      <h2>Blogs</h2>
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
  const onChangeUsername = (event) => {
    setUsername(event.target.value)
  }
  const onChangePwd = (event) => {
    setPwd(event.target.value)
  }
  const onClickLogin = (event) => {
    event.preventDefault()
    loginService
      .login(username, pwd)
      .then(loggedinUser => setUser(loggedinUser))
    setUsername('')
    setPwd('')
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  return (
    <div>
      {
        user === null
          ? (<LoginPage username={username} pwd={pwd} onChangeUsername={onChangeUsername} onChangePwd={onChangePwd} onClickLogin={onClickLogin} />)
          : (<BlogsPage blogs={blogs} />)
      }
    </div>
  )
}

export default App