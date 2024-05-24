import logo from './logo.svg';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import React, { Component } from 'react';
import { Routes , Route } from 'react-router-dom';
import Welcome from './components/welcome';
import RegistrationForm from './components/registerationForm';
import LoginForm from './components/loginForm';
import NavBar from './components/navbar';
import Profile from './components/profile';
import EditUserForm from './components/editUser';
import NotFound from './components/notFound';
import PrivateRoute from './components/privateRoute';
import Home from './components/home';

function App() {
  return (
    <React.Fragment>
      <ToastContainer />
      <NavBar/>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/home" element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        } />
        <Route path="/profile" element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        } />
        <Route path="/editUser" element={
          <PrivateRoute>
            <EditUserForm />
          </PrivateRoute>
        } />
        <Route path="*" element={
          <PrivateRoute>
            <NotFound />
          </PrivateRoute>
        } />
      </Routes>
    </React.Fragment>
  );
}

export default App;
