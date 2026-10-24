import React from 'react';

interface WashiTapeProps {
  color?: string;
  pattern?: 'stripes' | 'dots' | 'solid';
  width?: string | number;
  height?: number;
  rotation?: number;
  className?: string;
}

export const WashiTape: React.FC<WashiTapeProps> = ({
  color = '#FFFDD0',
  pattern = 'stripes',
  width = 110,
  height = 28,
  rotation = -2,
  className = '',
}) => {
  return (
    <div
      className={`washi-tape-strip ${className}`}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: `${height}px`,
        backgroundColor: color,
        opacity: 0.88,
        transform: `rotate(${rotation}deg)`,
        boxShadow: '0 2px 5px rgba(82, 106, 124, 0.12)',
        clipPath: 'polygon(0% 10%, 4% 0%, 96% 0%, 100% 15%, 98% 85%, 100% 100%, 5% 98%, 0% 80%)',
        backgroundImage:
          pattern === 'stripes'
            ? 'repeating-linear-gradient(45deg, rgba(245, 215, 229, 0.4), rgba(245, 215, 229, 0.4) 6px, transparent 6px, transparent 12px)'
            : pattern === 'dots'
            ? 'radial-gradient(rgba(135, 169, 194, 0.35) 1.5px, transparent 1.5px)'
            : 'none',
        backgroundSize: pattern === 'dots' ? '8px 8px' : undefined,
        pointerEvents: 'none',
        zIndex: 5,
      }}
    />
  );
};

