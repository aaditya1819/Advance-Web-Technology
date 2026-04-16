import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-brand">
        <h2>🎓 StudentMgmt</h2>
      </div>
      <ul className="nav-links">
        <li>
          <NavLink to="/" className={({ isActive }) => isActive ? "active-link" : ""}>Home</NavLink>
        </li>
        <li>
          <NavLink to="/register" className={({ isActive }) => isActive ? "active-link" : ""}>Register</NavLink>
        </li>
        <li>
          <NavLink to="/login" className={({ isActive }) => isActive ? "active-link" : ""}>Login</NavLink>
        </li>
        <li>
          <NavLink to="/contact" className={({ isActive }) => isActive ? "active-link" : ""}>Contact</NavLink>
        </li>
        <li>
          <NavLink to="/about" className={({ isActive }) => isActive ? "active-link" : ""}>About</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
