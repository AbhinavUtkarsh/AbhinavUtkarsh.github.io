import React, { useState, useEffect } from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import profilePic from './images/profile.png';
import myicon from './images/myicon.png';
import ProjectList from './ProjectList';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import ProjectsData from './Projects.json';
import IntroData from './Intro.json';
import ROS2 from './images/ROS_2.png'; //image imports from project list json is not working, hence importing here

function App() {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setProjects(ProjectsData.slice(0, 3));
    document.title = "Abhinav";
  }, []);

  const handleViewMoreClick = () => {
    navigate('/projects');
    window.scrollTo(0, 0);
  };

  // If the browser is Safari
  const isSafari = () => {
    const ua = navigator.userAgent.toLowerCase();
    return ua.indexOf('safari') !== -1 && ua.indexOf('chrome') === -1;
  };

  return (
    <div className="App">
      <header className="header">
        <link rel="icon" type="image/png" href={myicon} />
        <div className="devanagari-wrapper">
          {/* Render static text for Safari */}
          {isSafari() ? (
            <span className="devanagari-text static">नमस्ते</span>
          ) : (
            <svg id="namasteSvg" width="500" height="200" xmlns="http://www.w3.org/2000/svg">
              <text x="0" y="150" className="letter">
                <tspan className="letter" style={{ animationDelay: '0s' }}>न</tspan>
                <tspan className="letter" style={{ animationDelay: '1s' }}>म</tspan>
                <tspan className="letter" style={{ animationDelay: '2s' }}>स्ते</tspan>
              </text>
            </svg>
          )}
        </div>
        <h1 className="name">ABHINAV</h1>
        <h1 className="name2"><br />UTKARSH</h1>
        <div className="icon-container">
          <a href="https://github.com/AbhinavUwtkarsh" target="_blank" rel="noopener noreferrer">
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
          <img src={profilePic} alt="Abhinav Utkarsh" className="profile-photo" />
        </div>
        <p className="intro-text">{IntroData.introText}</p>
      </header>
      <section className="recent-projects">
        <h2 className="section-title">Recent Projects</h2>
        <div className="projects-container">
          {projects.map((project, index) => (
            <a href={project.url} target="_blank" rel="noopener noreferrer" key={index} className="project-box-link">
              <div className={`project-box ${!project.image ? 'no-image' : ''}`}>
                <div className="project-content">
                  <h3>{project.title}</h3>
                  <p className="institute">{project.institute}</p>
                  <p className='description'>{project.description}</p>
                  <div className="keywords">{project.keywords.join(', ')}</div>
                </div>
                {project.title === 'Autonomous Drones with ROS' ? (
                  <div
                    className="project-image-placeholder"
                    style={{
                      backgroundImage: `url(${ROS2})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  />
                ) : (
                  project.image && (
                    <div
                      className="project-image-placeholder"
                      style={{
                        backgroundImage: `url(${project.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }}
                    />
                  )
                )}
              </div>
            </a>
          ))}
        </div>
        <button onClick={handleViewMoreClick} className="view-more-btn">View More</button>
      </section>
      <footer className="footer">
        © Abhinav Utkarsh 2024
      </footer>
    </div>
  );
}

function AppWrapper() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/projects" element={<ProjectList />} />
      </Routes>
    </Router>
  );
}

export default AppWrapper;
