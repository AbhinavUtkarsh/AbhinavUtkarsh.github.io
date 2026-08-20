import React from 'react';
import { useLocation } from 'react-router-dom';
import './FadeInPageWrapper.css';

// Keyed on the path so the fade restarts on every route change.
const FadeInPageWrapper = ({ children }) => {
  const { pathname } = useLocation();
  return <div key={pathname} className="fade-in-page fade-in">{children}</div>;
};

export default FadeInPageWrapper;
