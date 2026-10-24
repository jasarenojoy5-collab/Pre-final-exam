import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { formatCurrency } from '../utils/currency';
import { calculateSubtotal } from '../utils/calculations';
import { StockBadge } from '../components/ui/StockBadge';
import { QuantityControl } from '../components/products/QuantityControl';
import { Button } from '../components/ui/Button';
import { PaperClip } from '../components/decorations/PaperClip';
import { WashiTape } from '../components/decorations/WashiTape';
import { ArrowLeft, ShoppingBag, Star, Check, Trash } from '@phosphor-icons/react';
import { motion } from 'framer-motion';

export const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { products, updateProductQuantity, addToCart, deleteProduct } = useProducts();
  const [purchaseQty, setPurchaseQty] = useState(1);

  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div
        style={{
          maxWidth: '700px',
          margin: '80px auto',
          padding: '40px 24px',
          textAlign: 'center',
          backgroundColor: '#FFFFFF',
          borderRadius: '20px',
          border: '2px dashed #CDE5F2',
        }}
      >
        <h2 style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '2rem', color: '#526A7C', marginBottom: '12px' }}>
          Product Not Found
        </h2>
        <p style={{ color: '#88A1B5', marginBottom: '24px' }}>
          The requested product item might have been removed or does not exist in the catalogue.
        </p>
        <Link to="/products">
          <Button variant="primary">
            <ArrowLeft size={16} weight="bold" />
            <span>Return to Products</span>
          </Button>
        </Link>
      </div>
    );
  }

  const subtotal = calculateSubtotal(product.price, product.quantity);
  const isOutOfStock = product.quantity <= 0;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addToCart(product, purchaseQty);
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${product.name}" from inventory?`)) {
      deleteProduct(product.id);
      navigate('/products');
    }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '36px 24px 80px 24px' }}>
      {/* Back button & Breadcrumb */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '28px',
        }}
      >
        <Link
          to="/products"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: '#6F91AA',
            fontWeight: 600,
            fontSize: '0.92rem',
            padding: '8px 16px',
            borderRadius: '9999px',
            backgroundColor: '#F3F9FC',
            border: '1px solid #DDECF3',
            transition: 'all 0.15s ease',
          }}
        >
          <ArrowLeft size={16} weight="bold" />
          <span>Back to Catalogue</span>
        </Link>

        {/* Delete action */}
        <button
          type="button"
          onClick={handleDelete}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            color: '#A8526F',
            backgroundColor: '#FFF0F5',
            border: '1px solid #F5C6D6',
            borderRadius: '9999px',
            padding: '6px 14px',
            fontSize: '0.82rem',
            fontWeight: 600,
            cursor: 'pointer',
          }}
          title="Remove product from inventory"
        >
          <Trash size={15} />
          <span>Delete Product</span>
        </button>
      </div>

      {/* Main Details Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: '48px',
          alignItems: 'start',
        }}
      >
        {/* Left: Large Scrapbook Polaroid Image Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}
        >
          {/* Paperclip decoration at top */}
          <div style={{ position: 'absolute', top: '-22px', left: '15%', zIndex: 10 }}>
            <PaperClip color="#87A9C2" size={46} />
          </div>

          {/* Washi tape at bottom right */}
          <div style={{ position: 'absolute', bottom: '-12px', right: '10%', zIndex: 10 }}>
            <WashiTape color="#FFFDD0" pattern="stripes" width={110} rotation={-4} />
          </div>

          {/* Polaroid Card */}
          <div
            className="polaroid-frame"
            style={{
              width: '100%',
              maxWidth: '460px',
              backgroundColor: '#FFFFFF',
              borderRadius: '12px',
              border: '1.5px solid #D5EAF4',
              padding: '14px 14px 28px 14px',
              boxShadow: '0 12px 32px rgba(111, 145, 170, 0.18)',
            }}
          >
            <div
              style={{
                width: '100%',
                aspectRatio: '1 / 1',
                borderRadius: '8px',
                overflow: 'hidden',
                backgroundColor: '#EBF4F9',
                border: '1px solid #D5EAF4',
              }}
            >
              <img
                src={product.image}
                alt={product.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </div>

            <div
              style={{
                paddingTop: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <span
                style={{
                  fontFamily: "'Caveat', cursive",
                  fontSize: '1.35rem',
                  color: '#658FA9',
                  fontWeight: 700,
                }}
              >
                {product.category} ♡
              </span>
              <StockBadge quantity={product.quantity} />
            </div>
          </div>
        </motion.div>

        {/* Right: Detailed Product Specifications & Controls */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45 }}
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '20px',
            border: '1.5px solid #E2EFF6',
            padding: '32px',
            boxShadow: '0 8px 24px -4px rgba(111, 145, 170, 0.1)',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          {/* Header Row: Category Tag + Rating */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span
              style={{
                fontFamily: "'Caveat', cursive",
                fontSize: '1.2rem',
                fontWeight: 700,
                color: '#6F91AA',
                backgroundColor: '#F0F7FB',
                padding: '3px 12px',
                borderRadius: '9999px',
                border: '1px solid #DDECF3',
              }}
            >
              {product.category}
            </span>

            {/* Rating Stars */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                backgroundColor: '#FFF8EB',
                padding: '4px 10px',
                borderRadius: '9999px',
                border: '1px solid #FCE5B8',
                color: '#B57800',
                fontSize: '0.85rem',
                fontWeight: 700,
              }}
            >
              <Star size={16} weight="fill" color="#E69500" />
              <span>{product.rating.toFixed(1)} / 5.0</span>
            </div>
          </div>

          {/* Product Title */}
          <h1
            style={{
              fontFamily: "'Fredoka', sans-serif",
              fontSize: 'clamp(1.8rem, 3.2vw, 2.3rem)',
              color: '#374A58',
              lineHeight: '1.2',
              margin: 0,
            }}
          >
            {product.name}
          </h1>

          {/* Price & Subtotal Valuation Card */}
          <div
            style={{
              backgroundColor: '#F5FAFD',
              borderRadius: '14px',
              border: '1.5px solid #DDECF3',
              padding: '16px 20px',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
              gap: '16px',
            }}
          >
            <div>
              <span style={{ fontSize: '0.8rem', color: '#88A1B5', display: 'block' }}>Unit Price</span>
              <strong
                style={{
                  fontFamily: "'Quicksand', sans-serif",
                  fontSize: '1.5rem',
                  color: '#4F7996',
                }}
              >
                {formatCurrency(product.price)}
              </strong>
            </div>

            <div>
              <span style={{ fontSize: '0.8rem', color: '#88A1B5', display: 'block' }}>In Stock</span>
              <div style={{ marginTop: '4px' }}>
                <StockBadge quantity={product.quantity} />
              </div>
            </div>

            <div>
              <span style={{ fontSize: '0.8rem', color: '#88A1B5', display: 'block' }}>
                Inventory Subtotal ({product.quantity} units)
              </span>
              <strong
                style={{
                  fontFamily: "'Fredoka', sans-serif",
                  fontSize: '1.3rem',
                  color: '#374A58',
                }}
              >
                {formatCurrency(subtotal)}
              </strong>
            </div>
          </div>

          {/* Product Description */}
          <div>
            <h4
              style={{
                fontFamily: "'Fredoka', sans-serif",
                fontSize: '1.05rem',
                color: '#526A7C',
                marginBottom: '8px',
              }}
            >
              Product Description
            </h4>
            <p
              style={{
                fontSize: '0.96rem',
                color: '#5A6F7F',
                lineHeight: 1.7,
                fontFamily: "'Quicksand', sans-serif",
              }}
            >
              {product.description}
            </p>
          </div>

          {/* Specifications Checklist */}
          {product.specifications && product.specifications.length > 0 && (
            <div>
              <h4
                style={{
                  fontFamily: "'Fredoka', sans-serif",
                  fontSize: '1.05rem',
                  color: '#526A7C',
                  marginBottom: '10px',
                }}
              >
                Product Specifications
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {product.specifications.map((spec, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.9rem', color: '#576F82' }}>
                    <div
                      style={{
                        width: '18px',
                        height: '18px',
                        borderRadius: '50%',
                        backgroundColor: '#C5EFFA',
                        color: '#437291',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        marginTop: '2px',
                      }}
                    >
                      <Check size={11} weight="bold" />
                    </div>
                    <span>{spec}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Stock Adjustment Controls */}
          <div
            style={{
              padding: '16px',
              borderRadius: '14px',
              backgroundColor: '#FAFDFE',
              border: '1px solid #EBF4F9',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px',
            }}
          >
            <div>
              <span style={{ fontSize: '0.85rem', color: '#6F91AA', fontWeight: 600, display: 'block' }}>
                Manage Inventory Stock Level:
              </span>
              <span style={{ fontSize: '0.78rem', color: '#88A1B5' }}>
                Use +/- buttons to update warehouse count & total
              </span>
            </div>

            <QuantityControl
              quantity={product.quantity}
              onIncrease={() => updateProductQuantity(product.id, 1)}
              onDecrease={() => updateProductQuantity(product.id, -1)}
            />
          </div>

          {/* Add to Cart Section */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '14px',
              paddingTop: '8px',
              borderTop: '1.5px dashed #E5F0F7',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '0.88rem', color: '#6F91AA', fontWeight: 600 }}>Qty to Order:</span>
              <QuantityControl
                quantity={purchaseQty}
                min={1}
                max={Math.max(1, product.quantity)}
                disabled={isOutOfStock}
                onIncrease={() => setPurchaseQty((prev) => Math.min(product.quantity, prev + 1))}
                onDecrease={() => setPurchaseQty((prev) => Math.max(1, prev - 1))}
              />
            </div>

            <Button
              variant={isOutOfStock ? 'outline' : 'primary'}
              size="lg"
              disabled={isOutOfStock}
              onClick={handleAddToCart}
              style={{ flexGrow: 1 }}
            >
              <ShoppingBag size={20} weight="bold" />
              <span>{isOutOfStock ? 'Currently Out of Stock' : `Add to Cart (${formatCurrency(product.price * purchaseQty)})`}</span>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
