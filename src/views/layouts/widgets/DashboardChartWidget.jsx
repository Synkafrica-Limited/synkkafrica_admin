"use client";
import React, { useState } from "react";

/**
 * DashboardChartWidget - Reusable bar chart component
 * @param {String} title - Chart title
 * @param {Array} data - Array of numeric values for chart bars
 * @param {String} year - Default selected year
 * @param {Array} yearOptions - Array of year options (optional)
 * @param {String} barColor - Tailwind color class for bars (default: orange-400)
 * @param {String} hoverColor - Tailwind color class for hover (default: orange-500)
 * @param {Array} yAxisLabels - Custom Y-axis labels (optional)
 */
export default function DashboardChartWidget({ 
    title = "Statistics", 
    data = [], 
    year = "2025", 
    yearOptions = ["2024", "2025"],
    barColor = "orange-400",
    hoverColor = "orange-500",
    yAxisLabels = ["320", "240", "160", "80", "0"]
}) {
    const [selectedYear, setSelectedYear] = useState(year);
    const maxValue = Math.max(...data);

    return (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
                <select 
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="px-4 py-2 bg-orange-500 text-white rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-600"
                >
                    {yearOptions.map((yearOption) => (
                        <option key={yearOption} value={yearOption}>{yearOption}</option>
                    ))}
                </select>
            </div>
            
            {/* Simple Bar Chart */}
            <div className="h-64 relative">
                {/* Y-axis labels */}
                <div className="absolute left-0 top-0 bottom-8 flex flex-col justify-between text-xs text-gray-400 pr-2">
                    {yAxisLabels.map((label, index) => (
                        <span key={index}>{label}</span>
                    ))}
                </div>
                
                {/* Chart bars */}
                <div className="ml-8 h-full flex items-end justify-between gap-2 pb-6">
                    {data.map((value, index) => (
                        <div key={index} className="flex-1 flex flex-col items-center gap-1">
                            <div 
                                className={`w-full bg-${barColor} rounded-t transition-all hover:bg-${hoverColor}`}
                                style={{ height: `${(value / maxValue) * 100}%` }}
                            ></div>
                            <span className="text-xs text-gray-500">{index + 1}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
