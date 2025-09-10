import React from "react";
import { FaCalendarCheck, FaUsers, FaStore, FaMoneyBill } from "react-icons/fa";
import DashboardStatsWidget from "@/views/layouts/widgets/DashboardStatsWidget";
import DashboardChartWidget from "@/views/layouts/widgets/DashboardChartWidget";
import DashboardRecentActivityWidget from "@/views/layouts/widgets/DashboardRecentActivityWidget";
import DashboardUserStatsWidget from "@/views/layouts/widgets/DashboardUserStatsWidget";
import BusinessSidebar from "@/lib/components/BusinessSidebar";
import BusinessHeader from "@/lib/components/BusinessHeader";

export default function Dashboard() {
    const chartData = [
        [3, 9], [5, 7], [4, 8], [6, 6], [8, 5], [7, 4], [9, 3], [6, 7], [7, 8], [8, 6], [10, 5], [7, 4]
    ];
    const chartLegend = [
        { label: "Customers", color: "text-blue-900", bg: "bg-blue-900" },
        { label: "Bookings", color: "text-orange-400", bg: "bg-orange-400" }
    ];

    const activities = [
        { text: "Emmanuel created a new booking for luxury sedan.", time: "2 mins ago" },
        { text: "Paul updated his contact phone number.", time: "1 hour ago" },
        { text: "Temi completed a trip.", time: "6 hours ago" },
        { text: "Dammy created a new booking for laundry.", time: "12 hours ago" },
        { text: "Ezra created a new booking for dining.", time: "2 days ago" },
        { text: "Gaius requested a refund.", time: "3 days ago" },
        { text: "New customer signed up for an account.", time: "2 weeks ago" },
    ];

    const userStats = [
        { value: 150, label: "New Users (Last 30 days)" },
        { value: 1500, label: "Total Active Users" },
        { value: 2500, label: "Registered Users" },
        { value: 500, label: "Average Daily Sessions" },
    ];

    return (
        // Example layout for any dashboard page
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar: fixed, not scrollable */}
            <div className="sticky top-0 h-screen">
                <BusinessSidebar active="Home" />
            </div>
            {/* Main area: header fixed, content scrollable */}
            <div className="flex-1 flex flex-col h-screen">
                <div className="sticky top-0 z-30 bg-gray-50">
                    <BusinessHeader title="Hello Admin" subtitle="Welcome back" />
                </div>
                <div className="flex-1 overflow-y-auto p-4 md:p-10">
                    {/* Place your page content/components/widgets here */}
                    {/* spacer */}
                    <div className="my-4" />
                    <DashboardStatsWidget stats={[
                        { label: "Total Vendors", value: 400, sub: "+20.1% from last month", icon: "users"  },
                        { label: "Total Customers", value: 80, sub: "+15.5% from last month", icon: "user"  },
                        { label: "Total Bookings", value: 30, sub: "+10.2% from last month", icon: "bookings"  },
                        { label: "Total Revenue", value: "$12,000", sub: "+25.3% from last month", icon: "money"  },
                    ]
                    } />
                    <DashboardChartWidget title="Statistics" year={2025} data={chartData} legend={chartLegend} />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <DashboardRecentActivityWidget title="Recent Activity" description="Latest interactions and changes in customer profiles." activities={activities} />
                        <DashboardUserStatsWidget title="User Statistics" description="Key insights into your user base." stats={userStats} />
                    </div>
                </div>
            </div>
        </div>
    );
}
