const LoginPage = ({ username, pwd, onChangeUsername, onChangePwd, onClickLogin }) => {
    return (
      <div>
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

  export default LoginPage