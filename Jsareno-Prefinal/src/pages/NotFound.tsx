import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { HeartIcon } from '../components/decorations/HeartIcon';
import { SparkleStar } from '../components/decorations/SparkleStar';
import { House, SquaresFour } from '@phosphor-icons/react';

export const NotFound: React.FC = () => {
  return (
    <div
      style={{
        maxWidth: '640px',
        margin: '80px auto',
        padding: '60px 24px',
        textAlign: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: '24px',
        border: '2px dashed #C5EFFA',
        boxShadow: '0 12px 32px rgba(111, 145, 170, 0.12)',
        position: 'relative',
      }}
    >
      <div style={{ position: 'absolute', top: '15px', left: '25px' }}>
        <SparkleStar size={24} color="#87A9C2" />
      </div>
      <div style={{ position: 'absolute', bottom: '20px', right: '30px' }}>
        <HeartIcon size={22} color="#F5D7E5" outlineColor="#B8829F" />
      </div>

      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
        <span style={{ fontFamily: "'Caveat', cursive", fontSize: '1.8rem', color: '#87A9C2', fontWeight: 700 }}>
          oops, missing page
        </span>
      </div>

      <h1
        className="font-outlined"
        style={{
          fontSize: '4.5rem',
          letterSpacing: '0.04em',
          color: '#FFFFFF',
          margin: '0 0 12px 0',
        }}
      >
        404
      </h1>

      <p style={{ color: '#5A6F7F', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '28px' }}>
        We couldn't find the scrapbook page you're looking for. Let's head back to your workspace!
      </p>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
        <Link to="/">
          <Button variant="primary" size="lg">
            <House size={18} weight="bold" />
            <span>Go to Home</span>
          </Button>
        </Link>
        <Link to="/products">
          <Button variant="outline" size="lg">
            <SquaresFour size={18} weight="bold" />
            <span>View Catalogue</span>
          </Button>
        </Link>
      </div>
    </div>
  );
};
