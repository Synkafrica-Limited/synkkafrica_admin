"use client";
import React, { useState } from "react";
import { FaUsers, FaStore, FaBell, FaDollarSign, FaSearch } from "react-icons/fa";
import BusinessSidebar from "@/views/layouts/components/business/BusinessSidebar";
import AdminButton from "@/ui/button";
import BusinessHeader from "@/views/layouts/components/business/BusinessHeader";

export default function BusinessDashboard() {
    const [selectedYear, setSelectedYear] = useState("2025");
    
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
            <div className="sticky top-0 h-screen">
                <BusinessSidebar active="Dashboard" onLogout={() => console.log('Logout')} />
            </div>
            <div className="flex-1 flex flex-col min-h-screen">
                {/* Header with search and user profile */}
                    <BusinessHeader title="Dashboard" subtitle="Overview of business activities" />

                <div className="flex-1 overflow-y-auto p-6">
                    {/* Welcome Section */}
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">Hello Admin</h2>
                        <p className="text-gray-500 text-sm">Welcome back</p>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        {statsCards.map((stat, index) => (
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

                    {/* Charts Section - Statistics, Revenue, Top Services */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                        {/* Statistics Chart */}
                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-lg font-semibold text-gray-900">Statistics</h2>
                                <select 
                                    value={selectedYear}
                                    onChange={(e) => setSelectedYear(e.target.value)}
                                    className="px-4 py-2 bg-orange-500 text-white rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-600"
                                >
                                    <option value="2024">2024</option>
                                    <option value="2025">2025</option>
                                </select>
                            </div>
                            
                            {/* Simple Bar Chart */}
                            <div className="h-64 relative">
                                {/* Y-axis labels */}
                                <div className="absolute left-0 top-0 bottom-8 flex flex-col justify-between text-xs text-gray-400 pr-2">
                                    <span>320</span>
                                    <span>240</span>
                                    <span>160</span>
                                    <span>80</span>
                                    <span>0</span>
                                </div>
                                
                                {/* Chart bars */}
                                <div className="ml-8 h-full flex items-end justify-between gap-2 pb-6">
                                    {[320, 240, 160, 80, 280, 200, 150, 300, 250, 180, 220, 190].map((height, index) => (
                                        <div key={index} className="flex-1 flex flex-col items-center gap-1">
                                            <div 
                                                className="w-full bg-orange-400 rounded-t transition-all hover:bg-orange-500" 
                                                style={{ height: `${(height / 320) * 100}%` }}
                                            ></div>
                                            <span className="text-xs text-gray-500">{index + 1}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Revenue Chart */}
                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-lg font-semibold text-gray-900">Revenue</h2>
                                <select 
                                    className="px-4 py-2 bg-orange-500 text-white rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-600"
                                >
                                    <option value="2025">2025</option>
                                </select>
                            </div>
                            
                            {/* Line/Bar Chart */}
                            <div className="h-64 relative">
                                {/* Y-axis labels */}
                                <div className="absolute left-0 top-0 bottom-8 flex flex-col justify-between text-xs text-gray-400 pr-2">
                                    <span>1M</span>
                                    <span>500k</span>
                                    <span>100k</span>
                                    <span>50k</span>
                                    <span>10k</span>
                                </div>
                                
                                {/* Chart bars */}
                                <div className="ml-8 h-full flex items-end justify-between gap-2 pb-6">
                                    {[40, 60, 35, 50, 45, 70, 55, 80, 65, 75, 60, 85].map((height, index) => (
                                        <div key={index} className="flex-1 flex flex-col items-center gap-1">
                                            <div 
                                                className="w-full bg-blue-200 rounded-t transition-all hover:bg-blue-300" 
                                                style={{ height: `${height}%` }}
                                            ></div>
                                            <span className="text-xs text-gray-500">{index + 1}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Top Services */}
                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">Top service by price sold</h2>
                            <div className="space-y-3">
                                {[
                                    { name: "Jet Ski", price: "₦100k" },
                                    { name: "Jollof rice", price: "₦100k" },
                                    { name: "Wash & rinse", price: "₦100k" },
                                    { name: "Benz", price: "₦100k" },
                                    { name: "Wash & rinse", price: "₦100k" },
                                    { name: "Benz", price: "₦100k" },
                                ].map((service, index) => (
                                    <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                                        <span className="text-sm text-gray-700">{service.name}</span>
                                        <span className="text-sm font-semibold text-gray-900">{service.price}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Recent Activity and User Statistics */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Recent Activity */}
                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <div className="mb-4">
                                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Recent Activity
                                </h3>
                                <p className="text-sm text-gray-500 mt-1">Latest interactions and changes in customer profiles.</p>
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

                        {/* User Statistics */}
                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <div className="mb-4">
                                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                                    <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                    User Statistics
                                </h3>
                                <p className="text-sm text-gray-500 mt-1">Key insights into your user base.</p>
                            </div>
                            <div className="space-y-4">
                                {userStats.map((stat, index) => (
                                    <div key={index} className="flex items-center justify-between pb-4 border-b border-gray-100 last:border-0">
                                        <span className="text-sm text-gray-600">{stat.label}</span>
                                        <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
