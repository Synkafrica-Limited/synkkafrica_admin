"use client";
import React, { useState } from "react";
import { FaSearch, FaEye, FaEyeSlash, FaTrash, FaCheck, FaTimes, FaClock, FaStar, FaDownload, FaFilter, FaStore, FaMapMarkerAlt } from "react-icons/fa";
import BusinessSidebar from "@/views/layouts/components/BusinessSidebar";
import BusinessHeader from "@/views/layouts/components/BusinessHeader";
import AdminButton from "@/ui/button";

const listings = [
  {
    id: "LST-001",
    title: "Luxury Beach Resort Package",
    category: "Accommodation",
    vendor: "Beach Paradise Resort",
    vendorId: "VND-002",
    price: 299.99,
    location: "Lagos, Nigeria",
    status: "Active",
    visibility: "Visible",
    featured: true,
    dateCreated: "2024-01-15",
    bookings: 45,
    views: 320,
    rating: 4.8,
    revenue: 13499.55
  },
  {
    id: "LST-002",
    title: "City Tour Adventure",
    category: "Tours & Travel",
    vendor: "City Tours Express",
    vendorId: "VND-001",
    price: 89.50,
    location: "Abuja, Nigeria",
    status: "Pending Review",
    visibility: "Hidden",
    featured: false,
    dateCreated: "2024-01-14",
    bookings: 12,
    views: 85,
    rating: 4.2,
    revenue: 1074.00
  },
  {
    id: "LST-003",
    title: "Mountain Hiking Experience",
    category: "Adventure & Sports",
    vendor: "Peak Explorers",
    vendorId: "VND-005",
    price: 150.00,
    location: "Jos, Nigeria",
    status: "Active",
    visibility: "Visible",
    featured: true,
    dateCreated: "2024-01-13",
    bookings: 28,
    views: 156,
    rating: 4.6,
    revenue: 4200.00
  },
  {
    id: "LST-004",
    title: "Cultural Heritage Tour",
    category: "Tours & Travel",
    vendor: "Heritage Tours Nigeria",
    vendorId: "VND-004",
    price: 75.00,
    location: "Ife, Nigeria",
    status: "Active",
    visibility: "Hidden",
    featured: false,
    dateCreated: "2024-01-12",
    bookings: 8,
    views: 42,
    rating: 4.1,
    revenue: 600.00
  },
  {
    id: "LST-005",
    title: "Safari Wildlife Experience",
    category: "Adventure & Sports",
    vendor: "Safari Adventures Ltd",
    vendorId: "VND-001",
    price: 450.00,
    location: "Cross River, Nigeria",
    status: "Active",
    visibility: "Visible",
    featured: true,
    dateCreated: "2024-01-11",
    bookings: 67,
    views: 580,
    rating: 4.9,
    revenue: 30150.00
  },
  {
    id: "LST-006",
    title: "Lagos Food Tours",
    category: "Food & Dining",
    vendor: "Lagos Food Tours",
    vendorId: "VND-003",
    price: 65.00,
    location: "Lagos, Nigeria",
    status: "Flagged",
    visibility: "Hidden",
    featured: false,
    dateCreated: "2024-01-10",
    bookings: 15,
    views: 98,
    rating: 3.8,
    revenue: 975.00
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
  const [selectedListings, setSelectedListings] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredListings = listings.filter(listing => {
    const matchesSearch = listing.title.toLowerCase().includes(search.toLowerCase()) ||
                         listing.vendor.toLowerCase().includes(search.toLowerCase()) ||
                         listing.location.toLowerCase().includes(search.toLowerCase());
    
    const matchesStatus = statusFilter === "All" || listing.status === statusFilter;
    const matchesCategory = categoryFilter === "All" || listing.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const handleEdit = (id) => {
    console.log('Editing listing:', id);
    // Add edit logic here
  };

  const handleDelete = (id) => {
    console.log('Deleting listing:', id);
    // Add delete logic here
  };

  const handleView = (id) => {
    console.log('Viewing listing:', id);
    // Add view logic here
  };

  const handleBulkDelete = () => {
    console.log('Bulk deleting listings:', selectedListings);
    // Add bulk delete logic here
  };

  const handleToggleStatus = (id, currentStatus) => {
    console.log('Toggling status for listing:', id);
    // Add status toggle logic here
  };

  // Stats for the dashboard widget
  const stats = [
    { 
      label: "Total Listings", 
      value: listings.length, 
      sub: "All listings", 
      icon: "list" 
    },
    { 
      label: "Active Listings", 
      value: listings.filter(l => l.status === 'Active').length, 
      sub: "Currently live", 
      icon: "check_circle" 
    },
    { 
      label: "Pending Approval", 
      value: listings.filter(l => l.status === 'Pending').length, 
      sub: "Awaiting review", 
      icon: "clock" 
    },
    { 
      label: "Featured", 
      value: listings.filter(l => l.featured).length, 
      sub: "Premium listings", 
      icon: "star" 
    }
  ];

  const columns = [
    {
      header: "Listing",
      accessor: "title",
      cell: (value, row) => (
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-8 h-8 sm:w-12 sm:h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-orange-600 font-semibold text-xs sm:text-sm">
              {value.split(' ').map(word => word[0]).join('').substring(0, 2)}
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <div className="font-medium text-gray-900 text-sm sm:text-base truncate">{value}</div>
            <div className="text-xs sm:text-sm text-gray-500 truncate">{row.category}</div>
            {row.featured && (
              <span className="inline-block bg-orange-100 text-orange-700 text-xs px-2 py-1 rounded-full mt-1">
                Featured
              </span>
            )}
          </div>
        </div>
      )
    },
    {
      header: "Vendor",
      accessor: "vendor",
      cell: (value, row) => (
        <div className="min-w-0">
          <div className="font-medium text-gray-900 text-sm sm:text-base truncate">{value}</div>
          <div className="text-xs sm:text-sm text-gray-500 truncate">{row.location}</div>
        </div>
      )
    },
    {
      header: "Price",
      accessor: "price",
      cell: (value) => (
        <div className="font-medium text-green-600 text-sm sm:text-base">
          ${value.toFixed(2)}
        </div>
      )
    },
    {
      header: "Performance",
      accessor: "bookings",
      cell: (value, row) => (
        <div className="text-sm sm:text-base">
          <div className="font-medium text-gray-900">{value} bookings</div>
          <div className="text-xs sm:text-sm text-gray-500">⭐ {row.rating}/5</div>
        </div>
      ),
      // Hide on mobile, show on tablet and up
      className: "hidden sm:table-cell"
    },
    {
      header: "Date",
      accessor: "dateCreated",
      cell: (value) => (
        <div className="text-sm text-gray-900">{value}</div>
      ),
      // Hide on mobile, show on tablet and up
      className: "hidden md:table-cell"
    },
    {
      header: "Status",
      accessor: "status",
      cell: (value) => (
        <span className={`inline-flex items-center gap-1 px-2 sm:px-3 py-1 rounded-full border text-xs font-semibold ${statusColors[value]}`}>
          {statusIcons[value]}
          <span className="hidden sm:inline">{value}</span>
        </span>
      )
    },
    {
      header: "Actions",
      accessor: "actions",
      cell: (_, row) => (
        <div className="flex gap-1 sm:gap-2">
          <button 
            onClick={() => handleView(row.id)}
            className="text-blue-600 hover:text-blue-800 p-1"
            title="View Details"
          >
            <FaEye className="w-3 h-3 sm:w-4 sm:h-4" />
          </button>
          <button 
            onClick={() => handleEdit(row.id)}
            className="text-green-600 hover:text-green-800 p-1"
            title="Edit Listing"
          >
            <FaEdit className="w-3 h-3 sm:w-4 sm:h-4" />
          </button>
          <button 
            onClick={() => handleDelete(row.id)}
            className="text-red-600 hover:text-red-800 p-1"
            title="Delete Listing"
          >
            <FaTrash className="w-3 h-3 sm:w-4 sm:h-4" />
          </button>
        </div>
      )
    }
  ];

  const categories = ["All", "Accommodation", "Tours", "Adventure", "Cultural", "Wildlife"];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="sticky top-0 h-screen">
        <BusinessSidebar active="Listings" />
      </div>
      <div className="flex-1 flex flex-col h-screen">
        {/* Header matching vendor dashboard */}
        <div className="sticky top-0 z-30 bg-white border-b border-gray-200">
          <div className="flex items-center justify-between px-6 md:px-10 py-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Listings</h1>
              <p className="text-sm text-gray-500 mt-1">Create and manage your service listings</p>
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
          {/* Filter tabs matching vendor dashboard */}
          <div className="mb-6">
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setCategoryFilter("All")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  categoryFilter === "All" 
                    ? "bg-orange-500 text-white" 
                    : "bg-white text-gray-700 border border-gray-300 hover:border-orange-500"
                }`}
              >
                All ({listings.length})
              </button>
              {["Accommodation", "Tours", "Adventure", "Cultural"].map((category) => (
                <button
                  key={category}
                  onClick={() => setCategoryFilter(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    categoryFilter === category 
                      ? "bg-orange-500 text-white" 
                      : "bg-white text-gray-700 border border-gray-300 hover:border-orange-500"
                  }`}
                >
                  {category} ({listings.filter(l => l.category === category).length})
                </button>
              ))}
            </div>
          </div>

          {/* Listings Grid - similar to vendor dashboard cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredListings.map((listing) => (
              <div key={listing.id} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow">
                {/* Listing Image Placeholder */}
                <div className="relative">
                  <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                    <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  {listing.status === "Active" && (
                    <span className="absolute top-2 right-2 px-3 py-1 bg-green-500 text-white text-xs font-semibold rounded-full">
                      Active
                    </span>
                  )}
                  {listing.featured && (
                    <span className="absolute top-2 left-2 px-3 py-1 bg-orange-500 text-white text-xs font-semibold rounded-full">
                      Featured
                    </span>
                  )}
                </div>

                {/* Listing Details */}
                <div className="p-4">
                  <h3 className="font-bold text-lg text-gray-900 mb-1 truncate">{listing.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                    <span>{listing.category}</span>
                    <span>•</span>
                    <span>{listing.location}</span>
                  </div>
                  
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl font-bold text-orange-500">
                      ${listing.price.toFixed(2)}
                    </span>
                    <div className="flex items-center gap-1 text-yellow-500">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-sm font-medium text-gray-700">{listing.rating}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span>{listing.bookings} views</span>
                    <span>{listing.bookings} bookings</span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(listing.id)}
                      className="flex-1 px-3 py-2 bg-white border border-orange-500 text-orange-500 rounded-lg hover:bg-orange-50 transition-colors text-sm font-medium"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(listing.id)}
                      className="px-3 py-2 bg-white border border-red-500 text-red-500 rounded-lg hover:bg-red-50 transition-colors"
                    >
                      <FaTrash className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Add New Listing Button - Fixed at bottom right */}
          <button
            onClick={() => setShowAddModal(true)}
            className="fixed bottom-6 right-6 bg-orange-500 hover:bg-orange-600 text-white rounded-full p-4 shadow-lg transition-all hover:shadow-xl"
            title="Add New Listing"
          >
            <FaPlus className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
