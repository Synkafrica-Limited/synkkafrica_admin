"use client";
import React, { useState } from "react";
import { FaBell, FaExclamationCircle, FaCalendarCheck, FaCheckCircle, FaEnvelopeOpenText } from "react-icons/fa";
import AdminButton from "@/ui/button";
import DashboardStatsWidget from "@/views/layouts/widgets/DashboardStatsWidget";

const stats = [
  { label: "Total notification", value: 700, sub: "Since last month", icon: "bell" },
  { label: "Unread alert", value: 70, sub: "Requires attention", icon: "unread_alert" },
  { label: "New reservations", value: 140, sub: "Last 48 hours", icon: "calendar_check" },
  { label: "Completed bookings", value: 200, sub: "Last week", icon: "check_circle" }
];

const tabs = [
  "All Payment",
  "Successful Payment",
  "Pending Payment",
  "Declined Payment"
];

const payments = [
  {
    id: 1,
    icon: <FaExclamationCircle className="text-orange-400" />,
    title: "Payment for reservation #30011 failed.",
    related: "Ezra",
    time: "3 hours ago",
    status: "Pending"
  },
  {
    id: 2,
    icon: <FaCheckCircle className="text-green-400" />,
    title: "Payment for reservation #30012 successful.",
    related: "Sarah",
    time: "1 hour ago",
    status: "Success"
  },
  {
    id: 3,
    icon: <FaExclamationCircle className="text-red-400" />,
    title: "Payment for reservation #30013 declined.",
    related: "Mike",
    time: "2 hours ago",
    status: "Declined"
  }
];

const statusColors = {
  Pending: "bg-yellow-100 text-yellow-700 border-yellow-300",
  Success: "bg-green-100 text-green-700 border-green-300",
  Declined: "bg-red-100 text-red-700 border-red-300"
};

export default function BusinessFinanceDashboardPage() {
  const [tab, setTab] = useState("Pending Payment");

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Finance Dashboard</h1>
        <p className="text-gray-600">Monitor business financial metrics and performance</p>
      </div>
      
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
              <div className="font-semibold text-gray-800 mb-2">
                {tab === "Pending Payment"
                  ? "Pending Payment Notifications"
                  : tab === "Successful Payment"
                  ? "Successful Payment Notifications"
                  : tab === "Declined Payment"
                  ? "Declined Payment Notifications"
                  : "All Payment Notifications"}
              </div>
              {payments
                .filter((p) => {
                  if (tab === "All Payment") return true;
                  if (tab === "Pending Payment") return p.status === "Pending";
                  if (tab === "Successful Payment") return p.status === "Success";
                  if (tab === "Declined Payment") return p.status === "Declined";
                  return true;
                })
                .map((p) => (
                  <div key={p.id} className="flex items-start gap-4 py-4 border-b last:border-b-0">
                    <div className="flex-shrink-0">{p.icon}</div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-800">{p.title}</div>
                      <div className="text-xs text-gray-400">Related: {p.related}</div>
                      <div className="text-xs text-gray-400">{p.time}</div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className={`px-3 py-1 rounded-full border text-xs font-semibold ${statusColors[p.status]}`}>
                        {p.status}
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
  );
}
