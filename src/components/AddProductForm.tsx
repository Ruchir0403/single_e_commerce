// src/components/AddProductForm.tsx
'use client'

import React, { useState } from 'react';
import { createProduct } from '@/lib/api';
import { motion } from 'framer-motion';

type Props = {
  onProductAdded: () => void;
};

const AddProductForm: React.FC<Props> = ({ onProductAdded }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState<number | string>('');
  const [image, setImage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price || !image) {
      alert('Please fill in all fields');
      return;
    }
    try {
      await createProduct({ name, price: Number(price), image });
      setName('');
      setPrice('');
      setImage('');
      onProductAdded();
    } catch (error) {
      console.error(error);
      alert('Failed to add product');
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="mb-4"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Add New Product</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Product Name"
          className="border p-2 w-full bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <input
          type="number"
          placeholder="Price"
          className="border p-2 w-full bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Image URL"
          className="border p-2 w-full bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
      </div>
      <button 
        type="submit" 
        className="bg-green-500 hover:bg-green-600 transition duration-300 text-white py-2 px-4 rounded w-full"
      >
        Add Product
      </button>
    </motion.form>
  );
};

export default AddProductForm;
