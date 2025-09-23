"use client";
import React, { useState } from "react";
import { FaSearch, FaFilter, FaDownload, FaCheck, FaTimes, FaClock, FaPlus } from "react-icons/fa";
import AdminButton from "@/ui/button";
import DataTable from "@/views/layouts/components/tables/DataTable";

const payouts = [
  {
    id: "PAY-001",
    vendorName: "Safari Adventures Ltd",
    vendorEmail: "contact@safariventures.com",
    amount: 1250.00,
    commission: 125.00,
    netAmount: 1125.00,
    date: "2024-01-15",
    status: "Completed",
    paymentMethod: "Bank Transfer",
    accountNumber: "****1234"
  },
  {
    id: "PAY-002",
    vendorName: "Mountain View Resort",
    vendorEmail: "info@mountainview.com",
    amount: 875.50,
    commission: 87.55,
    netAmount: 787.95,
    date: "2024-01-14",
    status: "Pending",
    paymentMethod: "Bank Transfer",
    accountNumber: "****5678"
  },
  {
    id: "PAY-003",
    vendorName: "City Tours Express",
    vendorEmail: "bookings@citytours.com",
    amount: 450.00,
    commission: 45.00,
    netAmount: 405.00,
    date: "2024-01-13",
    status: "Processing",
    paymentMethod: "PayPal",
    accountNumber: "****9012"
  },
  {
    id: "PAY-004",
    vendorName: "Beach Resort Paradise",
    vendorEmail: "admin@beachparadise.com",
    amount: 2100.00,
    commission: 210.00,
    netAmount: 1890.00,
    date: "2024-01-12",
    status: "Failed",
    paymentMethod: "Bank Transfer",
    accountNumber: "****3456"
  },
  {
    id: "PAY-005",
    vendorName: "Adventure Gear Rental",
    vendorEmail: "support@adventuregear.com",
    amount: 320.75,
    commission: 32.08,
    netAmount: 288.67,
    date: "2024-01-11",
    status: "Completed",
    paymentMethod: "Bank Transfer",
    accountNumber: "****7890"
  }
];

const statusColors = {
  Completed: "bg-green-100 text-green-700 border-green-300",
  Pending: "bg-yellow-100 text-yellow-700 border-yellow-300",
  Processing: "bg-blue-100 text-blue-700 border-blue-300",
  Failed: "bg-red-100 text-red-700 border-red-300"
};

const statusIcons = {
  Completed: <FaCheck className="w-3 h-3" />,
  Pending: <FaClock className="w-3 h-3" />,
  Processing: <FaClock className="w-3 h-3" />,
  Failed: <FaTimes className="w-3 h-3" />
};

export default function PayoutsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("All");

  const filteredPayouts = payouts.filter(payout => {
    const matchesSearch = payout.vendorName.toLowerCase().includes(search.toLowerCase()) ||
                         payout.id.toLowerCase().includes(search.toLowerCase()) ||
                         payout.vendorEmail.toLowerCase().includes(search.toLowerCase());
    
    const matchesStatus = statusFilter === "All" || payout.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const columns = [
    {
      key: "id",
      label: "Payout ID",
      render: (payout) => (
        <div>
          <div className="font-medium text-gray-900">{payout.id}</div>
          <div className="text-sm text-gray-500">{payout.date}</div>
        </div>
      )
    },
    {
      key: "vendor",
      label: "Vendor",
      render: (payout) => (
        <div>
          <div className="font-medium text-gray-900">{payout.vendorName}</div>
          <div className="text-sm text-gray-500">{payout.vendorEmail}</div>
        </div>
      )
    },
    {
      key: "amounts",
      label: "Amount Details",
      render: (payout) => (
        <div>
          <div className="font-medium text-gray-900">${payout.amount.toFixed(2)}</div>
          <div className="text-sm text-gray-500">Commission: ${payout.commission.toFixed(2)}</div>
          <div className="text-sm font-medium text-green-600">Net: ${payout.netAmount.toFixed(2)}</div>
        </div>
      )
    },
    {
      key: "payment",
      label: "Payment Method",
      render: (payout) => (
        <div>
          <div className="text-gray-900">{payout.paymentMethod}</div>
          <div className="text-sm text-gray-500">{payout.accountNumber}</div>
        </div>
      )
    },
    {
      key: "status",
      label: "Status",
      render: (payout) => (
        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full border text-xs font-semibold ${statusColors[payout.status]}`}>
          {statusIcons[payout.status]}
          {payout.status}
        </span>
      )
    },
    {
      key: "actions",
      label: "Actions",
      render: (payout) => (
        <div className="flex gap-2">
          <AdminButton variant="secondary" size="sm" className="text-xs">
            View
          </AdminButton>
          {payout.status === "Pending" && (
            <AdminButton variant="primary" size="sm" className="text-xs">
              Process
            </AdminButton>
          )}
        </div>
      )
    }
  ];

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Payouts</h1>
        <p className="text-gray-600">Manage vendor payments and commission distributions</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Total Payouts</h3>
          <p className="text-3xl font-bold text-blue-600">$24,567.89</p>
          <p className="text-sm text-gray-500">This month</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Pending</h3>
          <p className="text-3xl font-bold text-yellow-600">$3,245.50</p>
          <p className="text-sm text-gray-500">Awaiting processing</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Commission Earned</h3>
          <p className="text-3xl font-bold text-green-600">$2,456.78</p>
          <p className="text-sm text-gray-500">10% average commission</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Failed Payouts</h3>
          <p className="text-3xl font-bold text-red-600">$890.00</p>
          <p className="text-sm text-gray-500">Requires attention</p>
        </div>
      </div>

      {/* Filters and Actions */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search payouts..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex gap-3">
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Status</option>
              <option value="Completed">Completed</option>
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Failed">Failed</option>
            </select>
            
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            >
              <option value="All">All Time</option>
              <option value="Today">Today</option>
              <option value="Week">This Week</option>
              <option value="Month">This Month</option>
            </select>
            
            <AdminButton variant="primary" className="flex items-center gap-2">
              <FaPlus />
              New Payout
            </AdminButton>
            
            <AdminButton variant="secondary" className="flex items-center gap-2 border-orange-400 text-orange-500">
              <FaDownload />
              Export
            </AdminButton>
          </div>
        </div>

        <DataTable
          data={filteredPayouts}
          columns={columns}
          searchable={false}
        />
      </div>
    </div>
  );
}
