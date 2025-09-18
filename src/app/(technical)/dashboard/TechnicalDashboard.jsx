"use client";
import React from "react";
import { FaHome, FaUsers, FaStore, FaChartBar, FaDatabase, FaShieldAlt } from "react-icons/fa";
import TechnicalSidebar from "@/lib/components/TechnicalSidebar";
import TechnicalHeader from "@/lib/components/TechnicalHeader";
import DashboardStatsWidget from "@/views/layouts/widgets/DashboardStatsWidget";
import DashboardChartWidget from "@/views/layouts/widgets/DashboardChartWidget";
import DashboardRecentActivityWidget from "@/views/layouts/widgets/DashboardRecentActivityWidget";
import DashboardUserStatsWidget from "@/views/layouts/widgets/DashboardUserStatsWidget";

export default function TechnicalDashboard() {
    // Technical dashboard stats
    const stats = [
        { label: "System Health", value: "98.5%", icon: <FaShieldAlt className="text-green-500" />, color: "text-green-500" },
        { label: "Active Users", value: 2847, icon: <FaUsers className="text-blue-500" />, color: "text-blue-500" },
        { label: "Database Size", value: "2.4GB", icon: <FaDatabase className="text-purple-500" />, color: "text-purple-500" },
        { label: "API Calls", value: "1.2M", icon: <FaChartBar className="text-orange-500" />, color: "text-orange-500" },
    ];

    const chartData = [
        [4, 8], [6, 6], [5, 7], [7, 5], [9, 4], [8, 3], [10, 2], [7, 6], [8, 7], [9, 5], [11, 4], [8, 3]
    ];
    const chartLegend = [
        { label: "System Load", color: "text-blue-900", bg: "bg-blue-900" },
        { label: "Response Time", color: "text-orange-400", bg: "bg-orange-400" }
    ];

    const activities = [
        { text: "System backup completed successfully.", time: "10 mins ago" },
        { text: "New user 'John Doe' registered.", time: "30 mins ago" },
        { text: "Database optimization completed.", time: "1 hour ago" },
        { text: "Security scan finished - no threats found.", time: "2 hours ago" },
        { text: "API rate limit updated for vendor endpoints.", time: "3 hours ago" },
        { text: "Cache cleared and rebuilt successfully.", time: "4 hours ago" },
        { text: "Server maintenance completed.", time: "6 hours ago" },
    ];

    const systemStats = [
        { value: "99.9%", label: "Uptime (Last 30 days)" },
        { value: "156ms", label: "Average Response Time" },
        { value: "2,847", label: "Active Sessions" },
        { value: "45GB", label: "Available Storage" },
    ];

    return (
        <div className="flex min-h-screen bg-gray-50">
            <div className="sticky top-0 h-screen">
                <TechnicalSidebar active="Home" onLogout={() => console.log('Logout')} />
            </div>
            <div className="flex-1 flex flex-col h-screen">
                <div className="sticky top-0 z-30 bg-gray-50">
                    <TechnicalHeader title="Technical Dashboard" subtitle="System overview and administration" />
                </div>
                <div className="flex-1 overflow-y-auto p-4 md:p-10">
                    <DashboardStatsWidget stats={stats} />
                    <DashboardChartWidget title="System Performance" year={2025} data={chartData} legend={chartLegend} />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <DashboardRecentActivityWidget 
                            title="System Activity" 
                            description="Recent system events and operations." 
                            activities={activities} 
                        />
                        <DashboardUserStatsWidget 
                            title="System Statistics" 
                            description="Key technical metrics and performance indicators." 
                            stats={systemStats} 
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
