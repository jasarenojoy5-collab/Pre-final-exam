import React from 'react';
import { Link } from 'react-router-dom';
import { HeartIcon } from '../decorations/HeartIcon';
import { SparkleStar } from '../decorations/SparkleStar';
import { useProducts } from '../../context/ProductContext';
import { formatCurrency } from '../../utils/currency';
import { ArrowCounterClockwise, Package } from '@phosphor-icons/react';

export const Footer: React.FC = () => {
  const { totalProductsCount, overallInventoryTotal, lowStockCount, resetToDefaults } = useProducts();

  return (
    <footer style={{ marginTop: 'auto', backgroundColor: '#FFFFFF' }}>
      {/* Decorative Ribbon Banner matching the reference bottom strip */}
      <div
        style={{
          backgroundColor: '#87A9C2',
          color: '#FFFFFF',
          padding: '12px 16px',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          borderTop: '2px dashed #B6DDEB',
          borderBottom: '2px dashed #B6DDEB',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '24px',
            fontFamily: "'Fredoka', sans-serif",
            fontSize: '0.95rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            fontWeight: 600,
          }}
        >
          <span>PASTELSTOCK DESIGNS</span>
          <HeartIcon size={14} color="#F5D7E5" />
          <span>ORGANIZE YOUR LITTLE WORLD</span>
          <HeartIcon size={14} color="#F5D7E5" />
          <span>CCDI PRE-FINAL EXAM</span>
          <HeartIcon size={14} color="#F5D7E5" />
          <span>REACT + TYPESCRIPT</span>
          <HeartIcon size={14} color="#F5D7E5" />
          <span>PASTEL DUSK AESTHETIC</span>
        </div>
      </div>

      {/* Main Footer Content */}
      <div
        style={{
          backgroundColor: '#F7FBFE',
          padding: '48px 24px 32px 24px',
          borderTop: '1px solid #EBF3F7',
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '36px',
          }}
        >
          {/* Brand Column */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
              <span
                style={{
                  fontFamily: "'Fredoka', sans-serif",
                  fontSize: '1.6rem',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  color: '#87A9C2',
                }}
              >
                PASTEL
              </span>
              <span
                style={{
                  fontFamily: "'Sacramento', cursive",
                  fontSize: '2.1rem',
                  color: '#658FA9',
                }}
              >
                stock
              </span>
              <HeartIcon size={16} color="#F5D7E5" outlineColor="#C59BAF" />
            </div>
            <p
              style={{
                fontFamily: "'Caveat', cursive",
                fontSize: '1.2rem',
                color: '#6F91AA',
                marginBottom: '12px',
              }}
            >
              "Keep your favorite products organized, manage inventory, and make every detail easier to track."
            </p>
            <p style={{ fontSize: '0.85rem', color: '#88A1B5', lineHeight: 1.6 }}>
              A creative stationery-inspired Product Management App handcrafted with React, TypeScript, and Motion.
            </p>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4
              style={{
                fontFamily: "'Fredoka', sans-serif",
                fontSize: '1.05rem',
                color: '#526A7C',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <SparkleStar size={16} color="#87A9C2" />
              Quick Links
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li>
                <Link to="/" style={{ color: '#6F91AA', fontSize: '0.9rem', fontWeight: 500 }}>
                  ♡ Home Dashboard
                </Link>
              </li>
              <li>
                <Link to="/products" style={{ color: '#6F91AA', fontSize: '0.9rem', fontWeight: 500 }}>
                  ♡ All Products Catalogue
                </Link>
              </li>
              <li>
                <Link to="/add-product" style={{ color: '#6F91AA', fontSize: '0.9rem', fontWeight: 500 }}>
                  ♡ Add New Product Form
                </Link>
              </li>
              <li>
                <Link to="/cart" style={{ color: '#6F91AA', fontSize: '0.9rem', fontWeight: 500 }}>
                  ♡ Shopping Cart Summary
                </Link>
              </li>
            </ul>
          </div>

          {/* Real-time Inventory Snapshot */}
          <div>
            <h4
              style={{
                fontFamily: "'Fredoka', sans-serif",
                fontSize: '1.05rem',
                color: '#526A7C',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <Package size={18} color="#87A9C2" />
              Inventory Status
            </h4>
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '12px',
                padding: '14px 18px',
                border: '1.5px solid #DDECF3',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                fontSize: '0.88rem',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#526A7C' }}>
                <span>Total Items:</span>
                <strong>{totalProductsCount} products</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#526A7C' }}>
                <span>Inventory Value:</span>
                <strong style={{ color: '#4E7796' }}>{formatCurrency(overallInventoryTotal)}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#526A7C' }}>
                <span>Low / Out Stock:</span>
                <strong style={{ color: lowStockCount > 0 ? '#C97D1A' : '#5283A4' }}>
                  {lowStockCount} items
                </strong>
              </div>
            </div>

            <div style={{ marginTop: '12px' }}>
              <button
                type="button"
                onClick={resetToDefaults}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.8rem',
                  color: '#6F91AA',
                  backgroundColor: '#EBF4F9',
                  padding: '6px 12px',
                  borderRadius: '9999px',
                  cursor: 'pointer',
                  border: '1px solid #CDE4F0',
                }}
              >
                <ArrowCounterClockwise size={14} />
                Reset Default Exam Dataset
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Credits */}
        <div
          style={{
            maxWidth: '1200px',
            margin: '36px auto 0 auto',
            paddingTop: '20px',
            borderTop: '1px solid #E2EFF6',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            fontSize: '0.82rem',
            color: '#8CA4B5',
          }}
        >
          <div>
            Computer Communication Development Institute (CCDI) • Sorsogon City • Pre-Final Exam
          </div>
          <div>
            Designed with <HeartIcon size={12} color="#F5D7E5" /> in Pastel Dusk Scrapbook Stationery Aesthetic
          </div>
        </div>
      </div>
    </footer>
  );
};
