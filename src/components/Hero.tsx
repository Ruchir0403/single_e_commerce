// src/components/Hero.tsx
'use client'

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const Hero: React.FC = () => {
  return (
    <motion.section 
      className="relative w-full h-[450px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <Image
        src="/images/hero-ring.jpg" // Put your hero image in public/images
        alt="Sale Banner"
        fill
        className="object-cover object-center"
      />
      {/* Soft pink overlay */}
      <div className="absolute inset-0 bg-pink-100 bg-opacity-90"></div>

      {/* Hero text */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-800 mb-4">
          Sale <span className="text-pink-600">UPTO 70% OFF</span>
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-gray-700 mb-6">
          This Week Only
        </p>
        <button className="px-6 py-2 bg-pink-600 text-white font-semibold rounded hover:bg-pink-700 transition duration-300">
          Shop Now
        </button>
      </div>
    </motion.section>
  );
};

export default Hero;
