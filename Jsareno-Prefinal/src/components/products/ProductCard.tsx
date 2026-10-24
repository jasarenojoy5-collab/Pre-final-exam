import React from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '../../types/product';
import { formatCurrency } from '../../utils/currency';
import { calculateSubtotal } from '../../utils/calculations';
import { StockBadge } from '../ui/StockBadge';
import { QuantityControl } from './QuantityControl';
import { Button } from '../ui/Button';
import { useProducts } from '../../context/ProductContext';
import { ShoppingBag, Eye, Star } from '@phosphor-icons/react';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { updateProductQuantity, addToCart } = useProducts();
  const subtotal = calculateSubtotal(product.price, product.quantity);
  const isOutOfStock = product.quantity <= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      whileHover={{ y: -6 }}
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '16px',
        border: '1.5px solid #E2EFF6',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 8px 24px -4px rgba(111, 145, 170, 0.12)',
        position: 'relative',
        transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
      }}
      className="pastel-product-card"
    >
      {/* Category Pill Tag & Stock Badge Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '10px',
          gap: '8px',
        }}
      >
        <span
          style={{
            fontFamily: "'Caveat', cursive",
            fontSize: '1rem',
            fontWeight: 700,
            color: '#7093AA',
            backgroundColor: '#F0F7FB',
            padding: '2px 10px',
            borderRadius: '9999px',
            border: '1px solid #DDECF3',
          }}
        >
          {product.category}
        </span>
        <StockBadge quantity={product.quantity} />
      </div>

      {/* Product Image in Soft Pastel Container matching Wix template */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '1 / 1',
          borderRadius: '12px',
          overflow: 'hidden',
          backgroundColor: '#DDECF3',
          marginBottom: '14px',
          border: '1px solid #D0E5F0',
        }}
      >
        <Link to={`/products/${product.id}`} style={{ display: 'block', width: '100%', height: '100%' }}>
          <img
            src={product.image}
            alt={product.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.4s ease',
            }}
            loading="lazy"
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.06)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
          />
        </Link>

        {/* Rating overlay pill */}
        <div
          style={{
            position: 'absolute',
            bottom: '8px',
            right: '8px',
            backgroundColor: 'rgba(255, 255, 255, 0.92)',
            backdropFilter: 'blur(4px)',
            padding: '3px 8px',
            borderRadius: '9999px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            fontSize: '0.78rem',
            fontWeight: 700,
            color: '#B57800',
            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.08)',
          }}
        >
          <Star size={13} weight="fill" color="#E69500" />
          <span>{product.rating.toFixed(1)}</span>
        </div>
      </div>

      {/* Product Title */}
      <h3
        style={{
          fontSize: '1.05rem',
          fontFamily: "'Fredoka', sans-serif",
          color: '#3A5263',
          lineHeight: '1.35',
          marginBottom: '6px',
          minHeight: '2.7em',
        }}
      >
        <Link
          to={`/products/${product.id}`}
          style={{ color: 'inherit', textDecoration: 'none' }}
          title={product.name}
        >
          {product.name}
        </Link>
      </h3>

      {/* Price & Subtotal Summary */}
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          marginBottom: '12px',
          paddingBottom: '8px',
          borderBottom: '1px dashed #E2EFF6',
        }}
      >
        <div>
          <span style={{ fontSize: '0.75rem', color: '#88A1B3', display: 'block' }}>Unit Price</span>
          <span
            style={{
              fontFamily: "'Quicksand', sans-serif",
              fontSize: '1.15rem',
              fontWeight: 700,
              color: '#4F7996',
            }}
          >
            {formatCurrency(product.price)}
          </span>
        </div>

        <div style={{ textAlign: 'right' }}>
          <span style={{ fontSize: '0.75rem', color: '#88A1B3', display: 'block' }}>
            Subtotal (Qty: {product.quantity})
          </span>
          <span
            style={{
              fontFamily: "'Fredoka', sans-serif",
              fontSize: '1rem',
              fontWeight: 600,
              color: '#374A58',
            }}
          >
            {formatCurrency(subtotal)}
          </span>
        </div>
      </div>

      {/* Interactive Stock Quantity Controls (+ / -) */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '14px',
          backgroundColor: '#FAFDFE',
          padding: '6px 10px',
          borderRadius: '10px',
          border: '1px solid #EBF4F9',
        }}
      >
        <span
          style={{
            fontFamily: "'Caveat', cursive",
            fontSize: '1rem',
            color: '#6F91AA',
            fontWeight: 600,
          }}
        >
          Stock Quantity:
        </span>
        <QuantityControl
          size="sm"
          quantity={product.quantity}
          onIncrease={() => updateProductQuantity(product.id, 1)}
          onDecrease={() => updateProductQuantity(product.id, -1)}
        />
      </div>

      {/* Action Buttons: Add to Cart & View Details */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '8px', marginTop: 'auto' }}>
        <Button
          variant={isOutOfStock ? 'outline' : 'primary'}
          size="sm"
          disabled={isOutOfStock}
          onClick={() => addToCart(product, 1)}
          title={isOutOfStock ? 'Product is currently out of stock' : 'Add 1 to Cart'}
        >
          <ShoppingBag size={15} weight="bold" />
          <span>{isOutOfStock ? 'Sold Out' : 'Add to Cart'}</span>
        </Button>

        <Link
          to={`/products/${product.id}`}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '34px',
            height: '34px',
            borderRadius: '50%',
            backgroundColor: '#F3F9FC',
            color: '#6F91AA',
            border: '1.5px solid #DDECF3',
            transition: 'all 0.15s ease',
          }}
          title="View detailed product description"
        >
          <Eye size={17} weight="bold" />
        </Link>
      </div>
    </motion.div>
  );
};
