import React from 'react';
import { getStockStatus } from '../../utils/calculations';

interface StockBadgeProps {
  quantity: number;
  className?: string;
  showQuantity?: boolean;
}

export const StockBadge: React.FC<StockBadgeProps> = ({
  quantity,
  className = '',
  showQuantity = true,
}) => {
  const status = getStockStatus(quantity);

  // Styling based on status
  let bgColor = '#DDECF3';
  let textColor = '#45667E';
  let borderColor = '#BFD9E7';
  let dotColor = '#5B8AA8';
  let label = 'In Stock';

  if (status === 'Low Stock') {
    // Highlighted conditional formatting
    bgColor = '#FFF8D6';
    textColor = '#8C6C12';
    borderColor = '#F5E48C';
    dotColor = '#DE9B16';
    label = 'Low Stock';
  } else if (status === 'Out of Stock') {
    bgColor = '#FDE8EF';
    textColor = '#964867';
    borderColor = '#F7C4D5';
    dotColor = '#C9537B';
    label = 'Out of Stock';
  }

  return (
    <span
      className={`stock-indicator-badge ${status.toLowerCase().replace(/\s+/g, '-')} ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: '3px 10px',
        borderRadius: '9999px',
        fontSize: '0.78rem',
        fontWeight: 600,
        backgroundColor: bgColor,
        color: textColor,
        border: `1.5px solid ${borderColor}`,
        boxShadow: status === 'Low Stock' ? '0 0 0 2px rgba(222, 155, 22, 0.15)' : 'none',
        letterSpacing: '0.02em',
        userSelect: 'none',
      }}
    >
      <span
        style={{
          width: '7px',
          height: '7px',
          borderRadius: '50%',
          backgroundColor: dotColor,
          display: 'inline-block',
          boxShadow: status === 'Low Stock' ? '0 0 4px #DE9B16' : 'none',
        }}
      />
      <span>
        {label}
        {showQuantity && status !== 'Out of Stock' && ` (${quantity})`}
      </span>
    </span>
  );
};

