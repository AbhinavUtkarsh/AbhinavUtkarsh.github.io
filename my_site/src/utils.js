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
