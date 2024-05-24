import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import config from '../config.json';

const ApiUrl = `${config.domain}/users/sign_out`;

class NavBar extends Component {
  state = {
    user: null, // Initialize user state to null
  };

  async componentDidMount() {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) throw new Error("No authentication token found.");

      const response = await axios.get(`${config.domain}/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      this.setState({ user: response.data }); // Set the user state with the fetched data
    } catch (error) {
      console.error("Error fetching user information:", error.message);
    }
  }

  handleLogout = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      alert("No authentication token found.");
      return;
    }
    try {
      await axios.delete(ApiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      localStorage.removeItem('authToken'); // Clear the token
      alert("Logout successful!");
      this.setState({ user: null }); // Clear the user state
    } catch (error) {
      alert("Logout failed. Please try again.");
    }
  };

  render() {
    const { user } = this.state;
    const profilePictureUrl = user && user.profile_picture_url ? user.profile_picture_url : '';

    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container d-flex flex-row">
          {/* "Companily" brand on the left */}
          <a className="navbar-brand" href="#">Companily</a>

          {/* Collapse menu for smaller screens */}
          <div className="collapse navbar-collapse d-flex justify-content-end">
            <div className="navbar-nav ml-auto d-flex flex-wrap"> {/* Added flex-wrap */}
              {/* Logged-in user elements */}
              {user && (
                <>
                  <Link className="nav-link" to='/home'>Home</Link>
                  <span className="navbar-text mr-3">
                    <Link to='/profile'>{user.username}</Link>
                  </span>
                  <img src={profilePictureUrl} alt="Profile" style={{ height: "50px", width: "50px", borderRadius: "50%", marginRight: "10px" }} />
                  <button className="btn btn-outline-danger" type="button" onClick={this.handleLogout}>Logout</button>
                </>
              )}

              {/* Not logged-in elements */}
              {!user && (
                <>
                  <Link className="nav-link" to='/register'>Register</Link>
                  <Link className="nav-link" to='/login'>Login</Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default NavBar;
