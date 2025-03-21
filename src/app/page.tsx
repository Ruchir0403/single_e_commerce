'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        // On successful login, redirect to the homepage (or another route)
        router.push('/home');
      } else {
        const data = await res.json();
        alert(data.error || 'Login failed');
      }
    } catch (error) {
      console.error(error);
      alert('Login failed');
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Section - Login Form */}
      <div className="flex flex-col justify-center w-full md:w-1/2 px-8 py-12 bg-white">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md mx-auto w-full"
        >
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800">
              Sign In to InsideBox
            </h1>
            <p className="text-gray-500 mt-2">
              Start your journey
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
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
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
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
              Sign In
            </button>
          </form>

          {/* Social Sign In */}
          <div className="flex items-center justify-between mt-6">
            <hr className="w-full border-gray-300" />
            <span className="px-2 text-gray-400">OR</span>
            <hr className="w-full border-gray-300" />
          </div>
          <div className="mt-6 space-y-2">
            <button
              className="w-full border border-gray-300 rounded-md py-2 flex items-center justify-center hover:bg-gray-100 transition"
            >
              <svg
                className="w-5 h-5 mr-2"
                viewBox="0 0 48 48"
              >
                <path
                  fill="#EA4335"
                  d="M24 9.5c3.94 0 7.09 1.63 9.21 3.01l6.79-6.79C36.05 2.88 30.53 1 24 1 14.61 1 6.51 6.15 2.69 13.49l7.87 6.11C12.14 12.29 17.59 9.5 24 9.5z"
                />
                <path
                  fill="#4285F4"
                  d="M46.09 24.5c0-1.47-.13-2.89-.37-4.26H24v8.06h12.57c-.54 2.29-1.71 4.24-3.42 5.72l7.85 6.06C44.75 36.66 46.09 31.87 46.09 24.5z"
                />
                <path
                  fill="#FBBC05"
                  d="M10.56 28.37c-.52-1.53-.82-3.16-.82-4.87 0-1.71.3-3.34.82-4.87l-7.87-6.11C1.97 16.07 1 19.05 1 22.5c0 3.45.97 6.43 2.69 9.11l7.87-6.11z"
                />
                <path
                  fill="#34A853"
                  d="M24 43.5c5.53 0 10.05-1.82 13.4-4.93l-7.85-6.06c-2.11 1.44-4.82 2.27-7.55 2.27-6.41 0-11.86-3.79-13.99-9.19l-7.87 6.11C6.51 38.85 14.61 43.5 24 43.5z"
                />
                <path fill="none" d="M0 0h48v48H0z" />
              </svg>
              Sign in with Google
            </button>
            <button
              className="w-full border border-gray-300 rounded-md py-2 flex items-center justify-center hover:bg-gray-100 transition"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M22.525 0h-21.05c-.814 0-1.475.661-1.475 1.475v21.05c0 .814.661 1.475 1.475 1.475h21.05c.814 0 1.475-.661 1.475-1.475v-21.05c0-.814-.661-1.475-1.475-1.475zm-14.556 20.525h-3v-11h3v11zm-1.499-12.591c-.966 0-1.75-.785-1.75-1.75 0-.966.784-1.75 1.75-1.75s1.75.784 1.75 1.75c0 .965-.784 1.75-1.75 1.75zm13.499 12.591h-3v-5.604c0-1.336-.027-3.057-1.865-3.057-1.865 0-2.151 1.458-2.151 2.965v5.696h-3v-11h2.877v1.506h.041c.401-.759 1.378-1.56 2.838-1.56 3.035 0 3.593 1.998 3.593 4.595v6.459z" />
              </svg>
              Sign in with LinkedIn
            </button>
          </div>

          <p className="mt-6 text-center text-sm text-gray-600">
            Don&apos;t have an account?{' '}
            <a href="/register" className="text-blue-600 hover:underline">
              Sign up
            </a>
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
