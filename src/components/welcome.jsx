import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Welcome extends Component {
    state = {  } 
    render() { 
        return (
            <div className="container mt-5">
              <div className="row justify-content-md-center">
                <div className="col-md-auto text-center">
                    <h1>Welcome to Our Website</h1>
                    <p>
                    Hi, welcome to our website! You will need to register before continuing.
                    </p>
                    <p>
                    If you are already registered, you can log in using the buttons below.
                    </p>    
                  <div className="mt-4">
                    <Link to="/register">
                      <button className="btn btn-primary mr-2 m-2">Register</button>
                    </Link>
                    <Link to="/login">
                      <button className="btn btn-secondary m-2">Login</button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
    }
}
 
export default Welcome;