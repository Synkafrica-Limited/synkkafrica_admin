import React from "react";

export default function DashboardRecentActivityWidget({
  title = "Recent Activity",
  description = "Latest interactions and changes in customer profiles.",
  activities = [],
  icon = <span className="text-orange-500">&#9888;</span>,
}) {
  return (
    <div className="bg-white rounded-xl shadow p-4 flex-1 mb-6">
      <div className="font-semibold text-gray-800 mb-2">{title}</div>
      <div className="text-gray-500 text-sm mb-4">{description}</div>
      <ul className="space-y-2">
        {activities.length > 0
          ? activities.map((activity, idx) => (
              <li key={activity.id || idx} className="flex items-center gap-2 text-xs text-gray-700">
                {icon}
                {activity.text}
                <span className="text-gray-400 ml-auto">{activity.time}</span>
              </li>
            ))
          : null}
      </ul>
    </div>
  );
}
