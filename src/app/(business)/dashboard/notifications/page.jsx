"use client";
import React, { useState } from "react";
import { FaBell, FaExclamationCircle, FaCalendarCheck, FaCheckCircle, FaEnvelopeOpenText } from "react-icons/fa";
import BusinessSidebar from "@/lib/components/BusinessSidebar";
import BusinessHeader from "@/lib/components/BusinessHeader";
import AdminButton from "@/lib/ui/button";
import DashboardStatsWidget from "@/views/layouts/widgets/DashboardStatsWidget";
import { statusColors } from "../../../../lib/ui/statusColors";

// Dummy notification data
const notifications = [
  {
    id: 1,
    type: "success",
    icon: <FaCalendarCheck className="text-orange-400" />,
    title: "Reservation #30011 confirmed for Temi",
    related: "Temi",
    time: "4 hours ago",
    status: "Success"
  },
  {
    id: 2,
    type: "unread",
    icon: <FaCalendarCheck className="text-orange-400" />,
    title: "New reservation #30011 received from Dammy",
    related: "Dammy",
    time: "15 minutes ago",
    status: "Unread"
  },
  {
    id: 3,
    type: "pending",
    icon: <FaExclamationCircle className="text-orange-400" />,
    title: "Payment for reservation #30011 failed.",
    related: "Ezra",
    time: "3 hours ago",
    status: "Pending"
  },
  {
    id: 4,
    type: "read",
    icon: <FaEnvelopeOpenText className="text-orange-400" />,
    title: "System update completed successfully.",
    related: "",
    time: "1 hours ago",
    status: "Read"
  },
  {
    id: 5,
    type: "success",
    icon: <FaCheckCircle className="text-blue-400" />,
    title: "Trip #30011 completed for Emma",
    related: "Emma",
    time: "4 hours ago",
    status: "Success"
  }
];

// Dummy stats
const stats = [
  { label: "Total notification", value: 700, sub: "Since last month", icon: "bell" },
  { label: "Unread alert", value: 70, sub: "Requires attention", icon: "unread_alert" },
  { label: "New reservations", value: 140, sub: "Last 48 hours", icon: "calendar_check" },
  { label: "Completed bookings", value: 200, sub: "Last week", icon: "check_circle" }
];


export default function NotificationPage() {
  const [tab, setTab] = useState("All Notifications");

  // Tabs for filtering notifications
  const tabs = [
    "All Notifications",
    "Completed Bookings",
    "New Reservations",
    "Critical Alert"
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar: fixed, not scrollable */}
      <div className="sticky top-0 h-screen">
        <BusinessSidebar active="Notification" />
      </div>
      {/* Main area: header fixed, content scrollable */}
      <div className="flex-1 flex flex-col h-screen">
        <div className="sticky top-0 z-30 bg-gray-50">
          <BusinessHeader title="Notification" subtitle="" />
        </div>
        <div className="flex-1 overflow-y-auto p-4 md:p-10">
          <div className="my-4" />
          <DashboardStatsWidget stats={stats} />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
            <div className="md:col-span-3">
              <div className="bg-white rounded-xl shadow p-6 mb-6">
                <div className="flex gap-2 mb-4 flex-wrap">
                  {tabs.map((t) => (
                    <button
                      key={t}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        tab === t
                          ? "bg-orange-100 text-orange-700"
                          : "bg-gray-100 text-gray-500 hover:bg-orange-50 hover:text-orange-600"
                      }`}
                      onClick={() => setTab(t)}
                    >
                      {t}
                    </button>
                  ))}
                </div>
                <div>
                  {notifications
                    .filter((n) => {
                      if (tab === "All Notifications") return true;
                      if (tab === "Completed Bookings") return n.status === "Success";
                      if (tab === "New Reservations") return n.title.toLowerCase().includes("reservation");
                      if (tab === "Critical Alert") return n.type === "pending" || n.type === "unread";
                      return true;
                    })
                    .map((n) => (
                      <div key={n.id} className="flex items-start gap-4 py-4 border-b last:border-b-0">
                        <div className="flex-shrink-0">{n.icon}</div>
                        <div className="flex-1">
                          <div className="font-medium text-gray-800">{n.title}</div>
                          {n.related && (
                            <div className="text-xs text-gray-400">Related: {n.related}</div>
                          )}
                          <div className="text-xs text-gray-400">{n.time}</div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <span className={`px-3 py-1 rounded-full border text-xs font-semibold ${statusColors[n.status]}`}>
                            {n.status}
                          </span>
                          <button className="text-xs text-gray-500 hover:text-orange-500 flex items-center gap-1">
                            View details <span className="text-lg">&gt;</span>
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
            {/* Quick Action Sidebar */}
            <div className="md:col-span-1">
              <div className="bg-white rounded-xl shadow p-6 flex flex-col gap-4">
                <div className="font-semibold text-gray-700 mb-2">Quick Action</div>
                <AdminButton variant="secondary" className="w-full flex items-center gap-2 py-2 border-orange-400 text-orange-500 font-medium">
                  <FaBell className="text-lg" />
                  Mark all as read
                </AdminButton>
                <AdminButton variant="secondary" className="w-full flex items-center gap-2 py-2 border-orange-400 text-orange-500 font-medium">
                  <FaEnvelopeOpenText className="text-lg" />
                  Generate notification
                </AdminButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}