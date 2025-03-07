// src/app/page.tsx
'use client'

import React, { useState } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import AddProductForm from '@/components/AddProductForm';
import ProductList from '@/components/ProductList';
import Cart from '@/components/Cart';
import Modal from '@/components/Modal';
import { motion } from 'framer-motion';

export default function Home() {
  const [productRefreshKey, setProductRefreshKey] = useState(0);
  const [cartRefreshKey, setCartRefreshKey] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Called after adding a new product via the modal
  const handleProductAdded = () => {
    setProductRefreshKey((prev) => prev + 1);
    setIsModalOpen(false);
  };

  // Called when an item is added to the cart from any product card
  const handleCartUpdate = () => {
    setCartRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      <main className="flex-1">
        <Hero />
        <div className="container mx-auto px-4 py-8">
          <motion.section 
            className="mt-8 flex justify-between items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Featured Products</h2>
            <button
              className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded transition duration-300"
              onClick={() => setIsModalOpen(true)}
            >
              Add Product
            </button>
          </motion.section>
          {/* Pass onCartUpdate callback to ProductList */}
          <ProductList key={productRefreshKey} onCartUpdate={handleCartUpdate} />
          <motion.section 
            id="cart"
            className="mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {/* Pass cartRefreshKey so Cart re-fetches when updated */}
            <Cart refreshKey={cartRefreshKey} />
          </motion.section>
        </div>
      </main>
      <Footer />
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <AddProductForm onProductAdded={handleProductAdded} />
      </Modal>
    </div>
  );
}
