import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    errorMsg: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  validateUserAttempt = async event => {
    const {username, password} = this.state
    event.preventDefault()
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const loginResponse = await fetch('https://apis.ccbp.in/login', options)
    const data = await loginResponse.json()
    if (loginResponse.ok === true) {
      // console.log('We got JWT Token')
      Cookies.set('jwt_token', data.jwt_token, {expires: 10})
      this.setState({username: '', password: '', errorMsg: ''})
      const {history} = this.props
      history.replace('/')
    } else {
      this.setState({errorMsg: data.error_msg})
    }
  }

  render() {
    const {username, password, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-container">
        <div className="login-card">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="login-card-website-logo"
          />
          <form onSubmit={this.validateUserAttempt}>
            <label htmlFor="username" className="login-form-label">
              USERNAME
            </label>
            <input
              type="text"
              id="username"
              className="login-input-field"
              placeholder="Username"
              onChange={this.onChangeUsername}
              value={username}
            />
            <label htmlFor="password" className="login-form-label">
              PASSWORD
            </label>
            <input
              type="password"
              id="password"
              className="login-input-field"
              placeholder="Password"
              onChange={this.onChangePassword}
              value={password}
            />
            <button type="submit" className="login-form-btn">
              Login
            </button>
            <p className="login-error-msg">
              {errorMsg === '' ? '' : `*${errorMsg}`}
            </p>
          </form>
        </div>
      </div>
    )
  }
}
export default Login
