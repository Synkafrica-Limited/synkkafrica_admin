"use client";
import React from "react";
import { FaHome, FaUsers, FaStore, FaChartBar, FaList, FaClock, FaFileAlt, FaEye } from "react-icons/fa";
import TechnicalSidebar from "@/views/layouts/components/technical/TechnicalSidebar";
import TechnicalHeader from "@/views/layouts/components/technical/TechnicalHeader";
import DashboardStatsWidget from "@/views/layouts/widgets/DashboardStatsWidget";
import DashboardChartWidget from "@/views/layouts/widgets/DashboardChartWidget";
import DashboardRecentActivityWidget from "@/views/layouts/widgets/DashboardRecentActivityWidget";
import DashboardUserStatsWidget from "@/views/layouts/widgets/DashboardUserStatsWidget";

export default function TechnicalDashboard() {
    // Technical dashboard stats - CMS focused
    const stats = [
        { label: "Total Listings", value: "1,247", icon: <FaList className="text-blue-500" />, color: "text-blue-500" },
        { label: "Awaiting Approval", value: 23, icon: <FaClock className="text-orange-500" />, color: "text-orange-500" },
        { label: "Active Users", value: 2847, icon: <FaUsers className="text-green-500" />, color: "text-green-500" },
        { label: "CMS Pages", value: 18, icon: <FaFileAlt className="text-purple-500" />, color: "text-purple-500" },
    ];

    const chartData = [
        [45, 12], [52, 18], [48, 15], [65, 22], [58, 19], [72, 28], [69, 25], [75, 30], [82, 32], [78, 29], [85, 35], [89, 38]
    ];
    const chartLegend = [
        { label: "New Listings", color: "text-blue-900", bg: "bg-blue-900" },
        { label: "Approvals", color: "text-orange-400", bg: "bg-orange-400" }
    ];

    const listingActivities = [
        { text: "New listing 'Modern 2BR Apartment' submitted for review.", time: "5 mins ago" },
        { text: "Listing 'Beach House Villa' approved by business team.", time: "15 mins ago" },
        { text: "Vendor 'PropertyMax Ltd' added 3 new listings.", time: "30 mins ago" },
        { text: "Listing 'Downtown Office Space' flagged for content review.", time: "45 mins ago" },
        { text: "CMS page 'Terms of Service' updated.", time: "1 hour ago" },
        { text: "Bulk listing import completed - 12 properties added.", time: "2 hours ago" },
        { text: "Listing 'Luxury Penthouse' featured on homepage.", time: "3 hours ago" },
    ];

    const listingStats = [
        { value: "1,247", label: "Total Listings Added" },
        { value: "23", label: "Pending Approvals" },
        { value: "156", label: "Approved This Week" },
        { value: "95.2%", label: "Approval Rate" },
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
                    
                    <DashboardChartWidget 
                        title="Listing Analytics" 
                        year={2025} 
                        data={chartData.flat()}
                        yearOptions={["2024", "2025"]}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <DashboardRecentActivityWidget 
                            title="Recent Listing Activity" 
                            description="Latest submissions and approvals from business team." 
                            activities={listingActivities} 
                        />
                        <DashboardUserStatsWidget 
                            title="Listing Statistics" 
                            description="Key metrics for listing management and approvals." 
                            stats={listingStats} 
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
