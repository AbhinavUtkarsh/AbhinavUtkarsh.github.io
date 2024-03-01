import React, { useState, useEffect } from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import profilePic from './images/profile.png';
import ROS2 from './images/ROS_2.png';

//project data, will be moved to mongoDB
const dummyProjects = [
  { title: "Multimodal Features for 3D Point Cloud Anomaly Detection", institute: "Technical University of Munich, Germany", description: "Achieved up to 2% performance enhancement on Image AU-ROC and Pixel-AU-PRO metrics using recently (mid-2023) released Real-AD-3D dataset for anomaly detection. Implemented PointNet and PointNet++ for 3D feature extraction in a conventional descriptor-based pipeline, while integrating noising and patching techniques for local geometries. As the processed pointcouds were high-resolution, we deployed an SDF Network for a high-resolution 3D feature extraction, enhancing spatial comprehension in the feature space", keywords: ["3D Computer Vision", "Deep learning"], image: "", url:"https://www.github.com/AbhinavUtkarsh" },
  { title: "Large Language Models for Structuring Radiology Reports", institute: "Technical University of Munich, Germany", description: "Improved Level 1 data generation F1 score by 26% for a synthetic structured radiology report generation task, by designing a Question Answering Pipeline with handcrafted leaky prompts, essentially guiding the model to generate higher-quality structured radiology reports. At the same time, we achieved an 15x enhancement in Level 3 generations by fine-tuning (LoRA) an open source LLM (Vicuna 13B) on existing annotated ground truth. Improved Level 3 Recall by 35% from baseline with an image based visual question answering deep learning-based model Rad-Restruct by pretraining on a synthetically generated large-scale MIMIC dataset and training on annotated ground truth", keywords: ["Large Language Models (LLM)", "Vicuna", "LoRA", "Rad-Restruct"], image: "", url:"https://collab.dvb.bayern/display/TUMmlmi/MLMI+Summer+2023?preview=/69050519/69050563/MLMI_Proposal_Report_Structuring.pdf"},
  { title: "Autonomous Drones with ROS", institute: "Technical University of Munich, Germany", description: "Executed the autonomous coordination of two drones for 3D mapping within a 50×50 m2 Unity-based environment with ROS 1. Collaborated in a team of five, developing the navigation, perception and state machine packages while refining the PID controller gain values", keywords: ["ROS1", "Unity", "Linux"], image: ROS2, url:"https://www.youtube.com/watch?v=I9YYYC3NxW4&feature=youtu.be" },
  // Add more projects as needed
];

function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    setProjects(dummyProjects.slice(0, 3)); // first 3 projects
  }, []);

  const handleViewMoreClick = () => {
    window.open('https://github.com/AbhinavUtkarsh', '_blank'); // Link to projects page
  };

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
                {project.image && (
                  <div
                    className="project-image-placeholder"
                    style={{
                      backgroundImage: `url(${project.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  />
                )}
              </div>
            </a>
            ))}
        </div>
        <button onClick={handleViewMoreClick} className="view-more-btn">View More</button>
      </section>
    </div>
  );
}

export default App;
