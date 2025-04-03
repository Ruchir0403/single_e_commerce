'use client'

import React, { useState } from 'react';
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
    const token = localStorage.getItem('adminToken');

    try {
      const res = await fetch("https://backend-sin-ecom.onrender.com/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token || "",
        },
        body: JSON.stringify({ name, price: Number(price), image }),
      });
      if (res.ok) {
        setName('');
        setPrice('');
        setImage('');
        onProductAdded();
      } else {
        const data = await res.json();
        alert(data.error || "Failed to add product");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to add product");
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="bg-white bg-opacity-80 p-6 rounded-lg shadow-md"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold mb-4 text-gray-900">Add New Product</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Product Name"
          className="border border-gray-300 p-2 w-full rounded text-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <input
          type="number"
          placeholder="Price"
          className="border border-gray-300 p-2 w-full rounded text-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Image URL"
          className="border border-gray-300 p-2 w-full rounded text-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="bg-pink-500 hover:bg-pink-600 text-white py-2 px-4 rounded w-full transition duration-300 shadow"
      >
        Add Product
      </button>
    </motion.form>
  );
};

export default AddProductForm;
