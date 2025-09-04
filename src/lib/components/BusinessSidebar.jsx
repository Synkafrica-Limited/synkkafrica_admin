import React from "react";
import { FaHome, FaUsers, FaStore, FaBell, FaCreditCard, FaCog, FaSignOutAlt } from "react-icons/fa";

const menuItems = [
  { label: "Home", icon: <FaHome />, href: "/business/dashboard" },
  { label: "Customers", icon: <FaUsers />, href: "/business/dashboard/customers" },
  { label: "Vendors", icon: <FaStore />, href: "/business/dashboard/vendors" },
  { label: "Notification", icon: <FaBell />, href: "/business/dashboard/notification" },
  { label: "Payment", icon: <FaCreditCard />, href: "/business/dashboard/payment" },
];

export default function BusinessSidebar({ active, onLogout }) {
  return (
    <aside className="h-screen w-64 bg-white border-r flex flex-col justify-between py-6 px-4">
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
        <div className="flex items-center px-4 py-2 rounded-lg text-gray-700">
          <img src="/images/synkkafrica_logo_small.png" alt="Admin" className="w-6 h-6 mr-2 rounded-full" />
          <span>Admin user</span>
        </div>
        <a href="/business/dashboard/settings" className="flex items-center px-4 py-2 rounded-lg text-gray-700 hover:bg-primary-50 hover:text-primary-600">
          <FaCog className="mr-3 text-lg" /> Settings
        </a>
        <button onClick={onLogout} className="flex items-center px-4 py-2 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-600 w-full">
          <FaSignOutAlt className="mr-3 text-lg" /> Logout
        </button>
      </div>
    </aside>
  );
}
