import React from "react";
import { FaSearch } from "react-icons/fa";
import Link from "next/link";

export default function BusinessHeader({ title = "Hello Admin", subtitle = "Welcome back" }) {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Page Title */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
        </div>
        
        {/* Profile */}
        <div className="flex items-center gap-4">
          
          {/* Profile Avatar */}
           {/* Profile */}
        <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-gray-50 mb-3">

          <Link href="/dashboard/business/profile">
            <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center overflow-hidden text-white font-semibold">
              T
            </div>
          </Link>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">Temidayo Faluyi</p>
          </div>
        </div>

      </div>
      </div>
    </header>
  );
}
