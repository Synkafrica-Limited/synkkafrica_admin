"use client";
import React, { useState } from "react";
import { FaHome, FaUsers, FaStore, FaBell, FaCreditCard, FaCog, FaSignOutAlt, FaList, FaComments } from "react-icons/fa";

const menuItems = [
  { label: "Home", icon: <FaHome />, href: "/dashboard?type=business" },
  { label: "Listings", icon: <FaList />, href: "/dashboard/business/listings" },
  { label: "Vendors", icon: <FaStore />, href: "/dashboard/business/vendors" },
  { label: "Finance", icon: <FaCreditCard />, href: "/dashboard/business/finance/dashboard" },
];

export default function BusinessSidebar({ active, onLogout }) {
  const [showDropdown, setShowDropdown] = useState(false);
  
  return (
    <aside className="h-screen w-64 md:w-64 sm:w-16 bg-white flex flex-col justify-between py-6 px-2 md:px-4 shadow-lg">
      <div className="flex-1 overflow-y-auto">
        {/* Logo */}
        <div className="flex items-center mb-8 px-2">
          <img src="/images/synkkafrica_logo_small.png" alt="Logo" className="w-8 h-8 mr-2" />
          <span className="font-bold text-lg text-primary-600 hidden md:block">Synkkafrica</span>
        </div>
        
        {/* Navigation */}
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`flex items-center px-2 md:px-4 py-2 rounded-lg transition-colors font-medium text-gray-700 hover:bg-primary-50 hover:text-primary-600 ${
                active === item.label ? "bg-primary-100 text-primary-600" : ""
              }`}
              title={item.label}
            >
              <span className="text-lg flex-shrink-0">{item.icon}</span>
              <span className="ml-3 hidden md:block">{item.label}</span>
            </a>
          ))}
        </nav>
      </div>
      
      {/* Bottom Section */}
      <div className="space-y-2 pt-4">
        {/* Profile */}
        <a 
          href="/dashboard/profile" 
          className="flex items-center px-2 md:px-4 py-2 rounded-lg text-gray-700 hover:bg-primary-50 hover:text-primary-600"
          title="Admin Profile"
        >
          <img src="/images/synkkafrica_logo_small.png" alt="Admin" className="w-6 h-6 rounded-full flex-shrink-0" />
          <span className="ml-2 hidden md:block">Admin user</span>
        </a>
        
        {/* Settings Dropdown */}
        <div className="relative">
          <button
            className="flex items-center px-2 md:px-4 py-2 rounded-lg text-gray-700 hover:bg-primary-50 hover:text-primary-600 w-full transition-colors"
            onClick={() => setShowDropdown((v) => !v)}
            title="Settings"
          >
            <FaCog className="text-lg flex-shrink-0" />
            <span className="ml-3 hidden md:block">Settings</span>
            <svg 
              className={`ml-auto transition-transform hidden md:block ${showDropdown ? 'rotate-180' : ''}`} 
              width="16" 
              height="16" 
              fill="none" 
              viewBox="0 0 24 24"
            >
              <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6"/>
            </svg>
          </button>
          
          {/* Dropdown */}
          {showDropdown && (
            <div className="absolute bottom-full left-0 right-0 mb-2 bg-white rounded-lg shadow-lg z-50 border">
              <a 
                href="/dashboard/business/settings/team" 
                className="block px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600 rounded-t-lg transition-colors text-sm"
              >
                Team Management
              </a>
              <a 
                href="/dashboard/business/settings/support" 
                className="block px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors text-sm"
              >
                Support
              </a>
              <a 
                href="/dashboard/business/settings/notifications" 
                className="block px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600 rounded-b-lg transition-colors text-sm"
              >
                Notifications
              </a>
            </div>
          )}
        </div>
        
        {/* Logout */}
        <button 
          onClick={onLogout} 
          className="flex items-center px-2 md:px-4 py-2 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-600 w-full"
          title="Logout"
        >
          <FaSignOutAlt className="text-lg flex-shrink-0" />
          <span className="ml-3 hidden md:block">Logout</span>
        </button>
      </div>
    </aside>
  );
}
