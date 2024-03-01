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
          <a href="https://github.com/AbhinavUtkarsh" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faGithub} />
          </a>
          <a href="https://www.linkedin.com/in/abhinavutkarsh" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
          <a href="mailto:abhinav.utkarsh@tum.de">
            <FontAwesomeIcon icon={faEnvelope} />
          </a>
        </div>
        <div className="photo-wrapper">
          <img src={profilePic} alt="Abhinav Utkarsh" className="profile-photo"/>
        </div>
        <p className="intro-text">
        Currently, a master's candidate at the Technical University of Munich, majoring in Robotics, Cognition, and Intelligence, I am interested in 3D computer vision and deep learning, specifically in 3D shape completion. This forms the cornerstone of my current master's thesis work, hoping to contribute to the next generation of spatial computing. Moreover, I am interested in developing real-time models optimized explicitly for mobile silicon and deploying them to a larger audience. Beyond academics, I appreciate music from Coldplay and learning languages.
        </p>
      </header>
       <section className="recent-projects">
        <h2 className="section-title">Recent Projects</h2>
        {/* Content for projects would go here */}
      </section>
    </div>
  );
}

export default App;
