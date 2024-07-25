import { useState, useEffect } from 'react'
import BlogsPage from './components/BlogsPage'
import LoginPage from './components/LoginPage'
import Message from './components/Message'
import blogService from './services/blogs'
import loginService from './services/login'
import './styles.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [pwd, setPwd] = useState('')
  const [user, setUser] = useState(null)
  const [operationMessage, setOperationMessage] = useState(null)
  const [warningMessage, setWarningMessage] = useState(null)
  const strLoggedinUser = 'loggedinUser'

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
      .then((loggedinUser) => {
        setUser(loggedinUser)
        blogService.setUserToken(loggedinUser.token)
        localStorage.setItem(strLoggedinUser, JSON.stringify(loggedinUser))
        setOperationMessage('You have been logged in.')
        setTimeout(() => setOperationMessage(null), 5000)
      })
      .catch((error) => {
        setWarningMessage(error.response.data.error)
        setTimeout(() => setWarningMessage(null), 5000)
      })
    setUsername('')
    setPwd('')
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }
  const onClickLogout = (event) => {
    event.preventDefault()
    localStorage.removeItem(strLoggedinUser)
    setUser(null)
    blogService.setUserToken(null)
    setOperationMessage('You have been logged out.')
    setTimeout(() => setOperationMessage(null), 5000)
  }
  const createBlog = (blogObject) => {
    blogService
      .create(blogObject)
      .then((newBlog) => {
        const updatedBlogs = blogs.concat(newBlog)
        setBlogs(updatedBlogs)
        setOperationMessage(
          `A new Blog '${newBlog.title}' by ${newBlog.author} added.`
        )
        setTimeout(() => setOperationMessage(null), 5000)
      })
      .catch((error) => {
        setWarningMessage(error.response.data.error)
        setTimeout(() => setWarningMessage(null), 5000)
      })
  }
  const addLike = (blogObject) => {
    const updatedBlogObject = { ...blogObject, likes: blogObject.likes + 1 }
    blogService
      .update(updatedBlogObject)
      .then((updatedBlog) => {
        const targetBlog = blogs.find((blog) => blog.id === updatedBlog.id)
        targetBlog.likes++
        setBlogs([...blogs])
        setOperationMessage(`You like the blog "${targetBlog.title}."`)
        setTimeout(() => setOperationMessage(null), 5000)
      })
      .catch((error) => {
        setWarningMessage(error.response.data.error)
        setTimeout(() => setWarningMessage(null), 5000)
      })
  }
  const removeBlog = (blog) => {
    blogService.remove(blog.id).then(() => {
      const updatedBlogs = blogs.filter((eachBlog) => {
        if (eachBlog.id !== blog.id) return eachBlog
      })
      setBlogs(updatedBlogs)
      setOperationMessage(`You have deleted the blog "${blog.title}".`)
      setTimeout(() => setOperationMessage(null), 5000)
    })
      .catch((error) => {
        setWarningMessage(error.response.data.error)
        setTimeout(() => setWarningMessage(null), 5000)
      })
  }

  useEffect(() => {
    const loggedinUser = localStorage.getItem(strLoggedinUser)
    if (loggedinUser) {
      const user = JSON.parse(loggedinUser)
      setUser(user)
      blogService.setUserToken(user.token)
      blogService.getAll().then((blogs) => setBlogs(blogs))
    }
  }, [])

  console.log(user)

  return (
    <div>
      <h1>{user === null ? 'Log in to application' : 'Blogs'}</h1>
      <Message.OperationMessage operationMessage={operationMessage} />
      <Message.WarningMessage warningMessage={warningMessage} />
      {user === null ? (
        <LoginPage
          username={username}
          pwd={pwd}
          onChangeUsername={onChangeUsername}
          onChangePwd={onChangePwd}
          onClickLogin={onClickLogin}
        />
      ) : (
        <BlogsPage
          blogs={blogs}
          user={user}
          onClickLogout={onClickLogout}
          createBlog={createBlog}
          addLike={addLike}
          removeBlog={removeBlog}
        />
      )}
    </div>
  )
}

export default App
