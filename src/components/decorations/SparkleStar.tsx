import React from 'react';

interface SparkleStarProps {
  size?: number;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const SparkleStar: React.FC<SparkleStarProps> = ({
  size = 20,
  color = '#87A9C2',
  className = '',
  style = {},
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      className={`sparkle-star ${className}`}
      style={{ display: 'inline-block', verticalAlign: 'middle', ...style }}
    >
      <path d="M12 0C12 6.627 6.627 12 0 12C6.627 12 12 17.373 12 24C12 17.373 17.373 12 24 12C17.373 12 12 6.627 12 0Z" />
    </svg>
  );
};

