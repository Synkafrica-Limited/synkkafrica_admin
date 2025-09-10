import React from "react";

export default function DashboardUserStatsWidget() {
  return (
    <div className="bg-white rounded-xl shadow p-4 flex-1 mb-6">
      <div className="font-semibold text-gray-800 mb-2">User Statistics</div>
      <div className="text-gray-500 text-sm mb-4">Key insights into your user base.</div>
      <ul className="space-y-2 text-xs text-gray-700">
        <li><span className="font-bold text-lg text-blue-900 mr-2">150</span> New Users (Last 30 days)</li>
        <li><span className="font-bold text-lg text-blue-900 mr-2">1500</span> Total Active Users</li>
        <li><span className="font-bold text-lg text-blue-900 mr-2">2500</span> Registered Users</li>
        <li><span className="font-bold text-lg text-blue-900 mr-2">500</span> Average Daily Sessions</li>
      </ul>
    </div>
  );
}
