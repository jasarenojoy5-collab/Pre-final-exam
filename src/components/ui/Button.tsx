import React, { type ButtonHTMLAttributes } from 'react';
import { motion } from 'framer-motion';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'yellow' | 'pink' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  children,
  className = '',
  disabled,
  onClick,
  type = 'button',
  ...rest
}) => {
  // Styles based on variant
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        // Soft dusty blue button matching reference "shop" button
        return {
          backgroundColor: '#87A9C2',
          color: '#FFFFFF',
          border: '1.5px solid #759ab6',
          boxShadow: '0 4px 12px rgba(135, 169, 194, 0.35)',
        };
      case 'secondary':
        return {
          backgroundColor: '#DDECF3',
          color: '#526A7C',
          border: '1.5px solid #C5DFEC',
          boxShadow: '0 2px 8px rgba(111, 145, 170, 0.15)',
        };
      case 'yellow':
        return {
          backgroundColor: '#FFFDD0',
          color: '#526A7C',
          border: '1.5px solid #EDE9A3',
          boxShadow: '0 3px 10px rgba(160, 150, 90, 0.15)',
        };
      case 'pink':
        return {
          backgroundColor: '#F5D7E5',
          color: '#6F4E60',
          border: '1.5px solid #ECC0D7',
          boxShadow: '0 3px 10px rgba(245, 215, 229, 0.3)',
        };
      case 'outline':
        return {
          backgroundColor: '#FFFFFF',
          color: '#87A9C2',
          border: '1.5px solid #87A9C2',
          boxShadow: '0 2px 6px rgba(135, 169, 194, 0.1)',
        };
      case 'ghost':
        return {
          backgroundColor: 'transparent',
          color: '#526A7C',
          border: '1.5px solid transparent',
        };
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return {
          padding: '6px 14px',
          fontSize: '0.85rem',
          borderRadius: '9999px',
          gap: '6px',
        };
      case 'lg':
        return {
          padding: '12px 28px',
          fontSize: '1.05rem',
          borderRadius: '9999px',
          gap: '10px',
        };
      case 'md':
      default:
        return {
          padding: '9px 20px',
          fontSize: '0.92rem',
          borderRadius: '9999px',
          gap: '8px',
        };
    }
  };

  const variantStyles = getVariantStyles();
  const sizeStyles = getSizeStyles();

  return (
    <motion.button
      type={type}
      disabled={disabled}
      onClick={onClick}
      whileHover={disabled ? undefined : { scale: 1.03, y: -1 }}
      whileTap={disabled ? undefined : { scale: 0.97, y: 1 }}
      transition={{ duration: 0.15, ease: 'easeOut' }}
      className={`custom-pastel-button ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'Quicksand', sans-serif",
        fontWeight: 600,
        letterSpacing: '0.04em',
        textTransform: 'uppercase',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.55 : 1,
        width: fullWidth ? '100%' : 'auto',
        transition: 'all 0.2s ease',
        userSelect: 'none',
        ...variantStyles,
        ...sizeStyles,
      }}
      {...(rest as any)}
    >
      {children}
    </motion.button>
  );
};
