// src/components/ProductCard.tsx
'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { addToCart, deleteProduct } from '@/lib/api';

type Product = {
  _id: string;
  name: string;
  price: number;
  image: string;
};

type ProductCardProps = {
  product: Product;
  onDelete: (id: string) => void;
  onCartUpdate?: () => void;  // New prop for cart refresh
};

const ProductCard: React.FC<ProductCardProps> = ({ product, onDelete, onCartUpdate }) => {
  const handleAddToCart = async () => {
    try {
      await addToCart(product._id);
      alert('Product added to cart');
      // Notify parent to update cart immediately
      if (onCartUpdate) {
        onCartUpdate();
      }
    } catch (error) {
      console.error(error);
      alert('Failed to add product to cart');
    }
  };

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(product._id);
        onDelete(product._id);
      } catch (error) {
        console.error(error);
        alert('Failed to delete product');
      }
    }
  };

  return (
    <motion.div
      className="border p-4 rounded shadow-lg bg-white"
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-40 object-cover rounded"
      />
      <h2 className="text-xl mt-2 font-semibold text-gray-800">
        {product.name}
      </h2>
      <p className="mt-1 font-medium text-gray-900">
        ${product.price}
      </p>
      <div className="flex justify-between mt-4">
        <button
          onClick={handleAddToCart}
          className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded transition duration-300"
        >
          Add to Cart
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded transition duration-300"
        >
          Delete
        </button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
