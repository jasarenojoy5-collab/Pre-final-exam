import React from 'react';
import type { ProductCategory } from '../../types/product';
import { MagnifyingGlass, SquaresFour, Table as TableIcon, Funnel, Warning } from '@phosphor-icons/react';

interface ProductFiltersProps {
  categories: ProductCategory[];
  selectedCategory: string;
  onSelectCategory: (category: ProductCategory) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  viewMode: 'cards' | 'table';
  onViewModeChange: (mode: 'cards' | 'table') => void;
  showOnlyLowStock: boolean;
  onToggleLowStock: () => void;
  lowStockCount: number;
}

export const ProductFilters: React.FC<ProductFiltersProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
  showOnlyLowStock,
  onToggleLowStock,
  lowStockCount,
}) => {
  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '18px',
        padding: '20px 24px',
        border: '1.5px solid #E2EFF6',
        boxShadow: '0 4px 16px rgba(111, 145, 170, 0.08)',
        marginBottom: '28px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}
    >
      {/* Top Row: Search input + View switcher + Low stock filter toggle */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '14px',
        }}
      >
        {/* Search Bar matching prompt: White rounded input, thin dusty-blue border, small search icon */}
        <div
          style={{
            position: 'relative',
            flexGrow: 1,
            minWidth: '240px',
            maxWidth: '460px',
          }}
        >
          <MagnifyingGlass
            size={18}
            color="#87A9C2"
            weight="bold"
            style={{
              position: 'absolute',
              left: '14px',
              top: '50%',
              transform: 'translateY(-50%)',
              pointerEvents: 'none',
            }}
          />
          <input
            type="text"
            placeholder="Search stationery, tech, or notebooks..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 16px 10px 40px',
              borderRadius: '9999px',
              border: '1.5px solid #BFD9E7',
              backgroundColor: '#FAFDFE',
              color: '#3A5263',
              outline: 'none',
              fontSize: '0.92rem',
              transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = '#87A9C2';
              e.currentTarget.style.boxShadow = '0 0 0 3px rgba(135, 169, 194, 0.2)';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = '#BFD9E7';
              e.currentTarget.style.boxShadow = 'none';
            }}
          />
        </div>

        {/* Right tools: Low Stock Quick Filter, Sort Selector, View Mode */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          {/* Low Stock Highlight Toggle Button */}
          <button
            type="button"
            onClick={onToggleLowStock}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 14px',
              borderRadius: '9999px',
              fontSize: '0.84rem',
              fontWeight: 600,
              backgroundColor: showOnlyLowStock ? '#FFF4D1' : '#F7FAFC',
              color: showOnlyLowStock ? '#996C0B' : '#6F91AA',
              border: showOnlyLowStock ? '1.5px solid #F0D98C' : '1.5px solid #DDECF3',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            <Warning size={15} weight={showOnlyLowStock ? 'fill' : 'bold'} color={showOnlyLowStock ? '#C4870B' : '#87A9C2'} />
            <span>Low Stock Only ({lowStockCount})</span>
          </button>

          {/* Sort By Dropdown */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <Funnel size={16} color="#87A9C2" />
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              style={{
                padding: '8px 14px',
                borderRadius: '9999px',
                border: '1.5px solid #DDECF3',
                backgroundColor: '#FAFDFE',
                color: '#476D88',
                fontWeight: 600,
                fontSize: '0.86rem',
                outline: 'none',
                cursor: 'pointer',
              }}
            >
              <option value="featured">Sort: Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name">Name: A to Z</option>
              <option value="stock">Stock: Low to High</option>
            </select>
          </div>

          {/* Card / Table View Mode Switcher */}
          <div
            style={{
              display: 'inline-flex',
              backgroundColor: '#F3F9FC',
              padding: '3px',
              borderRadius: '9999px',
              border: '1.5px solid #DDECF3',
            }}
          >
            <button
              type="button"
              onClick={() => onViewModeChange('cards')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                padding: '6px 12px',
                borderRadius: '9999px',
                backgroundColor: viewMode === 'cards' ? '#87A9C2' : 'transparent',
                color: viewMode === 'cards' ? '#FFFFFF' : '#6F91AA',
                fontSize: '0.82rem',
                fontWeight: 600,
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
              title="Card Grid Layout"
            >
              <SquaresFour size={16} weight="bold" />
              <span>Cards</span>
            </button>
            <button
              type="button"
              onClick={() => onViewModeChange('table')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                padding: '6px 12px',
                borderRadius: '9999px',
                backgroundColor: viewMode === 'table' ? '#87A9C2' : 'transparent',
                color: viewMode === 'table' ? '#FFFFFF' : '#6F91AA',
                fontSize: '0.82rem',
                fontWeight: 600,
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
              title="Table Layout"
            >
              <TableIcon size={16} weight="bold" />
              <span>Table</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Row: Category Filter Pill Buttons */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          overflowX: 'auto',
          paddingBottom: '4px',
        }}
      >
        <span
          style={{
            fontFamily: "'Caveat', cursive",
            fontSize: '1.15rem',
            color: '#7093AA',
            marginRight: '4px',
            whiteSpace: 'nowrap',
          }}
        >
          Categories:
        </span>
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => onSelectCategory(cat)}
              style={{
                padding: '6px 16px',
                borderRadius: '9999px',
                fontSize: '0.86rem',
                fontWeight: 600,
                whiteSpace: 'nowrap',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                backgroundColor: isSelected ? '#87A9C2' : '#FFFFFF',
                color: isSelected ? '#FFFFFF' : '#5E8199',
                border: isSelected ? '1.5px solid #759AB6' : '1.5px solid #D3E6F0',
                boxShadow: isSelected ? '0 3px 8px rgba(135, 169, 194, 0.35)' : 'none',
              }}
            >
              {cat}
            </button>
          );
        })}
      </div>
    </div>
  );
};
