import React from 'react';
import { Link } from 'react-router-dom';
import strings from './strings';

const FIRST_YEAR = 2024;

function Footer({ lang = 'en' }) {
  const t = strings[lang] || strings.en;
  const year = new Date().getFullYear();
  const span = year > FIRST_YEAR ? `${FIRST_YEAR}-${year}` : `${FIRST_YEAR}`;

  return (
    <footer className="footer">
      <span>© {span} Abhinav Utkarsh</span>
      <Link className="footer-link" to={lang === 'de' ? '/de/impressum' : '/impressum'}>
        {t.impressum}
      </Link>
    </footer>
  );
}

export default Footer;
