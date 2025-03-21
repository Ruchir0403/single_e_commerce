// src/app/page.tsx
'use client'

import React, { useState } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Categories from '@/components/Categories';
import Footer from '@/components/Footer';
import ProductList from '@/components/ProductList';
import Cart from '@/components/Cart';
import { motion } from 'framer-motion';

export default function Home() {
  const [cartRefreshKey, setCartRefreshKey] = useState(0);

  const handleCartUpdate = () => {
    setCartRefreshKey(prev => prev + 1);
  };

  return (
    <div className="min-h-screen flex flex-col bg-pink-50">
      <Header />
      <Hero />
      <Categories />
      <main className="container mx-auto px-4 py-8 flex-1 bg-white mt-4 rounded shadow-sm">
        <motion.section
          className="mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-gray-800">Our Products</h2>
        </motion.section>
        {/* For customers, isAdmin is false */}
        <ProductList onCartUpdate={handleCartUpdate} isAdmin={false} />
        <motion.section
          id="cart"
          className="mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Cart refreshKey={cartRefreshKey} />
        </motion.section>
      </main>
      <Footer />
    </div>
  );
}
