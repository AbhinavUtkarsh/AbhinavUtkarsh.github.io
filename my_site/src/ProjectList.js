import React, { useState, useEffect } from 'react';
import './App.css';
import './ProjectList.css';
import { useNavigate } from 'react-router-dom';
import projectData from './Projects.json';
import ROS2 from './images/ROS_2.png'; // image imports from project list json is not working, hence importing here
import EMOGA from './images/EMOGA.png'; // image imports from project list json is not working, hence importing here

function debounce(func, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

function ProjectList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [placeholder, setPlaceholder] = useState('');
  const navigate = useNavigate();

  useEffect(() =>  {
    const keywords = ['3D Vision', 'Gaussian Splatting' , 'Diffusion Models', 'Deep Learning', 'Differentiable Rendering','ROS', 'Thesis'];
    let index = 0;
    let currentKeyword = keywords[index];
    let currentLetterIndex = 0;
    let typingTimeout;

    setPlaceholder(currentKeyword.charAt(0));

    const typeNextLetter = () => {
      if (currentLetterIndex < currentKeyword.length - 1) {
        currentLetterIndex++;
        setPlaceholder(prevPlaceholder => prevPlaceholder + currentKeyword[currentLetterIndex]);
      } else {
        clearInterval(typingTimeout);
        setTimeout(() => {
          index = (index + 1) % keywords.length;
          currentKeyword = keywords[index];
          currentLetterIndex = 0;
          setPlaceholder(currentKeyword.charAt(0));
          typingTimeout = setInterval(typeNextLetter, 300);
        }, 800);
      }
    };

    typingTimeout = setInterval(typeNextLetter, 300);

    return () => clearInterval(typingTimeout);
  }, []);

  const handleSearchChange = e => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const performSearch = (projects, term) => {
    const searchTerms = term.split(' ');
    return projects.filter(project =>
      searchTerms.some(searchWord =>
        searchWord.length >= 2 &&
        project.keywords.some(keyword =>
          keyword.toLowerCase().includes(searchWord)
        )
      )
    );
  };

  const filteredProjects = searchTerm ? performSearch(projectData, searchTerm) : projectData;

  const handleBackClick = () => {
    navigate(-1);
    setTimeout(() => window.scrollTo(0, 0), 100);
  };

  const debouncedHandleBackClick = debounce(handleBackClick, 300);

  return (
    <div className="App fade-in">
      <button onClick={debouncedHandleBackClick} onTouchStart={debouncedHandleBackClick} className="back-button">
      ↩ Back
      </button>
      <h1>Projects</h1>
      <div className="search-container">
        <input
          type="text"
          className="search-bar"
          placeholder={`${placeholder}|`}
          onChange={handleSearchChange}
        />
      </div>
      <div className="projects-container">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project, index) => (
            <a href={project.url} target="_blank" rel="noopener noreferrer" key={index} className="project-box-link">
              <div className={`project-box ${!project.image ? 'no-image' : ''}`}>
                <div className="project-content">
                  <h3>{project.title}</h3>
                  <p className="team">{project.team}</p>
                  <p className="institute">{project.institute}</p>
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
          ))
        ) : searchTerm.length > 1 ? (
          <div>No projects match your search.</div>
        ) : null}
      </div>
      <footer className="footer">
        © Abhinav Utkarsh 2024
      </footer>
    </div>
  );
}

export default ProjectList;
