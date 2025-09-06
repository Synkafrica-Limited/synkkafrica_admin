"use client";

import React, { useState } from "react";
export default function DashboardChartWidget() {
  const years = [2023, 2024, 2025, 2026];
  const [selectedYear, setSelectedYear] = useState(2025);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  // Dummy data for multiple widgets
  const chartData = {
    Customers: [3,5,4,6,8,7,9,6,7,8,10,7],
    Bookings: [2,4,3,5,7,6,8,5,6,7,9,6],
    Revenue: [10,15,12,18,22,20,25,19,21,23,28,22],
  };
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

  return (
    <div className="bg-white rounded-xl shadow p-4 mb-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-2 gap-2">
        <span className="font-semibold text-gray-800">Statistics</span>
        <div className="relative">
          <button
            className="bg-orange-100 text-orange-600 px-3 py-1 rounded text-sm font-medium flex items-center gap-1"
            onClick={() => setDropdownOpen((v) => !v)}
          >
            {selectedYear} <span className="ml-1">▼</span>
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-24 bg-white rounded shadow z-10">
              {years.map((year) => (
                <button
                  key={year}
                  className={`block w-full text-left px-4 py-2 text-sm hover:bg-orange-50 ${year === selectedYear ? 'bg-orange-100 text-orange-600' : 'text-gray-700'}`}
                  onClick={() => { setSelectedYear(year); setDropdownOpen(false); }}
                >
                  {year}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="overflow-x-auto">
        <div className="flex min-w-[600px] justify-center items-end h-40 gap-2">
          {months.map((month, i) => (
            <div key={month} className="flex flex-col items-center w-10">
              {/* Revenue bar */}
              <div className="w-6 bg-green-400 rounded-t mb-1" style={{height: `${chartData.Revenue[i]*2}px`}}></div>
              {/* Bookings bar */}
              <div className="w-6 bg-orange-400 rounded-t mb-1" style={{height: `${chartData.Bookings[i]*10}px`}}></div>
              {/* Customers bar */}
              <div className="w-6 bg-blue-900 rounded-b" style={{height: `${chartData.Customers[i]*5}px`}}></div>
              <span className="text-xs text-gray-400 mt-1">{month}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        <span className="flex items-center gap-1 text-xs text-blue-900"><span className="w-3 h-3 bg-blue-900 rounded-full inline-block"></span> Customers</span>
        <span className="flex items-center gap-1 text-xs text-orange-400"><span className="w-3 h-3 bg-orange-400 rounded-full inline-block"></span> Bookings</span>
        <span className="flex items-center gap-1 text-xs text-green-400"><span className="w-3 h-3 bg-green-400 rounded-full inline-block"></span> Revenue</span>
      </div>
    </div>
  );
}
