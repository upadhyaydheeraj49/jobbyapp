import {IoMdHome} from 'react-icons/io'
import {BsBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'

import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const onLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <>
      <nav className="navbar-lg">
        <Link to="/" className="nav-link">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="nav-web-logo"
          />
        </Link>
        <ul className="nav-menu-container">
          <li className="nav-menu-item">
            <Link to="/" className="nav-menu-link">
              Home
            </Link>
          </li>
          <li className="nav-menu-item">
            <Link to="/jobs" className="nav-menu-link">
              Jobs
            </Link>
          </li>
        </ul>
        <button className="nav-logout-btn" onClick={onLogout} type="button">
          Logout
        </button>
      </nav>
      <nav className="navbar-sm">
        <Link to="/" className="nav-link">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="nav-web-logo-sm"
          />
        </Link>

        <ul className="nav-sm-menu-container">
          <li>
            <Link to="/" className="nav-link">
              <IoMdHome className="nav-menu-icon" />
            </Link>
          </li>
          <li>
            <Link to="/jobs" className="nav-link">
              <BsBriefcaseFill className="nav-menu-icon" />
            </Link>
          </li>
          <li>
            <button
              className="nav-sm-menu-btn"
              onClick={onLogout}
              type="button"
            >
              <FiLogOut className="nav-menu-icon" />
            </button>
          </li>
        </ul>
      </nav>
    </>
  )
}
export default withRouter(Header)
