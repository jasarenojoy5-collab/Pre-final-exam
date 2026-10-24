import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SparkleStar } from '../decorations/SparkleStar';
import { HeartIcon } from '../decorations/HeartIcon';
import { PaperClip } from '../decorations/PaperClip';
import { WashiTape } from '../decorations/WashiTape';
import { Button } from '../ui/Button';
import { ArrowRight } from '@phosphor-icons/react';

export const HeroSection: React.FC = () => {
  return (
    <section
      className="bg-grid-paper"
      style={{
        position: 'relative',
        width: '100%',
        padding: '60px 24px 80px 24px',
        overflow: 'hidden',
        borderBottom: '2px dashed #B6DDEB',
      }}
    >
      {/* Floating Decorative Stars & Hearts in Background */}
      <div style={{ position: 'absolute', top: '15%', left: '8%', pointerEvents: 'none' }}>
        <SparkleStar size={24} color="#87A9C2" />
      </div>
      <div style={{ position: 'absolute', top: '25%', left: '42%', pointerEvents: 'none' }}>
        <SparkleStar size={18} color="#FFFFFF" />
      </div>
      <div style={{ position: 'absolute', bottom: '15%', left: '20%', pointerEvents: 'none' }}>
        <HeartIcon size={20} color="#F5D7E5" />
      </div>
      <div style={{ position: 'absolute', top: '12%', right: '12%', pointerEvents: 'none' }}>
        <SparkleStar size={22} color="#FFFFFF" />
      </div>
      <div style={{ position: 'absolute', bottom: '20%', right: '6%', pointerEvents: 'none' }}>
        <SparkleStar size={26} color="#87A9C2" />
      </div>

      <div
        style={{
          maxWidth: '1240px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          alignItems: 'center',
          gap: '48px',
          position: 'relative',
          zIndex: 2,
        }}
      >
        {/* Left Side: Typography & Call to Action */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
        >
          {/* Handwritten Subtitle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                fontFamily: "'Caveat', cursive",
                fontSize: '2.2rem',
                color: '#526A7C',
                lineHeight: 1,
              }}
            >
              welcome to your
            </span>
            <HeartIcon size={18} color="#F5D7E5" outlineColor="#B8829F" />
          </div>

          {/* Large Outlined Display Heading matching "NEW PRINTABLES" in Reference */}
          <div style={{ position: 'relative', margin: '4px 0' }}>
            <h1
              className="font-outlined"
              style={{
                fontSize: 'clamp(2.6rem, 5.8vw, 4.4rem)',
                lineHeight: 1.05,
                margin: 0,
                color: '#FFFFFF',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
              }}
            >
              PRODUCT <br /> SPACE
            </h1>

            {/* Sparkles around heading */}
            <div style={{ position: 'absolute', top: '-8px', right: '15%' }}>
              <SparkleStar size={24} color="#87A9C2" />
            </div>
            <div style={{ position: 'absolute', bottom: '6px', left: '-12px' }}>
              <SparkleStar size={18} color="#87A9C2" />
            </div>
          </div>

          {/* Description */}
          <p
            style={{
              fontSize: '1.05rem',
              color: '#4A6578',
              lineHeight: 1.6,
              maxWidth: '460px',
              fontFamily: "'Quicksand', sans-serif",
              fontWeight: 500,
            }}
          >
            Keep your favorite products organized, manage inventory, and make every detail easier to track.
          </p>

          {/* Action Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginTop: '12px', flexWrap: 'wrap' }}>
            <Link to="/products">
              <Button size="lg" variant="primary">
                <span>Explore Products</span>
                <ArrowRight size={18} weight="bold" />
              </Button>
            </Link>

            <Link to="/add-product">
              <Button size="lg" variant="outline">
                <span>Add Product</span>
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Right Side: Scrapbook Overlapping Photographs with Clips & Washi Tape */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, rotate: 2 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          style={{
            position: 'relative',
            height: '420px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Back Scrapbook Photo (Rotated Left) */}
          <motion.div
            whileHover={{ scale: 1.04, rotate: -4, zIndex: 10 }}
            transition={{ duration: 0.25 }}
            style={{
              position: 'absolute',
              left: '5%',
              top: '12%',
              transform: 'rotate(-7deg)',
              zIndex: 3,
            }}
          >
            {/* Bulldog Clip at top */}
            <div style={{ position: 'absolute', top: '-24px', left: '42%', zIndex: 6 }}>
              <PaperClip color="#87A9C2" size={44} />
            </div>

            <div
              className="polaroid-frame"
              style={{
                width: '240px',
                backgroundColor: '#FFFFFF',
                borderRadius: '6px',
                border: '1px solid #D5E8F3',
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80"
                alt="Stationery Journal and Scrapbook"
                style={{
                  width: '100%',
                  height: '190px',
                  objectFit: 'cover',
                  borderRadius: '3px',
                }}
              />
              <div
                style={{
                  paddingTop: '8px',
                  textAlign: 'center',
                  fontFamily: "'Caveat', cursive",
                  fontSize: '1.2rem',
                  color: '#658FA9',
                  fontWeight: 700,
                }}
              >
                stickers & washi kit ♡
              </div>
            </div>
          </motion.div>

          {/* Front Scrapbook Photo (Rotated Right) */}
          <motion.div
            whileHover={{ scale: 1.05, rotate: 5, zIndex: 10 }}
            transition={{ duration: 0.25 }}
            style={{
              position: 'absolute',
              right: '8%',
              top: '20%',
              transform: 'rotate(5deg)',
              zIndex: 4,
            }}
          >
            {/* Bulldog Clip at top */}
            <div style={{ position: 'absolute', top: '-24px', right: '35%', zIndex: 6 }}>
              <PaperClip color="#789CB5" size={44} />
            </div>

            {/* Cute Washi Tape on corner */}
            <div style={{ position: 'absolute', bottom: '-10px', left: '-15px', zIndex: 7 }}>
              <WashiTape color="#FFFDD0" pattern="stripes" width={90} rotation={-12} />
            </div>

            <div
              className="polaroid-frame"
              style={{
                width: '260px',
                backgroundColor: '#FFFFFF',
                borderRadius: '6px',
                border: '1px solid #D5E8F3',
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1585776245993-9426f8d3d9e4?auto=format&fit=crop&w=600&q=80"
                alt="Cute Planner and Stationery Layout"
                style={{
                  width: '100%',
                  height: '210px',
                  objectFit: 'cover',
                  borderRadius: '3px',
                }}
              />
              <div
                style={{
                  paddingTop: '8px',
                  textAlign: 'center',
                  fontFamily: "'Caveat', cursive",
                  fontSize: '1.25rem',
                  color: '#526A7C',
                  fontWeight: 700,
                }}
              >
                cute digital planners ✨
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

