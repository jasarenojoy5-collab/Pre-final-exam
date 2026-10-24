import React from 'react';
import type { Product } from '../../types/product';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
}

export const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  if (products.length === 0) {
    return (
      <div
        style={{
          textAlign: 'center',
          padding: '60px 20px',
          backgroundColor: '#FAFDFE',
          borderRadius: '16px',
          border: '2px dashed #CDE5F2',
        }}
      >
        <p style={{ fontFamily: "'Caveat', cursive", fontSize: '1.5rem', color: '#87A9C2', marginBottom: '8px' }}>
          No stationery or tech products found in this category ♡
        </p>
        <p style={{ fontSize: '0.9rem', color: '#88A1B5' }}>
          Try clearing your search query or selecting "All Products".
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
        gap: '24px',
      }}
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
