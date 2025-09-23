"use client";
import React, { useState } from "react";
import BusinessSidebar from "@/lib/components/BusinessSidebar";
import BusinessHeader from "@/lib/components/BusinessHeader";
import AdminButton from "@/lib/ui/button";
import { vendors } from "@/models/entities/vendor.entity";
import { statusColors } from "../../../../lib/ui/statusColors";
import DashboardStatsWidget from "@/views/layouts/widgets/DashboardStatsWidget";
import DashboardUserStatsWidget from "@/views/layouts/widgets/DashboardUserStatsWidget";
import DashboardRecentActivityWidget from "@/views/layouts/widgets/DashboardRecentActivityWidget";
import { FaPlus, FaMoneyCheckAlt, FaDownload } from "react-icons/fa";

export default function VendorsPage() {
  const [search, setSearch] = useState("");
  const [actionOpen, setActionOpen] = useState(-1);

  const stats = [
    { label: "Total vendors", value: 400, sub: "+10% from last month", icon: "users" },
    { label: "Active vendors", value: 320, sub: "+8% from last month", icon: "user" },
    { label: "New vendors", value: 50, sub: "+5% from last month", icon: "users" },
    { label: "Avg. rating", value: "4.7", sub: "+0.2 from last month", icon: "ratings" },
  ];

  const userStats = [
    { label: "New Vendors (Last 30 days)", value: 50 },
    { label: "Active Vendors", value: 320 },
    { label: "Total Vendors", value: 400 },
    { label: "Average Rating", value: "4.7" },
  ];

  const recentActivity = [
    { icon: "&#9888;", text: "Vendor John added a new listing.", time: "5 mins ago" },
    { icon: "&#9888;", text: "Vendor Temi updated business info.", time: "1 hour ago" },
    { icon: "&#9888;", text: "Vendor Femi received a booking.", time: "2 hours ago" },
    { icon: "&#9888;", text: "Vendor Gaius responded to a query.", time: "1 day ago" },
    { icon: "&#9888;", text: "Vendor Ezra joined the platform.", time: "3 days ago" },
    { icon: "&#9888;", text: "Vendor Paul updated payout details.", time: "4 days ago" },
    { icon: "&#9888;", text: "Vendor Dammy received a review.", time: "1 week ago" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <BusinessSidebar active="Vendors" />
      <div className="flex-1 flex flex-col h-screen overflow-y-auto">
        <BusinessHeader title="Vendor List" subtitle="Overview of all vendors and their activities" />
        <div className="p-4 md:p-10">
          <DashboardStatsWidget stats={stats} />
          <div className="bg-white rounded-xl shadow p-6 mb-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
              <div className="flex gap-2">
                <AdminButton variant="primary" className="px-4 py-2 bg-primary-500 text-white font-medium border-orange-500 flex items-center gap-2">
                  <FaPlus className="text-md" />
                  Add New Vendor
                </AdminButton>
                <AdminButton variant="secondary" className="px-4 py-2 border-primary-400 text-orange-500 font-medium flex items-center gap-2">
                  <FaMoneyCheckAlt className="text-md" />
                  Payouts
                </AdminButton>
                <AdminButton variant="secondary" className="px-4 py-2 border-primary-400 text-orange-500 font-medium flex items-center gap-2">
                  <FaDownload className="text-md" />
                  Export Data
                </AdminButton>
              </div>
              <input
                type="text"
                placeholder="Search vendors"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-300 w-full md:w-64"
              />
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-500">
                    <th className="py-2">Vendor Name</th>
                    <th className="py-2">Contact Details</th>
                    <th className="py-2">Listings</th>
                    <th className="py-2">Last Activity</th>
                    <th className="py-2">Status</th>
                    <th className="py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {vendors.filter(v => v.name.toLowerCase().includes(search.toLowerCase())).map((v, i) => (
                    <tr key={i} className="border-b last:border-b-0">
                      <td className="py-2 flex items-center gap-2">
                        <img src={v.avatar || "https://randomuser.me/api/portraits/men/32.jpg"} alt={v.name} className="w-8 h-8 rounded-full" />
                        <span>{v.name}</span>
                      </td>
                      <td className="py-2">
                        <div>{v.email}</div>
                        <div className="text-xs text-gray-400">{v.phone}</div>
                      </td>
                      <td className="py-2">{v.listings}</td>
                      <td className="py-2">{v.lastActivity}</td>
                      <td className="py-2">
                        <span className={`px-3 py-1 rounded-full border text-xs font-semibold ${statusColors[v.status]}`}>{v.status}</span>
                      </td>
                      <td className="py-2 relative">
                        <button onClick={() => setActionOpen(actionOpen === i ? -1 : i)} className="px-2 py-1 rounded hover:bg-gray-100">
                          <span className="text-xl">≡</span>
                        </button>
                        {actionOpen === i && (
                          <div className="absolute right-0 mt-2 w-32 bg-white rounded shadow z-10">
                            <button className="block w-full text-left px-4 py-2 text-sm hover:bg-orange-50">Send Message</button>
                            <button className="block w-full text-left px-4 py-2 text-sm hover:bg-orange-50">Deactivate</button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex justify-between items-center text-xs text-gray-500 mt-4">
                <span>Showing 1 to 6 of 20 results</span>
                <span>
                  <button className="px-2">&lt; Previous</button>
                  <span className="mx-2">1</span>
                  <button className="px-2">2</button>
                  <button className="px-2">Next &gt;</button>
                </span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <DashboardRecentActivityWidget
              title="Recent Activity"
              description="Latest interactions and changes in vendor profiles."
              activities={recentActivity}
            />
            <DashboardUserStatsWidget
              title="Vendor Statistics"
              description="Key insights into your vendor base."
              stats={userStats}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
