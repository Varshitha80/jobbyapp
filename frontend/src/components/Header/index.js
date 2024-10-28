import {Link, useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie'
import {BsFillBriefcaseFill, BsHouseFill} from 'react-icons/bs'
import './index.css'

const Header = () => {
  const navigate = useNavigate();

  const onclicklogout = () => {
    Cookies.remove('jwt_token');
    navigate('/login');
  };

  return (
    <nav className="headercon">
      <div className="headercon2">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="logoimage"
          />
        </Link>
        <ul className="listcon">
          <Link to="/" className="listtext">
            <li>Home</li>
          </Link>
          <Link to="/jobs" className="listtext">
            <li>Jobs</li>
          </Link>
        </ul>
        <button type="button" onClick={onclicklogout} className="buttondesktop">
          Logout
        </button>
      </div>
      <div className="headercon1">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="logoimage"
          />
        </Link>

        <ul className="listcon">
          <Link to="/">
            <li>
              <BsHouseFill className="suitimage" />
            </li>
          </Link>
          <Link to="/jobs">
            <li>
              <BsFillBriefcaseFill className="suitimage" />
            </li>
          </Link>
        </ul>
        <button type="button" onClick={onclicklogout} className="buttonmobile">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-log-out-img.png"
            alt="logout icon"
            className="smallimage"
          />
        </button>
      </div>
    </nav>
  )
}

export default Header
