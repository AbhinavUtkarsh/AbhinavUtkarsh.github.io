import React from 'react';

// The glyphs only occupy x 146..351, y 63..151 of the nominal 500x200 space;
// cropping to that makes the element's box the visible text, so CSS can size
// and centre it directly.
function Greeting() {
  return (
    <div className="greeting">
      <svg
        className="greeting-svg"
        viewBox="143 60 211 94"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="नमस्ते (namaste)"
        xmlns="http://www.w3.org/2000/svg"
      >
        <text x="250" y="150" textAnchor="middle">
          <tspan className="letter" style={{ animationDelay: '0s' }}>न</tspan>
          <tspan className="letter" style={{ animationDelay: '1s' }}>म</tspan>
          <tspan className="letter" style={{ animationDelay: '2s' }}>स्ते</tspan>
        </text>
      </svg>
    </div>
  );
}

export default Greeting;
