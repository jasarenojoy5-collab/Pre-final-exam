import React, { useState } from 'react';
import { HeroSection } from '../components/sections/HeroSection';
import { CategoryTiles } from '../components/products/CategoryTiles';
import { DashboardOverview } from '../components/sections/DashboardOverview';
import { StayOrganizedBanner } from '../components/sections/StayOrganizedBanner';
import { AboutWorkspaceSection } from '../components/sections/AboutWorkspaceSection';
import { ProductGrid } from '../components/products/ProductGrid';
import { ProductTable } from '../components/products/ProductTable';
import { ProductFilters } from '../components/products/ProductFilters';
import { useProducts } from '../context/ProductContext';
import type { ProductCategory } from '../types/product';
import { HeartIcon } from '../components/decorations/HeartIcon';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { PlusCircle } from '@phosphor-icons/react';

const ALL_CATEGORIES: ProductCategory[] = [
  'All Products',
  'Electronics',
  'Accessories',
  'Stationery & Crafts',
  'Home & Workspace',
];

export const Home: React.FC = () => {
  const { products, lowStockCount } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState<string>('All Products');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');
  const [showOnlyLowStock, setShowOnlyLowStock] = useState(false);

  // Filter & sort logic
  const filteredProducts = products
    .filter((product) => {
      // Category filter
      if (selectedCategory !== 'All Products' && product.category !== selectedCategory) {
        return false;
      }
      // Low stock quick filter
      if (showOnlyLowStock && product.quantity >= 5) {
        return false;
      }
      // Search query
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
      // Default: featured first
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return 0;
    });

  const handleTileSelect = (cat: ProductCategory | 'Best Sellers' | 'On Sale') => {
    if (cat === 'Best Sellers') {
      setSelectedCategory('All Products');
      setSortBy('featured');
      setShowOnlyLowStock(false);
    } else if (cat === 'On Sale') {
      setShowOnlyLowStock(true);
    } else {
      setSelectedCategory(cat);
      setShowOnlyLowStock(false);
    }

    // Smooth scroll down to products section
    const el = document.getElementById('catalogue-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      {/* 1. Hero Section matching Wix Template */}
      <HeroSection />

      {/* 2. 4 Category Tiles directly under Hero */}
      <CategoryTiles
        selectedCategory={selectedCategory}
        onSelectCategory={handleTileSelect}
      />

      {/* 3. Dashboard Overview Metric Panels */}
      <DashboardOverview />

      {/* 4. Main Product Showcase Section */}
      <section
        id="catalogue-section"
        style={{
          maxWidth: '1240px',
          margin: '0 auto',
          padding: '20px 24px 60px 24px',
          width: '100%',
        }}
      >
        {/* Section Header */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: '16px',
            marginBottom: '24px',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span
                style={{
                  fontFamily: "'Caveat', cursive",
                  fontSize: '1.4rem',
                  color: '#87A9C2',
                  fontWeight: 700,
                }}
              >
                curated collection
              </span>
              <HeartIcon size={14} color="#F5D7E5" outlineColor="#B8829F" />
            </div>
            <h2
              style={{
                fontFamily: "'Fredoka', sans-serif",
                fontSize: '2rem',
                color: '#374A58',
                letterSpacing: '0.02em',
                margin: 0,
              }}
            >
              Featured Products & Inventory
            </h2>
          </div>

          <Link to="/add-product">
            <Button variant="secondary" size="md">
              <PlusCircle size={18} weight="bold" />
              <span>Add New Product</span>
            </Button>
          </Link>
        </div>

        {/* Filter & Search Bar */}
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

        {/* Product Cards Grid or Table View */}
        {viewMode === 'cards' ? (
          <ProductGrid products={filteredProducts} />
        ) : (
          <ProductTable products={filteredProducts} />
        )}
      </section>

      {/* 5. Stay Organized Full-Width Sky Blue Banner */}
      <StayOrganizedBanner />

      {/* 6. About Workspace Pastel Yellow Section */}
      <AboutWorkspaceSection />
    </div>
  );
};
