import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import config from '../config.json';

class Profile extends Component {
  state = {
    user: null // Initialize user state to null
  };

  async componentDidMount() {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) throw new Error("No authentication token found.");

      const response = await axios.get(`${config.domain}/profile`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      this.setState({ user: response.data }); // Set the user state with the fetched data
    } catch (error) {
      console.error("Error fetching user information:", error.message);
    }
  }

  render() {
    const { user } = this.state;

    return (
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-8 text-center">
            <h1 className="mb-4">Profile</h1>
            {user ? (
              <div className="card">
                <div className="card-body">
                  {user.profile_picture_url && (
                    <img
                      src={user.profile_picture_url}
                      alt="Profile"
                      className="rounded-circle mb-3"
                      style={{ height: "150px", width: "150px", objectFit: "cover" }}
                    />
                  )}
                  <h2 className="card-title">{user.username}</h2>
                  <p className="card-text">{user.email}</p>
                  <Link to="/editUser" className="btn btn-primary mt-3">
                    Update Profile
                  </Link>
                </div>
              </div>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
