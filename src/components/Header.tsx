'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const Header: React.FC = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const res = await fetch('https://backend-sin-ecom.onrender.com/api/user/logout', {
        method: 'POST',
        credentials: 'include',
      });
      if (res.ok) {
        router.push('/');
      } else {
        alert('Logout failed');
      }
    } catch (error) {
      console.error(error);
      alert('Logout failed');
    }
  };

  return (
    <motion.header
      className="bg-white text-gray-800 py-4 shadow-sm"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">My Jewelry Store</h1>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <a href="#categories" className="hover:text-pink-600 transition">
                Categories
              </a>
            </li>
            <li>
              <a href="#products" className="hover:text-pink-600 transition">
                Products
              </a>
            </li>
            <li>
              <a href="#cart" className="hover:text-pink-600 transition">
                Cart
              </a>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="hover:text-pink-600 transition focus:outline-none"
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </motion.header>
  );
};

export default Header;
