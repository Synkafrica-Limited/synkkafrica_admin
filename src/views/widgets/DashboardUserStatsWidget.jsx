import React from "react";

export default function DashboardUserStatsWidget({
  title = "User Statistics",
  description = "Key insights into your user base.",
  stats = [],
}) {
  return (
    <div className="bg-white rounded-xl shadow p-4 flex-1 mb-6">
      <div className="font-semibold text-gray-800 mb-2">{title}</div>
      <div className="text-gray-500 text-sm mb-4">{description}</div>
      <ul className="space-y-2 text-xs text-gray-700">
        {stats.length > 0
          ? stats.map((stat, idx) => (
              <li key={stat.id || idx}>
                <span className="font-bold text-lg text-blue-900 mr-2">{stat.value}</span> {stat.label}
              </li>
            ))
          : null}
      </ul>
    </div>
  );
}
