import React from 'react';
import type { CartItem } from '../../types/product';
import { formatCurrency } from '../../utils/currency';
import { calculateSubtotal } from '../../utils/calculations';
import { QuantityControl } from '../products/QuantityControl';
import { useProducts } from '../../context/ProductContext';
import { Trash } from '@phosphor-icons/react';

interface CartItemRowProps {
  item: CartItem;
}

export const CartItemRow: React.FC<CartItemRowProps> = ({ item }) => {
  const { updateCartItemQuantity, removeFromCart } = useProducts();
  const subtotal = calculateSubtotal(item.price, item.quantity);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '12px',
        backgroundColor: '#FFFFFF',
        borderRadius: '12px',
        border: '1.5px solid #E5F0F7',
        boxShadow: '0 2px 8px rgba(111, 145, 170, 0.06)',
      }}
    >
      {/* Thumbnail */}
      <img
        src={item.image}
        alt={item.name}
        style={{
          width: '54px',
          height: '54px',
          borderRadius: '8px',
          objectFit: 'cover',
          backgroundColor: '#EBF4F9',
          border: '1px solid #D5E8F3',
          flexShrink: 0,
        }}
      />

      {/* Info */}
      <div style={{ flexGrow: 1, minWidth: 0 }}>
        <h4
          style={{
            fontSize: '0.9rem',
            fontFamily: "'Fredoka', sans-serif",
            color: '#3A5263',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            margin: '0 0 2px 0',
          }}
        >
          {item.name}
        </h4>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: '#6F91AA' }}>
          <span>{formatCurrency(item.price)} each</span>
          <span>•</span>
          <strong style={{ color: '#3A5263' }}>{formatCurrency(subtotal)}</strong>
        </div>

        {/* Quantity Controls in Cart */}
        <div style={{ marginTop: '6px' }}>
          <QuantityControl
            size="sm"
            quantity={item.quantity}
            max={item.maxStock}
            onIncrease={() => updateCartItemQuantity(item.id, 1)}
            onDecrease={() => updateCartItemQuantity(item.id, -1)}
          />
        </div>
      </div>

      {/* Delete Item Button */}
      <button
        type="button"
        onClick={() => removeFromCart(item.id)}
        aria-label="Remove item"
        style={{
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          backgroundColor: '#FFF2F6',
          color: '#B85D7C',
          border: '1px solid #F5D3DF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          flexShrink: 0,
          transition: 'all 0.15s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#FCDFE9';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#FFF2F6';
        }}
      >
        <Trash size={16} />
      </button>
    </div>
  );
};
