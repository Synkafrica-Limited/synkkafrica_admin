import React from "react";

export default function DashboardRecentActivityWidget() {
  return (
    <div className="bg-white rounded-xl shadow p-4 flex-1 mb-6">
      <div className="font-semibold text-gray-800 mb-2">Recent Activity</div>
      <div className="text-gray-500 text-sm mb-4">Latest interactions and changes in customer profiles.</div>
      <ul className="space-y-2">
        <li className="flex items-center gap-2 text-xs text-gray-700"><span className="text-orange-500">&#9888;</span> Emmanuel created a new booking for luxury sedan. <span className="text-gray-400 ml-auto">2 mins ago</span></li>
        <li className="flex items-center gap-2 text-xs text-gray-700"><span className="text-orange-500">&#9888;</span> Paul updated hiss contact phone number. <span className="text-gray-400 ml-auto">1 hour ago</span></li>
        <li className="flex items-center gap-2 text-xs text-gray-700"><span className="text-orange-500">&#9888;</span> Temi completed a trip. <span className="text-gray-400 ml-auto">6 hour ago</span></li>
        <li className="flex items-center gap-2 text-xs text-gray-700"><span className="text-orange-500">&#9888;</span> Dammy created a new booking for laundry <span className="text-gray-400 ml-auto">12 hour ago</span></li>
        <li className="flex items-center gap-2 text-xs text-gray-700"><span className="text-orange-500">&#9888;</span> Ezra created a new booking for dining. <span className="text-gray-400 ml-auto">2 days ago</span></li>
        <li className="flex items-center gap-2 text-xs text-gray-700"><span className="text-orange-500">&#9888;</span> Gaius requested a refund. <span className="text-gray-400 ml-auto">3 days ago</span></li>
        <li className="flex items-center gap-2 text-xs text-gray-700"><span className="text-orange-500">&#9888;</span> New customer, signed up for an account. <span className="text-gray-400 ml-auto">2 weeks ago</span></li>
      </ul>
    </div>
  );
}
