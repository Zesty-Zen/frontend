import axios from 'axios';
import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';

import config from '../config.json'
import { toast } from 'react-toastify';

const ApiUrl = `${config.domain}/users`;

class RegistrationForm extends Component {
  state = { 
    user: {
      email: "",
      password: "",
      username: "",
      profile_picture: null
    },
    redirect: false,
    message: ""
  }

  handleChange = (e) => {
    const { name, value, files } = e.target;
    this.setState({
      user: { ...this.state.user, [name]: (name === 'profile_picture' ? files[0] : value) }
    });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('user[email]', this.state.user.email);
      formData.append('user[password]', this.state.user.password);
      formData.append('user[username]', this.state.user.username);
      formData.append('user[profile_picture]', this.state.user.profile_picture);

      await axios.post(ApiUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      toast.info("Registration Successful. You can log in now.")
      this.setState({ message: "Registration successful!", redirect: true });
    } catch (error) {
      this.setState({ message: "Registration failed. Please try again." });
    }
  }

  render() { 
    if (this.state.redirect) {
      return <Navigate to="/login" />;
    }

    return (
      <div className="container mt-5">
        <h1 className="text-center mb-4">Register</h1>
        <form onSubmit={this.handleSubmit} className="border p-4 rounded bg-light">
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username:</label>
            <input 
              type="text" 
              name="username" 
              value={this.state.user.username} 
              onChange={this.handleChange} 
              className="form-control"
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email:</label>
            <input 
              type="email" 
              name="email" 
              value={this.state.user.email} 
              onChange={this.handleChange} 
              className="form-control"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password:</label>
            <input 
              type="password" 
              name="password" 
              value={this.state.user.password} 
              onChange={this.handleChange} 
              className="form-control"
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="profile_picture" className="form-label">Profile Picture:</label>
            <input 
              type="file" 
              name="profile_picture" 
              onChange={this.handleChange} 
              className="form-control"
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 mt-3">Register</button>
        </form>
        {this.state.message && <p className="text-center mt-3">{this.state.message}</p>}
      </div>
    );
  }
}

export default RegistrationForm;
