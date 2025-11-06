"use client";
import React, { useState } from "react";
import { FaHome, FaUsers, FaStore, FaBell, FaCreditCard, FaCog, FaSignOutAlt, FaList, FaChevronDown, FaUserCircle, FaShoppingCart } from "react-icons/fa";

const menuItems = [
  { label: "Dashboard", icon: <FaHome />, href: "/dashboard?type=business" },
  { label: "My Profile", icon: <FaUserCircle />, href: "/dashboard/business/profile" },
  { label: "Customers", icon: <FaUsers />, href: "/dashboard/business/customers" },
  { label: "Vendors", icon: <FaStore />, href: "/dashboard/business/vendors" },
  { label: "Listings", icon: <FaList />, href: "/dashboard/business/listings" },
  { label: "Orders", icon: <FaShoppingCart />, href: "/dashboard/business/orders" },
  { label: "Finance", icon: <FaCreditCard />, href: "/dashboard/business/finance" },
  { label: "Notifications", icon: <FaBell />, href: "/dashboard/business/notifications" },
];

export default function BusinessSidebar({ active, onLogout }) {
  const [showSettingsDropdown, setShowSettingsDropdown] = useState(false);
  
  return (
    <aside className="h-screen w-64 bg-white flex flex-col border-r border-gray-200">
      {/* Logo */}
      <div className="py-6 px-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center shadow-md">
            <span className="text-white font-bold text-xl">S</span>
          </div>
          <div>
            <h1 className="text-gray-900 font-bold text-lg">Synkkafrica</h1>
          </div>
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = active === item.label || 
                          (item.label === "Dashboard" && active === "Home");
          return (
            <a
              key={item.label}
              href={item.href}
              className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 group ${
                isActive 
                  ? "bg-orange-50 text-orange-600 border-l-4 border-orange-600" 
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 border-l-4 border-transparent"
              }`}
            >
              <span className={`text-xl ${isActive ? 'text-orange-600' : 'text-gray-400'}`}>
                {item.icon}
              </span>
              <span className="font-medium text-[15px]">{item.label}</span>
            </a>
          );
        })}
      </nav>
      
      {/* Bottom Section */}
      <div className="border-t border-gray-200 py-4 px-4">
        {/* Profile */}
        <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-gray-50 mb-3">
          <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center overflow-hidden text-white font-semibold">
            T
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">Temidayo Faluyi</p>
          </div>
        </div>
        
        {/* Logout */}
        <button 
          onClick={onLogout} 
          className="flex items-center gap-4 px-4 py-3 rounded-lg text-gray-600 hover:bg-red-50 hover:text-red-600 w-full transition-all duration-200 group border-l-4 border-transparent"
        >
          <FaSignOutAlt className="text-xl text-gray-400 group-hover:text-red-600" />
          <span className="font-medium text-[15px]">Logout</span>
        </button>
      </div>
    </aside>
  );
}
