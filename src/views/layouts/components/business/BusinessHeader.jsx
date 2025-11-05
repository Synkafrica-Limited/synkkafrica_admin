import React from "react";
import { FaSearch } from "react-icons/fa";

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
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-200">
            <img 
              src="https://randomuser.me/api/portraits/men/32.jpg" 
              alt="User" 
              className="w-full h-full object-cover" 
            />
          </div>
        </div>
      </div>
    </header>
  );
}
