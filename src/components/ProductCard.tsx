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
  isAdmin?: boolean;
  onDelete?: (id: string) => void;
  onCartUpdate?: () => void;
};

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isAdmin = false,
  onDelete,
  onCartUpdate,
}) => {
  const handleAddToCart = async () => {
    try {
      await addToCart(product._id);
      alert('Product added to cart');
      if (onCartUpdate) onCartUpdate();
    } catch (error) {
      console.error(error);
      alert('Failed to add product to cart');
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      await deleteProduct(product._id);
      if (onDelete) onDelete(product._id);
    } catch (error) {
      console.error(error);
      alert('Failed to delete product');
    }
  };

  return (
    <motion.div
      className="bg-white rounded shadow-sm hover:shadow-md p-4 transition duration-300"
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-40 object-cover rounded"
      />
      <h2 className="text-xl mt-2 font-semibold text-gray-800">{product.name}</h2>
      <p className="mt-1 font-medium text-gray-900">${product.price}</p>
      <div className="flex justify-between mt-4">
        <button
          onClick={handleAddToCart}
          className="bg-pink-500 hover:bg-pink-600 text-white py-1 px-3 rounded transition duration-300"
        >
          Add to Cart
        </button>
        {isAdmin && (
          <button
            onClick={handleDelete}
            className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-1 px-3 rounded transition duration-300"
          >
            Delete
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default ProductCard;
