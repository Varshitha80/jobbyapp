import {Component} from 'react'
import {Link} from 'react-router-dom'
import {useNavigate} from 'react-router-dom'

import './index.css'

class Signup extends Component {
  state = {username: '', password: '',email:'',errormsg: '', showsubmiterror: false}

  onsubmitsuccess = () => {
    const {navigate} = this.props
    navigate('/login')
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

  onchangeemail = event => {
    this.setState({email:event.target.value})
  }

  onsubmitform = async event => {
    event.preventDefault();
    const {username, password, email} = this.state;
    const userdetails = {username, password, email};
    const url = '/api/register';
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userdetails),
    };
    const response = await fetch(url, options);
    const data = await response.json();
    if (response.ok) {
      this.onsubmitsuccess();
    } else {
      this.onsubmitfailure(data.message);
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

  renderemail = () => {
    const {email} = this.state
    return (
      <>
        <label htmlFor="email" className="labelelement10">
          EMAIL
        </label>
        <input
          type="email"
          placeholder="Email"
          id="email"
          className="inputelement10"
          value={email}
          onChange={this.onchangeemail}
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
          <div className='inputcon10'>{this.renderemail()}</div>
          <div className="inputcon10">{this.renderpassword()}</div>
          <button type="submit" className="loginbutton">
            Signup
          </button>
          {showsubmiterror && <p className="error">*{errormsg}</p>}
          <div className='signupcon'>
            <p className='signuppara'>Already have an account?</p>
            <Link to="/login" className='signuptext'>Login</Link>
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

export default withNavigate(Signup);
