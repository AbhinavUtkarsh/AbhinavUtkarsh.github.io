import { useEffect, useRef } from 'react';

// Leading-edge throttle. The old version rebuilt its closure on every render,
// so the timer reset each time and it only ever added lag.
export function useDebounced(fn, delay = 250) {
  const timer = useRef(null);
  const latest = useRef(fn);

  useEffect(() => {
    latest.current = fn;
  });

  useEffect(() => () => clearTimeout(timer.current), []);

  return (...args) => {
    if (timer.current) return;
    latest.current(...args);
    timer.current = setTimeout(() => {
      timer.current = null;
    }, delay);
  };
}

// Module level, not per component: handling a tap navigates, which remounts the
// button, so a per instance flag would be gone by the time the browser's
// synthesised click arrives and that click would fire the new button too.
let handledTapAt = 0;
const SYNTHETIC_CLICK_WINDOW = 700;

// Acts on finger lift rather than the synthesised click, which iOS swallows when
// the tap also stops momentum scrolling. Mouse and keyboard still go via click.
export function useTapHandlers(fn) {
  const start = useRef(null);

  return {
    onPointerDown: (event) => {
      start.current =
        event.pointerType === 'mouse'
          ? null
          : { x: event.clientX, y: event.clientY, t: Date.now() };
    },
    onPointerUp: (event) => {
      const from = start.current;
      start.current = null;
      if (!from) return;
      const moved = Math.hypot(event.clientX - from.x, event.clientY - from.y);
      // a drag is a scroll, not a tap
      if (moved < 12 && Date.now() - from.t < 800) {
        handledTapAt = Date.now();
        fn(event);
      }
    },
    onClick: (event) => {
      // only skip the click that trails a tap we already handled
      if (Date.now() - handledTapAt < SYNTHETIC_CLICK_WINDOW) return;
      fn(event);
    },
  };
}

export const EMAIL = 'abhinav.utkarsh@tum.de';

// Names the hyphenation dictionary gets wrong, e.g. "Gaussia-nAvatars".
const PROTECTED = [
  'GaussianAvatars',
  'Gaussian Splatting',
  'PyTorch',
  'NeRF',
  'FLAME',
  'EMO-GA',
  'PointNet++',
  'Coldplay',
  'Rad-Restruct',
];

const PROTECTED_RE = new RegExp(
  `(${PROTECTED.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`,
  'g'
);

export function splitProtected(text) {
  return text
    .split(PROTECTED_RE)
    .filter(Boolean)
    .map((part) => ({ text: part, protectedTerm: PROTECTED.includes(part) }));
}
