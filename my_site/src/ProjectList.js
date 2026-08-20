import React, { useState, useEffect } from 'react';
import './App.css';
import './ProjectList.css';
import { useNavigate } from 'react-router-dom';
import projectData from './Projects.json';
import ProjectCard from './ProjectCard';
import Footer from './Footer';
import strings from './strings';
import { useTapHandlers } from './utils';

const KEYWORDS = [
  '3D Vision',
  'Gaussian Splatting',
  'Diffusion Models',
  'Deep Learning',
  'Differentiable Rendering',
  'ROS',
  'Thesis',
];

const TYPE_MS = 300;
const HOLD_MS = 800;

// Cycles the keywords through the search placeholder, a letter at a time.
function useTypedPlaceholder(words) {
  const [text, setText] = useState(words[0].charAt(0));

  useEffect(() => {
    let word = 0;
    let letter = 0;
    let timer;

    const tick = () => {
      const current = words[word];
      if (letter < current.length - 1) {
        letter += 1;
        setText(current.slice(0, letter + 1));
        timer = setTimeout(tick, TYPE_MS);
      } else {
        timer = setTimeout(() => {
          word = (word + 1) % words.length;
          letter = 0;
          setText(words[word].charAt(0));
          timer = setTimeout(tick, TYPE_MS);
        }, HOLD_MS);
      }
    };

    timer = setTimeout(tick, TYPE_MS);
    return () => clearTimeout(timer);
  }, [words]);

  return text;
}

// Single-letter terms match nearly everything, so they are ignored.
function search(projects, term) {
  const words = term.split(' ').filter((w) => w.length >= 2);
  if (!words.length) return [];
  return projects.filter((project) =>
    words.some((word) =>
      project.keywords.some((keyword) => keyword.toLowerCase().includes(word))
    )
  );
}

function ProjectList({ lang = 'en' }) {
  const t = strings[lang] || strings.en;
  const [searchTerm, setSearchTerm] = useState('');
  const placeholder = useTypedPlaceholder(KEYWORDS);
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const goBack = useTapHandlers(() => {
    // opened directly, there is nothing to go back to
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate(lang === 'de' ? '/de' : '/');
    }
    setTimeout(() => window.scrollTo(0, 0), 100);
  });

  const hasQuery = searchTerm.trim().length > 0;
  const filtered = hasQuery ? search(projectData, searchTerm) : projectData;

  return (
    <div className="App">
      <button {...goBack} className="back-button">{t.back}</button>

      <h1 className="page-title">{t.projects}</h1>

      <div className="search-container">
        <input
          type="text"
          className="search-bar"
          placeholder={`${placeholder}|`}
          aria-label={t.searchLabel}
          onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
        />
      </div>

      <div className="projects-container">
        {filtered.length > 0 ? (
          filtered.map((project) => (
            <ProjectCard key={project.title} project={project} lang={lang} />
          ))
        ) : (
          <p>{t.noMatch}</p>
        )}
      </div>

      <Footer lang={lang} />
    </div>
  );
}

export default ProjectList;
