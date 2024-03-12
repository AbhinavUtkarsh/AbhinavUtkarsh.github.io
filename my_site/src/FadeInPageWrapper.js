import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './FadeInPageWrapper.css';

const FadeInPageWrapper = ({ children }) => {
  const location = useLocation();
  const [animation, setAnimation] = useState(false);

  useEffect(() => {
    setAnimation(true);
    const timeout = setTimeout(() => {
      setAnimation(false);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [location]);

  return <div className={`fade-in-page ${animation ? 'fade-in' : ''}`}>{children}</div>;
};

export default FadeInPageWrapper;
