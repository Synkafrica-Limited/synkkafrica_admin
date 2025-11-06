"use client";
import React, { useState } from "react";
import { FaCreditCard, FaEye, FaCheckCircle, FaFilter, FaSearch, FaDownload } from "react-icons/fa";
import BusinessSidebar from "@/views/layouts/components/business/BusinessSidebar";
import BusinessHeader from "@/views/layouts/components/business/BusinessHeader";
import { useToast } from "@/views/layouts/components/ToastContainer";
import PreviewModal from "@/views/layouts/components/modals/PreviewModal";

export default function PaymentsPage() {
    const { showInfo } = useToast();
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [selectedPayment, setSelectedPayment] = useState(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);

    // Mock Booking Payments Data
    const payments = [
        {
            id: "PMT-2025-001",
            orderId: "ORD-2025-001",
            customerName: "Emmanuel Johnson",
            vendorName: "Luxury Car Rentals Ltd",
            amount: "₦150,000",
            vat: "₦11,250",
            serviceCharge: "₦7,500",
            commission: "₦15,000",
            vendorPayout: "₦116,250",
            paymentMethod: "Stripe",
            status: "completed",
            date: "2025-01-15",
            transactionRef: "pi_3MtwBwLkdIwHu7ix28a3tqPa",
        },
        {
            id: "PMT-2025-002",
            orderId: "ORD-2025-005",
            customerName: "John Okafor",
            vendorName: "Luxury Car Rentals Ltd",
            amount: "₦200,000",
            vat: "₦15,000",
            serviceCharge: "₦10,000",
            commission: "₦20,000",
            vendorPayout: "₦155,000",
            paymentMethod: "Stripe",
            status: "completed",
            date: "2025-01-14",
            transactionRef: "pi_3MtwBwLkdIwHu7ix28a3tqPb",
        },
        {
            id: "PMT-2025-003",
            orderId: "ORD-2025-008",
            customerName: "Fatima Hassan",
            vendorName: "Premier Catering Services",
            amount: "₦750,000",
            vat: "₦56,250",
            serviceCharge: "₦37,500",
            commission: "₦75,000",
            vendorPayout: "₦581,250",
            paymentMethod: "Stripe",
            status: "pending",
            date: "2025-01-15",
            depositAmount: "₦150,000",
        },
        {
            id: "PMT-2025-004",
            orderId: "ORD-2025-006",
            customerName: "Grace Eze",
            vendorName: "Spa & Wellness Center",
            amount: "₦45,000",
            vat: "₦3,375",
            serviceCharge: "₦2,250",
            commission: "₦4,500",
            vendorPayout: "₦34,875",
            paymentMethod: "Stripe",
            status: "completed",
            date: "2025-01-13",
            transactionRef: "pi_3MtwBwLkdIwHu7ix28a3tqPc",
        },
    ];

    // Stats
    const stats = [
        {
            label: "Total Payments",
            value: payments.length,
            subtitle: "All transactions",
            icon: <FaCreditCard className="text-blue-600" />,
            bgColor: "bg-blue-50",
        },
        {
            label: "Completed",
            value: payments.filter(p => p.status === "completed").length,
            subtitle: "Successful payments",
            icon: <FaCheckCircle className="text-green-600" />,
            bgColor: "bg-green-50",
        },
        {
            label: "Total Revenue",
            value: "₦1,145,000",
            subtitle: "Gross payments received",
            icon: <FaCreditCard className="text-purple-600" />,
            bgColor: "bg-purple-50",
        },
        {
            label: "Platform Commission",
            value: "₦114,500",
            subtitle: "Total commission earned",
            icon: <FaCreditCard className="text-orange-600" />,
            bgColor: "bg-orange-50",
        },
    ];

    // Filter payments
    const filteredPayments = payments.filter(payment => {
        const matchesSearch = searchQuery === "" || 
            JSON.stringify(payment).toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === "all" || payment.status === statusFilter;
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

    return (
        <div className="flex min-h-screen bg-gray-50">
            <div className="sticky top-0 h-screen">
                <BusinessSidebar active="Finance" onLogout={() => console.log('Logout')} />
            </div>
            <div className="flex-1 flex flex-col min-h-screen">
                <BusinessHeader title="Booking Payments" subtitle="Track all customer payments via Stripe" />

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
                                        placeholder="Search by payment ID, customer, order..."
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
                                    onClick={() => showInfo("Exporting payments data...")}
                                    className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                                >
                                    <FaDownload />
                                    Export
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Payments Table */}
                    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Payment ID</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Vendor</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Commission</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {filteredPayments.length === 0 ? (
                                        <tr>
                                            <td colSpan="9" className="px-6 py-12 text-center text-gray-500">
                                                No payments found
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredPayments.map((payment) => (
                                            <tr key={payment.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {payment.id}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                                                    {payment.orderId}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {payment.customerName}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {payment.vendorName}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                                                    {payment.amount}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-orange-600">
                                                    {payment.commission}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {payment.date}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {getStatusBadge(payment.status)}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <button
                                                        onClick={() => {
                                                            setSelectedPayment(payment);
                                                            setShowDetailsModal(true);
                                                        }}
                                                        className="text-blue-500 hover:text-blue-700"
                                                        title="View Details"
                                                    >
                                                        <FaEye />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Summary */}
                    {filteredPayments.length > 0 && (
                        <div className="mt-4 text-sm text-gray-600 text-center">
                            Showing {filteredPayments.length} of {payments.length} payments
                        </div>
                    )}
                </div>
            </div>

            {/* Details Modal */}
            {showDetailsModal && selectedPayment && (
                <PreviewModal
                    isOpen={showDetailsModal}
                    title="Payment Details"
                    size="lg"
                    onClose={() => {
                        setShowDetailsModal(false);
                        setSelectedPayment(null);
                    }}
                    footer={
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => {
                                    setShowDetailsModal(false);
                                    setSelectedPayment(null);
                                }}
                                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                            >
                                Close
                            </button>
                        </div>
                    }
                >
                    <div className="space-y-4">
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <h4 className="font-semibold text-gray-900 mb-3">Payment Breakdown</h4>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Service Amount:</span>
                                    <span className="font-medium">{selectedPayment.amount}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Service Charge:</span>
                                    <span className="font-medium">{selectedPayment.serviceCharge}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">VAT:</span>
                                    <span className="font-medium">{selectedPayment.vat}</span>
                                </div>
                                <div className="flex justify-between border-t pt-2 font-semibold">
                                    <span className="text-gray-900">Platform Commission:</span>
                                    <span className="text-orange-600">{selectedPayment.commission}</span>
                                </div>
                                <div className="flex justify-between border-t pt-2 font-semibold">
                                    <span className="text-gray-900">Vendor Payout:</span>
                                    <span className="text-green-600">{selectedPayment.vendorPayout}</span>
                                </div>
                            </div>
                        </div>

                        {Object.entries(selectedPayment).map(([key, value]) => (
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
        </div>
    );
}
