"use client";
import React, { useState } from "react";
import { FaWallet, FaCheckCircle, FaEye, FaClock } from "react-icons/fa";
import BusinessSidebar from "@/views/layouts/components/business/BusinessSidebar";
import BusinessHeader from "@/views/layouts/components/business/BusinessHeader";
import DataFilters from "@/views/layouts/components/filters/DataFilters";
import { useToast } from "@/views/layouts/components/ToastContainer";
import PreviewModal from "@/views/layouts/components/modals/PreviewModal";
import ConfirmDialog from "@/views/layouts/components/modals/ConfirmDialog";

export default function PayoutsPage() {
    const { showSuccess, showError, showInfo } = useToast();
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [selectedPayout, setSelectedPayout] = useState(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Mock Vendor Payouts Data
    const [payouts, setPayouts] = useState([
        {
            id: "PAY-2025-001",
            vendorName: "Luxury Car Rentals Ltd",
            vendorId: "VND-001",
            amount: "₦450,000",
            orders: 15,
            commission: "₦45,000",
            netAmount: "₦405,000",
            period: "Jan 1-15, 2025",
            status: "pending",
            requestedDate: "2025-01-16",
            bankAccount: "0123456789 - First Bank",
        },
        {
            id: "PAY-2025-002",
            vendorName: "Ocean View Restaurants",
            vendorId: "VND-002",
            amount: "₦280,000",
            orders: 8,
            commission: "₦28,000",
            netAmount: "₦252,000",
            period: "Jan 1-15, 2025",
            status: "processing",
            requestedDate: "2025-01-15",
            processedDate: "2025-01-16",
            bankAccount: "9876543210 - GTBank",
        },
        {
            id: "PAY-2025-003",
            vendorName: "Elite Event Planning",
            vendorId: "VND-004",
            amount: "₦1,200,000",
            orders: 3,
            commission: "₦120,000",
            netAmount: "₦1,080,000",
            period: "Dec 16-31, 2024",
            status: "completed",
            requestedDate: "2025-01-02",
            processedDate: "2025-01-03",
            completedDate: "2025-01-04",
            bankAccount: "1122334455 - Access Bank",
            transactionRef: "TRX-20250104-001",
        },
        {
            id: "PAY-2025-004",
            vendorName: "Spa & Wellness Center",
            vendorId: "VND-005",
            amount: "₦180,000",
            orders: 12,
            commission: "₦18,000",
            netAmount: "₦162,000",
            period: "Jan 1-15, 2025",
            status: "pending",
            requestedDate: "2025-01-16",
            bankAccount: "5544332211 - UBA",
        },
        {
            id: "PAY-2025-005",
            vendorName: "Premium Laundry Services",
            vendorId: "VND-003",
            amount: "₦320,000",
            orders: 20,
            commission: "₦32,000",
            netAmount: "₦288,000",
            period: "Jan 1-15, 2025",
            status: "completed",
            requestedDate: "2025-01-14",
            processedDate: "2025-01-15",
            completedDate: "2025-01-16",
            bankAccount: "7788990011 - Zenith Bank",
            transactionRef: "TRX-20250116-002",
        },
    ]);

    // Stats
    const stats = [
        {
            label: "Total Payouts",
            value: payouts.length,
            subtitle: "All time",
            icon: <FaWallet className="text-blue-600" />,
            bgColor: "bg-blue-50",
        },
        {
            label: "Pending Approval",
            value: payouts.filter(p => p.status === "pending").length,
            subtitle: "Awaiting processing",
            icon: <FaClock className="text-orange-600" />,
            bgColor: "bg-orange-50",
        },
        {
            label: "Processing",
            value: payouts.filter(p => p.status === "processing").length,
            subtitle: "In progress",
            icon: <FaClock className="text-blue-600" />,
            bgColor: "bg-blue-50",
        },
        {
            label: "Completed",
            value: payouts.filter(p => p.status === "completed").length,
            subtitle: "Successfully paid",
            icon: <FaCheckCircle className="text-green-600" />,
            bgColor: "bg-green-50",
        },
    ];

    // Filter groups for DataFilters component
    const filterGroups = [
        {
            label: "Status",
            value: statusFilter,
            onChange: setStatusFilter,
            options: [
                { value: "all", label: "All", count: payouts.length },
                { value: "pending", label: "Pending", count: payouts.filter(p => p.status === "pending").length },
                { value: "processing", label: "Processing", count: payouts.filter(p => p.status === "processing").length },
                { value: "completed", label: "Completed", count: payouts.filter(p => p.status === "completed").length },
            ]
        }
    ];

    const handleExport = () => {
        showInfo("Exporting payouts data...");
    };

    // Filter payouts
    const filteredPayouts = payouts.filter(payout => {
        const matchesSearch = searchQuery === "" || 
            JSON.stringify(payout).toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === "all" || payout.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    // Status badge
    const getStatusBadge = (status) => {
        const configs = {
            pending: { bg: "bg-orange-100", text: "text-orange-700", label: "Pending" },
            processing: { bg: "bg-blue-100", text: "text-blue-700", label: "Processing" },
            completed: { bg: "bg-green-100", text: "text-green-700", label: "Completed" },
        };
        const config = configs[status] || configs.pending;
        return (
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
                {config.label}
            </span>
        );
    };

    // Approve payout
    const handleApprovePayout = (payout) => {
        setSelectedPayout(payout);
        setShowConfirmDialog(true);
    };

    const confirmApprove = async () => {
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        setPayouts(payouts.map(p => 
            p.id === selectedPayout.id ? { ...p, status: "processing", processedDate: new Date().toISOString().split('T')[0] } : p
        ));
        
        setIsLoading(false);
        setShowConfirmDialog(false);
        showSuccess(`Payout ${selectedPayout.id} approved and processing`);
        setSelectedPayout(null);
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            <div className="sticky top-0 h-screen">
                <BusinessSidebar active="Finance" onLogout={() => console.log('Logout')} />
            </div>
            <div className="flex-1 flex flex-col min-h-screen">
                <BusinessHeader title="Vendor Payouts" subtitle="Manage and process vendor payments" />

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
                    <DataFilters 
                        searchQuery={searchQuery}
                        onSearchChange={(value) => setSearchQuery(value)}
                        searchPlaceholder="Search by vendor, payout ID..."
                        filterGroups={filterGroups}
                        showExport={true}
                        onExport={handleExport}
                    />

                    {/* Payouts Table */}
                    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Payout ID</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Vendor</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Period</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Orders</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Gross Amount</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Commission</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Net Payout</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {filteredPayouts.length === 0 ? (
                                        <tr>
                                            <td colSpan="9" className="px-6 py-12 text-center text-gray-500">
                                                No payouts found
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredPayouts.map((payout) => (
                                            <tr key={payout.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {payout.id}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900">{payout.vendorName}</div>
                                                    <div className="text-xs text-gray-500">{payout.vendorId}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {payout.period}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {payout.orders}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                                                    {payout.amount}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">
                                                    -{payout.commission}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-green-600">
                                                    {payout.netAmount}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {getStatusBadge(payout.status)}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={() => {
                                                                setSelectedPayout(payout);
                                                                setShowDetailsModal(true);
                                                            }}
                                                            className="text-blue-500 hover:text-blue-700"
                                                            title="View Details"
                                                        >
                                                            <FaEye />
                                                        </button>
                                                        {payout.status === "pending" && (
                                                            <button
                                                                onClick={() => handleApprovePayout(payout)}
                                                                className="text-green-500 hover:text-green-700"
                                                                title="Approve"
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
                    {filteredPayouts.length > 0 && (
                        <div className="mt-4 text-sm text-gray-600 text-center">
                            Showing {filteredPayouts.length} of {payouts.length} payouts
                        </div>
                    )}
                </div>
            </div>

            {/* Details Modal */}
            {showDetailsModal && selectedPayout && (
                <PreviewModal
                    isOpen={showDetailsModal}
                    title="Payout Details"
                    size="lg"
                    onClose={() => {
                        setShowDetailsModal(false);
                        setSelectedPayout(null);
                    }}
                    footer={
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => {
                                    setShowDetailsModal(false);
                                    setSelectedPayout(null);
                                }}
                                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                            >
                                Close
                            </button>
                        </div>
                    }
                >
                    <div className="space-y-4">
                        {Object.entries(selectedPayout).map(([key, value]) => (
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

            {/* Confirm Dialog */}
            <ConfirmDialog
                isOpen={showConfirmDialog}
                title="Approve Payout"
                message={`Are you sure you want to approve payout ${selectedPayout?.id}? Net amount of ${selectedPayout?.netAmount} will be transferred to ${selectedPayout?.vendorName}.`}
                type="warning"
                confirmText="Approve Payout"
                cancelText="Cancel"
                onConfirm={confirmApprove}
                onCancel={() => {
                    setShowConfirmDialog(false);
                    setSelectedPayout(null);
                }}
                isLoading={isLoading}
            />
        </div>
    );
}
