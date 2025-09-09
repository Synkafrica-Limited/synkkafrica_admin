import React from "react";

export default function DashboardChartWidget() {
  return (
    <div className="bg-white rounded-xl shadow p-4 mb-6">
      <div className="flex items-center justify-between mb-2">
        <span className="font-semibold text-gray-800">Statistics</span>
        <button className="bg-orange-100 text-orange-600 px-3 py-1 rounded text-sm font-medium">2025 <span className="ml-1">▼</span></button>
      </div>
      <div className="flex justify-center items-end h-40 gap-2">
        {/* Dummy bar chart */}
        {[3,5,4,6,8,7,9,6,7,8,10,7].map((val, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className="w-6 bg-orange-400 rounded-t" style={{height: `${val*10}px`}}></div>
            <div className="w-6 bg-blue-900 rounded-b" style={{height: `${(12-val)*5}px`}}></div>
            <span className="text-xs text-gray-400 mt-1">{i+1}</span>
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-4 mt-4">
        <span className="flex items-center gap-1 text-xs text-blue-900"><span className="w-3 h-3 bg-blue-900 rounded-full inline-block"></span> Customers</span>
        <span className="flex items-center gap-1 text-xs text-orange-400"><span className="w-3 h-3 bg-orange-400 rounded-full inline-block"></span> Bookings</span>
      </div>
    </div>
  );
}
