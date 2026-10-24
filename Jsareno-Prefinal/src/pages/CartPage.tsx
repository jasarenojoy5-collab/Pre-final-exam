import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { formatCurrency } from '../utils/currency';
import { calculateSubtotal } from '../utils/calculations';
import { QuantityControl } from '../components/products/QuantityControl';
import { Button } from '../components/ui/Button';
import { HeartIcon } from '../components/decorations/HeartIcon';
import {
  ShoppingBag,
  Trash,
  ArrowLeft,
  CheckCircle,
  ShieldCheck,
  Package,
} from '@phosphor-icons/react';
import confetti from 'canvas-confetti';

export const CartPage: React.FC = () => {
  const { cart, updateCartItemQuantity, removeFromCart, clearCart, cartTotal, cartItemCount } = useProducts();
  const [orderComplete, setOrderComplete] = useState(false);

  const handleCheckout = () => {
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#C5EFFA', '#87A9C2', '#FFFDD0', '#F5D7E5'],
      });
    } catch (e) {
      // ignore
    }
    setOrderComplete(true);
    setTimeout(() => {
      clearCart();
    }, 1800);
  };

  return (
    <div style={{ maxWidth: '1180px', margin: '0 auto', padding: '36px 24px 80px 24px' }}>
      {/* Back button */}
      <div style={{ marginBottom: '24px' }}>
        <Link
          to="/products"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: '#6F91AA',
            fontWeight: 600,
            fontSize: '0.9rem',
            padding: '8px 16px',
            borderRadius: '9999px',
            backgroundColor: '#F3F9FC',
            border: '1px solid #DDECF3',
          }}
        >
          <ArrowLeft size={16} weight="bold" />
          <span>Continue Shopping</span>
        </Link>
      </div>

      {/* Header */}
      <div
        className="bg-grid-paper"
        style={{
          borderRadius: '20px',
          padding: '36px 24px',
          border: '2px dashed #B6DDEB',
          textAlign: 'center',
          marginBottom: '36px',
        }}
      >
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
          <span style={{ fontFamily: "'Caveat', cursive", fontSize: '1.6rem', color: '#526A7C', fontWeight: 700 }}>
            your selected stationery
          </span>
          <HeartIcon size={18} color="#F5D7E5" outlineColor="#B8829F" />
        </div>

        <h1
          className="font-outlined"
          style={{
            fontSize: 'clamp(2.2rem, 4.5vw, 3.2rem)',
            color: '#FFFFFF',
            textTransform: 'uppercase',
            margin: '0 0 8px 0',
            letterSpacing: '0.04em',
          }}
        >
          SHOPPING CART
        </h1>

        <p style={{ color: '#4F728A', fontSize: '0.96rem', fontWeight: 500 }}>
          Review your items, adjust purchase quantities, and finalize your order.
        </p>
      </div>

      {orderComplete ? (
        <div
          style={{
            textAlign: 'center',
            padding: '60px 24px',
            backgroundColor: '#FFFFFF',
            borderRadius: '20px',
            border: '1.5px solid #DDECF3',
            boxShadow: '0 8px 24px rgba(111, 145, 170, 0.1)',
            maxWidth: '560px',
            margin: '0 auto',
          }}
        >
          <CheckCircle size={64} weight="fill" color="#5283A4" style={{ marginBottom: '16px' }} />
          <h2 style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '2rem', color: '#374A58', marginBottom: '8px' }}>
            Thank You for Your Order! ♡
          </h2>
          <p style={{ fontFamily: "'Caveat', cursive", fontSize: '1.35rem', color: '#6F91AA', marginBottom: '24px' }}>
            Your delightful stationery package has been recorded and is ready for packaging!
          </p>
          <Link to="/products">
            <Button variant="primary" size="lg">
              <span>Back to Products</span>
            </Button>
          </Link>
        </div>
      ) : cart.length === 0 ? (
        <div
          style={{
            textAlign: 'center',
            padding: '80px 24px',
            backgroundColor: '#FFFFFF',
            borderRadius: '20px',
            border: '2px dashed #CDE5F2',
          }}
        >
          <div
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              backgroundColor: '#F3F9FC',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px auto',
              border: '1.5px dashed #CDE5F2',
            }}
          >
            <ShoppingBag size={38} color="#87A9C2" />
          </div>
          <h2 style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '1.6rem', color: '#4A6273', marginBottom: '8px' }}>
            Your Cart is Currently Empty
          </h2>
          <p style={{ fontFamily: "'Caveat', cursive", fontSize: '1.3rem', color: '#7D9DB2', marginBottom: '24px' }}>
            You haven't added any products to your cart yet ♡
          </p>
          <Link to="/products">
            <Button variant="primary" size="lg">
              <span>Browse Products Catalogue</span>
            </Button>
          </Link>
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '36px',
            alignItems: 'start',
          }}
        >
          {/* Left: Cart Items List */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '18px',
              border: '1.5px solid #E2EFF6',
              padding: '24px',
              boxShadow: '0 6px 20px rgba(111, 145, 170, 0.08)',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '12px', borderBottom: '1.5px dashed #E2EFF6' }}>
              <span style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '1.1rem', color: '#44647A' }}>
                Items in Cart ({cartItemCount})
              </span>
              <button
                type="button"
                onClick={clearCart}
                style={{
                  color: '#A9BDCC',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <Trash size={14} />
                <span>Clear Cart</span>
              </button>
            </div>

            {cart.map((item) => {
              const subtotal = calculateSubtotal(item.price, item.quantity);
              return (
                <div
                  key={item.id}
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '16px',
                    padding: '14px',
                    borderRadius: '14px',
                    backgroundColor: '#FAFDFE',
                    border: '1px solid #EBF4F9',
                  }}
                >
                  {/* Image & Title */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', minWidth: '220px' }}>
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{
                        width: '64px',
                        height: '64px',
                        borderRadius: '10px',
                        objectFit: 'cover',
                        border: '1px solid #D5E8F3',
                      }}
                    />
                    <div>
                      <h4 style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '0.98rem', color: '#3A5263', margin: '0 0 4px 0' }}>
                        {item.name}
                      </h4>
                      <span style={{ fontSize: '0.8rem', color: '#6F91AA' }}>
                        {formatCurrency(item.price)} each
                      </span>
                    </div>
                  </div>

                  {/* Quantity Controls & Subtotal */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <QuantityControl
                      size="sm"
                      quantity={item.quantity}
                      max={item.maxStock}
                      onIncrease={() => updateCartItemQuantity(item.id, 1)}
                      onDecrease={() => updateCartItemQuantity(item.id, -1)}
                    />

                    <div style={{ textAlign: 'right', minWidth: '90px' }}>
                      <span style={{ fontSize: '0.72rem', color: '#88A1B5', display: 'block' }}>Subtotal</span>
                      <strong style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '1.05rem', color: '#374A58' }}>
                        {formatCurrency(subtotal)}
                      </strong>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        backgroundColor: '#FFF0F5',
                        color: '#A8526F',
                        border: '1px solid #F5C6D6',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                      }}
                      title="Remove item"
                    >
                      <Trash size={15} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Order Summary Card */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '18px',
              border: '1.5px solid #E2EFF6',
              padding: '28px',
              boxShadow: '0 6px 20px rgba(111, 145, 170, 0.08)',
              display: 'flex',
              flexDirection: 'column',
              gap: '18px',
            }}
          >
            <h3 style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '1.25rem', color: '#3A5263', margin: 0 }}>
              Order Summary
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.92rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#5A6F7F' }}>
                <span>Total Items:</span>
                <strong>{cartItemCount} items</strong>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#5A6F7F' }}>
                <span>Shipping Method:</span>
                <span style={{ color: '#4E7796', fontWeight: 600 }}>Standard Tracked (Free)</span>
              </div>

              <div style={{ height: '1px', backgroundColor: '#EBF4F9', margin: '4px 0' }} />

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: "'Caveat', cursive", fontSize: '1.4rem', color: '#6F91AA', fontWeight: 700 }}>
                  Grand Total:
                </span>
                <strong style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '1.6rem', color: '#3B6482' }}>
                  {formatCurrency(cartTotal)}
                </strong>
              </div>
            </div>

            <Button variant="primary" fullWidth size="lg" onClick={handleCheckout}>
              <span>Place Order</span>
              <HeartIcon size={16} color="#FFFFFF" />
            </Button>

            <div
              style={{
                backgroundColor: '#F5FAFD',
                borderRadius: '12px',
                padding: '12px',
                border: '1px solid #DDECF3',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                fontSize: '0.8rem',
                color: '#6F91AA',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShieldCheck size={18} color="#87A9C2" weight="fill" />
                <span>CCDI Pre-Final Exam Demo Checkout</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Package size={18} color="#87A9C2" weight="fill" />
                <span>Values persist dynamically in browser localStorage</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
