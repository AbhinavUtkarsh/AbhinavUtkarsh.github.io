import React from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import profilePic from './images/profile.png';

function App() {
  return (
    <div className="App">
      <header className="header">
        <h1 className="name">ABHINAV</h1>
        <h1 className="name2"><br/>UTKARSH</h1>
        <div className="icon-container">
          <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faGithub} />
          </a>
          <a href="https://www.linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
          <a href="mailto:your.email@example.com">
            <FontAwesomeIcon icon={faEnvelope} />
          </a>
        </div>
        <img src={profilePic} alt="Abhinav Utkarsh" className="profile-photo"/>
        <p className="intro-text">
        Currently, a master's candidate at the Technical University of Munich, majoring in Robotics, Cognition, and Intelligence, I am interested in 3D computer vision and deep learning, specifically in 3D shape completion. This forms the cornerstone of my current master's thesis work, hoping to contribute to the next generation of spatial computing. Moreover, I am interested in developing real-time models optimized explicitly for mobile silicon and deploying them to a larger audience. Beyond academics, I appreciate music from Coldplay and learning languages.
        </p>
      </header>
    </div>
  );
}

export default App;
