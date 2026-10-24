import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, House, SquaresFour, PlusCircle, ShoppingBag, ArrowRight } from '@phosphor-icons/react';
import { useProducts } from '../../context/ProductContext';
import { HeartIcon } from '../decorations/HeartIcon';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const location = useLocation();
  const { cartItemCount, resetToDefaults } = useProducts();

  const links = [
    { label: 'Home Page', path: '/', icon: <House size={20} /> },
    { label: 'Products Catalogue', path: '/products', icon: <SquaresFour size={20} /> },
    { label: 'Add New Product', path: '/add-product', icon: <PlusCircle size={20} /> },
    { label: 'Shopping Cart', path: '/cart', icon: <ShoppingBag size={20} />, badge: cartItemCount },
  ];

  const handleLinkClick = () => {
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(82, 106, 124, 0.4)',
              backdropFilter: 'blur(3px)',
              zIndex: 50,
            }}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              bottom: 0,
              width: '85%',
              maxWidth: '340px',
              backgroundColor: '#FFFFFF',
              zIndex: 51,
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '4px 0 24px rgba(82, 106, 124, 0.25)',
              borderRight: '2px solid #DDECF3',
            }}
          >
            {/* Header in Drawer */}
            <div
              style={{
                padding: '24px 20px',
                backgroundColor: '#C5EFFA',
                backgroundImage:
                  'linear-gradient(to right, rgba(255, 255, 255, 0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.5) 1px, transparent 1px)',
                backgroundSize: '24px 24px',
                borderBottom: '2px dashed #9ECCDF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span
                    style={{
                      fontFamily: "'Fredoka', sans-serif",
                      fontSize: '1.4rem',
                      fontWeight: 700,
                      color: '#87A9C2',
                    }}
                  >
                    PASTEL
                  </span>
                  <span
                    style={{
                      fontFamily: "'Sacramento', cursive",
                      fontSize: '1.8rem',
                      color: '#658FA9',
                    }}
                  >
                    stock
                  </span>
                  <HeartIcon size={14} color="#F5D7E5" outlineColor="#C59BAF" />
                </div>
                <p
                  style={{
                    fontFamily: "'Caveat', cursive",
                    fontSize: '1.05rem',
                    color: '#5C829B',
                    margin: 0,
                  }}
                >
                  Scrapbook Product Studio
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close Menu"
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  backgroundColor: '#FFFFFF',
                  color: '#6F91AA',
                  border: '1px solid #C1DFEE',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                <X size={18} weight="bold" />
              </button>
            </div>

            {/* Navigation Items */}
            <div style={{ flexGrow: 1, padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div
                style={{
                  fontFamily: "'Caveat', cursive",
                  fontSize: '1.1rem',
                  color: '#87A9C2',
                  paddingLeft: '12px',
                  marginBottom: '4px',
                }}
              >
                Explore Workspace
              </div>

              {links.map((link) => {
                const active = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={handleLinkClick}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px 16px',
                      borderRadius: '12px',
                      backgroundColor: active ? '#DDECF3' : '#F9FCFD',
                      color: active ? '#3D6884' : '#5E7D93',
                      border: active ? '1.5px solid #BDDEEE' : '1.5px solid transparent',
                      fontWeight: 600,
                      fontSize: '0.95rem',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      {link.icon}
                      <span>{link.label}</span>
                    </div>
                    {link.badge !== undefined && link.badge > 0 ? (
                      <span
                        style={{
                          backgroundColor: '#87A9C2',
                          color: '#FFFFFF',
                          padding: '2px 8px',
                          borderRadius: '10px',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                        }}
                      >
                        {link.badge}
                      </span>
                    ) : (
                      <ArrowRight size={14} color="#A9BDCC" />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Drawer Footer with Reset helper */}
            <div
              style={{
                padding: '20px',
                borderTop: '1px solid #EBF3F7',
                backgroundColor: '#FAF9F3',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              <button
                type="button"
                onClick={() => {
                  resetToDefaults();
                  onClose();
                }}
                style={{
                  padding: '8px 14px',
                  borderRadius: '8px',
                  backgroundColor: '#FFFFFF',
                  color: '#6F91AA',
                  border: '1px dashed #BFD7E5',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  textAlign: 'center',
                }}
              >
                Reset Default Exam Products
              </button>
              <div
                style={{
                  textAlign: 'center',
                  fontSize: '0.75rem',
                  color: '#A9BDCC',
                }}
              >
                CCDI Pre-Final Exam • React + TS
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
