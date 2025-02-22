import React from 'react';
import { Link } from 'react-router-dom';
import { Gift } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getSession } from '../lib/supabase';

export default function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const { data } = await getSession();
      setIsAuthenticated(!!data.session);
    } catch (error) {
      console.error('Error checking auth:', error);
    }
  };

  return (
    <nav className="bg-gray-800 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Gift className="h-6 w-6 text-purple-400" />
            <span className="text-xl font-bold text-white">Vivendo de Surebet</span>
          </Link>
          <div className="flex space-x-4">
            <Link
              to="/register"
              className="text-gray-300 hover:text-purple-400 px-3 py-2 rounded-md text-sm font-medium"
            >
              Participar
            </Link>
            {isAuthenticated && (
              <Link
                to="/admin"
                className="text-gray-300 hover:text-purple-400 px-3 py-2 rounded-md text-sm font-medium"
              >
                Admin
              </Link>
            )}
            {!isAuthenticated && (
              <Link
                to="/login"
                className="text-gray-300 hover:text-purple-400 px-3 py-2 rounded-md text-sm font-medium"
              >
                Admin
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
