// src/app/page.tsx
'use client'

import React, { useState } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Categories from '@/components/Categories';
import Footer from '@/components/Footer';
import AddProductForm from '@/components/AddProductForm';
import ProductList from '@/components/ProductList';
import Cart from '@/components/Cart';
import Modal from '@/components/Modal';
import { motion } from 'framer-motion';

export default function Home() {
  // State for refreshing products & cart
  const [productRefreshKey, setProductRefreshKey] = useState(0);
  const [cartRefreshKey, setCartRefreshKey] = useState(0);

  // State for controlling the Add Product modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Called after adding a new product
  const handleProductAdded = () => {
    setProductRefreshKey((prev) => prev + 1);
    setIsModalOpen(false);
  };

  // Called when an item is added to the cart (from ProductCard)
  const handleCartUpdate = () => {
    setCartRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen flex flex-col bg-pink-50">
      {/* 1. Header */}
      <Header />

      {/* 2. Hero */}
      <Hero />

      {/* 3. Categories */}
      <Categories />

      {/* 4. Main Content (Products + Cart) */}
      <main className="container mx-auto px-4 py-8 flex-1 bg-white mt-4 rounded shadow-sm">
        <motion.section
          className="flex justify-between items-center mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-gray-800">Our Products</h2>
          <button
            className="bg-pink-500 hover:bg-pink-600 text-white py-2 px-4 rounded transition duration-300"
            onClick={() => setIsModalOpen(true)}
          >
            Add Product
          </button>
        </motion.section>

        <ProductList key={productRefreshKey} onCartUpdate={handleCartUpdate} />

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

      {/* 5. Footer */}
      <Footer />

      {/* 6. Add Product Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <AddProductForm onProductAdded={handleProductAdded} />
      </Modal>
    </div>
  );
}
