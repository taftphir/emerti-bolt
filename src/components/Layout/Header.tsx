import React from 'react';
import { LogOut, User, Bell } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 ml-12 lg:ml-0">
            Vessel Monitoring Dashboard
          </h2>
          <p className="text-sm sm:text-base text-gray-600 ml-12 lg:ml-0 hidden sm:block">
            Real-time fleet management system
          </p>
        </div>
        
        <div className="flex items-center space-x-2 sm:space-x-4">
          <button className="p-2 text-gray-600 hover:text-gray-800 relative hidden sm:block">
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              3
            </span>
          </button>
          
          <div className="flex items-center space-x-1 sm:space-x-2 text-gray-700">
            <User size={16} className="sm:w-5 sm:h-5" />
            <span className="font-medium text-sm sm:text-base hidden sm:inline">{user?.username}</span>
          </div>
          
          <button
            onClick={logout}
            className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-2 text-gray-700 hover:text-red-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <LogOut size={16} className="sm:w-5 sm:h-5" />
            <span className="text-sm sm:text-base hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}