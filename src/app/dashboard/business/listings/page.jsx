"use client";
import React, { useState } from "react";
import { FaSearch, FaEye, FaEyeSlash, FaTrash, FaCheck, FaTimes, FaClock, FaStar, FaDownload, FaFilter, FaStore, FaMapMarkerAlt } from "react-icons/fa";
import BusinessSidebar from "@/views/layouts/components/business/BusinessSidebar";
import BusinessHeader from "@/views/layouts/components/business/BusinessHeader";
import AdminButton from "@/ui/button";
import ConfirmDialog from "@/views/layouts/components/modals/ConfirmDialog";
import ApprovalDialog from "@/views/layouts/components/modals/ApprovalDialog";
import { useToast } from "@/views/layouts/components/ToastContainer";
import PreviewModal from "@/views/layouts/components/modals/PreviewModal";
import { listings } from "@/models/entities/listing.entity";

export default function ListingsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [visibilityFilter, setVisibilityFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  
  // Dialog states
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showVisibilityDialog, setShowVisibilityDialog] = useState(false);
  const [showApprovalDialog, setShowApprovalDialog] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [selectedListing, setSelectedListing] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const { showSuccess, showError, showWarning, showInfo } = useToast();

  const filteredListings = listings.filter(listing => {
    const matchesSearch = search === '' ||
                         listing.title.toLowerCase().includes(search.toLowerCase()) ||
                         listing.vendor.toLowerCase().includes(search.toLowerCase()) ||
                         listing.location.toLowerCase().includes(search.toLowerCase()) ||
                         listing.id.toLowerCase().includes(search.toLowerCase());
    
    const matchesStatus = statusFilter === "All" || listing.status === statusFilter;
    const matchesVisibility = visibilityFilter === "All" || listing.visibility === visibilityFilter;
    const matchesCategory = categoryFilter === "All" || listing.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesVisibility && matchesCategory;
  });

  const handleToggleVisibility = (id) => {
    const listing = listings.find(l => l.id === id);
    setSelectedListing(listing);
    setShowVisibilityDialog(true);
  };

  const confirmToggleVisibility = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const action = selectedListing.visibility === 'Visible' ? 'hidden' : 'visible';
      showSuccess(
        'Visibility Updated',
        `Listing "${selectedListing.title}" is now ${action}`
      );
      
      setShowVisibilityDialog(false);
      setSelectedListing(null);
    } catch (error) {
      showError('Error', 'Failed to update listing visibility');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = (id) => {
    const listing = listings.find(l => l.id === id);
    setSelectedListing(listing);
    setShowDeleteDialog(true);
  };

  const confirmDelete = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      showSuccess(
        'Listing Deleted',
        `"${selectedListing.title}" has been permanently deleted`
      );
      
      setShowDeleteDialog(false);
      setSelectedListing(null);
    } catch (error) {
      showError('Error', 'Failed to delete listing');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFeatureToggle = (id) => {
    const listing = listings.find(l => l.id === id);
    const action = listing.featured ? 'remove from' : 'add to';
    
    showInfo(
      'Feature Status',
      `"${listing.title}" ${action} featured listings`
    );
    
    // Add feature toggle logic here
  };

  const handleApprove = (id) => {
    const listing = listings.find(l => l.id === id);
    setSelectedListing(listing);
    setShowApprovalDialog(true);
  };

  const confirmApprove = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      showSuccess(
        'Listing Approved',
        `"${selectedListing.title}" is now live on the platform`
      );
      
      setShowApprovalDialog(false);
      setSelectedListing(null);
    } catch (error) {
      showError('Error', 'Failed to approve listing');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReject = (reason) => {
    setIsLoading(true);
    try {
      // Simulate API call
      setTimeout(() => {
        showWarning(
          'Listing Rejected',
          `"${selectedListing.title}" has been rejected. Vendor will be notified.`
        );
        
        setShowApprovalDialog(false);
        setSelectedListing(null);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      showError('Error', 'Failed to reject listing');
      setIsLoading(false);
    }
  };

  const handlePreview = (id) => {
    const listing = listings.find(l => l.id === id);
    setSelectedListing(listing);
    setShowPreviewModal(true);
  };

  // Stats
  const stats = {
    total: listings.length,
    active: listings.filter(l => l.status === 'Active').length,
    pending: listings.filter(l => l.status === 'Pending Review').length,
    visible: listings.filter(l => l.visibility === 'Visible').length,
    revenue: listings.reduce((sum, l) => sum + l.revenue, 0)
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="sticky top-0 h-screen">
        <BusinessSidebar active="Listings" />
      </div>
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <BusinessHeader title="Listings Management" subtitle="Manage and moderate vendor listings" />

        <div className="flex-1 overflow-y-auto p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            <div className="bg-white rounded-lg border border-gray-200 p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <FaStore className="text-blue-600" />
                </div>
                <h3 className="text-sm font-medium text-gray-600">Total Listings</h3>
              </div>
              <p className="text-2xl font-bold text-gray-900 mb-1">{stats.total}</p>
              <p className="text-xs text-gray-500">All vendor listings</p>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-green-50 rounded-lg">
                  <FaCheck className="text-green-600" />
                </div>
                <h3 className="text-sm font-medium text-gray-600">Active</h3>
              </div>
              <p className="text-2xl font-bold text-gray-900 mb-1">{stats.active}</p>
              <p className="text-xs text-gray-500">Live on platform</p>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-yellow-50 rounded-lg">
                  <FaClock className="text-yellow-600" />
                </div>
                <h3 className="text-sm font-medium text-gray-600">Pending Review</h3>
              </div>
              <p className="text-2xl font-bold text-gray-900 mb-1">{stats.pending}</p>
              <p className="text-xs text-gray-500">Awaiting approval</p>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-purple-50 rounded-lg">
                  <FaEye className="text-purple-600" />
                </div>
                <h3 className="text-sm font-medium text-gray-600">Visible</h3>
              </div>
              <p className="text-2xl font-bold text-gray-900 mb-1">{stats.visible}</p>
              <p className="text-xs text-gray-500">Public listings</p>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-orange-50 rounded-lg">
                  <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-sm font-medium text-gray-600">Total Revenue</h3>
              </div>
              <p className="text-2xl font-bold text-gray-900 mb-1">₦{stats.revenue.toLocaleString()}</p>
              <p className="text-xs text-gray-500">From all listings</p>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-6">
              <div className="flex gap-3 flex-wrap">
                <AdminButton variant="secondary" className="flex items-center gap-2 border-gray-300 text-gray-700">
                  <FaDownload className="text-sm" />
                  Export Data
                </AdminButton>
                <AdminButton variant="secondary" className="flex items-center gap-2 border-gray-300 text-gray-700">
                  <FaFilter className="text-sm" />
                  More Filters
                </AdminButton>
              </div>
              <div className="flex gap-3 w-full lg:w-auto flex-wrap">
                <div className="relative flex-1 lg:w-80">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search listings, vendors..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-4 mb-6 flex-wrap">
              <div className="flex gap-2 flex-wrap">
                <span className="text-sm font-medium text-gray-700 py-2">Status:</span>
                {['All', 'Active', 'Pending Review', 'Flagged'].map((status) => (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                      statusFilter === status 
                        ? "bg-orange-500 text-white" 
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
              <div className="flex gap-2 flex-wrap">
                <span className="text-sm font-medium text-gray-700 py-2">Visibility:</span>
                {['All', 'Visible', 'Hidden'].map((visibility) => (
                  <button
                    key={visibility}
                    onClick={() => setVisibilityFilter(visibility)}
                    className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                      visibilityFilter === visibility 
                        ? "bg-orange-500 text-white" 
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {visibility}
                  </button>
                ))}
              </div>
            </div>

            {/* Listings Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Listing</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Vendor</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Performance</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Visibility</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredListings.map((listing) => (
                    <tr key={listing.id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-4">
                        <div className="flex items-start gap-3">
                          <div className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0 flex items-center justify-center">
                            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-gray-900 mb-1">{listing.title}</div>
                            <div className="text-xs text-gray-500 mb-1">{listing.id}</div>
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              <span className="px-2 py-1 bg-gray-100 rounded">{listing.category}</span>
                              {listing.featured && (
                                <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded flex items-center gap-1">
                                  <FaStar className="text-xs" />
                                  Featured
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div>
                          <div className="font-medium text-gray-900">{listing.vendor}</div>
                          <div className="text-xs text-gray-500">{listing.vendorId}</div>
                          <div className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                            <FaMapMarkerAlt />
                            {listing.location}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="font-bold text-lg text-gray-900">₦{listing.price.toLocaleString()}</div>
                        <div className="text-xs text-gray-500">per booking</div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="space-y-1">
                          <div className="text-sm text-gray-900">{listing.bookings} bookings</div>
                          <div className="text-sm text-gray-500">{listing.views} views</div>
                          <div className="flex items-center gap-1 text-sm">
                            <FaStar className="text-yellow-500 text-xs" />
                            <span className="font-medium text-gray-900">{listing.rating}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        {listing.status === 'Active' && (
                          <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium border border-green-200">
                            <FaCheck className="text-xs" />
                            Active
                          </span>
                        )}
                        {listing.status === 'Pending Review' && (
                          <span className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-50 text-yellow-700 rounded-full text-xs font-medium border border-yellow-200">
                            <FaClock className="text-xs" />
                            Pending
                          </span>
                        )}
                        {listing.status === 'Flagged' && (
                          <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-50 text-red-700 rounded-full text-xs font-medium border border-red-200">
                            <FaTimes className="text-xs" />
                            Flagged
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-4">
                        <button
                          onClick={() => handleToggleVisibility(listing.id)}
                          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                            listing.visibility === 'Visible'
                              ? 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100'
                              : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                          }`}
                        >
                          {listing.visibility === 'Visible' ? (
                            <>
                              <FaEye className="text-xs" />
                              Visible
                            </>
                          ) : (
                            <>
                              <FaEyeSlash className="text-xs" />
                              Hidden
                            </>
                          )}
                        </button>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex gap-2">
                          {listing.status === 'Pending Review' && (
                            <>
                              <button 
                                onClick={() => handleApprove(listing.id)}
                                className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors" 
                                title="Approve Listing"
                              >
                                <FaCheck />
                              </button>
                              <button 
                                onClick={() => handlePreview(listing.id)}
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" 
                                title="Preview Listing"
                              >
                                <FaEye />
                              </button>
                            </>
                          )}
                          <button
                            onClick={() => handleFeatureToggle(listing.id)}
                            className={`p-2 rounded-lg transition-colors ${
                              listing.featured
                                ? 'text-orange-600 hover:bg-orange-50'
                                : 'text-gray-400 hover:bg-gray-50'
                            }`}
                            title={listing.featured ? "Remove Featured" : "Make Featured"}
                          >
                            <FaStar />
                          </button>
                          <button 
                            onClick={() => handleDelete(listing.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" 
                            title="Delete Listing"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600">Showing {filteredListings.length} of {listings.length} listings</p>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                  &lt; Previous
                </button>
                <button className="px-3 py-1 text-sm bg-orange-500 text-white rounded-lg">1</button>
                <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">2</button>
                <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                  Next &gt;
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      {selectedListing && (
        <ConfirmDialog
          isOpen={showDeleteDialog}
          onClose={() => {
            setShowDeleteDialog(false);
            setSelectedListing(null);
          }}
          onConfirm={confirmDelete}
          title="Delete Listing"
          message={`Are you sure you want to delete "${selectedListing.title}"? This action cannot be undone and all booking history will be lost.`}
          type="danger"
          confirmText="Yes, Delete"
          cancelText="Cancel"
          isLoading={isLoading}
        />
      )}

      {/* Visibility Toggle Dialog */}
      {selectedListing && (
        <ConfirmDialog
          isOpen={showVisibilityDialog}
          onClose={() => {
            setShowVisibilityDialog(false);
            setSelectedListing(null);
          }}
          onConfirm={confirmToggleVisibility}
          title={`${selectedListing.visibility === 'Visible' ? 'Hide' : 'Show'} Listing`}
          message={`Are you sure you want to ${selectedListing.visibility === 'Visible' ? 'hide' : 'show'} "${selectedListing.title}" ${selectedListing.visibility === 'Visible' ? 'from' : 'to'} customers?`}
          type="warning"
          confirmText="Confirm"
          cancelText="Cancel"
          isLoading={isLoading}
        />
      )}

      {/* Approval Dialog */}
      {selectedListing && (
        <ApprovalDialog
          isOpen={showApprovalDialog}
          onClose={() => {
            setShowApprovalDialog(false);
            setSelectedListing(null);
          }}
          onApprove={confirmApprove}
          onReject={handleReject}
          title="Review Listing"
          itemName={selectedListing.title}
          itemDetails={{
            vendor: selectedListing.vendor,
            category: selectedListing.category,
            price: `₦${selectedListing.price.toLocaleString()}`,
            location: selectedListing.location
          }}
          isLoading={isLoading}
        />
      )}

      {/* Preview Modal */}
      {selectedListing && (
        <PreviewModal
          isOpen={showPreviewModal}
          onClose={() => {
            setShowPreviewModal(false);
            setSelectedListing(null);
          }}
          title="Listing Preview"
          size="lg"
          footer={
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => {
                  setShowPreviewModal(false);
                  setSelectedListing(null);
                }}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
              {selectedListing.status === 'Pending Review' && (
                <button
                  onClick={() => {
                    setShowPreviewModal(false);
                    handleApprove(selectedListing.id);
                  }}
                  className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                >
                  <FaCheck />
                  Approve Listing
                </button>
              )}
            </div>
          }
        >
          <div className="space-y-6">
            {/* Listing Image Placeholder */}
            <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
              <svg className="w-24 h-24 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>

            {/* Listing Details */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedListing.title}</h3>
              <div className="flex items-center gap-3 text-sm text-gray-600 mb-4">
                <span className="px-3 py-1 bg-gray-100 rounded-full">{selectedListing.category}</span>
                <span className="flex items-center gap-1">
                  <FaMapMarkerAlt />
                  {selectedListing.location}
                </span>
                <span className="flex items-center gap-1">
                  <FaStar className="text-yellow-500" />
                  {selectedListing.rating}
                </span>
              </div>
            </div>

            {/* Vendor Information */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-3">Vendor Information</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-xs text-gray-500 uppercase">Vendor Name</span>
                  <p className="text-sm font-medium text-gray-900">{selectedListing.vendor}</p>
                </div>
                <div>
                  <span className="text-xs text-gray-500 uppercase">Vendor ID</span>
                  <p className="text-sm font-medium text-gray-900">{selectedListing.vendorId}</p>
                </div>
              </div>
            </div>

            {/* Pricing & Performance */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                <h4 className="text-sm font-medium text-gray-600 mb-2">Price</h4>
                <p className="text-3xl font-bold text-green-700">₦{selectedListing.price.toLocaleString()}</p>
                <p className="text-xs text-gray-600 mt-1">per booking</p>
              </div>
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <h4 className="text-sm font-medium text-gray-600 mb-2">Performance</h4>
                <div className="space-y-1">
                  <p className="text-sm text-gray-900">{selectedListing.bookings} bookings</p>
                  <p className="text-sm text-gray-900">{selectedListing.views} views</p>
                  <p className="text-sm text-gray-900">₦{selectedListing.revenue.toLocaleString()} revenue</p>
                </div>
              </div>
            </div>

            {/* Description Placeholder */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Description</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                This is a preview of the listing. The actual description and details would be displayed here.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </div>
        </PreviewModal>
      )}
    </div>
  );
}
