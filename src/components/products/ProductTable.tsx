import React from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '../../types/product';
import { formatCurrency } from '../../utils/currency';
import { calculateSubtotal, calculateOverallTotal } from '../../utils/calculations';
import { StockBadge } from '../ui/StockBadge';
import { QuantityControl } from './QuantityControl';
import { Button } from '../ui/Button';
import { useProducts } from '../../context/ProductContext';
import { ShoppingBag, Eye, Star } from '@phosphor-icons/react';

interface ProductTableProps {
  products: Product[];
}

export const ProductTable: React.FC<ProductTableProps> = ({ products }) => {
  const { updateProductQuantity, addToCart } = useProducts();
  const overallTotal = calculateOverallTotal(products);

  if (products.length === 0) {
    return (
      <div
        style={{
          textAlign: 'center',
          padding: '48px 20px',
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          border: '1.5px dashed #DDECF3',
        }}
      >
        <p style={{ fontFamily: "'Caveat', cursive", fontSize: '1.4rem', color: '#87A9C2' }}>
          No products matched your criteria ♡
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '18px',
        border: '1.5px solid #E2EFF6',
        overflow: 'hidden',
        boxShadow: '0 8px 24px -4px rgba(111, 145, 170, 0.1)',
      }}
    >
      <div style={{ overflowX: 'auto' }}>
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            textAlign: 'left',
            minWidth: '780px',
          }}
        >
          <thead>
            <tr
              style={{
                backgroundColor: '#F3F9FC',
                borderBottom: '2px solid #DDECF3',
              }}
            >
              <th style={{ padding: '14px 18px', fontFamily: "'Fredoka', sans-serif", fontSize: '0.9rem', color: '#526A7C' }}>
                Product
              </th>
              <th style={{ padding: '14px 18px', fontFamily: "'Fredoka', sans-serif", fontSize: '0.9rem', color: '#526A7C' }}>
                Category
              </th>
              <th style={{ padding: '14px 18px', fontFamily: "'Fredoka', sans-serif", fontSize: '0.9rem', color: '#526A7C' }}>
                Unit Price
              </th>
              <th style={{ padding: '14px 18px', fontFamily: "'Fredoka', sans-serif", fontSize: '0.9rem', color: '#526A7C' }}>
                Stock Quantity (+/-)
              </th>
              <th style={{ padding: '14px 18px', fontFamily: "'Fredoka', sans-serif", fontSize: '0.9rem', color: '#526A7C' }}>
                Subtotal
              </th>
              <th style={{ padding: '14px 18px', fontFamily: "'Fredoka', sans-serif", fontSize: '0.9rem', color: '#526A7C' }}>
                Status
              </th>
              <th style={{ padding: '14px 18px', fontFamily: "'Fredoka', sans-serif", fontSize: '0.9rem', color: '#526A7C', textAlign: 'center' }}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, idx) => {
              const subtotal = calculateSubtotal(product.price, product.quantity);
              const isOutOfStock = product.quantity <= 0;

              return (
                <tr
                  key={product.id}
                  style={{
                    backgroundColor: idx % 2 === 0 ? '#FFFFFF' : '#FBFDFE',
                    borderBottom: '1px solid #EBF4F9',
                    transition: 'background-color 0.15s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#F5FAFD';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = idx % 2 === 0 ? '#FFFFFF' : '#FBFDFE';
                  }}
                >
                  {/* Product Thumbnail & Name */}
                  <td style={{ padding: '14px 18px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <img
                        src={product.image}
                        alt={product.name}
                        style={{
                          width: '46px',
                          height: '46px',
                          borderRadius: '8px',
                          objectFit: 'cover',
                          border: '1px solid #DCEBF2',
                          backgroundColor: '#EBF4F9',
                          flexShrink: 0,
                        }}
                      />
                      <div>
                        <Link
                          to={`/products/${product.id}`}
                          style={{
                            fontWeight: 600,
                            color: '#3A5263',
                            fontSize: '0.95rem',
                            display: 'block',
                          }}
                        >
                          {product.name}
                        </Link>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: '#B57800', marginTop: '2px' }}>
                          <Star size={12} weight="fill" color="#E69500" />
                          <span>{product.rating.toFixed(1)}</span>
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td style={{ padding: '14px 18px' }}>
                    <span
                      style={{
                        fontFamily: "'Caveat', cursive",
                        fontSize: '1rem',
                        color: '#658FA9',
                        fontWeight: 600,
                      }}
                    >
                      {product.category}
                    </span>
                  </td>

                  {/* Price */}
                  <td style={{ padding: '14px 18px', fontWeight: 600, color: '#4F7996' }}>
                    {formatCurrency(product.price)}
                  </td>

                  {/* Quantity Controls */}
                  <td style={{ padding: '14px 18px' }}>
                    <QuantityControl
                      size="sm"
                      quantity={product.quantity}
                      onIncrease={() => updateProductQuantity(product.id, 1)}
                      onDecrease={() => updateProductQuantity(product.id, -1)}
                    />
                  </td>

                  {/* Subtotal */}
                  <td style={{ padding: '14px 18px', fontWeight: 700, color: '#374A58', fontFamily: "'Fredoka', sans-serif" }}>
                    {formatCurrency(subtotal)}
                  </td>

                  {/* Stock Status Badge */}
                  <td style={{ padding: '14px 18px' }}>
                    <StockBadge quantity={product.quantity} />
                  </td>

                  {/* Actions */}
                  <td style={{ padding: '14px 18px', textAlign: 'center' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                      <Button
                        size="sm"
                        variant={isOutOfStock ? 'outline' : 'primary'}
                        disabled={isOutOfStock}
                        onClick={() => addToCart(product, 1)}
                      >
                        <ShoppingBag size={14} weight="bold" />
                        <span>{isOutOfStock ? 'Sold' : 'Cart'}</span>
                      </Button>

                      <Link
                        to={`/products/${product.id}`}
                        style={{
                          width: '30px',
                          height: '30px',
                          borderRadius: '50%',
                          backgroundColor: '#F3F9FC',
                          color: '#6F91AA',
                          border: '1px solid #DDECF3',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                        title="View description"
                      >
                        <Eye size={15} weight="bold" />
                      </Link>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>

          {/* Table Footer with Total */}
          <tfoot>
            <tr
              style={{
                backgroundColor: '#FAFDFE',
                borderTop: '2px solid #DDECF3',
              }}
            >
              <td
                colSpan={4}
                style={{
                  padding: '16px 18px',
                  fontFamily: "'Fredoka', sans-serif",
                  fontSize: '1rem',
                  fontWeight: 600,
                  color: '#526A7C',
                  textAlign: 'right',
                }}
              >
                Computed Overall Subtotal Value:
              </td>
              <td
                colSpan={3}
                style={{
                  padding: '16px 18px',
                  fontFamily: "'Fredoka', sans-serif",
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: '#3B6482',
                }}
              >
                {formatCurrency(overallTotal)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};
