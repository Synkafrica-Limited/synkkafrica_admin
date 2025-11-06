"use client";
import React, { useState } from "react";
import { FaUser, FaShieldAlt, FaBan, FaCheck } from "react-icons/fa";
import AdminButton from "@/ui/button";
import DashboardStatsWidget from "@/views/layouts/widgets/DashboardStatsWidget";

// Dummy user data for technical management
const users = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "Customer",
    status: "Active",
    lastLogin: "2025/07/14",
    registeredDate: "2025/01/15"
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@vendor.com",
    role: "Vendor",
    status: "Active",
    lastLogin: "2025/07/13",
    registeredDate: "2025/02/20"
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike@example.com",
    role: "Customer",
    status: "Suspended",
    lastLogin: "2025/07/10",
    registeredDate: "2025/03/10"
  }
];

const stats = [
  { label: "Total Users", value: 2847, sub: "+15% from last month", icon: <FaUser className="text-blue-500" /> },
  { label: "Active Users", value: 2650, sub: "93% active rate", icon: <FaCheck className="text-green-500" /> },
  { label: "Suspended", value: 12, sub: "0.4% suspension rate", icon: <FaBan className="text-red-500" /> },
  { label: "New This Month", value: 145, sub: "+8% growth", icon: <FaShieldAlt className="text-purple-500" /> },
];

const statusColors = {
  Active: "bg-green-100 text-green-700 border-green-300",
  Suspended: "bg-red-100 text-red-700 border-red-300",
  Pending: "bg-yellow-100 text-yellow-700 border-yellow-300"
};

const roleColors = {
  Customer: "bg-blue-100 text-blue-700",
  Vendor: "bg-purple-100 text-purple-700",
  Admin: "bg-orange-100 text-orange-700"
};

export default function TechnicalUsersPage() {
  const [search, setSearch] = useState("");
  const [selectedRole, setSelectedRole] = useState("All");

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(search.toLowerCase()) || 
                         user.email.toLowerCase().includes(search.toLowerCase());
    const matchesRole = selectedRole === "All" || user.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
        <p className="text-gray-600">Manage all platform users and permissions</p>
      </div>

      <DashboardStatsWidget stats={stats} />
      
      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
          <div className="flex gap-2">
            <select 
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-300"
            >
              <option value="All">All Roles</option>
              <option value="Customer">Customers</option>
              <option value="Vendor">Vendors</option>
              <option value="Admin">Admins</option>
            </select>
            <AdminButton variant="secondary" className="px-4 py-2 border-blue-400 text-blue-500 font-medium">
              Export Users
            </AdminButton>
          </div>
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-300 w-full md:w-64"
          />
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500">
                <th className="py-2">User</th>
                <th className="py-2">Role</th>
                <th className="py-2">Status</th>
                <th className="py-2">Last Login</th>
                <th className="py-2">Registered</th>
                <th className="py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b last:border-b-0 hover:bg-gray-50">
                  <td className="py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                        <FaUser className="text-gray-500" />
                      </div>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-xs text-gray-400">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${roleColors[user.role]}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="py-3">
                    <span className={`px-3 py-1 rounded-full border text-xs font-semibold ${statusColors[user.status]}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="py-3">{user.lastLogin}</td>
                  <td className="py-3">{user.registeredDate}</td>
                  <td className="py-3">
                    <div className="flex gap-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="View Details">
                        <FaUser />
                      </button>
                      {user.status === "Active" ? (
                        <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Suspend User">
                          <FaBan />
                        </button>
                      ) : (
                        <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Activate User">
                          <FaCheck />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="flex justify-between items-center text-xs text-gray-500 mt-4">
          <span>Showing {filteredUsers.length} of {users.length} results</span>
          <span>
            <button className="px-2">&lt; Previous</button>
            <span className="mx-2">1</span>
            <button className="px-2">2</button>
            <button className="px-2">Next &gt;</button>
          </span>
        </div>
      </div>
    </div>
  );
}
