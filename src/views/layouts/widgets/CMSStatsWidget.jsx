'use client';

import React, { useState, useEffect } from 'react';
import { 
    FaChartBar, 
    FaEye, 
    FaUsers, 
    FaStar, 
    FaDollarSign,
    FaArrowUp,
    FaArrowDown,
    FaChartLine,
    FaLayerGroup
} from 'react-icons/fa';

export default function CMSStatsWidget({ stats, className = '' }) {
    const [animatedStats, setAnimatedStats] = useState({
        totalServices: 0,
        publishedServices: 0,
        totalViews: 0,
        totalBookings: 0,
        averageRating: 0
    });

    useEffect(() => {
        if (!stats) return;

        // Animate the numbers
        const duration = 1000; // 1 second
        const steps = 60; // 60 steps for smooth animation
        const stepDuration = duration / steps;

        let currentStep = 0;
        const timer = setInterval(() => {
            currentStep++;
            const progress = currentStep / steps;
            
            setAnimatedStats({
                totalServices: Math.floor(stats.totalServices * progress),
                publishedServices: Math.floor(stats.publishedServices * progress),
                totalViews: Math.floor(stats.totalViews * progress),
                totalBookings: Math.floor(stats.totalBookings * progress),
                averageRating: parseFloat((stats.averageRating * progress).toFixed(1))
            });

            if (currentStep >= steps) {
                clearInterval(timer);
                setAnimatedStats({
                    totalServices: stats.totalServices,
                    publishedServices: stats.publishedServices,
                    totalViews: stats.totalViews,
                    totalBookings: stats.totalBookings,
                    averageRating: stats.averageRating
                });
            }
        }, stepDuration);

        return () => clearInterval(timer);
    }, [stats]);

    if (!stats) {
        return (
            <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ${className}`}>
                {[...Array(4)].map((_, index) => (
                    <div key={index} className="bg-white p-6 rounded-lg shadow animate-pulse">
                        <div className="flex items-center">
                            <div className="p-3 bg-gray-200 rounded-lg">
                                <div className="w-6 h-6 bg-gray-300 rounded"></div>
                            </div>
                            <div className="ml-4 flex-1">
                                <div className="h-4 bg-gray-200 rounded w-20 mb-2"></div>
                                <div className="h-8 bg-gray-200 rounded w-16"></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    const conversionRate = stats.totalViews > 0 ? ((stats.totalBookings / stats.totalViews) * 100).toFixed(1) : 0;
    const totalRevenue = stats.totalBookings * 150; // Assuming average price of $150

    const statCards = [
        {
            title: 'Total Services',
            value: animatedStats.totalServices,
            icon: FaLayerGroup,
            iconBg: 'bg-blue-100',
            iconColor: 'text-blue-600',
            subtitle: `${animatedStats.publishedServices} Published`,
            trend: 'up',
            trendValue: '12%'
        },
        {
            title: 'Total Views',
            value: animatedStats.totalViews.toLocaleString(),
            icon: FaEye,
            iconBg: 'bg-green-100',
            iconColor: 'text-green-600',
            subtitle: 'This month',
            trend: 'up',
            trendValue: '8.3%'
        },
        {
            title: 'Total Bookings',
            value: animatedStats.totalBookings,
            icon: FaUsers,
            iconBg: 'bg-purple-100',
            iconColor: 'text-purple-600',
            subtitle: `${conversionRate}% conversion`,
            trend: 'up',
            trendValue: '15%'
        },
        {
            title: 'Average Rating',
            value: `${animatedStats.averageRating}/5`,
            icon: FaStar,
            iconBg: 'bg-yellow-100',
            iconColor: 'text-yellow-600',
            subtitle: 'User satisfaction',
            trend: 'up',
            trendValue: '0.2'
        }
    ];

    return (
        <div className={`space-y-6 ${className}`}>
            {/* Main Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat, index) => (
                    <div key={index} className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
                        <div className="flex items-center">
                            <div className={`p-3 ${stat.iconBg} rounded-lg`}>
                                <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
                            </div>
                            <div className="ml-4 flex-1">
                                <p className="text-sm text-gray-600">{stat.title}</p>
                                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                                <div className="flex items-center mt-1">
                                    <span className="text-xs text-gray-500">{stat.subtitle}</span>
                                    {stat.trend && (
                                        <div className="ml-2 flex items-center">
                                            {stat.trend === 'up' ? (
                                                <FaArrowUp className="w-3 h-3 text-green-500" />
                                            ) : (
                                                <FaArrowDown className="w-3 h-3 text-red-500" />
                                            )}
                                            <span className={`text-xs ml-1 ${
                                                stat.trend === 'up' ? 'text-green-500' : 'text-red-500'
                                            }`}>
                                                {stat.trendValue}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Additional Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Revenue Card */}
                <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-lg shadow text-white">
                    <div className="flex items-center">
                        <div className="p-3 bg-white bg-opacity-20 rounded-lg">
                            <FaDollarSign className="w-6 h-6 text-white" />
                        </div>
                        <div className="ml-4">
                            <p className="text-green-100">Total Revenue</p>
                            <p className="text-2xl font-bold">${totalRevenue.toLocaleString()}</p>
                            <p className="text-sm text-green-100">From bookings</p>
                        </div>
                    </div>
                </div>

                {/* Category Breakdown */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Top Categories</h3>
                        <FaChartBar className="w-5 h-5 text-gray-400" />
                    </div>
                    <div className="space-y-3">
                        {stats.categoryBreakdown && Object.entries(stats.categoryBreakdown)
                            .sort(([,a], [,b]) => b - a)
                            .slice(0, 3)
                            .map(([category, count]) => (
                                <div key={category} className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600">{category}</span>
                                    <div className="flex items-center">
                                        <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                                            <div 
                                                className="bg-orange-500 h-2 rounded-full"
                                                style={{ width: `${(count / stats.totalServices) * 100}%` }}
                                            ></div>
                                        </div>
                                        <span className="text-sm font-medium text-gray-900">{count}</span>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>

                {/* Performance Summary */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Performance</h3>
                        <FaChartLine className="w-5 h-5 text-gray-400" />
                    </div>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Conversion Rate</span>
                            <span className="text-sm font-medium text-gray-900">{conversionRate}%</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Avg. Views/Service</span>
                            <span className="text-sm font-medium text-gray-900">
                                {stats.totalServices > 0 ? Math.round(stats.totalViews / stats.totalServices) : 0}
                            </span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Avg. Bookings/Service</span>
                            <span className="text-sm font-medium text-gray-900">
                                {stats.totalServices > 0 ? (stats.totalBookings / stats.totalServices).toFixed(1) : 0}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
