"use client";
import React from "react";

/**
 * DashboardRecentActivityWidget - Reusable recent activity component
 * @param {String} title - Widget title
 * @param {String} description - Widget description
 * @param {Array} activities - Array of activity objects with { text, time }
 * @param {String} icon - Custom icon component (optional)
 */
export default function DashboardRecentActivityWidget({ 
    title = "Recent Activity", 
    description = "Latest interactions and changes in customer profiles.",
    activities = [],
    icon = null
}) {
    const defaultIcon = (
        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    );

    return (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    {icon || defaultIcon}
                    {title}
                </h3>
                <p className="text-sm text-gray-500 mt-1">{description}</p>
            </div>
            <div className="space-y-3">
                {activities.map((activity, index) => (
                    <div key={index} className="flex items-start gap-3 pb-3 border-b border-gray-100 last:border-0">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mt-1.5 flex-shrink-0"></div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm text-gray-700">{activity.text}</p>
                            <p className="text-xs text-gray-400 mt-0.5">{activity.time}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
