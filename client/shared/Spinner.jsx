import React, { memo } from 'react';

import 'shared/Spinner.css';

function Spinner({ centre = false, className, size }) {
  return (
    <div className={centre ? 'spinner--centre' : ''}>
      <svg
        width={`${size}px`}
        height={`${size}px`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
        className={className}
      >
        <circle
          cx="50"
          cy="50"
          fill="none"
          stroke="#007ff4"
          strokeWidth="4"
          r="35"
          strokeDasharray="164.93361431346415 56.97787143782138"
          transform="rotate(130.987 50 50)"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            calcMode="linear"
            values="0 50 50;360 50 50"
            keyTimes="0;1"
            dur="1s"
            begin="0s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
    </div>
  );
}

export default memo(Spinner);
