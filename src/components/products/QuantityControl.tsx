import React from 'react';
import { Minus, Plus } from '@phosphor-icons/react';
import { motion } from 'framer-motion';

interface QuantityControlProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  min?: number;
  max?: number;
  size?: 'sm' | 'md';
  label?: string;
  disabled?: boolean;
}

export const QuantityControl: React.FC<QuantityControlProps> = ({
  quantity,
  onIncrease,
  onDecrease,
  min = 0,
  max = 9999,
  size = 'md',
  label,
  disabled = false,
}) => {
  const isSm = size === 'sm';
  const buttonSize = isSm ? '26px' : '32px';
  const iconSize = isSm ? 12 : 14;

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: isSm ? '6px' : '8px',
        backgroundColor: '#F3F9FC',
        padding: isSm ? '2px 4px' : '3px 6px',
        borderRadius: '9999px',
        border: '1.5px solid #D9ECF5',
      }}
    >
      {label && (
        <span
          style={{
            fontFamily: "'Caveat', cursive",
            fontSize: isSm ? '0.9rem' : '1.05rem',
            color: '#6F91AA',
            paddingLeft: '4px',
          }}
        >
          {label}:
        </span>
      )}

      {/* Decrease Button */}
      <motion.button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onDecrease();
        }}
        disabled={disabled || quantity <= min}
        whileHover={disabled || quantity <= min ? undefined : { scale: 1.15, backgroundColor: '#D5E8F3' }}
        whileTap={disabled || quantity <= min ? undefined : { scale: 0.9 }}
        style={{
          width: buttonSize,
          height: buttonSize,
          borderRadius: '50%',
          backgroundColor: '#FFFFFF',
          color: quantity <= min ? '#CBD9E2' : '#527A96',
          border: '1px solid #C9DFED',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: disabled || quantity <= min ? 'not-allowed' : 'pointer',
          boxShadow: '0 1px 3px rgba(82, 106, 124, 0.1)',
          transition: 'background-color 0.15s ease',
        }}
        title="Decrease quantity by 1"
        aria-label="Decrease quantity"
      >
        <Minus size={iconSize} weight="bold" />
      </motion.button>

      {/* Numeric display */}
      <span
        style={{
          fontFamily: "'Fredoka', sans-serif",
          fontSize: isSm ? '0.9rem' : '1.05rem',
          fontWeight: 600,
          color: quantity === 0 ? '#C9537B' : '#374A58',
          minWidth: isSm ? '24px' : '30px',
          textAlign: 'center',
          userSelect: 'none',
        }}
      >
        {quantity}
      </span>

      {/* Increase Button */}
      <motion.button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onIncrease();
        }}
        disabled={disabled || quantity >= max}
        whileHover={disabled || quantity >= max ? undefined : { scale: 1.15, backgroundColor: '#D5E8F3' }}
        whileTap={disabled || quantity >= max ? undefined : { scale: 0.9 }}
        style={{
          width: buttonSize,
          height: buttonSize,
          borderRadius: '50%',
          backgroundColor: '#FFFFFF',
          color: quantity >= max ? '#CBD9E2' : '#527A96',
          border: '1px solid #C9DFED',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: disabled || quantity >= max ? 'not-allowed' : 'pointer',
          boxShadow: '0 1px 3px rgba(82, 106, 124, 0.1)',
          transition: 'background-color 0.15s ease',
        }}
        title="Increase quantity by 1"
        aria-label="Increase quantity"
      >
        <Plus size={iconSize} weight="bold" />
      </motion.button>
    </div>
  );
};

