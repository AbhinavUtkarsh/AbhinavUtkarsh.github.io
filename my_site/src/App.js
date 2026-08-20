import React, { useState, useEffect } from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { HashRouter, Routes, Route, useNavigate } from 'react-router-dom';
import profilePic from './images/profile.png';
import ProjectList from './ProjectList';
import Impressum from './Impressum';
import Greeting from './Greeting';
import Footer from './Footer';
import ProjectCard from './ProjectCard';
import ProseText from './ProseText';
import strings from './strings';
import { EMAIL, useDebounced } from './utils';
import ProjectsData from './Projects.json';
import IntroData from './Intro.json';
import FadeInPageWrapper from './FadeInPageWrapper';

const RECENT_COUNT = 3;
const TOGGLE_HIDE_AT = 175;

function Home({ lang }) {
  const t = strings[lang] || strings.en;
  const [hideToggle, setHideToggle] = useState(false);
  const navigate = useNavigate();

  const projects = ProjectsData.slice(0, RECENT_COUNT);
  const intro = lang === 'de' ? IntroData.introText_DE : IntroData.introText;

  useEffect(() => {
    document.title = 'Abhinav';
    // picks the hyphenation dictionary and screen reader pronunciation
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    const onScroll = () => setHideToggle(window.scrollY > TOGGLE_HIDE_AT);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const viewMore = useDebounced(() => {
    navigate(lang === 'de' ? '/de/projects' : '/projects');
    window.scrollTo(0, 0);
  });

  const toggleLanguage = useDebounced(() => {
    navigate(lang === 'en' ? '/de' : '/');
  });

  return (
    <FadeInPageWrapper>
      <div className="App">
        <header className="header">
          <div className="name-block">
            {/* grouped so the greeting centres on the first name */}
            <div className="name-line">
              <Greeting />
              <h1 className="name">ABHINAV</h1>
            </div>
            <h1 className="name name-last">UTKARSH</h1>
          </div>

          <div className="photo-wrapper">
            <img
              src={profilePic}
              width="400"
              height="400"
              alt="Abhinav Utkarsh"
              className="profile-photo"
            />
          </div>

          <div className="icon-container">
            <a
              href="https://github.com/AbhinavUtkarsh"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <FontAwesomeIcon icon={faGithub} />
            </a>
            <a
              href="https://www.linkedin.com/in/abhinavutkarsh"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
            <a href={`mailto:${EMAIL}`} aria-label="Email">
              <FontAwesomeIcon icon={faEnvelope} />
            </a>
          </div>

          <div className="intro-text" lang={t.lang}>
            {intro.map((paragraph, i) => (
              <p key={i}><ProseText>{paragraph}</ProseText></p>
            ))}
          </div>

          <button
            className={`language-toggle-btn${hideToggle ? ' hidden' : ''}`}
            onClick={toggleLanguage}
            aria-label={lang === 'en' ? 'Auf Deutsch anzeigen' : 'Show in English'}
          >
            {t.toggleLabel}
          </button>
        </header>

        <section className="recent-projects">
          <h2 className="section-title">{t.recentProjects}</h2>
          <div className="projects-container">
            {projects.map((project) => (
              <ProjectCard key={project.title} project={project} lang={lang} />
            ))}
          </div>
          <button onClick={viewMore} className="view-more-btn">{t.viewMore}</button>
        </section>

        <Footer lang={lang} />
      </div>
    </FadeInPageWrapper>
  );
}

function AppWrapper() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home lang="en" />} />
        <Route path="/de" element={<Home lang="de" />} />
        <Route path="/projects" element={<ProjectList lang="en" />} />
        <Route path="/de/projects" element={<ProjectList lang="de" />} />
        <Route path="/impressum" element={<Impressum lang="en" />} />
        <Route path="/de/impressum" element={<Impressum lang="de" />} />
        <Route path="*" element={<Home lang="en" />} />
      </Routes>
    </HashRouter>
  );
}

export default AppWrapper;
