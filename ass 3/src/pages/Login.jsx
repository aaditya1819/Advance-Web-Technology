import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setCredentials({...credentials, [e.target.name]: e.target.value});
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!credentials.email || !credentials.password) {
      setError("Please fill out both email and password.");
      return;
    }
    
    // Simulate API Login
    setSuccess(`Successfully logged in as ${credentials.email}`);
    setCredentials({email: '', password: ''});
  };

  return (
    <div className="page-container flex-center">
      <div className="form-card">
        <h2>Student Login</h2>
        {error && <div className="alert-error">{error}</div>}
        {success && <div className="alert-success">{success}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input 
              type="text" 
              name="email" 
              value={credentials.email} 
              onChange={handleChange} 
              placeholder="Enter Email"
            />
          </div>
          
          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              name="password" 
              value={credentials.password} 
              onChange={handleChange} 
              placeholder="Enter Password"
            />
          </div>

          <button type="submit" className="btn btn-primary btn-block">Login Now</button>
        </form>
        <p className="form-footer">
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
