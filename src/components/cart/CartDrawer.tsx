import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useProducts } from '../../context/ProductContext';
import { formatCurrency } from '../../utils/currency';
import { CartItemRow } from './CartItemRow';
import { Button } from '../ui/Button';
import { HeartIcon } from '../decorations/HeartIcon';
import { X, ShoppingBag, CheckCircle } from '@phosphor-icons/react';
import confetti from 'canvas-confetti';

export const CartDrawer: React.FC = () => {
  const { cart, isCartOpen, setIsCartOpen, cartTotal, cartItemCount, clearCart } = useProducts();
  const [checkoutComplete, setCheckoutComplete] = useState(false);

  const handleCheckout = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.5 },
        colors: ['#C5EFFA', '#87A9C2', '#FFFDD0', '#F5D7E5'],
      });
    } catch (e) {
      // ignore
    }
    setCheckoutComplete(true);
    setTimeout(() => {
      clearCart();
      setCheckoutComplete(false);
      setIsCartOpen(false);
    }, 2500);
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(82, 106, 124, 0.45)',
              backdropFilter: 'blur(3px)',
              zIndex: 60,
            }}
          />

          {/* Drawer container */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              width: '90%',
              maxWidth: '420px',
              backgroundColor: '#FFFFFF',
              zIndex: 61,
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '-6px 0 28px rgba(82, 106, 124, 0.25)',
              borderLeft: '2px solid #DDECF3',
            }}
          >
            {/* Drawer Header */}
            <div
              style={{
                padding: '20px',
                backgroundColor: '#C5EFFA',
                backgroundImage:
                  'linear-gradient(to right, rgba(255, 255, 255, 0.5) 1.5px, transparent 1.5px), linear-gradient(to bottom, rgba(255, 255, 255, 0.5) 1.5px, transparent 1.5px)',
                backgroundSize: '24px 24px',
                borderBottom: '2px dashed #9ECCDF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShoppingBag size={22} weight="fill" color="#5283A4" />
                <h3
                  style={{
                    fontFamily: "'Fredoka', sans-serif",
                    fontSize: '1.25rem',
                    color: '#3B6078',
                    margin: 0,
                  }}
                >
                  Shopping Cart ({cartItemCount})
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setIsCartOpen(false)}
                aria-label="Close Cart"
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: '#FFFFFF',
                  color: '#6F91AA',
                  border: '1px solid #BFDFEF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                <X size={18} weight="bold" />
              </button>
            </div>

            {/* Cart Body */}
            <div
              style={{
                flexGrow: 1,
                overflowY: 'auto',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              {checkoutComplete ? (
                <div
                  style={{
                    textAlign: 'center',
                    padding: '60px 20px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '12px',
                  }}
                >
                  <CheckCircle size={56} weight="fill" color="#5283A4" />
                  <h3 style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '1.5rem', color: '#374A58' }}>
                    Order Confirmed! ♡
                  </h3>
                  <p style={{ fontFamily: "'Caveat', cursive", fontSize: '1.25rem', color: '#6F91AA' }}>
                    Thank you for ordering with PastelStock!
                  </p>
                </div>
              ) : cart.length === 0 ? (
                <div
                  style={{
                    textAlign: 'center',
                    padding: '60px 20px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '12px',
                  }}
                >
                  <div
                    style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '50%',
                      backgroundColor: '#F3F9FC',
                      border: '1.5px dashed #CDE3EE',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <ShoppingBag size={30} color="#87A9C2" />
                  </div>
                  <h4 style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '1.15rem', color: '#526A7C', margin: 0 }}>
                    Your cart is empty
                  </h4>
                  <p style={{ fontFamily: "'Caveat', cursive", fontSize: '1.15rem', color: '#88A1B5', margin: 0 }}>
                    Browse our stationery & tech collection!
                  </p>
                  <Button
                    size="sm"
                    variant="primary"
                    onClick={() => setIsCartOpen(false)}
                    style={{ marginTop: '10px' }}
                  >
                    Browse Items
                  </Button>
                </div>
              ) : (
                cart.map((item) => <CartItemRow key={item.id} item={item} />)
              )}
            </div>

            {/* Cart Footer */}
            {cart.length > 0 && !checkoutComplete && (
              <div
                style={{
                  padding: '20px',
                  backgroundColor: '#FAFDFE',
                  borderTop: '2px dashed #DDECF3',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px',
                }}
              >
                {/* Subtotal row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontFamily: "'Caveat', cursive", fontSize: '1.3rem', color: '#6F91AA', fontWeight: 700 }}>
                    Cart Subtotal:
                  </span>
                  <span
                    style={{
                      fontFamily: "'Fredoka', sans-serif",
                      fontSize: '1.4rem',
                      fontWeight: 700,
                      color: '#3B6482',
                    }}
                  >
                    {formatCurrency(cartTotal)}
                  </span>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <Button variant="primary" fullWidth size="lg" onClick={handleCheckout}>
                    <span>Complete Order</span>
                    <HeartIcon size={16} color="#FFFFFF" />
                  </Button>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                    <Link to="/cart" onClick={() => setIsCartOpen(false)} style={{ textDecoration: 'none' }}>
                      <Button variant="outline" fullWidth size="sm">
                        <span>View Page</span>
                      </Button>
                    </Link>

                    <Button variant="ghost" fullWidth size="sm" onClick={clearCart}>
                      <span>Clear All</span>
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
