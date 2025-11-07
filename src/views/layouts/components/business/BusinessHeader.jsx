import React from "react";
import { FaSearch, FaBars } from "react-icons/fa";
import Link from "next/link";

export default function BusinessHeader({ title = "Hello Admin", subtitle = "Welcome back", onMenuClick }) {
  return (
    <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4 sticky top-0 z-30">
      <div className="flex items-center justify-between gap-4">
        {/* Mobile Menu Button + Page Title */}
        <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
          {/* Hamburger Menu - Mobile Only */}
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
            aria-label="Open menu"
          >
            <FaBars className="text-xl text-gray-600" />
          </button>
          
          {/* Page Title */}
          <div className="min-w-0 flex-1">
            <h1 className="text-lg sm:text-2xl font-bold text-gray-900 truncate">{title}</h1>
            {subtitle && <p className="text-xs sm:text-sm text-gray-500 mt-1 truncate">{subtitle}</p>}
          </div>
        </div>
        
        {/* Profile */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          <Link href="/dashboard/business/profile" className="flex items-center gap-2 sm:gap-3 px-2 sm:px-4 py-2 sm:py-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-700 rounded-full flex items-center justify-center overflow-hidden text-white font-semibold text-sm sm:text-base">
              T
            </div>
            <div className="hidden sm:block min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">Temidayo Faluyi</p>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}
