import React from 'react';
import { Link } from 'react-router-dom';
import { HeartIcon } from '../decorations/HeartIcon';
import { Button } from '../ui/Button';
import { Envelope, Package, PlusCircle } from '@phosphor-icons/react';

export const StayOrganizedBanner: React.FC = () => {
  return (
    <section
      style={{
        width: '100%',
        backgroundColor: '#C5EFFA',
        backgroundImage:
          'linear-gradient(to right, rgba(255, 255, 255, 0.45) 1.5px, transparent 1.5px), linear-gradient(to bottom, rgba(255, 255, 255, 0.45) 1.5px, transparent 1.5px)',
        backgroundSize: '30px 30px',
        padding: '56px 24px',
        margin: '40px 0',
        borderTop: '2px dashed #B2D8E6',
        borderBottom: '2px dashed #B2D8E6',
        textAlign: 'center',
        position: 'relative',
      }}
    >
      <div style={{ maxWidth: '680px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px' }}>
        {/* Envelope with cute pink heart icon matching Wix template */}
        <div
          style={{
            position: 'relative',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '54px',
            height: '46px',
            backgroundColor: '#FFFFFF',
            borderRadius: '10px',
            boxShadow: '0 4px 12px rgba(82, 106, 124, 0.15)',
            border: '1.5px solid #D5EBF5',
          }}
        >
          <Envelope size={28} color="#87A9C2" weight="fill" />
          <div style={{ position: 'absolute', top: '-8px', right: '-4px' }}>
            <HeartIcon size={18} color="#F5D7E5" outlineColor="#B8829F" />
          </div>
        </div>

        {/* Outlined display heading matching reference "JOIN the club" */}
        <h2
          className="font-outlined"
          style={{
            fontSize: 'clamp(2.2rem, 4.2vw, 3.2rem)',
            letterSpacing: '0.06em',
            color: '#FFFFFF',
            textTransform: 'uppercase',
            margin: 0,
          }}
        >
          STAY ORGANIZED
        </h2>

        {/* Supporting text */}
        <p
          style={{
            fontSize: '1.05rem',
            color: '#496B82',
            fontWeight: 500,
            maxWidth: '520px',
            lineHeight: 1.6,
          }}
        >
          Keep track of your products and manage everything in one simple workspace.
        </p>

        {/* Functional Navigation Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px', marginTop: '10px', flexWrap: 'wrap' }}>
          <Link to="/products">
            <Button variant="primary" size="lg">
              <Package size={18} weight="bold" />
              <span>View Inventory</span>
            </Button>
          </Link>

          <Link to="/add-product">
            <Button variant="outline" size="lg">
              <PlusCircle size={18} weight="bold" />
              <span>Add Product</span>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

