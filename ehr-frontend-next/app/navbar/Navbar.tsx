"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Navbar: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    router.push("/login");
  };

  return (
    <div className="fixed top-0 left-0 right-0 bg-gray-800 text-white z-50">
      <nav className="w-full max-w-full px-6 py-4 flex items-center justify-between">
        <div>
          <Link href="/" className="text-lg font-bold">
            EHRbaseFrontend
          </Link>
        </div>
  
        <div className="flex items-center space-x-4">
          <Link href="/" className="text-blue-400">Home</Link>
          {isLoggedIn ? (
            <button onClick={handleLogout} className="text-red-400">
              Logout
            </button>
          ) : (
            <Link href="/login" className="text-blue-400">Login</Link>
          )}
        </div>
      </nav>
    </div>
  );
  
};

export default Navbar;
