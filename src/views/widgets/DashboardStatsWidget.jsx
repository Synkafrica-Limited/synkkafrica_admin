import React from "react";
import { FaUsers, FaUser, FaBell, FaMoneyBillWave } from "react-icons/fa";

export default function DashboardStatsWidget() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-white rounded-xl shadow p-4 flex flex-col items-start">
        <div className="flex items-center gap-2 mb-2">
          <FaUsers className="text-blue-500 text-2xl" />
          <span className="font-semibold text-gray-700">Total vendors</span>
        </div>
        <div className="text-2xl font-bold text-gray-900">400</div>
        <div className="text-xs text-gray-500">+20.1% from last month</div>
      </div>
      <div className="bg-white rounded-xl shadow p-4 flex flex-col items-start">
        <div className="flex items-center gap-2 mb-2">
          <FaUser className="text-blue-500 text-2xl" />
          <span className="font-semibold text-gray-700">Total customers</span>
        </div>
        <div className="text-2xl font-bold text-gray-900">1400</div>
        <div className="text-xs text-gray-500">+20.1% from last month</div>
      </div>
      <div className="bg-white rounded-xl shadow p-4 flex flex-col items-start">
        <div className="flex items-center gap-2 mb-2">
          <FaBell className="text-blue-500 text-2xl" />
          <span className="font-semibold text-gray-700">Notifications</span>
        </div>
        <div className="text-2xl font-bold text-gray-900">150</div>
        <div className="text-xs text-gray-500">+5% from last month</div>
      </div>
      <div className="bg-white rounded-xl shadow p-4 flex flex-col items-start">
        <div className="flex items-center gap-2 mb-2">
          <FaMoneyBillWave className="text-blue-500 text-2xl" />
          <span className="font-semibold text-gray-700">Total Revenue</span>
        </div>
        <div className="text-2xl font-bold text-gray-900">$60,000.00</div>
        <div className="text-xs text-gray-500">+30% from last month</div>
      </div>
    </div>
  );
}
