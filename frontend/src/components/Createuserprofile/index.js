import React, { Component } from 'react';
import Cookies from 'js-cookie';
import { Navigate,useNavigate } from 'react-router-dom';
import './index.css';

class CreateUserProfile extends Component {
  state = {
    profile_image_url: '',
    username: '',
    short_bio: '',
    showsubmiterror: false,
    errormsg: '',
  };

  onChangeProfileImage = (event) => {
    this.setState({ profile_image_url: event.target.value });
  };

  onChangeUsername = (event) => {
    this.setState({ username: event.target.value });
  };

  onChangeShortBio = (event) => {
    this.setState({ short_bio: event.target.value });
  };

  onSubmitForm = async (event) => {
    event.preventDefault();
    const { profile_image_url, username, short_bio } = this.state;
    const jwtToken = Cookies.get('jwt_token');

    const profileData = {
      profile_image_url,
      username,
      short_bio,
    };

    const url = '/api/profile'; // Update to your actual API endpoint
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(profileData),
    };

    const response = await fetch(url, options);
    if (response.ok) {
      // Profile created successfully, redirect to home page
      const {navigate} = this.props
      navigate('/');
    } else {
      const data = await response.json();
      this.setState({ errormsg: data.message, showsubmiterror: true });
    }
  };

  render() {
    const { showsubmiterror, errormsg } = this.state;
    const jwttoken = Cookies.get('jwt_token');
    if (jwttoken === undefined) {
      return <Navigate to="/login" />;
    }
    return (
      <div className="maincon">
        <form onSubmit={this.onSubmitForm} className="formcon">
          <div className="inputcon10">
            <label htmlFor="profile_image_url" className="labelelement10">
              Profile Image URL
            </label>
            <input
              type="text"
              id="profile_image_url"
              placeholder="Profile Image URL"
              className="inputelement10"
              onChange={this.onChangeProfileImage}
            />
          </div>
          <div className="inputcon10">
            <label htmlFor="username" className="labelelement10">
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="Username"
              className="inputelement10"
              onChange={this.onChangeUsername}
            />
          </div>
          <div className="inputcon10">
            <label htmlFor="short_bio" className="labelelement10">
              Short Bio
            </label>
            <textarea
              id="short_bio"
              placeholder="Short Bio"
              className="inputelement10"
              onChange={this.onChangeShortBio}
            />
          </div>
          <button type="submit" className="loginbutton">
            Create Profile
          </button>
          {showsubmiterror && <p className="error">*{errormsg}</p>}
        </form>
      </div>
    );
  }
}

const withNavigate = (Component) => {
    return (props) => {
      const navigate = useNavigate();
      return <Component {...props} navigate={navigate} />;
    };
  };
  
  export default withNavigate(CreateUserProfile);
