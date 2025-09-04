import React from "react";

export default function BusinessHeader({ title = "Hello Admin", subtitle = "Welcome back" }) {
  return (
    <header className="flex items-center justify-between py-6 px-8 bg-white border-b">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
        <p className="text-gray-500">{subtitle}</p>
      </div>
      <div className="flex items-center space-x-4">
        <input
          type="text"
          placeholder="Search customers, vendor,etc."
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-300"
        />
        <img src="/images/synkkafrica_logo_small.png" alt="Admin" className="w-10 h-10 rounded-full" />
      </div>
    </header>
  );
}
