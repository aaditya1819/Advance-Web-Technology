import React from 'react';

const About = () => {
  return (
    <div className="page-container">
      <div className="about-wrapper">
        <h2>About the System</h2>
        <div className="about-content">
          <p>
            The <strong>Student Management System</strong> is a comprehensive web-based application built designed 
            to assist educational institutions in managing student data and activities.
          </p>
          <h3>Our Mission</h3>
          <p>
            We aim to simplify the digital boundaries between administrative staff workflows and students, 
            allowing for clear communication and tracking of modern educational records.
          </p>
          <h3>Core Technologies</h3>
          <ul className="tech-list">
            <li>React JS (Functional Components)</li>
            <li>React Router DOM (Routing & Navigation)</li>
            <li>CSS3 (Variables & Animations)</li>
            <li>Vite Tooling</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;
