'use client'

import React, { useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import AddProductForm from '@/components/AddProductForm';
import ProductList from '@/components/ProductList';
import { useRouter } from 'next/navigation';

const AdminPanel = () => {
  const [productRefreshKey, setProductRefreshKey] = useState(0);
  const router = useRouter();

  const handleProductAdded = () => {
    setProductRefreshKey(prev => prev + 1);
  };

  const handleLogout = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/admin/logout', {
        method: 'POST',
        credentials: 'include',
      });
      if (res.ok) {
        router.push('/admin-login');
      } else {
        alert('Logout failed');
      }
    } catch (error) {
      console.error(error);
      alert('Logout failed');
    }
  };

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-8">
        <div className="max-w-6xl mx-auto bg-white bg-opacity-90 backdrop-filter backdrop-blur-md rounded-lg shadow-lg p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-4xl font-extrabold text-gray-800 drop-shadow-lg">Admin Panel</h1>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded transition duration-300 shadow"
            >
              Logout
            </button>
          </div>
          <div className="mb-8">
            <AddProductForm onProductAdded={handleProductAdded} />
          </div>
          <h2 className="text-3xl font-bold text-gray-700 mb-4 border-b pb-2">Existing Products</h2>
          <ProductList key={productRefreshKey} isAdmin={true} />
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminPanel;
