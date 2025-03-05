import React from "react";
import { Link } from "react-router-dom";
import "./Navbar-home.css"; // Add styles separately

const Navbar = () => {
  return (
    <nav className="navbarr">
      <div className="logoo">Student Platform</div>
      <div className="nav-links">
        <Link to="/">About</Link>
        <Link to="/">Features</Link>
        <Link to="/">Contact</Link>
        <Link to="/login" className="login-btn">Login / Signup</Link>
      </div>
    </nav>
  );
};

export default Navbar;
