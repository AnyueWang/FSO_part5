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
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [operationMessage, setOperationMessage] = useState(null)
  const [warningMessage, setWarningMessage] = useState(null)
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
        setOperationMessage('You have been logged in.')
        setTimeout(() => setOperationMessage(null), 5000)
      })
      .catch(error => {
        setWarningMessage(error.response.data.error)
        setTimeout(() => setWarningMessage(null), 5000)
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
    setOperationMessage('You have been logged out.')
    setTimeout(() => setOperationMessage(null), 5000)
  }
  const onClickCreate = (event) => {
    event.preventDefault()
    blogService
      .create({ title, author, url })
      .then(newBlog => {
        const updatedBlogs = blogs.concat(newBlog)
        setBlogs(updatedBlogs)
        setOperationMessage(`A new Blog "${title}" by ${author} added.`)
        setTimeout(() => setOperationMessage(null), 5000)
      })
      .catch(error => {
        setWarningMessage(error.response.data.error)
        setTimeout(() => setWarningMessage(null), 5000)
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
      <h1>{user === null ? 'Log in to application' : 'Blogs'}</h1>
      <Message.OperationMessage operationMessage={operationMessage} />
      <Message.WarningMessage warningMessage={warningMessage} />
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
            newBlogInfo={{ title, author, url }}
            onChangeNewBlogInfo={{ onChangeTitle, onChangeAuthor, onChangeUrl }}
            onClickLogout={onClickLogout}
            onClickCreate={onClickCreate}
          />)
      }
    </div>
  )
}

export default App