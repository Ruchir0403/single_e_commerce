"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await fetch("https://backend-sin-ecom.onrender.com/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (res.ok) {
      router.push("/admin");
    } else {
      setError(data.error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-pink-50">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 shadow-lg rounded max-w-md w-full"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Admin Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          className="border border-gray-300 p-2 w-full mb-4 rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border border-gray-300 p-2 w-full mb-6 rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="bg-pink-500 text-white px-4 py-2 rounded w-full hover:bg-pink-600 transition">
          Login
        </button>
        <p className="mt-6 text-center text-gray-700">
          Don&apos;t have an account?{" "}
          <Link
            href="/admin-register"
            className="text-pink-500 hover:underline font-medium"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default AdminLogin;
