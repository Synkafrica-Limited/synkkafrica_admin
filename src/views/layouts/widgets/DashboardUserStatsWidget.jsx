"use client";
import React from "react";

/**
 * DashboardUserStatsWidget - Reusable user statistics component
 * @param {String} title - Widget title
 * @param {String} description - Widget description
 * @param {Array} stats - Array of stat objects with { value, label }
 * @param {String} icon - Custom icon component (optional)
 */
export default function DashboardUserStatsWidget({ 
    title = "User Statistics", 
    description = "Key insights into your user base.",
    stats = [],
    icon = null
}) {
    const defaultIcon = (
        <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
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
            <div className="space-y-4">
                {stats.map((stat, index) => (
                    <div key={index} className="flex items-center justify-between pb-4 border-b border-gray-100 last:border-0">
                        <span className="text-sm text-gray-600">{stat.label}</span>
                        <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
