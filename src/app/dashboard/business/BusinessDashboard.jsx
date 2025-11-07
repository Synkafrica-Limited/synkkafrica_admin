"use client";
import React, { useState } from "react";
import { FaUsers, FaStore, FaBell, FaDollarSign, FaSearch } from "react-icons/fa";
import BusinessSidebar from "@/views/layouts/components/business/BusinessSidebar";
import AdminButton from "@/ui/button";
import BusinessHeader from "@/views/layouts/components/business/BusinessHeader";
import DashboardStatsWidget from "@/views/layouts/widgets/DashboardStatsWidget";
import DashboardChartWidget from "@/views/layouts/widgets/DashboardChartWidget";
import DashboardRevenueChartWidget from "@/views/layouts/widgets/DashboardRevenueChartWidget";
import DashboardTopServicesWidget from "@/views/layouts/widgets/DashboardTopServicesWidget";
import DashboardRecentActivityWidget from "@/views/layouts/widgets/DashboardRecentActivityWidget";
import DashboardUserStatsWidget from "@/views/layouts/widgets/DashboardUserStatsWidget";

export default function BusinessDashboard() {
    const [selectedYear, setSelectedYear] = useState("2025");
    const [sidebarOpen, setSidebarOpen] = useState(false);
    
    // Stats cards data matching the vendor dashboard design
    const statsCards = [
        { 
            label: "Total vendors", 
            value: 400, 
            subtitle: "+20% from last month",
            icon: <FaStore className="text-blue-600" />,
            bgColor: "bg-blue-50"
        },
        { 
            label: "Total customers", 
            value: 1400, 
            subtitle: "+20.1% from last month",
            icon: <FaUsers className="text-green-600" />,
            bgColor: "bg-green-50"
        },
        { 
            label: "Notifications", 
            value: 150, 
            subtitle: "+5% from last month",
            icon: <FaBell className="text-orange-600" />,
            bgColor: "bg-orange-50"
        },
        { 
            label: "Total Revenue", 
            value: "₦60,000.00", 
            subtitle: "+30% from last month",
            icon: <FaDollarSign className="text-purple-600" />,
            bgColor: "bg-purple-50"
        },
    ];

    const chartData = {
        customers: [3, 5, 4, 6, 8, 7, 9, 6, 7, 8, 10, 7],
        bookings: [9, 7, 8, 6, 5, 4, 3, 7, 8, 6, 5, 4]
    };

    const activities = [
        { text: "Emmanuel created a new booking for luxury sedan.", time: "2 mins ago" },
        { text: "Paul updated hiss contact phone number.", time: "1 hour ago" },
        { text: "Temi completed a trip.", time: "6 hour ago" },
        { text: "Dammy created a new booking for laundry.", time: "12 hour ago" },
        { text: "Ezra created a new booking for dining.", time: "2 days ago" },
        { text: "Galus requested a refund.", time: "3 days ago" },
        { text: "New customer signed-up for an account.", time: "2 weeks ago" },
    ];

    const userStats = [
        { value: 150, label: "New Users (Last 30 days)" },
        { value: 1500, label: "Total Active Users" },
        { value: 2500, label: "Registered Users" },
        { value: 500, label: "Average Daily Sessions" },
    ];

    const maxValue = Math.max(...chartData.customers, ...chartData.bookings);

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}
            <BusinessSidebar 
                active="Dashboard" 
                onLogout={() => console.log('Logout')}
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />
            
            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Header with search and user profile */}
                <BusinessHeader 
                    title="Dashboard" 
                    subtitle="Overview of business activities"
                    onMenuClick={() => setSidebarOpen(true)}
                />

                <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                    {/* Welcome Section */}
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">Hello Admin</h2>
                        <p className="text-gray-500 text-sm">Welcome back</p>
                    </div>

                    {/* Stats Cards */}
                    <DashboardStatsWidget stats={statsCards} />

                    {/* Charts Section - Statistics, Revenue, Top Services */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6">
                        <DashboardChartWidget 
                            title="Statistics" 
                            data={[320, 240, 160, 80, 280, 200, 150, 300, 250, 180, 220, 190]}
                            year={selectedYear}
                            yearOptions={["2024", "2025"]}
                        />
                        
                        <DashboardRevenueChartWidget 
                            title="Revenue" 
                            data={[40, 60, 35, 50, 45, 70, 55, 80, 65, 75, 60, 85]}
                        />
                        
                        <DashboardTopServicesWidget 
                            title="Top service by price sold"
                            services={[
                                { name: "Jet Ski", price: "₦100k" },
                                { name: "Jollof rice", price: "₦100k" },
                                { name: "Wash & rinse", price: "₦100k" },
                                { name: "Benz", price: "₦100k" },
                                { name: "Wash & rinse", price: "₦100k" },
                                { name: "Benz", price: "₦100k" },
                            ]}
                        />
                    </div>

                    {/* Recent Activity and User Statistics */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                        <DashboardRecentActivityWidget 
                            title="Recent Activity"
                            description="Latest interactions and changes in customer profiles."
                            activities={activities}
                        />
                        
                        <DashboardUserStatsWidget 
                            title="User Statistics"
                            description="Key insights into your user base."
                            stats={userStats}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
