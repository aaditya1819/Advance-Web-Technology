import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="page-container home-page">
      <div className="hero-section">
        <h1>Welcome to the Student Management System</h1>
        <p>A streamlined portal where students and administration seamlessly connect. Manage your modern academic journey easily.</p>
        <div className="action-buttons">
          <Link to="/register" className="btn btn-primary">Enroll Now</Link>
          <Link to="/login" className="btn btn-secondary">Student Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
