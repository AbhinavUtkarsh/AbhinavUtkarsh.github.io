import React from 'react';
import { projectImage } from './images';
import ProseText from './ProseText';

function ProjectCard({ project, lang = 'en' }) {
  const image = projectImage(project.image);
  const description =
    lang === 'de' && project.descriptionDE ? project.descriptionDE : project.description;
  const institute =
    lang === 'de' && project.instituteDE ? project.instituteDE : project.institute;

  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className="project-box-link"
    >
      <div className={`project-box ${image ? '' : 'no-image'}`}>
        <div className="project-content">
          <h3>{project.title}</h3>
          <p className="team">{project.team}</p>
          <p className="institute">{institute}</p>
          <p className="description" lang={lang}><ProseText>{description}</ProseText></p>
          <div className="keywords">{project.keywords.join(', ')}</div>
        </div>

        {image && (
          <div className="project-image-placeholder">
            <img
              src={image.src}
              width={image.width}
              height={image.height}
              alt={project.title}
              className="project-image"
              loading="lazy"
            />
          </div>
        )}
      </div>
    </a>
  );
}

export default ProjectCard;
