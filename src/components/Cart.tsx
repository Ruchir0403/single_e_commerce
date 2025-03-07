// src/components/Cart.tsx
'use client'

import React, { useEffect, useState } from 'react';
import { fetchCart, removeFromCart } from '@/lib/api';
import { motion, AnimatePresence } from 'framer-motion';

type CartItem = {
  _id: string;
  product_id: string;
  name: string;
  price: number;
  image: string;
};

type CartProps = {
  refreshKey: number;  // New prop to trigger refresh
};

const Cart: React.FC<CartProps> = ({ refreshKey }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const loadCart = async () => {
    try {
      const data = await fetchCart();
      setCartItems(data);
    } catch (error) {
      console.error(error);
      alert('Failed to load cart');
    }
  };

  useEffect(() => {
    loadCart();
  }, [refreshKey]);  // Re-fetch whenever refreshKey changes

  const handleRemove = async (id: string) => {
    try {
      await removeFromCart(id);
      setCartItems(cartItems.filter(item => item._id !== id));
    } catch (error) {
      console.error(error);
      alert('Failed to remove item from cart');
    }
  };

  return (
    <div id="cart" className="mt-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p className="text-gray-800">No items in cart</p>
      ) : (
        <AnimatePresence>
          {cartItems.map(item => (
            <motion.div
              key={item._id}
              className="flex items-center space-x-4 border p-2 rounded mb-4 bg-white shadow"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.3 }}
            >
              <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
              <div>
                <h3 className="font-semibold text-gray-800">{item.name}</h3>
                <p className="text-gray-900">${item.price}</p>
              </div>
              <button
                onClick={() => handleRemove(item._id)}
                className="ml-auto bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded transition duration-300"
              >
                Remove
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      )}
    </div>
  );
};

export default Cart;
