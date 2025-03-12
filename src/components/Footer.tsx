// src/components/Footer.tsx
'use client'

import React from 'react';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  return (
    <motion.footer
      className="bg-gray-100 text-gray-700 py-4 mt-8"
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 text-center">
        © {new Date().getFullYear()} My Jewelry Store. All rights reserved.
      </div>
    </motion.footer>
  );
};

export default Footer;
