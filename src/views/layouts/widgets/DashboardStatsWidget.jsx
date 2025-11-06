"use client";
import React from "react";

/**
 * DashboardStatsWidget - Reusable stats cards component
 * @param {Array} stats - Array of stat objects with { label, value, subtitle, icon, bgColor }
 */
export default function DashboardStatsWidget({ stats }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-lg border border-gray-200 p-5">
                    <div className="flex items-center gap-3 mb-3">
                        <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                            {stat.icon}
                        </div>
                        <h3 className="text-sm font-medium text-gray-600">{stat.label}</h3>
                    </div>
                    <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
                    <p className="text-xs text-gray-500">{stat.subtitle}</p>
                </div>
            ))}
        </div>
    );
}
