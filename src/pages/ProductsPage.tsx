import React, { useState } from 'react';
import { useProducts } from '../context/ProductContext';
import { ProductFilters } from '../components/products/ProductFilters';
import { ProductGrid } from '../components/products/ProductGrid';
import { ProductTable } from '../components/products/ProductTable';
import type { ProductCategory } from '../types/product';
import { formatCurrency } from '../utils/currency';
import { HeartIcon } from '../components/decorations/HeartIcon';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { PlusCircle, ArrowCounterClockwise } from '@phosphor-icons/react';

const ALL_CATEGORIES: ProductCategory[] = [
  'All Products',
  'Electronics',
  'Accessories',
  'Stationery & Crafts',
  'Home & Workspace',
];

export const ProductsPage: React.FC = () => {
  const { products, overallInventoryTotal, lowStockCount, resetToDefaults } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState<string>('All Products');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');
  const [showOnlyLowStock, setShowOnlyLowStock] = useState(false);

  const filteredProducts = products
    .filter((product) => {
      if (selectedCategory !== 'All Products' && product.category !== selectedCategory) {
        return false;
      }
      if (showOnlyLowStock && product.quantity >= 5) {
        return false;
      }
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesCategory = product.category.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        return matchesName || matchesCategory || matchesDesc;
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'stock') return a.quantity - b.quantity;
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return 0;
    });

  return (
    <div style={{ width: '100%', paddingBottom: '60px' }}>
      {/* Header Banner */}
      <div
        className="bg-grid-paper"
        style={{
          padding: '48px 24px 40px 24px',
          borderBottom: '2px dashed #B6DDEB',
          textAlign: 'center',
          position: 'relative',
        }}
      >
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span style={{ fontFamily: "'Caveat', cursive", fontSize: '1.6rem', color: '#526A7C', fontWeight: 700 }}>
              all products catalogue
            </span>
            <HeartIcon size={18} color="#F5D7E5" outlineColor="#B8829F" />
          </div>

          <h1
            className="font-outlined"
            style={{
              fontSize: 'clamp(2.4rem, 5vw, 3.6rem)',
              color: '#FFFFFF',
              letterSpacing: '0.04em',
              margin: '0 0 10px 0',
              textTransform: 'uppercase',
            }}
          >
            INVENTORY COLLECTION
          </h1>

          <p style={{ color: '#4F728A', fontSize: '1rem', fontWeight: 500 }}>
            Manage stock levels, track computed subtotals, and organize your favorite stationery & tech products.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '36px 24px 0 24px' }}>
        {/* Inventory Summary Bar */}
        <div
          style={{
            backgroundColor: '#FAFDFE',
            border: '1.5px solid #DDECF3',
            borderRadius: '16px',
            padding: '16px 24px',
            marginBottom: '24px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
            <div>
              <span style={{ fontSize: '0.8rem', color: '#88A1B5', display: 'block' }}>Showing Items</span>
              <strong style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '1.15rem', color: '#3A5263' }}>
                {filteredProducts.length} of {products.length} Products
              </strong>
            </div>

            <div style={{ height: '30px', width: '1px', backgroundColor: '#DDECF3' }} />

            <div>
              <span style={{ fontSize: '0.8rem', color: '#88A1B5', display: 'block' }}>Overall Total Value</span>
              <strong style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '1.15rem', color: '#4E7796' }}>
                {formatCurrency(overallInventoryTotal)}
              </strong>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              type="button"
              onClick={resetToDefaults}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                borderRadius: '9999px',
                backgroundColor: '#FFFFFF',
                color: '#6F91AA',
                border: '1px solid #D5E7F2',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              <ArrowCounterClockwise size={14} />
              <span>Reset Default Products</span>
            </button>

            <Link to="/add-product">
              <Button size="sm" variant="primary">
                <PlusCircle size={16} weight="bold" />
                <span>Add Product</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Filter controls */}
        <ProductFilters
          categories={ALL_CATEGORIES}
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => setSelectedCategory(cat)}
          searchQuery={searchQuery}
          onSearchChange={(q) => setSearchQuery(q)}
          sortBy={sortBy}
          onSortChange={(s) => setSortBy(s)}
          viewMode={viewMode}
          onViewModeChange={(m) => setViewMode(m)}
          showOnlyLowStock={showOnlyLowStock}
          onToggleLowStock={() => setShowOnlyLowStock((prev) => !prev)}
          lowStockCount={lowStockCount}
        />

        {/* Product Cards or Table */}
        {viewMode === 'cards' ? (
          <ProductGrid products={filteredProducts} />
        ) : (
          <ProductTable products={filteredProducts} />
        )}
      </div>
    </div>
  );
};
