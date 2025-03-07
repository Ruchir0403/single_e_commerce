// src/components/Hero.tsx
'use client'

import React from 'react';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  return (
    <motion.section 
      className="relative h-[60vh] bg-cover bg-center"
      style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="absolute inset-0 bg-black opacity-60"></div>
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl text-white font-bold mb-4">
            Welcome to Our Store
          </h1>
          <p className="text-xl md:text-2xl text-gray-100">
            Discover the best products just for you
          </p>
        </div>
      </div>
    </motion.section>
  );
};

export default Hero;
