import React from 'react';
import { splitProtected } from './utils';

// Wraps proper nouns so the hyphenation dictionary leaves them alone.
function ProseText({ children }) {
  return (
    <>
      {splitProtected(children).map((part, i) =>
        part.protectedTerm ? (
          <span key={i} className="no-hyphen">{part.text}</span>
        ) : (
          <React.Fragment key={i}>{part.text}</React.Fragment>
        )
      )}
    </>
  );
}

export default ProseText;
