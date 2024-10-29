import React from 'react';
import { Link } from 'react-router-dom';
import'./Header.css'
const Header: React.FC = () => {
  return (
    <header className="header">
      <h1 className="header-title">Gym App</h1>
      <nav className="nav">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/one-rep-max" className="nav-link">One Rep Max Estimator</Link>
        <Link to="/exercise-manager" className="nav-link">Exercise Manager</Link>
        <Link to="/history" className="nav-link">History</Link>
      </nav>
    </header>
  );
}

export default Header;
