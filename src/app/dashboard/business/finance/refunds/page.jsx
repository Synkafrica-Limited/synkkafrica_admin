"use client";
import React, { useState } from "react";
import { FaUndo, FaEye, FaCheckCircle, FaFilter, FaSearch, FaDownload, FaClock } from "react-icons/fa";
import BusinessSidebar from "@/views/layouts/components/business/BusinessSidebar";
import BusinessHeader from "@/views/layouts/components/business/BusinessHeader";
import { useToast } from "@/views/layouts/components/ToastContainer";
import PreviewModal from "@/views/layouts/components/modals/PreviewModal";
import ConfirmDialog from "@/views/layouts/components/modals/ConfirmDialog";

export default function RefundsPage() {
    const { showSuccess, showInfo } = useToast();
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [selectedRefund, setSelectedRefund] = useState(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [showProcessDialog, setShowProcessDialog] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Mock Refunds Data
    const [refunds, setRefunds] = useState([
        {
            id: "REF-2025-001",
            orderId: "ORD-2025-007",
            customerName: "Michael Adebayo",
            vendorName: "Tech Repair Hub",
            amount: "₦35,000",
            reason: "Service unavailable - Parts not in stock",
            status: "completed",
            requestedDate: "2025-01-15",
            processedDate: "2025-01-16",
            refundMethod: "Original payment method (Stripe)",
            transactionRef: "re_3MtwBwLkdIwHu7ix28a3tqPa",
        },
        {
            id: "REF-2025-002",
            orderId: "ORD-2025-012",
            customerName: "Grace Eze",
            vendorName: "Elite Event Planning",
            amount: "₦100,000",
            reason: "Customer cancelled - Within 48 hours",
            status: "pending",
            requestedDate: "2025-01-16",
            refundMethod: "Original payment method (Stripe)",
        },
        {
            id: "REF-2025-003",
            orderId: "ORD-2025-013",
            customerName: "Ahmed Yusuf",
            vendorName: "Ocean View Restaurants",
            amount: "₦75,000",
            reason: "Service quality issues - Full refund requested",
            status: "pending",
            requestedDate: "2025-01-16",
            refundMethod: "Original payment method (Stripe)",
        },
        {
            id: "REF-2025-004",
            orderId: "ORD-2025-014",
            customerName: "Linda Okonkwo",
            vendorName: "Premium Laundry Services",
            amount: "₦25,000",
            reason: "Damaged items - Compensation refund",
            status: "completed",
            requestedDate: "2025-01-14",
            processedDate: "2025-01-15",
            refundMethod: "Original payment method (Stripe)",
            transactionRef: "re_3MtwBwLkdIwHu7ix28a3tqPb",
        },
    ]);

    // Stats
    const stats = [
        {
            label: "Total Refunds",
            value: refunds.length,
            subtitle: "All time",
            icon: <FaUndo className="text-purple-600" />,
            bgColor: "bg-purple-50",
        },
        {
            label: "Pending",
            value: refunds.filter(r => r.status === "pending").length,
            subtitle: "Awaiting processing",
            icon: <FaClock className="text-orange-600" />,
            bgColor: "bg-orange-50",
        },
        {
            label: "Completed",
            value: refunds.filter(r => r.status === "completed").length,
            subtitle: "Successfully refunded",
            icon: <FaCheckCircle className="text-green-600" />,
            bgColor: "bg-green-50",
        },
        {
            label: "Total Amount",
            value: "₦235,000",
            subtitle: "Total refunded",
            icon: <FaUndo className="text-blue-600" />,
            bgColor: "bg-blue-50",
        },
    ];

    // Filter refunds
    const filteredRefunds = refunds.filter(refund => {
        const matchesSearch = searchQuery === "" || 
            JSON.stringify(refund).toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === "all" || refund.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    // Status badge
    const getStatusBadge = (status) => {
        const configs = {
            pending: { bg: "bg-orange-100", text: "text-orange-700", label: "Pending" },
            completed: { bg: "bg-green-100", text: "text-green-700", label: "Completed" },
            failed: { bg: "bg-red-100", text: "text-red-700", label: "Failed" },
        };
        const config = configs[status] || configs.pending;
        return (
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
                {config.label}
            </span>
        );
    };

    // Process refund
    const handleProcessRefund = (refund) => {
        setSelectedRefund(refund);
        setShowProcessDialog(true);
    };

    const confirmProcess = async () => {
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        setRefunds(refunds.map(r => 
            r.id === selectedRefund.id ? { 
                ...r, 
                status: "completed", 
                processedDate: new Date().toISOString().split('T')[0],
                transactionRef: `re_${Date.now()}`
            } : r
        ));
        
        setIsLoading(false);
        setShowProcessDialog(false);
        showSuccess(`Refund ${selectedRefund.id} processed successfully`);
        setSelectedRefund(null);
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            <div className="sticky top-0 h-screen">
                <BusinessSidebar active="Finance" onLogout={() => console.log('Logout')} />
            </div>
            <div className="flex-1 flex flex-col min-h-screen">
                <BusinessHeader title="Refunds Management" subtitle="Process and track customer refunds" />

                <div className="flex-1 overflow-y-auto p-6">
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        {stats.map((stat, index) => (
                            <div key={index} className="bg-white rounded-lg border border-gray-200 p-5">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                                        {stat.icon}
                                    </div>
                                    <h3 className="text-sm font-medium text-gray-600">{stat.label}</h3>
                                </div>
                                <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
                                <p className="text-xs text-gray-500">{stat.subtitle}</p>
                            </div>
                        ))}
                    </div>

                    {/* Filters */}
                    <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
                        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                            <div className="flex-1 w-full md:w-auto">
                                <div className="relative">
                                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search by refund ID, customer, order..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    />
                                </div>
                            </div>

                            <div className="flex gap-3 items-center flex-wrap">
                                <div className="flex items-center gap-2">
                                    <FaFilter className="text-gray-500" />
                                    <select
                                        value={statusFilter}
                                        onChange={(e) => setStatusFilter(e.target.value)}
                                        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    >
                                        <option value="all">All Status</option>
                                        <option value="pending">Pending</option>
                                        <option value="completed">Completed</option>
                                        <option value="failed">Failed</option>
                                    </select>
                                </div>

                                <button
                                    onClick={() => showInfo("Exporting refunds data...")}
                                    className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                                >
                                    <FaDownload />
                                    Export
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Refunds Table */}
                    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Refund ID</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reason</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Requested</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {filteredRefunds.length === 0 ? (
                                        <tr>
                                            <td colSpan="8" className="px-6 py-12 text-center text-gray-500">
                                                No refunds found
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredRefunds.map((refund) => (
                                            <tr key={refund.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {refund.id}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                                                    {refund.orderId}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {refund.customerName}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                                                    {refund.amount}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-900">
                                                    {refund.reason}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {refund.requestedDate}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {getStatusBadge(refund.status)}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={() => {
                                                                setSelectedRefund(refund);
                                                                setShowDetailsModal(true);
                                                            }}
                                                            className="text-blue-500 hover:text-blue-700"
                                                            title="View Details"
                                                        >
                                                            <FaEye />
                                                        </button>
                                                        {refund.status === "pending" && (
                                                            <button
                                                                onClick={() => handleProcessRefund(refund)}
                                                                className="text-green-500 hover:text-green-700"
                                                                title="Process Refund"
                                                            >
                                                                <FaCheckCircle />
                                                            </button>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Summary */}
                    {filteredRefunds.length > 0 && (
                        <div className="mt-4 text-sm text-gray-600 text-center">
                            Showing {filteredRefunds.length} of {refunds.length} refunds
                        </div>
                    )}
                </div>
            </div>

            {/* Details Modal */}
            {showDetailsModal && selectedRefund && (
                <PreviewModal
                    isOpen={showDetailsModal}
                    title="Refund Details"
                    size="lg"
                    onClose={() => {
                        setShowDetailsModal(false);
                        setSelectedRefund(null);
                    }}
                    footer={
                        <div className="flex justify-end gap-3">
                            {selectedRefund.status === "pending" && (
                                <button
                                    onClick={() => {
                                        setShowDetailsModal(false);
                                        handleProcessRefund(selectedRefund);
                                    }}
                                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                                >
                                    Process Refund
                                </button>
                            )}
                            <button
                                onClick={() => {
                                    setShowDetailsModal(false);
                                    setSelectedRefund(null);
                                }}
                                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                            >
                                Close
                            </button>
                        </div>
                    }
                >
                    <div className="space-y-4">
                        {Object.entries(selectedRefund).map(([key, value]) => (
                            <div key={key} className="grid grid-cols-2 gap-4 border-b pb-2">
                                <div className="text-sm font-medium text-gray-500 capitalize">
                                    {key.replace(/([A-Z])/g, ' $1').trim()}
                                </div>
                                <div className="text-sm text-gray-900">{value?.toString() || 'N/A'}</div>
                            </div>
                        ))}
                    </div>
                </PreviewModal>
            )}

            {/* Process Dialog */}
            <ConfirmDialog
                isOpen={showProcessDialog}
                title="Process Refund"
                message={`Are you sure you want to process refund ${selectedRefund?.id}? Amount of ${selectedRefund?.amount} will be refunded to ${selectedRefund?.customerName} via ${selectedRefund?.refundMethod}.`}
                type="warning"
                confirmText="Process Refund"
                cancelText="Cancel"
                onConfirm={confirmProcess}
                onCancel={() => {
                    setShowProcessDialog(false);
                    setSelectedRefund(null);
                }}
                isLoading={isLoading}
            />
        </div>
    );
}
