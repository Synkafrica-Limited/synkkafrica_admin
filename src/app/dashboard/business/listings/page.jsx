"use client";
import React, { useState } from "react";
import { FaSearch, FaFilter, FaPlus, FaEye, FaEdit, FaTrash, FaCheck, FaTimes, FaClock } from "react-icons/fa";
import AdminButton from "@/ui/button";
import DataTable from "@/views/layouts/components/tables/DataTable";

const listings = [
  {
    id: "LST-001",
    title: "Luxury Beach Resort Package",
    category: "Accommodation",
    vendor: "Beach Paradise Resort",
    price: 299.99,
    location: "Lagos, Nigeria",
    status: "Active",
    featured: true,
    dateCreated: "2024-01-15",
    bookings: 45,
    rating: 4.8
  },
  {
    id: "LST-002",
    title: "City Tour Adventure",
    category: "Tours",
    vendor: "City Tours Express",
    price: 89.50,
    location: "Abuja, Nigeria",
    status: "Pending",
    featured: false,
    dateCreated: "2024-01-14",
    bookings: 12,
    rating: 4.2
  },
  {
    id: "LST-003",
    title: "Mountain Hiking Experience",
    category: "Adventure",
    vendor: "Adventure Seekers Ltd",
    price: 150.00,
    location: "Jos, Nigeria",
    status: "Active",
    featured: true,
    dateCreated: "2024-01-13",
    bookings: 28,
    rating: 4.6
  },
  {
    id: "LST-004",
    title: "Cultural Heritage Tour",
    category: "Cultural",
    vendor: "Heritage Tours NG",
    price: 75.00,
    location: "Ife, Nigeria",
    status: "Inactive",
    featured: false,
    dateCreated: "2024-01-12",
    bookings: 8,
    rating: 4.1
  },
  {
    id: "LST-005",
    title: "Safari Wildlife Experience",
    category: "Wildlife",
    vendor: "Safari Adventures Ltd",
    price: 450.00,
    location: "Cross River, Nigeria",
    status: "Active",
    featured: true,
    dateCreated: "2024-01-11",
    bookings: 67,
    rating: 4.9
  }
];

const statusColors = {
  Active: "bg-green-100 text-green-700 border-green-300",
  Pending: "bg-yellow-100 text-yellow-700 border-yellow-300",
  Inactive: "bg-gray-100 text-gray-700 border-gray-300"
};

const statusIcons = {
  Active: <FaCheck className="w-3 h-3" />,
  Pending: <FaClock className="w-3 h-3" />,
  Inactive: <FaTimes className="w-3 h-3" />
};

export default function ListingsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const filteredListings = listings.filter(listing => {
    const matchesSearch = listing.title.toLowerCase().includes(search.toLowerCase()) ||
                         listing.vendor.toLowerCase().includes(search.toLowerCase()) ||
                         listing.location.toLowerCase().includes(search.toLowerCase());
    
    const matchesStatus = statusFilter === "All" || listing.status === statusFilter;
    const matchesCategory = categoryFilter === "All" || listing.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const columns = [
    {
      key: "listing",
      label: "Listing",
      render: (listing) => (
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
            <span className="text-orange-600 font-semibold">
              {listing.title.split(' ').map(word => word[0]).join('').substring(0, 2)}
            </span>
          </div>
          <div>
            <div className="font-medium text-gray-900">{listing.title}</div>
            <div className="text-sm text-gray-500">{listing.category}</div>
            {listing.featured && (
              <span className="inline-block bg-orange-100 text-orange-700 text-xs px-2 py-1 rounded-full mt-1">
                Featured
              </span>
            )}
          </div>
        </div>
      )
    },
    {
      key: "vendor",
      label: "Vendor",
      render: (listing) => (
        <div>
          <div className="font-medium text-gray-900">{listing.vendor}</div>
          <div className="text-sm text-gray-500">{listing.location}</div>
        </div>
      )
    },
    {
      key: "price",
      label: "Price",
      render: (listing) => (
        <div className="font-medium text-gray-900">
          ${listing.price.toFixed(2)}
        </div>
      )
    },
    {
      key: "performance",
      label: "Performance",
      render: (listing) => (
        <div>
          <div className="font-medium text-gray-900">{listing.bookings} bookings</div>
          <div className="text-sm text-gray-500">⭐ {listing.rating}/5</div>
        </div>
      )
    },
    {
      key: "date",
      label: "Date Created",
      render: (listing) => (
        <div className="text-gray-900">{listing.dateCreated}</div>
      )
    },
    {
      key: "status",
      label: "Status",
      render: (listing) => (
        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full border text-xs font-semibold ${statusColors[listing.status]}`}>
          {statusIcons[listing.status]}
          {listing.status}
        </span>
      )
    },
    {
      key: "actions",
      label: "Actions",
      render: (listing) => (
        <div className="flex gap-2">
          <button className="text-blue-600 hover:text-blue-800 p-1">
            <FaEye className="w-4 h-4" />
          </button>
          <button className="text-green-600 hover:text-green-800 p-1">
            <FaEdit className="w-4 h-4" />
          </button>
          <button className="text-red-600 hover:text-red-800 p-1">
            <FaTrash className="w-4 h-4" />
          </button>
        </div>
      )
    }
  ];

  const categories = ["All", "Accommodation", "Tours", "Adventure", "Cultural", "Wildlife"];

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Business Listings</h1>
        <p className="text-gray-600">Manage your business listings and service offerings</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Total Listings</h3>
          <p className="text-3xl font-bold text-blue-600">{listings.length}</p>
          <p className="text-sm text-gray-500">All time</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Active</h3>
          <p className="text-3xl font-bold text-green-600">
            {listings.filter(l => l.status === 'Active').length}
          </p>
          <p className="text-sm text-gray-500">Currently live</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Pending</h3>
          <p className="text-3xl font-bold text-yellow-600">
            {listings.filter(l => l.status === 'Pending').length}
          </p>
          <p className="text-sm text-gray-500">Awaiting approval</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Featured</h3>
          <p className="text-3xl font-bold text-orange-600">
            {listings.filter(l => l.featured).length}
          </p>
          <p className="text-sm text-gray-500">Premium listings</p>
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
                placeholder="Search listings..."
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
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Inactive">Inactive</option>
            </select>
            
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            
            <AdminButton variant="primary" className="flex items-center gap-2">
              <FaPlus />
              New Listing
            </AdminButton>
          </div>
        </div>

        <DataTable
          data={filteredListings}
          columns={columns}
          searchable={false}
        />
      </div>
    </div>
  );
}
