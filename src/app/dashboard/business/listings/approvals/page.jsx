"use client";
import React, { useState } from "react";
import { FaEye, FaCheck, FaTimes, FaArrowLeft } from "react-icons/fa";
import BusinessSidebar from "@/views/layouts/components/BusinessSidebar";
import BusinessHeader from "@/views/layouts/components/BusinessHeader";
import AdminButton from "@/ui/button";
import DashboardStatsWidget from "@/views/layouts/widgets/DashboardStatsWidget";
import ViewDetailsModal from "@/views/layouts/components/modals/ViewDetailsModal";

const stats = [
  { label: "Pending Approvals", value: 15, sub: "Awaiting review", icon: <span className="text-yellow-500 text-xl">⏳</span> },
  { label: "Approved Today", value: 8, sub: "New approvals", icon: <span className="text-green-500 text-xl">✅</span> },
  { label: "Rejected Today", value: 3, sub: "Declined requests", icon: <span className="text-red-500 text-xl">❌</span> },
  { label: "Total Requests", value: 26, sub: "This month", icon: <span className="text-blue-500 text-xl">📋</span> },
];

const tabs = ["All Requests", "Pending", "Approved", "Rejected"];

const approvals = [
  {
    id: 1,
    vendor: "Livery Lane",
    vendorEmail: "livery@gmail.com",
    service: "Car",
    serviceType: "Mercedes Benz GLE coupe",
    request: "New listing approval",
    description: "Request to add a luxury car service for executive transportation",
    date: "2025/07/14",
    time: "2:30 PM",
    status: "Pending",
    priority: "High"
  },
  {
    id: 2,
    vendor: "Maison bali",
    vendorEmail: "maison@gmail.com",
    service: "Beach",
    serviceType: "Beach Resort Package",
    request: "Edit listing request",
    description: "Update beach resort package details and pricing",
    date: "2025/07/13",
    time: "1:15 PM",
    status: "Approved",
    priority: "Medium"
  },
  {
    id: 3,
    vendor: "Circa",
    vendorEmail: "circa@gmail.com",
    service: "Restaurant",
    serviceType: "Fine Dining Experience",
    request: "Delete listing request",
    description: "Remove outdated menu and service offerings",
    date: "2025/07/12",
    time: "10:45 AM",
    status: "Rejected",
    priority: "Low"
  },
  {
    id: 4,
    vendor: "Nok By Alara",
    vendorEmail: "nok@gmail.com",
    service: "Restaurant",
    serviceType: "Nigerian Cuisine",
    request: "New listing approval",
    description: "Add traditional Nigerian restaurant to platform",
    date: "2025/07/11",
    time: "4:20 PM",
    status: "Pending",
    priority: "High"
  },
  {
    id: 5,
    vendor: "Pura vida",
    vendorEmail: "pura@gmail.com",
    service: "Beach",
    serviceType: "Water Sports Package",
    request: "Edit listing request",
    description: "Update water sports activities and equipment list",
    date: "2025/07/10",
    time: "11:30 AM",
    status: "Approved",
    priority: "Medium"
  }
];

const statusColors = {
  Pending: "bg-yellow-100 text-yellow-700 border-yellow-300",
  Approved: "bg-green-100 text-green-700 border-green-300",
  Rejected: "bg-red-100 text-red-700 border-red-300"
};

const priorityColors = {
  High: "bg-red-100 text-red-700",
  Medium: "bg-yellow-100 text-yellow-700",
  Low: "bg-gray-100 text-gray-700"
};

export default function ListingApprovalsPage() {
  const [tab, setTab] = useState("All Requests");
  const [selectedApproval, setSelectedApproval] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleViewDetails = (approval) => {
    setSelectedApproval(approval);
    setModalOpen(true);
  };

  const handleApprove = (id) => {
    console.log("Approve approval:", id);
    // Add approval logic here
  };

  const handleReject = (id) => {
    console.log("Reject approval:", id);
    // Add rejection logic here
  };

  const filteredApprovals = approvals.filter((a) => {
    if (tab === "All Requests") return true;
    if (tab === "Pending") return a.status === "Pending";
    if (tab === "Approved") return a.status === "Approved";
    if (tab === "Rejected") return a.status === "Rejected";
    return true;
  });

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="sticky top-0 h-screen">
        <BusinessSidebar active="Listings" />
      </div>
      <div className="flex-1 flex flex-col h-screen">
        <div className="sticky top-0 z-30 bg-gray-50">
          <BusinessHeader 
            title="Listing Approvals" 
            subtitle="Review and manage vendor listing requests"
          />
        </div>
        <div className="flex-1 overflow-y-auto p-4 md:p-10">
          {/* Back to Listings Button */}
          <div className="mb-4">
            <AdminButton
              variant="secondary"
              className="px-4 py-2 border-gray-400 text-gray-600 font-medium flex items-center gap-2"
              onClick={() => window.history.back()}
            >
              <FaArrowLeft />
              Back to Listings
            </AdminButton>
          </div>

          <DashboardStatsWidget stats={stats} />

          {/* Tabs */}
          <div className="bg-white rounded-t-xl shadow p-2 flex gap-2 mb-0 mt-6">
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

          {/* Approvals Table */}
          <div className="bg-white rounded-b-xl shadow p-6 mb-6">
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-500">
                    <th className="py-2">Vendor</th>
                    <th className="py-2">Service</th>
                    <th className="py-2">Request Type</th>
                    <th className="py-2">Date & Time</th>
                    <th className="py-2">Priority</th>
                    <th className="py-2">Status</th>
                    <th className="py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredApprovals.map((a) => (
                    <tr key={a.id} className="border-b last:border-b-0 hover:bg-gray-50">
                      <td className="py-3">
                        <div className="font-medium">{a.vendor}</div>
                        <div className="text-xs text-gray-400">{a.vendorEmail}</div>
                      </td>
                      <td className="py-3">
                        <div className="font-medium">{a.service}</div>
                        <div className="text-xs text-gray-400">{a.serviceType}</div>
                      </td>
                      <td className="py-3">{a.request}</td>
                      <td className="py-3">
                        <div>{a.date}</div>
                        <div className="text-xs text-gray-400">{a.time}</div>
                      </td>
                      <td className="py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityColors[a.priority]}`}>
                          {a.priority}
                        </span>
                      </td>
                      <td className="py-3">
                        <span className={`px-3 py-1 rounded-full border text-xs font-semibold ${statusColors[a.status]}`}>
                          {a.status}
                        </span>
                      </td>
                      <td className="py-3">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleViewDetails(a)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="View Details"
                          >
                            <FaEye />
                          </button>
                          {a.status === "Pending" && (
                            <>
                              <button
                                onClick={() => handleApprove(a.id)}
                                className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                title="Approve"
                              >
                                <FaCheck />
                              </button>
                              <button
                                onClick={() => handleReject(a.id)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="Reject"
                              >
                                <FaTimes />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-between items-center text-xs text-gray-500 mt-4">
              <span>Showing {filteredApprovals.length} of {approvals.length} results</span>
              <span>
                <button className="px-2">&lt; Previous</button>
                <span className="mx-2">1</span>
                <button className="px-2">2</button>
                <button className="px-2">Next &gt;</button>
              </span>
            </div>
          </div>

          {/* View Details Modal */}
          <ViewDetailsModal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            title="Approval Request Details"
            data={selectedApproval || {}}
            type="approval"
            showActions={true}
            onApprove={handleApprove}
            onReject={handleReject}
          />
        </div>
      </div>
    </div>
  );
}