import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useProducts } from '../../context/ProductContext';
import { List, ShoppingBag, PlusCircle, House, SquaresFour, MagnifyingGlass } from '@phosphor-icons/react';
import { HeartIcon } from '../decorations/HeartIcon';
import { MobileMenu } from './MobileMenu';

export const Navbar: React.FC = () => {
  const { cartItemCount, setIsCartOpen } = useProducts();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { label: 'Home', path: '/', icon: <House size={18} /> },
    { label: 'Products', path: '/products', icon: <SquaresFour size={18} /> },
    { label: 'Add Product', path: '/add-product', icon: <PlusCircle size={18} /> },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 40,
          backgroundColor: '#FFFFFF',
          borderBottom: '1.5px solid #EBF3F7',
          boxShadow: '0 2px 10px rgba(111, 145, 170, 0.06)',
        }}
      >
        <div
          style={{
            maxWidth: '1240px',
            margin: '0 auto',
            padding: '12px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Left: Mobile hamburger menu toggle & quick links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', minWidth: '160px' }}>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open Navigation Menu"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                backgroundColor: '#F3F9FC',
                color: '#6F91AA',
                border: '1px solid #DDECF3',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#E2F3FA';
                e.currentTarget.style.color = '#4E7796';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#F3F9FC';
                e.currentTarget.style.color = '#6F91AA';
              }}
            >
              <List size={22} weight="bold" />
            </button>

            {/* Desktop Navigation Links */}
            <nav style={{ display: 'none' }} className="desktop-nav-container">
              <style>{`
                @media (min-width: 860px) {
                  .desktop-nav-container {
                    display: flex !important;
                    align-items: center;
                    gap: 12px;
                  }
                }
              `}</style>
              {navLinks.map((link) => {
                const active = isActive(link.path);
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '6px 14px',
                      borderRadius: '9999px',
                      fontSize: '0.88rem',
                      fontWeight: 600,
                      color: active ? '#487596' : '#6F91AA',
                      backgroundColor: active ? '#EBF5FA' : 'transparent',
                      border: active ? '1px solid #CDE5F2' : '1px solid transparent',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    {link.icon}
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Center: Brand Logo matching the reference image typography */}
          <Link
            to="/"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textDecoration: 'none',
              padding: '2px 8px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', position: 'relative' }}>
              <span
                style={{
                  fontFamily: "'Fredoka', sans-serif",
                  fontSize: '1.65rem',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  color: '#87A9C2',
                  textTransform: 'uppercase',
                }}
              >
                PASTEL
              </span>
              <span
                style={{
                  fontFamily: "'Sacramento', cursive",
                  fontSize: '2.05rem',
                  color: '#658FA9',
                  lineHeight: '1',
                  marginTop: '-4px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '2px',
                }}
              >
                stock
                <HeartIcon size={14} color="#F5D7E5" outlineColor="#D4A7BE" />
              </span>
            </div>
            <span
              style={{
                fontFamily: "'Caveat', cursive",
                fontSize: '0.85rem',
                color: '#8FAABF',
                letterSpacing: '0.04em',
                marginTop: '-4px',
              }}
            >
              Organize Your Little World
            </span>
          </Link>

          {/* Right: Search shortcut & Shopping Cart Button with badge */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '12px', minWidth: '160px' }}>
            <Link
              to="/products"
              title="Search Products"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                backgroundColor: '#F7FBFE',
                color: '#6F91AA',
                border: '1px solid #E2EFF6',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              <MagnifyingGlass size={19} weight="bold" />
            </Link>

            {/* Cart trigger button */}
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              aria-label="View Shopping Cart"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                borderRadius: '9999px',
                backgroundColor: cartItemCount > 0 ? '#C5EFFA' : '#F3F9FC',
                color: '#3B6078',
                border: '1.5px solid #AFDDEC',
                fontWeight: 600,
                fontSize: '0.88rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                position: 'relative',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#B2E7F5';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = cartItemCount > 0 ? '#C5EFFA' : '#F3F9FC';
              }}
            >
              <ShoppingBag size={20} weight={cartItemCount > 0 ? 'fill' : 'regular'} color="#4F7996" />
              <span style={{ fontFamily: "'Fredoka', sans-serif" }}>Cart</span>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minWidth: '20px',
                  height: '20px',
                  padding: '0 6px',
                  borderRadius: '10px',
                  backgroundColor: cartItemCount > 0 ? '#87A9C2' : '#D1E3ED',
                  color: '#FFFFFF',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                }}
              >
                {cartItemCount}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Slide-out Navigation Drawer for mobile/menu */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  );
};
