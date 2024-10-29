import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to our gym app!</h1>
      <div className="button-container">
        <Link to="/one-rep-max" className="link">
          <button className="action-button">One Rep Max Estimator</button>
        </Link>
        <Link to="/exercise-manager" className="link">
          <button className="action-button">Exercise Manager</button>
        </Link>
        <Link to="/history" className="link">
          <button className="action-button">History</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
