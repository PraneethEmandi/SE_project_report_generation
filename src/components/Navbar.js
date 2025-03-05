import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; // Add styles separately

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">Student Platform</div>
      <div className="nav-links">
        <Link to="/">About</Link>
        <Link to="/">Features</Link>
        <Link to="/">Contact</Link>
      </div>
    </nav>
  );
};

export default Navbar;
