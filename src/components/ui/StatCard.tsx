import React from 'react';
import { motion } from 'framer-motion';

interface StatCardProps {
  label: string;
  value: string | number;
  sublabel?: string;
  icon: React.ReactNode;
  variant?: 'sky' | 'powder' | 'yellow' | 'pink';
  delay?: number;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  sublabel,
  icon,
  variant = 'sky',
  delay = 0,
}) => {
  const getTheme = () => {
    switch (variant) {
      case 'yellow':
        return {
          bg: '#FFFDE0',
          border: '#F2ECC4',
          accent: '#A48E3A',
          pattern:
            'repeating-linear-gradient(90deg, transparent, transparent 12px, rgba(230, 220, 180, 0.4) 12px, rgba(230, 220, 180, 0.4) 13px)',
        };
      case 'pink':
        return {
          bg: '#FDF0F6',
          border: '#F8D1E2',
          accent: '#9A5573',
          pattern: 'radial-gradient(rgba(245, 215, 229, 0.8) 1.5px, transparent 1.5px)',
        };
      case 'powder':
        return {
          bg: '#EDF5F9',
          border: '#D2E5F0',
          accent: '#5E8199',
          pattern:
            'linear-gradient(to right, rgba(210, 229, 240, 0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(210, 229, 240, 0.5) 1px, transparent 1px)',
        };
      case 'sky':
      default:
        return {
          bg: '#E2F7FC',
          border: '#C0E9F5',
          accent: '#477594',
          pattern:
            'linear-gradient(to right, rgba(255, 255, 255, 0.7) 1.5px, transparent 1.5px), linear-gradient(to bottom, rgba(255, 255, 255, 0.7) 1.5px, transparent 1.5px)',
        };
    }
  };

  const theme = getTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: 'easeOut' }}
      whileHover={{ y: -4, boxShadow: '0 12px 24px rgba(111, 145, 170, 0.18)' }}
      className="scrapbook-stat-panel"
      style={{
        backgroundColor: theme.bg,
        border: `1.5px solid ${theme.border}`,
        borderRadius: '16px',
        padding: '20px',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 4px 14px rgba(111, 145, 170, 0.08)',
        transition: 'box-shadow 0.25s ease',
      }}
    >
      {/* Background Pattern Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: theme.pattern,
          backgroundSize: '20px 20px',
          opacity: 0.7,
          pointerEvents: 'none',
        }}
      />

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span
            style={{
              fontFamily: "'Caveat', cursive",
              fontSize: '1.25rem',
              fontWeight: 700,
              color: theme.accent,
            }}
          >
            {label}
          </span>
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: theme.accent,
              boxShadow: '0 2px 6px rgba(82, 106, 124, 0.12)',
            }}
          >
            {icon}
          </div>
        </div>

        <div
          style={{
            fontFamily: "'Fredoka', sans-serif",
            fontSize: '1.85rem',
            fontWeight: 700,
            color: '#374A58',
            letterSpacing: '0.01em',
          }}
        >
          {value}
        </div>

        {sublabel && (
          <span
            style={{
              fontSize: '0.78rem',
              color: '#6F91AA',
              fontWeight: 500,
            }}
          >
            {sublabel}
          </span>
        )}
      </div>
    </motion.div>
  );
};

