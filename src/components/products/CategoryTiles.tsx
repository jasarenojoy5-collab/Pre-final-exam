import React from 'react';
import { motion } from 'framer-motion';
import type { ProductCategory } from '../../types/product';
import { Sparkle, Flame, Gift } from '@phosphor-icons/react';

interface CategoryTilesProps {
  selectedCategory: string;
  onSelectCategory: (category: ProductCategory | 'Best Sellers' | 'On Sale') => void;
}

export const CategoryTiles: React.FC<CategoryTilesProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  const tiles = [
    {
      id: 'best-sellers',
      title: 'Best Sellers',
      subtitle: 'Top Rated Picks',
      categoryTarget: 'All Products' as ProductCategory,
      filterType: 'Best Sellers',
      bgClass: 'bg-grid-paper',
      textColor: '#47708C',
      subColor: '#6B90A9',
      borderColor: '#B0DFEE',
      icon: <Sparkle size={18} weight="fill" color="#5A8BAA" />,
    },
    {
      id: 'electronics',
      title: 'Shop New',
      subtitle: 'Modern Tech & Tools',
      categoryTarget: 'Electronics' as ProductCategory,
      filterType: 'Electronics',
      bgClass: 'bg-polka-dots',
      textColor: '#FFFFFF',
      subColor: '#E2EEF5',
      borderColor: '#6F91AA',
      icon: <Flame size={18} weight="fill" color="#FFFFFF" />,
    },
    {
      id: 'sale',
      title: 'Now on Sale',
      subtitle: 'Stock Clearance',
      categoryTarget: 'Home & Workspace' as ProductCategory,
      filterType: 'On Sale',
      bgClass: 'bg-pinstripes',
      textColor: '#69581A',
      subColor: '#8C7733',
      borderColor: '#ECE4A7',
      icon: <Sparkle size={18} weight="fill" color="#A3872A" />,
    },
    {
      id: 'crafts',
      title: 'Get Gifting',
      subtitle: 'Stationery & Crafts',
      categoryTarget: 'Stationery & Crafts' as ProductCategory,
      filterType: 'Stationery & Crafts',
      bgClass: 'bg-hearts-pattern',
      textColor: '#FFFFFF',
      subColor: '#EBF3F8',
      borderColor: '#628198',
      icon: <Gift size={18} weight="fill" color="#FFFFFF" />,
    },
  ];

  return (
    <section style={{ maxWidth: '1240px', margin: '0 auto', padding: '40px 24px' }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '20px',
        }}
      >
        {tiles.map((tile, index) => {
          const isSelected =
            selectedCategory === tile.filterType ||
            selectedCategory === tile.categoryTarget;

          return (
            <motion.div
              key={tile.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: index * 0.08 }}
              whileHover={{ y: -6, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelectCategory(tile.categoryTarget)}
              className={`${tile.bgClass} scrapbook-category-tile`}
              style={{
                aspectRatio: '1 / 1',
                borderRadius: '16px',
                border: `2px solid ${isSelected ? '#355973' : tile.borderColor}`,
                padding: '24px 18px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                cursor: 'pointer',
                boxShadow: isSelected
                  ? '0 12px 28px rgba(53, 89, 115, 0.25), 0 0 0 3px #87A9C2'
                  : '0 6px 18px rgba(111, 145, 170, 0.12)',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.25s ease',
              }}
            >
              {/* Floating icon badge */}
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.85)',
                  backdropFilter: 'blur(4px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '14px',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
                }}
              >
                {tile.icon}
              </div>

              {/* Handwritten Title matching reference image cursive lettering */}
              <h3
                style={{
                  fontFamily: "'Caveat', cursive",
                  fontSize: '2.2rem',
                  lineHeight: '1.1',
                  color: tile.textColor,
                  fontWeight: 700,
                  textShadow:
                    tile.textColor === '#FFFFFF'
                      ? '0 1px 3px rgba(50, 75, 95, 0.4)'
                      : '0 1px 1px rgba(255, 255, 255, 0.6)',
                  marginBottom: '4px',
                }}
              >
                {tile.title}
              </h3>

              {/* Subtitle */}
              <p
                style={{
                  fontFamily: "'Quicksand', sans-serif",
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  color: tile.subColor,
                  textShadow:
                    tile.textColor === '#FFFFFF'
                      ? '0 1px 2px rgba(50, 75, 95, 0.3)'
                      : 'none',
                }}
              >
                {tile.subtitle}
              </p>

              {/* Cute indicator pill on active */}
              {isSelected && (
                <div
                  style={{
                    position: 'absolute',
                    bottom: '12px',
                    backgroundColor: '#FFFFFF',
                    color: '#3B6078',
                    padding: '3px 12px',
                    borderRadius: '9999px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                  }}
                >
                  Active Filter ✓
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
