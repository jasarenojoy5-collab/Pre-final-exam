import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SparkleStar } from '../decorations/SparkleStar';
import { HeartIcon } from '../decorations/HeartIcon';
import { PaperClip } from '../decorations/PaperClip';
import { WashiTape } from '../decorations/WashiTape';
import { Button } from '../ui/Button';
import { Check, ArrowRight } from '@phosphor-icons/react';

export const AboutWorkspaceSection: React.FC = () => {
  return (
    <section
      style={{
        backgroundColor: '#FFFDD0',
        width: '100%',
        padding: '72px 24px',
        borderTop: '2px dashed #EADE96',
        borderBottom: '2px dashed #EADE96',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative stars */}
      <div style={{ position: 'absolute', top: '15%', right: '10%', pointerEvents: 'none' }}>
        <SparkleStar size={24} color="#87A9C2" />
      </div>
      <div style={{ position: 'absolute', bottom: '15%', right: '40%', pointerEvents: 'none' }}>
        <HeartIcon size={20} color="#F5D7E5" />
      </div>

      <div
        style={{
          maxWidth: '1180px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          alignItems: 'center',
          gap: '48px',
        }}
      >
        {/* Left Side: Scrapbook Polaroid on Grid Card matching reference bottom photo */}
        <div style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
          {/* Subtle Grid Card Backing */}
          <div
            style={{
              position: 'absolute',
              width: '320px',
              height: '380px',
              backgroundColor: '#FFFFFF',
              borderRadius: '12px',
              border: '1.5px solid #EADE96',
              backgroundImage:
                'linear-gradient(to right, rgba(182, 221, 235, 0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(182, 221, 235, 0.4) 1px, transparent 1px)',
              backgroundSize: '24px 24px',
              transform: 'rotate(-4deg) translate(-15px, -10px)',
              zIndex: 1,
            }}
          />

          {/* Polaroid Frame */}
          <motion.div
            whileHover={{ scale: 1.03, rotate: 2 }}
            transition={{ duration: 0.25 }}
            className="polaroid-frame"
            style={{
              position: 'relative',
              zIndex: 2,
              width: '290px',
              backgroundColor: '#FFFFFF',
              borderRadius: '6px',
              border: '1px solid #E8E5BA',
              transform: 'rotate(2deg)',
            }}
          >
            {/* Paper clip at top */}
            <div style={{ position: 'absolute', top: '-22px', left: '20px', zIndex: 10 }}>
              <PaperClip color="#87A9C2" size={40} />
            </div>

            {/* Washi tape at corner */}
            <div style={{ position: 'absolute', bottom: '-10px', right: '-12px', zIndex: 10 }}>
              <WashiTape color="#C5EFFA" pattern="dots" width={90} rotation={-6} />
            </div>

            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=700&q=80"
              alt="Workspace Curator"
              style={{
                width: '100%',
                height: '300px',
                objectFit: 'cover',
                borderRadius: '4px',
              }}
            />
            <div
              style={{
                paddingTop: '10px',
                textAlign: 'center',
                fontFamily: "'Caveat', cursive",
                fontSize: '1.25rem',
                color: '#658FA9',
                fontWeight: 700,
              }}
            >
              manage with joy ♡
            </div>
          </motion.div>
        </div>

        {/* Right Side: Editorial Text matching "learn more ABOUT US" */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Small handwritten subtitle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span
              style={{
                fontFamily: "'Caveat', cursive",
                fontSize: '2rem',
                color: '#7D6D28',
                lineHeight: 1,
              }}
            >
              discover more
            </span>
            <HeartIcon size={16} color="#F5D7E5" outlineColor="#B8829F" />
          </div>

          {/* Large Outlined Display Heading */}
          <h2
            className="font-outlined"
            style={{
              fontSize: 'clamp(2.4rem, 4.5vw, 3.6rem)',
              letterSpacing: '0.05em',
              color: '#FFFFFF',
              textTransform: 'uppercase',
              margin: 0,
            }}
          >
            ABOUT YOUR WORKSPACE
          </h2>

          <p
            style={{
              fontSize: '1rem',
              color: '#5C542E',
              lineHeight: 1.7,
              fontFamily: "'Quicksand', sans-serif",
            }}
          >
            PastelStock brings the tactile nostalgia of digital stationery, washi tape, and bullet journals into a modern, full-featured product management system.
          </p>

          {/* Feature List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', margin: '8px 0' }}>
            {[
              'Real-time subtotal computation per product (Price × Quantity)',
              'Overall inventory valuation computed automatically using Array.reduce()',
              'Intuitive stock indicators with custom Low Stock (< 5) conditional highlights',
              'Integrated shopping cart with persistent localStorage saving',
            ].map((text, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <div
                  style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    backgroundColor: '#87A9C2',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    marginTop: '2px',
                  }}
                >
                  <Check size={12} weight="bold" />
                </div>
                <span style={{ fontSize: '0.92rem', color: '#574D28', fontWeight: 600 }}>
                  {text}
                </span>
              </div>
            ))}
          </div>

          {/* Action buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginTop: '12px', flexWrap: 'wrap' }}>
            <Link to="/products">
              <Button variant="primary" size="md">
                <span>Browse Catalogue</span>
                <ArrowRight size={16} weight="bold" />
              </Button>
            </Link>
            <Link to="/add-product">
              <Button variant="outline" size="md">
                <span>Add New Item</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

