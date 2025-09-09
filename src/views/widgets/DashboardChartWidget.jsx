import React from "react";

export default function DashboardChartWidget({ title = "Statistics", year = 2025, data = [], legend = [] }) {
  return (
    <div className="bg-white rounded-xl shadow p-4 mb-6">
      <div className="flex items-center justify-between mb-2">
        <span className="font-semibold text-gray-800">{title}</span>
        <button className="bg-orange-100 text-orange-600 px-3 py-1 rounded text-sm font-medium">{year} <span className="ml-1">▼</span></button>
      </div>
      <div className="flex justify-center items-end h-40 gap-2">
        {data.map((val, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className="w-6 bg-orange-400 rounded-t" style={{height: `${val[0]*10}px`}}></div>
            <div className="w-6 bg-blue-900 rounded-b" style={{height: `${val[1]*5}px`}}></div>
            <span className="text-xs text-gray-400 mt-1">{i+1}</span>
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-4 mt-4">
        {legend.map((item, idx) => (
          <span key={idx} className={`flex items-center gap-1 text-xs ${item.color}`}><span className={`w-3 h-3 ${item.bg} rounded-full inline-block`}></span> {item.label}</span>
        ))}
      </div>
    </div>
  );
}
