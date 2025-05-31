import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import './ProjectList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import profilePic from './images/profile.png';
import myicon from './images/myicon.png';
import ProjectsData from './Projects.json';
import IntroData from './Intro.json';
import ROS2 from './images/ROS_2.png'; //image imports from project list json is not working, hence importing here
import EMOGA from './images/EMOGA.png'; //image imports from project list json is not working, hence importing here
import FadeInPageWrapper from './FadeInPageWrapper';

function debounce(func, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

function AppDe() {
  const [projects, setProjects] = useState([]);
  const [language, setLanguage] = useState('DE');
  const navigate = useNavigate();

  useEffect(() => {
    setProjects(ProjectsData.slice(0, 3));
    document.title = "Abhinav";
  }, []);

  const handleViewMoreClick = () => {
    navigate('/projects');
    window.scrollTo(0, 0);
  };

  const debouncedHandleViewMoreClick = debounce(handleViewMoreClick, 300);

  // If the device is mobile
  const isMobile = () => {
    return /Mobi|Android/i.test(navigator.userAgent);
  };

  // Toggle between languages
  const toggleLanguage = () => {
    setLanguage(language === 'DE' ? 'DE' : 'EN');

    if (language === 'EN') {
      navigate('/App_de');
    } else {
      navigate('/');
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', function() {
      var button = document.querySelector('.language-toggle-btn');
      if (button) {
        if (window.scrollY > 175) { 
          button.classList.add('hidden');
        } else {
          button.classList.remove('hidden');
        }
      }
    });
  
    return () => {
      window.removeEventListener('scroll', () => {});
    };
  }, []);
  
    const encodeEmail = () => {
      const usernameParts = ['abhinav', 'utkarsh'];
      const domainParts = ['tum', 'de'];
      const username = usernameParts.join('.');
      const domain = domainParts.join('.');
      return `mailto:${username}@${domain}`;
    };
    
    const handleEmailClick = () => {
      window.location.href = encodeEmail();
    };

  const debouncedToggleLanguage = debounce(toggleLanguage, 300);

  return (
    <FadeInPageWrapper>
      <div className="App">
        <header className="header">
          {!isMobile() && <link rel="icon" type="image/png" href={myicon} />}
          <div className="hey-wrapper">
            <svg width="500" height="200" xmlns="http://www.w3.org/2000/svg">
              <text  x="10" y="150" className='hey-text'>Servus!</text>
            </svg>
          </div>
          <h1 className="name">ABHINAV</h1>
          <h1 className="name2"><br />UTKARSH</h1>
          <div className="icon-container">
            <a href="https://github.com/AbhinavUtkarsh" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faGithub} />
            </a>
            <a href="https://www.linkedin.com/in/abhinavutkarsh" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
            {/* eslint-disable-next-line */}
            <a href="#" onClick={handleEmailClick}>
              <FontAwesomeIcon icon={faEnvelope} />
            </a>
          </div>
          <div className="photo-wrapper">
            <img src={profilePic} alt="Abhinav Utkarsh" className="profile-photo" />
          </div>
          <p className="intro-text">{IntroData.introText_DE}</p>
          <button className="language-toggle-btn" onClick={debouncedToggleLanguage} onTouchStart={debouncedToggleLanguage}>
            {language}
          </button>
        </header>
        <section className="recent-projects">
          <h2 className="section-title">Aktuelle Projekte</h2>
          <div className="projects-container">
            {projects.map((project, index) => (
              <a href={project.url} target="_blank" rel="noopener noreferrer" key={index} className="project-box-link">
                <div className={`project-box ${!project.image ? 'no-image' : ''}`}>
                  <div className="project-content">
                    <h3>{project.title}</h3>
                    <p className="team">{project.team}</p>
                    <p className="institute">{project.instituteDE}</p>
                    <p className='description'>{project.description}</p>
                    <div className="keywords">{project.keywords.join(', ')}</div>
                  </div>
                {/* EMO-GA thumbnail */}
                {project.title === 'Emotion-Driven Editing of GaussianAvatars' && (
                <div className="project-image-placeholder">
                <img src={EMOGA} alt={project.title} className="project-image" />
                </div>
                )}
                {/* ROS thumbnail */}
                {project.title === "Autonomous Drones with ROS" && (
                <div className="project-image-placeholder">
                <img src={ROS2} alt={project.title} className="project-image" />
                </div>
                )}
                {/* all other projects that carry an image field */}
                {project.image &&
                project.title !== "Autonomous Drones with ROS" &&
                project.title !== "Emotion-Driven Editing of GaussianAvatars" && (
                <div className="project-image-placeholder">
                <img src={project.image} alt={project.title} className="project-image" />
                </div>
                )}
                </div>
              </a>
            ))}
          </div>
          <button onClick={debouncedHandleViewMoreClick} onTouchStart={debouncedHandleViewMoreClick} className="view-more-btn">Mehr anzeigen</button>
        </section>
        <footer className="footer">
          © Abhinav Utkarsh 2024
        </footer>
      </div>
    </FadeInPageWrapper>
  );
}

export default AppDe;
