"use client";
import React, { useState } from "react";
import { FaSearch, FaFilter, FaDownload, FaCheck, FaTimes, FaClock } from "react-icons/fa";
import AdminButton from "@/ui/button";
import DataTable from "@/views/layouts/components/tables/DataTable";

const transactions = [
  {
    id: "TXN-001",
    customerName: "John Doe",
    serviceType: "Accommodation",
    amount: 150.00,
    date: "2024-01-15",
    time: "14:30",
    status: "Completed",
    paymentMethod: "Credit Card",
    transactionId: "pay_1234567890"
  },
  {
    id: "TXN-002",
    customerName: "Jane Smith",
    serviceType: "Transportation",
    amount: 75.50,
    date: "2024-01-15",
    time: "12:15",
    status: "Pending",
    paymentMethod: "Bank Transfer",
    transactionId: "pay_0987654321"
  },
  {
    id: "TXN-003",
    customerName: "Mike Johnson",
    serviceType: "Tour Package",
    amount: 299.99,
    date: "2024-01-14",
    time: "16:45",
    status: "Failed",
    paymentMethod: "Credit Card",
    transactionId: "pay_1122334455"
  },
  {
    id: "TXN-004",
    customerName: "Sarah Wilson",
    serviceType: "Equipment Rental",
    amount: 45.00,
    date: "2024-01-14",
    time: "09:20",
    status: "Completed",
    paymentMethod: "PayPal",
    transactionId: "pay_5566778899"
  },
  {
    id: "TXN-005",
    customerName: "David Brown",
    serviceType: "Accommodation",
    amount: 120.00,
    date: "2024-01-13",
    time: "18:30",
    status: "Refunded",
    paymentMethod: "Credit Card",
    transactionId: "pay_9988776655"
  }
];

const statusColors = {
  Completed: "bg-green-100 text-green-700 border-green-300",
  Pending: "bg-yellow-100 text-yellow-700 border-yellow-300",
  Failed: "bg-red-100 text-red-700 border-red-300",
  Refunded: "bg-blue-100 text-blue-700 border-blue-300"
};

const statusIcons = {
  Completed: <FaCheck className="w-3 h-3" />,
  Pending: <FaClock className="w-3 h-3" />,
  Failed: <FaTimes className="w-3 h-3" />,
  Refunded: <FaClock className="w-3 h-3" />
};

export default function TransactionsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("All");

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.customerName.toLowerCase().includes(search.toLowerCase()) ||
                         transaction.id.toLowerCase().includes(search.toLowerCase()) ||
                         transaction.serviceType.toLowerCase().includes(search.toLowerCase());
    
    const matchesStatus = statusFilter === "All" || transaction.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const columns = [
    {
      key: "id",
      label: "Transaction ID",
      render: (transaction) => (
        <div>
          <div className="font-medium text-gray-900">{transaction.id}</div>
          <div className="text-sm text-gray-500">{transaction.transactionId}</div>
        </div>
      )
    },
    {
      key: "customer",
      label: "Customer",
      render: (transaction) => (
        <div>
          <div className="font-medium text-gray-900">{transaction.customerName}</div>
          <div className="text-sm text-gray-500">{transaction.serviceType}</div>
        </div>
      )
    },
    {
      key: "amount",
      label: "Amount",
      render: (transaction) => (
        <div className="font-medium text-gray-900">
          ${transaction.amount.toFixed(2)}
        </div>
      )
    },
    {
      key: "date",
      label: "Date & Time",
      render: (transaction) => (
        <div>
          <div className="font-medium text-gray-900">{transaction.date}</div>
          <div className="text-sm text-gray-500">{transaction.time}</div>
        </div>
      )
    },
    {
      key: "payment",
      label: "Payment Method",
      render: (transaction) => (
        <div className="text-gray-900">{transaction.paymentMethod}</div>
      )
    },
    {
      key: "status",
      label: "Status",
      render: (transaction) => (
        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full border text-xs font-semibold ${statusColors[transaction.status]}`}>
          {statusIcons[transaction.status]}
          {transaction.status}
        </span>
      )
    }
  ];

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Transactions</h1>
        <p className="text-gray-600">Monitor and manage all financial transactions</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Total Revenue</h3>
          <p className="text-3xl font-bold text-green-600">$2,450.49</p>
          <p className="text-sm text-gray-500">+12% from last month</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Completed</h3>
          <p className="text-3xl font-bold text-blue-600">234</p>
          <p className="text-sm text-gray-500">Successful transactions</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Pending</h3>
          <p className="text-3xl font-bold text-yellow-600">12</p>
          <p className="text-sm text-gray-500">Awaiting processing</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Failed</h3>
          <p className="text-3xl font-bold text-red-600">8</p>
          <p className="text-sm text-gray-500">Failed transactions</p>
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
                placeholder="Search transactions..."
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
              <option value="Failed">Failed</option>
              <option value="Refunded">Refunded</option>
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
            
            <AdminButton variant="secondary" className="flex items-center gap-2 border-orange-400 text-orange-500">
              <FaDownload />
              Export
            </AdminButton>
          </div>
        </div>

        <DataTable
          data={filteredTransactions}
          columns={columns}
          searchable={false}
        />
      </div>
    </div>
  );
}
