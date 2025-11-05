"use client";
import React from "react";
import {
    FaChartLine, FaWallet, FaMoneyBillWave, FaExclamationTriangle,
    FaCreditCard, FaCog, FaUndo, FaCheckCircle, FaArrowRight,
} from "react-icons/fa";
import { useRouter } from "next/navigation";
import BusinessSidebar from "@/views/layouts/components/business/BusinessSidebar";
import BusinessHeader from "@/views/layouts/components/business/BusinessHeader";

export default function FinancePage() {
    const router = useRouter();

    // Mock Finance Overview Data
    const financeOverview = {
        totalRevenue: "₦12,450,000",
        revenueChange: "+23.5%",
        pendingPayouts: "₦3,250,000",
        payoutsChange: "+12.3%",
        monthlyCommission: "₦1,245,000",
        commissionChange: "+18.7%",
        activeDisputes: 5,
        disputesChange: "-2",
        pendingRefunds: 2,
        refundsAmount: "₦135,000",
    };

    // Navigation Cards
    const financeModules = [
        {
            title: "Vendor Payouts",
            description: "Review and approve vendor payout requests",
            icon: <FaWallet className="text-4xl" />,
            color: "orange",
            bgColor: "bg-orange-50",
            borderColor: "border-orange-200",
            hoverBorderColor: "hover:border-orange-500",
            iconColor: "text-orange-500",
            stats: [
                { label: "Pending Approval", value: "₦3,250,000" },
                { label: "This Month", value: "₦8,500,000" },
            ],
            path: "/dashboard/business/finance/payouts",
        },
        {
            title: "Booking Payments",
            description: "Track all customer payments via Stripe",
            icon: <FaCreditCard className="text-4xl" />,
            color: "blue",
            bgColor: "bg-blue-50",
            borderColor: "border-blue-200",
            hoverBorderColor: "hover:border-blue-500",
            iconColor: "text-blue-500",
            stats: [
                { label: "Total Revenue", value: "₦12,450,000" },
                { label: "Commission Earned", value: "₦1,245,000" },
            ],
            path: "/dashboard/business/finance/payments",
        },
        {
            title: "Disputes",
            description: "Manage and resolve customer disputes",
            icon: <FaExclamationTriangle className="text-4xl" />,
            color: "red",
            bgColor: "bg-red-50",
            borderColor: "border-red-200",
            hoverBorderColor: "hover:border-red-500",
            iconColor: "text-red-500",
            stats: [
                { label: "Active Disputes", value: "5" },
                { label: "In Review", value: "2" },
            ],
            path: "/dashboard/business/finance/disputes",
        },
        {
            title: "Refunds",
            description: "Process and track customer refunds",
            icon: <FaUndo className="text-4xl" />,
            color: "purple",
            bgColor: "bg-purple-50",
            borderColor: "border-purple-200",
            hoverBorderColor: "hover:border-purple-500",
            iconColor: "text-purple-500",
            stats: [
                { label: "Pending Refunds", value: "2" },
                { label: "Total Amount", value: "₦135,000" },
            ],
            path: "/dashboard/business/finance/refunds",
        },
        {
            title: "Settings",
            description: "Configure commission rates and fee settings",
            icon: <FaCog className="text-4xl" />,
            color: "gray",
            bgColor: "bg-gray-50",
            borderColor: "border-gray-200",
            hoverBorderColor: "hover:border-gray-500",
            iconColor: "text-gray-500",
            stats: [
                { label: "Platform Fee", value: "10%" },
                { label: "VAT Rate", value: "7.5%" },
            ],
            path: "/dashboard/business/finance/settings",
        },
    ];

    // Recent Activity
    const recentActivity = [
        { 
            icon: <FaCheckCircle className="text-green-600" />, 
            text: "Payout processed for Elite Event Planning", 
            time: "2 hours ago",
            type: "success"
        },
        { 
            icon: <FaCreditCard className="text-blue-600" />, 
            text: "Payment received: ₦150,000 from Emmanuel Johnson", 
            time: "4 hours ago",
            type: "info"
        },
        { 
            icon: <FaExclamationTriangle className="text-orange-600" />, 
            text: "New dispute filed for Order #ORD-2025-009", 
            time: "6 hours ago",
            type: "warning"
        },
        { 
            icon: <FaUndo className="text-purple-600" />, 
            text: "Refund processed: ₦35,000 to Michael Adebayo", 
            time: "1 day ago",
            type: "info"
        },
        { 
            icon: <FaWallet className="text-orange-600" />, 
            text: "Payout request received from Luxury Car Rentals", 
            time: "1 day ago",
            type: "info"
        },
    ];

    return (
        <div className="flex min-h-screen bg-gray-50">
            <div className="sticky top-0 h-screen">
                <BusinessSidebar active="Finance" onLogout={() => console.log('Logout')} />
            </div>
            <div className="flex-1 flex flex-col min-h-screen">
                <BusinessHeader 
                    title="Finance Management" 
                    subtitle="Overview of payments, payouts, and financial operations" 
                />

                <div className="flex-1 overflow-y-auto p-6">
                    {/* Overview Stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="p-2 rounded-lg bg-green-50">
                                    <FaChartLine className="text-green-600" />
                                </div>
                                <h3 className="text-sm font-medium text-gray-600">Total Revenue</h3>
                            </div>
                            <p className="text-2xl font-bold text-gray-900 mb-1">{financeOverview.totalRevenue}</p>
                            <p className="text-xs text-green-600 font-medium">{financeOverview.revenueChange} from last month</p>
                        </div>

                        <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="p-2 rounded-lg bg-orange-50">
                                    <FaWallet className="text-orange-600" />
                                </div>
                                <h3 className="text-sm font-medium text-gray-600">Pending Payouts</h3>
                            </div>
                            <p className="text-2xl font-bold text-gray-900 mb-1">{financeOverview.pendingPayouts}</p>
                            <p className="text-xs text-orange-600 font-medium">{financeOverview.payoutsChange} from last month</p>
                        </div>

                        <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="p-2 rounded-lg bg-blue-50">
                                    <FaMoneyBillWave className="text-blue-600" />
                                </div>
                                <h3 className="text-sm font-medium text-gray-600">Monthly Commission</h3>
                            </div>
                            <p className="text-2xl font-bold text-gray-900 mb-1">{financeOverview.monthlyCommission}</p>
                            <p className="text-xs text-blue-600 font-medium">{financeOverview.commissionChange} from last month</p>
                        </div>

                        <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="p-2 rounded-lg bg-red-50">
                                    <FaExclamationTriangle className="text-red-600" />
                                </div>
                                <h3 className="text-sm font-medium text-gray-600">Active Disputes</h3>
                            </div>
                            <p className="text-2xl font-bold text-gray-900 mb-1">{financeOverview.activeDisputes}</p>
                            <p className="text-xs text-green-600 font-medium">{financeOverview.disputesChange} from last month</p>
                        </div>
                    </div>

                    {/* Finance Modules Navigation */}
                    <div className="mb-8">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Finance Modules</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {financeModules.map((module, index) => (
                                <div
                                    key={index}
                                    onClick={() => router.push(module.path)}
                                    className={`bg-white rounded-lg border-2 ${module.borderColor} ${module.hoverBorderColor} p-6 cursor-pointer transition-all hover:shadow-lg group`}
                                >
                                    <div className="flex items-start justify-between mb-4">
                                        <div className={`p-4 rounded-lg ${module.bgColor}`}>
                                            <div className={module.iconColor}>
                                                {module.icon}
                                            </div>
                                        </div>
                                        <FaArrowRight className="text-gray-400 group-hover:text-orange-500 transition-colors" />
                                    </div>

                                    <h3 className="text-lg font-bold text-gray-900 mb-2">{module.title}</h3>
                                    <p className="text-sm text-gray-600 mb-4">{module.description}</p>

                                    <div className="space-y-2 pt-4 border-t border-gray-200">
                                        {module.stats.map((stat, idx) => (
                                            <div key={idx} className="flex justify-between items-center">
                                                <span className="text-xs text-gray-500">{stat.label}</span>
                                                <span className="text-sm font-semibold text-gray-900">{stat.value}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-semibold text-gray-900">Recent Financial Activity</h3>
                            <button className="text-sm text-orange-500 hover:text-orange-600 font-medium">
                                View All
                            </button>
                        </div>
                        <div className="space-y-4">
                            {recentActivity.map((activity, index) => (
                                <div key={index} className="flex items-start gap-4 pb-4 border-b border-gray-100 last:border-0">
                                    <div className="p-2 bg-gray-50 rounded-lg flex-shrink-0">
                                        {activity.icon}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm text-gray-900">{activity.text}</p>
                                        <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200 p-6">
                            <h4 className="text-sm font-medium text-green-800 mb-2">This Month's Revenue</h4>
                            <p className="text-3xl font-bold text-green-900 mb-1">₦12.45M</p>
                            <p className="text-xs text-green-700">+23.5% from last month</p>
                        </div>

                        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg border border-orange-200 p-6">
                            <h4 className="text-sm font-medium text-orange-800 mb-2">Pending Actions</h4>
                            <p className="text-3xl font-bold text-orange-900 mb-1">7</p>
                            <p className="text-xs text-orange-700">Payouts & Refunds to process</p>
                        </div>

                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200 p-6">
                            <h4 className="text-sm font-medium text-blue-800 mb-2">Platform Commission</h4>
                            <p className="text-3xl font-bold text-blue-900 mb-1">₦1.24M</p>
                            <p className="text-xs text-blue-700">10% of total revenue</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
