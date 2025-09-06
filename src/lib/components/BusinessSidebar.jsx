"use client";
import React, { useState } from "react";
import { FaHome, FaUsers, FaStore, FaBell, FaCreditCard, FaCog, FaSignOutAlt, FaList } from "react-icons/fa";

const menuItems = [
  { label: "Home", icon: <FaHome />, href: "/dashboard" },
  { label: "Customers", icon: <FaUsers />, href: "/dashboard/customers" },
  { label: "Vendors", icon: <FaStore />, href: "/dashboard/vendors" },
  { label: "Notification", icon: <FaBell />, href: "/dashboard/notification" },
  { label: "Payment", icon: <FaCreditCard />, href: "/dashboard/payment" },
  //listings
  { label: "Listings", icon: <FaList />, href: "/dashboard/listings" },
];

export default function BusinessSidebar({ active, onLogout }) {
  const [showDropdown, setShowDropdown] = useState(false);
  return (
    <aside className="h-screen w-64 bg-white flex flex-col justify-between py-6 px-4">
      <div>
        <div className="flex items-center mb-8">
          <img src="/images/synkkafrica_logo_small.png" alt="Logo" className="w-8 h-8 mr-2" />
          <span className="font-bold text-lg text-primary-600">Synkkafrica</span>
        </div>
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`flex items-center px-4 py-2 rounded-lg transition-colors font-medium text-gray-700 hover:bg-primary-50 hover:text-primary-600 ${active === item.label ? "bg-primary-100 text-primary-600" : ""}`}
            >
              <span className="mr-3 text-lg">{item.icon}</span>
              {item.label}
            </a>
          ))}
        </nav>
      </div>
      <div className="space-y-2">
        <a href="/dashboard/profile" className="flex items-center px-4 py-2 rounded-lg text-gray-700 hover:bg-primary-50 hover:text-primary-600">
          <img src="/images/synkkafrica_logo_small.png" alt="Admin" className="w-6 h-6 mr-2 rounded-full" />
          <span>Admin user</span>
        </a>
        {/* Animated dropdown for Add Teams/Assign Roles */}
        <div className="relative">
          <button
            className="flex items-center px-4 py-2 rounded-lg text-gray-700 hover:bg-primary-50 hover:text-primary-600 w-full transition-colors"
            onClick={() => setShowDropdown((v) => !v)}
          >
            <FaCog className="mr-3 text-lg" />
            <span>Setting</span>
            <svg className={`ml-auto transition-transform ${showDropdown ? 'rotate-180' : ''}`} width="16" height="16" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6"/></svg>
          </button>
          {showDropdown && (
            <div className="absolute left-0 w-full mt-2 bg-white rounded-lg shadow-lg z-10 animate-fade-in">
              <a href="/settings/team" className="block px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600 rounded-t-lg transition-colors">Add Team Member</a>
              <a href="/settings/team/assign" className="block px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600 rounded-b-lg transition-colors">Assign Role</a>
            </div>
          )}
        </div>
        <button onClick={onLogout} className="flex items-center px-4 py-2 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-600 w-full">
          <FaSignOutAlt className="mr-3 text-lg" /> Logout
        </button>
      </div>
    </aside>
  );
}
