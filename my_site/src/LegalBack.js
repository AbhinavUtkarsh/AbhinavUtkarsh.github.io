import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

/*
  Back control for the legal pages, same rules as the project page at
  /Emotion-Driven-Editing-of-Gaussian-Avatars/ (static/js/transitions.js).

  It appears only when there is somewhere real to go back to. A control that
  invents a destination is worse than no control, and on a direct visit there is
  no destination to invent.

    came here inside the site   -> step back, which keeps the scroll position
    came from another page here -> link to that page (a new tab has no history)
    typed in, or an outside link -> nothing rendered

  Only same-origin referrers count, so a crafted external referrer cannot turn
  this into an off-site redirect.
*/
function backTarget() {
  // React Router counts entries; anything above 0 means we navigated here
  const idx = window.history.state && window.history.state.idx;
  if (typeof idx === 'number' && idx > 0) return { kind: 'history' };

  if (!document.referrer) return null;
  try {
    const from = new URL(document.referrer);
    if (from.origin !== window.location.origin) return null;
    if (from.href === window.location.href) return null;
    return { kind: 'link', href: from.href };
  } catch (e) {
    return null;
  }
}

function LegalBack({ lang = 'en', label = 'Back' }) {
  const navigate = useNavigate();
  const [target] = useState(backTarget);

  if (!target) return null;

  const href = target.kind === 'link' ? target.href : `#/${lang === 'de' ? 'de' : ''}`;

  const onClick = (event) => {
    if (event.button !== 0) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    // a plain link navigation would land at the top of the target page
    if (target.kind !== 'history') return;
    event.preventDefault();
    navigate(-1);
  };

  return (
    <a className="legal-back" href={href} aria-label={label} onClick={onClick}>
      <FontAwesomeIcon icon={faArrowLeft} />
    </a>
  );
}

export default LegalBack;
