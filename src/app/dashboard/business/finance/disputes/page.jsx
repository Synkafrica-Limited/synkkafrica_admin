"use client";
import React, { useState } from "react";
import { FaExclamationTriangle, FaEye, FaCheckCircle, FaFilter, FaSearch, FaDownload } from "react-icons/fa";
import BusinessSidebar from "@/views/layouts/components/business/BusinessSidebar";
import BusinessHeader from "@/views/layouts/components/business/BusinessHeader";
import { useToast } from "@/views/layouts/components/ToastContainer";
import PreviewModal from "@/views/layouts/components/modals/PreviewModal";
import ConfirmDialog from "@/views/layouts/components/modals/ConfirmDialog";

export default function DisputesPage() {
    const { showSuccess, showInfo } = useToast();
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [selectedDispute, setSelectedDispute] = useState(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [showResolveDialog, setShowResolveDialog] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Mock Disputes Data
    const [disputes, setDisputes] = useState([
        {
            id: "DIS-2025-001",
            orderId: "ORD-2025-009",
            customerName: "David Martinez",
            vendorName: "Tech Repair Hub",
            amount: "₦45,000",
            reason: "Service not completed as agreed",
            status: "open",
            filedDate: "2025-01-14",
            description: "Customer claims laptop was not repaired properly and issue persists.",
        },
        {
            id: "DIS-2025-002",
            orderId: "ORD-2025-010",
            customerName: "Sarah Chen",
            vendorName: "Premium Laundry Services",
            amount: "₦30,000",
            reason: "Damaged items",
            status: "in_review",
            filedDate: "2025-01-13",
            assignedDate: "2025-01-14",
            description: "Customer reports clothing items were damaged during cleaning process.",
        },
        {
            id: "DIS-2025-003",
            orderId: "ORD-2025-011",
            customerName: "Michael Obi",
            vendorName: "Ocean View Restaurants",
            amount: "₦65,000",
            reason: "Incorrect billing",
            status: "resolved",
            filedDate: "2025-01-10",
            resolvedDate: "2025-01-12",
            resolution: "Partial refund issued: ₦15,000",
            description: "Customer was charged for items not ordered. Overcharge confirmed.",
        },
        {
            id: "DIS-2025-004",
            orderId: "ORD-2025-012",
            customerName: "Amina Bello",
            vendorName: "Spa & Wellness Center",
            amount: "₦55,000",
            reason: "Poor service quality",
            status: "open",
            filedDate: "2025-01-15",
            description: "Customer unsatisfied with massage service quality and professionalism.",
        },
    ]);

    // Stats
    const stats = [
        {
            label: "Total Disputes",
            value: disputes.length,
            subtitle: "All time",
            icon: <FaExclamationTriangle className="text-red-600" />,
            bgColor: "bg-red-50",
        },
        {
            label: "Open",
            value: disputes.filter(d => d.status === "open").length,
            subtitle: "Requires attention",
            icon: <FaExclamationTriangle className="text-orange-600" />,
            bgColor: "bg-orange-50",
        },
        {
            label: "In Review",
            value: disputes.filter(d => d.status === "in_review").length,
            subtitle: "Being investigated",
            icon: <FaExclamationTriangle className="text-blue-600" />,
            bgColor: "bg-blue-50",
        },
        {
            label: "Resolved",
            value: disputes.filter(d => d.status === "resolved").length,
            subtitle: "Closed cases",
            icon: <FaCheckCircle className="text-green-600" />,
            bgColor: "bg-green-50",
        },
    ];

    // Filter disputes
    const filteredDisputes = disputes.filter(dispute => {
        const matchesSearch = searchQuery === "" || 
            JSON.stringify(dispute).toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === "all" || dispute.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    // Status badge
    const getStatusBadge = (status) => {
        const configs = {
            open: { bg: "bg-red-100", text: "text-red-700", label: "Open" },
            in_review: { bg: "bg-blue-100", text: "text-blue-700", label: "In Review" },
            resolved: { bg: "bg-green-100", text: "text-green-700", label: "Resolved" },
        };
        const config = configs[status] || configs.open;
        return (
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
                {config.label}
            </span>
        );
    };

    // Resolve dispute
    const handleResolveDispute = (dispute) => {
        setSelectedDispute(dispute);
        setShowResolveDialog(true);
    };

    const confirmResolve = async () => {
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        setDisputes(disputes.map(d => 
            d.id === selectedDispute.id ? { 
                ...d, 
                status: "resolved", 
                resolvedDate: new Date().toISOString().split('T')[0],
                resolution: "Resolved by admin"
            } : d
        ));
        
        setIsLoading(false);
        setShowResolveDialog(false);
        showSuccess(`Dispute ${selectedDispute.id} marked as resolved`);
        setSelectedDispute(null);
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            <div className="sticky top-0 h-screen">
                <BusinessSidebar active="Finance" onLogout={() => console.log('Logout')} />
            </div>
            <div className="flex-1 flex flex-col min-h-screen">
                <BusinessHeader title="Disputes Management" subtitle="Handle and resolve customer disputes" />

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
                                        placeholder="Search by dispute ID, customer, order..."
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
                                        <option value="open">Open</option>
                                        <option value="in_review">In Review</option>
                                        <option value="resolved">Resolved</option>
                                    </select>
                                </div>

                                <button
                                    onClick={() => showInfo("Exporting disputes data...")}
                                    className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                                >
                                    <FaDownload />
                                    Export
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Disputes Table */}
                    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Dispute ID</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Vendor</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reason</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Filed Date</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {filteredDisputes.length === 0 ? (
                                        <tr>
                                            <td colSpan="9" className="px-6 py-12 text-center text-gray-500">
                                                No disputes found
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredDisputes.map((dispute) => (
                                            <tr key={dispute.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {dispute.id}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                                                    {dispute.orderId}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {dispute.customerName}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {dispute.vendorName}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                                                    {dispute.amount}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-900">
                                                    {dispute.reason}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {dispute.filedDate}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {getStatusBadge(dispute.status)}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={() => {
                                                                setSelectedDispute(dispute);
                                                                setShowDetailsModal(true);
                                                            }}
                                                            className="text-blue-500 hover:text-blue-700"
                                                            title="View Details"
                                                        >
                                                            <FaEye />
                                                        </button>
                                                        {dispute.status !== "resolved" && (
                                                            <button
                                                                onClick={() => handleResolveDispute(dispute)}
                                                                className="text-green-500 hover:text-green-700"
                                                                title="Resolve"
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
                    {filteredDisputes.length > 0 && (
                        <div className="mt-4 text-sm text-gray-600 text-center">
                            Showing {filteredDisputes.length} of {disputes.length} disputes
                        </div>
                    )}
                </div>
            </div>

            {/* Details Modal */}
            {showDetailsModal && selectedDispute && (
                <PreviewModal
                    isOpen={showDetailsModal}
                    title="Dispute Details"
                    size="lg"
                    onClose={() => {
                        setShowDetailsModal(false);
                        setSelectedDispute(null);
                    }}
                    footer={
                        <div className="flex justify-end gap-3">
                            {selectedDispute.status !== "resolved" && (
                                <button
                                    onClick={() => {
                                        setShowDetailsModal(false);
                                        handleResolveDispute(selectedDispute);
                                    }}
                                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                                >
                                    Mark as Resolved
                                </button>
                            )}
                            <button
                                onClick={() => {
                                    setShowDetailsModal(false);
                                    setSelectedDispute(null);
                                }}
                                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                            >
                                Close
                            </button>
                        </div>
                    }
                >
                    <div className="space-y-4">
                        {selectedDispute.status === "resolved" && selectedDispute.resolution && (
                            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                <h4 className="font-semibold text-green-900 mb-2">Resolution</h4>
                                <p className="text-sm text-green-700">{selectedDispute.resolution}</p>
                            </div>
                        )}
                        
                        <div className="bg-gray-50 rounded-lg p-4">
                            <h4 className="font-semibold text-gray-900 mb-2">Description</h4>
                            <p className="text-sm text-gray-700">{selectedDispute.description}</p>
                        </div>

                        {Object.entries(selectedDispute).map(([key, value]) => (
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

            {/* Resolve Dialog */}
            <ConfirmDialog
                isOpen={showResolveDialog}
                title="Resolve Dispute"
                message={`Are you sure you want to mark dispute ${selectedDispute?.id} as resolved? This action will close the dispute case.`}
                type="success"
                confirmText="Resolve Dispute"
                cancelText="Cancel"
                onConfirm={confirmResolve}
                onCancel={() => {
                    setShowResolveDialog(false);
                    setSelectedDispute(null);
                }}
                isLoading={isLoading}
            />
        </div>
    );
}
