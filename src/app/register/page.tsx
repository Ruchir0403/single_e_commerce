'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('https://backend-sin-ecom.onrender.com/api/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, phone, password }),
      });

      if (res.ok) {
        // Registration successful, redirect to the login page.
        alert('Registration successful. Please login.');
        router.push('/');
      } else {
        const data = await res.json();
        alert(data.error || 'Registration failed');
      }
    } catch (error) {
      console.error(error);
      alert('Registration failed');
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Section - Registration Form */}
      <div className="flex flex-col justify-center w-full md:w-1/2 px-8 py-12 bg-white">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md mx-auto w-full"
        >
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800">
              Create Your Account
            </h1>
            <p className="text-gray-500 mt-2">
              Join us today!
            </p>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleRegister} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                E-mail
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="123-456-7890"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition font-semibold"
            >
              Register
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link href="/" className="text-blue-600 hover:underline">Sign in</Link>
          </p>
        </motion.div>
      </div>

      {/* Right Section - Decorative Background */}
      <div className="hidden md:block w-1/2 relative">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.pexels.com/photos/1802268/pexels-photo-1802268.jpeg?auto=compress&cs=tinysrgb&w=600')",
          }}
        />
      </div>
    </div>
  );
}
