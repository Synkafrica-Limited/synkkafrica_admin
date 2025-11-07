"use client";
import React, { useState, useEffect } from "react";
import { FaHome, FaUsers, FaStore, FaCog, FaSignOutAlt, FaList, FaChartBar, FaDatabase, FaShieldAlt, FaComments, FaTimes } from "react-icons/fa";

const menuItems = [
  { label: "Home", icon: <FaHome />, href: "/dashboard?type=technical" },
  { label: "Users", icon: <FaUsers />, href: "/dashboard/technical/users" },
  { label: "Vendors", icon: <FaStore />, href: "/dashboard/technical/vendors" },
  { label: "Listings", icon: <FaList />, href: "/dashboard/technical/listings" },
  { label: "CMS", icon: <FaDatabase />, href: "/dashboard/technical/cms" },
  { label: "Finance", icon: <FaChartBar />, href: "/dashboard/technical/finance" },
  { label: "Settings", icon: <FaCog />, href: "/dashboard/technical/settings" },
];

export default function TechnicalSidebar({ active, onLogout, isOpen, onClose }) {
  const [showDropdown, setShowDropdown] = useState(false);
  
  // Close sidebar on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose?.();
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);
  
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`
        fixed lg:sticky top-0 h-screen w-64 bg-white flex flex-col border-r border-gray-200 z-50 py-6 px-4 shadow-lg
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Mobile Close Button */}
        <div className="lg:hidden absolute top-4 right-4">
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <FaTimes className="text-gray-600" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {/* Logo */}
          <div className="flex items-center mb-8 px-2">
            <img src="/images/synkkafrica_logo_small.png" alt="Logo" className="w-8 h-8 mr-2" />
            <div>
              <div className="font-bold text-lg text-primary-600">Synkkafrica</div>
              <div className="text-xs text-gray-500">Technical Admin</div>
            </div>
          </div>
          
          {/* Navigation */}
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => onClose?.()}
                className={`flex items-center px-4 py-2 rounded-lg transition-colors font-medium text-gray-700 hover:bg-primary-50 hover:text-primary-600 ${
                  active === item.label ? "bg-primary-100 text-primary-600" : ""
                }`}
                title={item.label}
              >
                <span className="text-lg flex-shrink-0">{item.icon}</span>
                <span className="ml-3">{item.label}</span>
              </a>
            ))}
          </nav>
        </div>
        
        {/* Bottom Section */}
        <div className="space-y-2 border-t pt-4">
          {/* Profile */}
          <a 
            href="/technical/profile" 
            className="flex items-center px-4 py-2 rounded-lg text-gray-700 hover:bg-primary-50 hover:text-primary-600"
            title="Technical Admin Profile"
          >
            <img src="/images/synkkafrica_logo_small.png" alt="Admin" className="w-6 h-6 rounded-full flex-shrink-0" />
            <span className="ml-2">Tech Admin</span>
          </a>
          
          {/* Settings Dropdown */}
          <div className="relative">
            <button
              className="flex items-center px-4 py-2 rounded-lg text-gray-700 hover:bg-primary-50 hover:text-primary-600 w-full transition-colors"
              onClick={() => setShowDropdown((v) => !v)}
              title="Settings"
            >
              <FaCog className="text-lg flex-shrink-0" />
              <span className="ml-3">Settings</span>
              <svg 
                className={`ml-auto transition-transform ${showDropdown ? 'rotate-180' : ''}`} 
                width="16" 
                height="16" 
                fill="none" 
                viewBox="0 0 24 24"
              >
                <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6"/>
              </svg>
            </button>          {/* Dropdown */}
          {showDropdown && (
            <div className="absolute bottom-full left-0 right-0 mb-2 bg-white rounded-lg shadow-lg z-50 border">
              <a 
                href="/technical/settings/system" 
                className="block px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600 rounded-t-lg transition-colors text-sm"
              >
                System Settings
              </a>
              <a 
                href="/technical/settings/security" 
                className="block px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors text-sm"
              >
                Security Settings
              </a>
              <a 
                href="/support" 
                className="block px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600 rounded-b-lg transition-colors text-sm"
              >
                Support Chat
              </a>
            </div>
          )}
        </div>
        
        {/* Logout */}
        <button 
          onClick={onLogout} 
          className="flex items-center px-4 py-2 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-600 w-full"
          title="Logout"
        >
          <FaSignOutAlt className="text-lg flex-shrink-0" />
          <span className="ml-3">Logout</span>
        </button>
      </div>
    </aside>
    </>
  );
}
