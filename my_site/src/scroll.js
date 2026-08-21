import { useEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

/*
  Going back should land where you left off, not at the top.

  Positions live in memory rather than storage: a step back inside the site
  never reloads the document, so a Map is enough, and it keeps the site free of
  cookies and local storage.
*/
const positions = new Map();

function ScrollMemory() {
  const location = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    const path = location.pathname;
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        positions.set(path, window.scrollY);
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) cancelAnimationFrame(frame);
      /* Deliberately not recording the position here. Cleanup runs after the
         next page is committed, so the scroll has already been clamped to that
         page's height and we would file it under the page we just left. */
    };
  }, [location.pathname]);

  useEffect(() => {
    if (navigationType !== 'POP') {
      window.scrollTo(0, 0);
      return undefined;
    }

    const y = positions.get(location.pathname) || 0;
    if (!y) return undefined;

    /* The page is still short on the first frame, so a single scrollTo gets
       clamped to whatever height exists then. Keep trying while the content
       finishes laying out. */
    const timers = [];
    const attempt = () => {
      window.scrollTo(0, y);
      return Math.abs(window.scrollY - y) < 2;
    };

    requestAnimationFrame(() => {
      if (attempt()) return;
      [60, 150, 300, 600].forEach((delay) => {
        timers.push(setTimeout(attempt, delay));
      });
    });

    return () => timers.forEach(clearTimeout);
  }, [location, navigationType]);

  return null;
}

export default ScrollMemory;
