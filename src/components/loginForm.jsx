import axios from 'axios';
import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import config from '../config.json';
import { toast } from 'react-toastify';

const ApiUrl = `${config.domain}/users/sign_in`;

class LoginForm extends Component {
  state = { 
    user: {
      email: "",
      password: ""
    },
    redirect: false,
    message: ""
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      user: { ...this.state.user, [name]: value }
    });
  }
  
  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(ApiUrl, { user: this.state.user });
      console.log(response.headers); // Log the entire headers object

      // Get the token from the headers
      let token = response.headers['Authorization'] || response.headers['authorization']; 

      if (token) {
        // Remove "Bearer " prefix if it exists
        token = token.replace('Bearer ', '');
        localStorage.setItem('authToken', token); // Store the token
        toast.info("Logged In successfully")
        this.setState({ message: "Login successful!", redirect: true });
      } else {
        this.setState({ message: "Login successful, but no token found!" });
      }

      console.log(token); // This should log the cleaned token
    } catch (error) {
      this.setState({ message: "Login failed. Please try again." });
    }
  }

  render() { 
    if (this.state.redirect) {
      return <Navigate to="/home" />;
    }

    return (
      <div className="container mt-5">
        <h1 className="text-center mb-4">Login</h1>
        <form onSubmit={this.handleSubmit} className="border p-4 rounded bg-light">
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
          <button type="submit" className="btn btn-primary w-100 mt-3">Login</button>
        </form>
        {this.state.message && <p className="text-center mt-3">{this.state.message}</p>}
      </div>
    );
  }
}

export default LoginForm;
