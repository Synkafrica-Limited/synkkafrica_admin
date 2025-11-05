"use client";
import React, { useState } from "react";
import { FaBell, FaExclamationCircle, FaCalendarCheck, FaCheckCircle, FaEnvelopeOpenText, FaSearch } from "react-icons/fa";
import BusinessSidebar from "@/views/layouts/components/business/BusinessSidebar";
import AdminButton from "@/ui/button";

// Dummy notification data
const notifications = [
  {
    id: 1,
    type: "success",
    icon: <FaCalendarCheck className="text-green-600" />,
    title: "Reservation #30011 confirmed for Temi",
    related: "Temi",
    time: "4 hours ago",
    status: "Read"
  },
  {
    id: 2,
    type: "unread",
    icon: <FaCalendarCheck className="text-blue-600" />,
    title: "New reservation #30011 received from Dammy",
    related: "Dammy",
    time: "15 minutes ago",
    status: "Unread"
  },
  {
    id: 3,
    type: "pending",
    icon: <FaExclamationCircle className="text-red-600" />,
    title: "Payment for reservation #30011 failed.",
    related: "Ezra",
    time: "3 hours ago",
    status: "Unread"
  },
  {
    id: 4,
    type: "read",
    icon: <FaEnvelopeOpenText className="text-gray-600" />,
    title: "System update completed successfully.",
    related: "",
    time: "1 day ago",
    status: "Read"
  },
  {
    id: 5,
    type: "success",
    icon: <FaCheckCircle className="text-green-600" />,
    title: "Trip #30011 completed for Emma",
    related: "Emma",
    time: "2 days ago",
    status: "Read"
  },
  {
    id: 6,
    type: "unread",
    icon: <FaBell className="text-orange-600" />,
    title: "New vendor application pending approval",
    related: "Safari Tours Ltd",
    time: "30 minutes ago",
    status: "Unread"
  }
];

export default function NotificationPage() {
  const [tab, setTab] = useState("All");
  const [search, setSearch] = useState("");

  // Tabs for filtering notifications
  const tabs = ["All", "Unread", "Read", "Critical"];

  // Filter notifications
  const filteredNotifications = notifications.filter((n) => {
    const matchesSearch = search === '' || 
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      (n.related && n.related.toLowerCase().includes(search.toLowerCase()));
    
    let matchesTab = true;
    if (tab === "Unread") matchesTab = n.status === "Unread";
    if (tab === "Read") matchesTab = n.status === "Read";
    if (tab === "Critical") matchesTab = n.type === "pending";
    
    return matchesSearch && matchesTab;
  });

  const unreadCount = notifications.filter(n => n.status === "Unread").length;
  const criticalCount = notifications.filter(n => n.type === "pending").length;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="sticky top-0 h-screen">
        <BusinessSidebar active="Notifications" />
      </div>
      <div className="flex-1 flex flex-col h-screen">
        {/* Header */}
        <div className="sticky top-0 z-30 bg-white border-b border-gray-200">
          <div className="flex items-center justify-between px-6 md:px-10 py-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Notifications</h1>
              <p className="text-sm text-gray-500 mt-1">Stay updated with all system activities</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative hidden md:block">
                <input
                  type="text"
                  placeholder="Search customers, etc."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent w-64"
                />
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center text-white font-semibold">
                S
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 md:p-10">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm text-gray-500">Total Notifications</h3>
                <div className="p-2 bg-blue-50 rounded-lg">
                  <FaBell className="text-blue-600" />
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-900">{notifications.length}</p>
              <p className="text-sm text-gray-500 mt-1">Since last month</p>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm text-gray-500">Unread Alerts</h3>
                <div className="p-2 bg-orange-50 rounded-lg">
                  <FaExclamationCircle className="text-orange-600" />
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-900">{unreadCount}</p>
              <p className="text-sm text-gray-500 mt-1">Requires attention</p>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm text-gray-500">Critical Alerts</h3>
                <div className="p-2 bg-red-50 rounded-lg">
                  <FaExclamationCircle className="text-red-600" />
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-900">{criticalCount}</p>
              <p className="text-sm text-gray-500 mt-1">Needs immediate action</p>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm text-gray-500">Completed Today</h3>
                <div className="p-2 bg-green-50 rounded-lg">
                  <FaCheckCircle className="text-green-600" />
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-900">24</p>
              <p className="text-sm text-gray-500 mt-1">Last 24 hours</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Notifications List */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-lg shadow">
                {/* Tab Navigation */}
                <div className="border-b border-gray-200 p-6 pb-0">
                  <div className="flex gap-2 mb-4 flex-wrap">
                    {tabs.map((t) => (
                      <button
                        key={t}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                          tab === t
                            ? "bg-orange-500 text-white"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                        onClick={() => setTab(t)}
                      >
                        {t}
                        {t === "Unread" && unreadCount > 0 && (
                          <span className="ml-2 bg-white text-orange-500 text-xs px-2 py-0.5 rounded-full">
                            {unreadCount}
                          </span>
                        )}
                        {t === "Critical" && criticalCount > 0 && (
                          <span className="ml-2 bg-white text-orange-500 text-xs px-2 py-0.5 rounded-full">
                            {criticalCount}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Search */}
                <div className="p-6 border-b border-gray-200">
                  <div className="relative">
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search notifications..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                </div>

                {/* Notifications */}
                <div className="p-6">
                  {filteredNotifications.length === 0 ? (
                    <div className="text-center py-12">
                      <FaBell className="mx-auto text-4xl text-gray-300 mb-4" />
                      <p className="text-gray-500">No notifications found</p>
                    </div>
                  ) : (
                    filteredNotifications.map((n) => (
                      <div
                        key={n.id}
                        className={`flex items-start gap-4 py-4 border-b last:border-b-0 ${
                          n.status === "Unread" ? "bg-orange-50 -mx-6 px-6" : ""
                        }`}
                      >
                        <div className="flex-shrink-0 p-3 bg-white rounded-lg shadow-sm">
                          {n.icon}
                        </div>
                        <div className="flex-1">
                          <div className={`font-medium ${n.status === "Unread" ? "text-gray-900" : "text-gray-600"}`}>
                            {n.title}
                          </div>
                          {n.related && (
                            <div className="text-xs text-gray-500 mt-1">Related: {n.related}</div>
                          )}
                          <div className="text-xs text-gray-400 mt-1">{n.time}</div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          {n.status === "Unread" && (
                            <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-semibold">
                              New
                            </span>
                          )}
                          <button className="text-xs text-orange-500 hover:text-orange-600 font-medium">
                            Mark as {n.status === "Unread" ? "read" : "unread"}
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Quick Actions Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow p-6 sticky top-24">
                <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="flex flex-col gap-3">
                  <AdminButton variant="primary" className="w-full flex items-center justify-center gap-2 py-2">
                    <FaCheckCircle />
                    Mark all as read
                  </AdminButton>
                  <AdminButton variant="secondary" className="w-full flex items-center justify-center gap-2 py-2 border-orange-500 text-orange-500">
                    <FaEnvelopeOpenText />
                    Clear read
                  </AdminButton>
                  <AdminButton variant="secondary" className="w-full flex items-center justify-center gap-2 py-2 border-gray-300 text-gray-600">
                    <FaBell />
                    Notification settings
                  </AdminButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}