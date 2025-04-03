'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('https://backend-sin-ecom.onrender.com/api/admin/check-auth', {
          method: 'GET',
          credentials: 'include'
        });
        if (res.ok) {
          setIsAuthenticated(true);
        } else {
          router.push('/admin-login');
        }
      } catch (error) {
        console.error('Auth check failed', error);
        router.push('/admin-login');
      }
    };
    checkAuth();
  }, [router]);

  if (isAuthenticated === null) return <div>Loading...</div>;
  return <>{children}</>;
};

export default AdminLayout;
