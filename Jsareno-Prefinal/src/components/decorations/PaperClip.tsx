import React from 'react';

interface PaperClipProps {
  className?: string;
  color?: string;
  size?: number;
}

export const PaperClip: React.FC<PaperClipProps> = ({
  className = '',
  color = '#87A9C2',
  size = 42,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`paper-clip-svg ${className}`}
      style={{ filter: 'drop-shadow(0 2px 4px rgba(82, 106, 124, 0.2))' }}
    >
      {/* Cute Bulldog Clip Body */}
      <rect x="14" y="22" width="20" height="18" rx="3" fill={color} />
      {/* Clip wire handles */}
      <path
        d="M18 22V10C18 7.79086 19.7909 6 22 6H26C28.2091 6 30 7.79086 30 10V22"
        stroke="#FFFFFF"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M20 22V12C20 10.8954 20.8954 10 22 10H26C27.1046 10 28 10.8954 28 12V22"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="24" cy="31" r="3" fill="#FFFFFF" fillOpacity="0.8" />
    </svg>
  );
};

