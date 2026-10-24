import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProductProvider } from './context/ProductContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { CartDrawer } from './components/cart/CartDrawer';
import { ToastNotification } from './components/ui/ToastNotification';
import { Home } from './pages/Home';
import { ProductsPage } from './pages/ProductsPage';
import { ProductDetails } from './pages/ProductDetails';
import { AddProduct } from './pages/AddProduct';
import { CartPage } from './pages/CartPage';
import { NotFound } from './pages/NotFound';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ProductProvider>
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#FFFFFF' }}>
          {/* Top Minimalist Header */}
          <Navbar />

          {/* Main App Content */}
          <main style={{ flexGrow: 1 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/products/:id" element={<ProductDetails />} />
              <Route path="/add-product" element={<AddProduct />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>

          {/* Footer Ribbon & Info */}
          <Footer />

          {/* Global Slide-In Shopping Cart Drawer */}
          <CartDrawer />

          {/* Global Toast Notifications */}
          <ToastNotification />
        </div>
      </ProductProvider>
    </BrowserRouter>
  );
};

export default App;
