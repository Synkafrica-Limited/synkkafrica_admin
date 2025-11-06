"use client";
import React from "react";
import { FaBell, FaSearch, FaUserCircle } from "react-icons/fa";

export default function TechnicalHeader({ title = "Technical Dashboard", subtitle = "System Administration" }) {
  return (
    <header className="bg-white shadow-sm px-4 md:px-10 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-800">{title}</h1>
          {subtitle && <p className="text-gray-500 text-sm">{subtitle}</p>}
        </div>
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative hidden md:block">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search system..."
              className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-300 w-64"
            />
          </div>
          
          {/* Notifications */}
          <button className="relative p-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
            <FaBell className="text-lg" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </button>
          
          {/* Profile */}
          <button className="flex items-center gap-2 p-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
            <FaUserCircle className="text-2xl" />
            <span className="hidden md:block font-medium">Tech Admin</span>
          </button>
        </div>
      </div>
    </header>
  );
}
