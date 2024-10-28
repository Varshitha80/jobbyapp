import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link,Navigate,useNavigate} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', errormsg: '', showsubmiterror: false}

  onsubmitsuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 2, path: '/'})
    this.checkuserprofile();
  }

  onsubmitfailure = errorMsg => {
    this.setState({errormsg: errorMsg, showsubmiterror: true})
  }

  onchangepassword = event => {
    this.setState({password: event.target.value})
  }

  onchangeusername = event => {
    this.setState({username: event.target.value})
  }

  onsubmitform = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userdetails = {username, password}
    const url = 'http://localhost:5000/api/login'
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userdetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      this.onsubmitsuccess(data.jwt_token)
    } else {
      this.onsubmitfailure(data.message)
    }
  }

  checkuserprofile = async () => {
    const jwtToken = Cookies.get('jwt_token');
    const {navigate} = this.props
    const url = "http://localhost:5000/api/profile";
    const options = {
      method:'GET',
      headers:{
        'Authorization':`Bearer ${jwtToken}`,
      }
    };

    const response = await fetch(url,options);
    if(response.ok){
      navigate("/");
    }
    else{
      navigate('/create-user-profile');
    }
  }

  renderusername = () => {
    const {username} = this.state
    return (
      <>
        <label htmlFor="username" className="labelelement10">
          USERNAME
        </label>
        <input
          type="text"
          placeholder="Username"
          id="username"
          className="inputelement10"
          value={username}
          onChange={this.onchangeusername}
        />
      </>
    )
  }

  renderpassword = () => {
    const {password} = this.state

    return (
      <>
        <label htmlFor="password" className="labelelement10">
          PASSWORD
        </label>
        <input
          type="password"
          className="inputelement10"
          placeholder="Password"
          id="password"
          value={password}
          onChange={this.onchangepassword}
        />
      </>
    )
  }

  render() {
    const {showsubmiterror, errormsg} = this.state
    const jwttoken = Cookies.get('jwt_token')
    if (jwttoken !== undefined) {
      return <Navigate to="/" />
    }
    return (
      <div className="maincon">
        <form onSubmit={this.onsubmitform} className="formcon">
          <div className="imagecon">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="logoimage"
            />
          </div>
          <div className="inputcon10">{this.renderusername()}</div>
          <div className="inputcon10">{this.renderpassword()}</div>
          <button type="submit" className="loginbutton">
            Login
          </button>
          {showsubmiterror && <p className="error">*{errormsg}</p>}
          <div className='signupcon'>
            <p className='signuppara'>Don't have an account?</p>
            <Link to="/register" className='signuptext'>Sign up</Link>
          </div>
        </form>
      </div>
    )
  }
}

const withNavigate = (Component) => {
  return (props)=> {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />
  }
}

export default withNavigate(Login);
