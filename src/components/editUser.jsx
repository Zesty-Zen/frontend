import axios from 'axios';
import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';  // Import Navigate from react-router-dom

class EditUserForm extends Component {
  state = {
    user: {
      email: '',
      username: '',
      profile_picture: null,
      password: '',
      password_confirmation: '',
      current_password: ''
    },
    message: '',
    redirect: false // State to handle redirection
  };

  async componentDidMount() {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) throw new Error("No authentication token found.");

      const response = await axios.get("http://localhost:3000/profile", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      this.setState({ user: response.data });
    } catch (error) {
      console.error("Error fetching user information:", error.message);
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      user: { ...this.state.user, [name]: value }
    });
  };

  handleFileChange = (e) => {
    this.setState({
      user: { ...this.state.user, profile_picture: e.target.files[0] }
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('authToken');

    const formData = new FormData();
    formData.append('user[email]', this.state.user.email);
    formData.append('user[username]', this.state.user.username);
    if (this.state.user.profile_picture) {
      formData.append('user[profile_picture]', this.state.user.profile_picture);
    }
    if (this.state.user.password) {
      formData.append('user[password]', this.state.user.password);
      formData.append('user[password_confirmation]', this.state.user.password_confirmation);
    }
    formData.append('user[current_password]', this.state.user.current_password);

    try {
      await axios.put("http://localhost:3000/users", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      this.setState({ message: "Profile updated successfully!", redirect: true });
    } catch (error) {
      const errorMessage = error.response?.data?.status?.errors?.join(', ') || "Profile update failed. Please try again.";
      this.setState({ message: errorMessage });
      console.error("Error updating profile:", errorMessage);
    }
  };

  render() {
    if (this.state.redirect) {
      return <Navigate to="/profile" />; // Redirect to profile if update is successful
    }

    return (
      <div className="container mt-5">
        <h1 className="mb-4 text-center">Edit Profile</h1>
        <p className="text-center text-muted">Only edit the fields you want to update. Current password is required for any updates.</p>
        <form onSubmit={this.handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Username:</label>
            <input
              type="text"
              className="form-control"
              name="username"
              value={this.state.user.username}
              onChange={this.handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email:</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={this.state.user.email}
              onChange={this.handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Profile Picture:</label>
            <input
              type="file"
              className="form-control"
              name="profile_picture"
              onChange={this.handleFileChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Current Password:</label>
            <input
              type="password"
              className="form-control"
              name="current_password"
              value={this.state.user.current_password}
              onChange={this.handleChange}
              required
            />
            <small className="form-text text-muted">
              Current password is required to update your profile.
            </small>
          </div>
          <div className="mb-3">
            <label className="form-label">New Password:</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={this.state.user.password}
              onChange={this.handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password Confirmation:</label>
            <input
              type="password"
              className="form-control"
              name="password_confirmation"
              value={this.state.user.password_confirmation}
              onChange={this.handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">Update Profile</button>
        </form>
        {this.state.message && <p className="mt-3">{this.state.message}</p>}
      </div>
    );
  }
}

export default EditUserForm;
