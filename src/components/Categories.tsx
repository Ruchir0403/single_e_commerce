// src/components/Categories.tsx
'use client'

import React from 'react';
import Image from 'next/image';

const Categories: React.FC = () => {
  // Sample categories
  const categories = [
    { name: 'Earrings', image: '/images/earrings.jpg' },
    { name: 'Finger Rings', image: '/images/finger-rings.jpg' },
    { name: 'Pendants', image: '/images/pendants.jpg' },
    { name: 'Nose Pins', image: '/images/nose-pins.jpg' },
    { name: 'Chains', image: '/images/chains.jpg' },
    { name: 'Bracelets', image: '/images/bracelets.jpg' },
    { name: 'Bangles', image: '/images/bangles.jpg' },
    { name: 'Neckwear', image: '/images/neckwear.jpg' },
    { name: 'Watch Jewelry', image: '/images/watch-jewelry.jpg' },
    { name: 'Ankle Wear', image: '/images/ankle-wear.jpg' },
  ];

  return (
    <section id="categories" className="bg-white py-8 px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Shop By Category
        </h2>
        <div className="w-24 h-1 bg-pink-600 mx-auto mb-8"></div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.name}
              className="bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col items-center p-4"
            >
              <div className="w-20 h-20 relative mb-2">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover rounded"
                />
              </div>
              <p className="text-gray-800 font-medium mb-2">{cat.name}</p>
              <button className="text-pink-600 hover:underline">Explore</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
