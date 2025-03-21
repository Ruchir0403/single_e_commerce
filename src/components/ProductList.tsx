'use client'

import React, { useEffect, useState } from 'react';
import { fetchProducts } from '@/lib/api';
import ProductCard from './ProductCard';
import { motion } from 'framer-motion';

type Product = {
  _id: string;
  name: string;
  price: number;
  image: string;
};

type ProductListProps = {
  onCartUpdate?: () => void;
  isAdmin?: boolean;
  onDelete?: (id: string) => void;
};

const ProductList: React.FC<ProductListProps> = ({ onCartUpdate, isAdmin = false, onDelete }) => {
  const [products, setProducts] = useState<Product[]>([]);

  const loadProducts = async () => {
    try {
      const data = await fetchProducts();
      setProducts(data);
    } catch (error) {
      console.error(error);
      alert('Failed to load products');
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleDelete = (id: string) => {
    setProducts(products.filter((product) => product._id !== id));
    if (onDelete) onDelete(id);
  };

  return (
    <motion.div
      id="products"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {products.map((product) => (
        <ProductCard
          key={product._id}
          product={product}
          isAdmin={isAdmin}
          onDelete={handleDelete}
          onCartUpdate={onCartUpdate}
        />
      ))}
    </motion.div>
  );
};

export default ProductList;
