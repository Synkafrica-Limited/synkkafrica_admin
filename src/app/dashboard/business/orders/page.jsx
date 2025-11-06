"use client";
import React, { useState } from "react";
import { FaCheckCircle, FaClock, FaTimesCircle, FaEye, FaFilter, FaSearch, FaDownload } from "react-icons/fa";
import BusinessSidebar from "@/views/layouts/components/business/BusinessSidebar";
import BusinessHeader from "@/views/layouts/components/business/BusinessHeader";
import { useToast } from "@/views/layouts/components/ToastContainer";
import PreviewModal from "@/views/layouts/components/modals/PreviewModal";

export default function OrdersPage() {
    const { showSuccess, showError, showInfo } = useToast();
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);

    // Mock orders data
    const ordersData = [
        {
            id: "ORD-2025-001",
            customerName: "Emmanuel Johnson",
            customerEmail: "emmanuel@example.com",
            vendorName: "Luxury Car Rentals Ltd",
            vendorId: "VND-001",
            serviceName: "Mercedes Benz S-Class",
            serviceType: "Car Rental",
            bookingDate: "2025-01-15",
            requestedDate: "2025-01-10 14:30",
            amount: "₦150,000",
            status: "completed",
            paymentStatus: "paid",
            duration: "3 days",
            location: "Lagos, Nigeria",
            notes: "Airport pickup required",
        },
        {
            id: "ORD-2025-002",
            customerName: "Sarah Williams",
            customerEmail: "sarah@example.com",
            vendorName: "Ocean View Restaurants",
            vendorId: "VND-002",
            serviceName: "Private Dining Experience",
            serviceType: "Dining",
            bookingDate: "2025-01-20",
            requestedDate: "2025-01-12 09:15",
            amount: "₦85,000",
            status: "accepted",
            paymentStatus: "pending",
            duration: "4 hours",
            location: "Victoria Island, Lagos",
            notes: "Vegetarian menu requested",
        },
        {
            id: "ORD-2025-003",
            customerName: "David Chen",
            customerEmail: "david@example.com",
            vendorName: "Premium Laundry Services",
            vendorId: "VND-003",
            serviceName: "Express Wash & Dry",
            serviceType: "Laundry",
            bookingDate: "2025-01-18",
            requestedDate: "2025-01-11 16:45",
            amount: "₦25,000",
            status: "rejected",
            paymentStatus: "refunded",
            duration: "Same day",
            location: "Ikoyi, Lagos",
            rejectionReason: "Service unavailable on requested date. Vendor fully booked.",
            notes: "Urgent request",
        },
        {
            id: "ORD-2025-004",
            customerName: "Aisha Mohammed",
            customerEmail: "aisha@example.com",
            vendorName: "Elite Event Planning",
            vendorId: "VND-004",
            serviceName: "Corporate Event Setup",
            serviceType: "Events",
            bookingDate: "2025-02-05",
            requestedDate: "2025-01-13 11:00",
            amount: "₦500,000",
            status: "pending",
            paymentStatus: "pending",
            duration: "1 day",
            location: "Abuja, Nigeria",
            notes: "200+ attendees expected",
        },
        {
            id: "ORD-2025-005",
            customerName: "John Okafor",
            customerEmail: "john@example.com",
            vendorName: "Luxury Car Rentals Ltd",
            vendorId: "VND-001",
            serviceName: "Range Rover Sport",
            serviceType: "Car Rental",
            bookingDate: "2025-01-25",
            requestedDate: "2025-01-14 10:20",
            amount: "₦200,000",
            status: "accepted",
            paymentStatus: "paid",
            duration: "5 days",
            location: "Port Harcourt, Nigeria",
            notes: "GPS navigation required",
        },
        {
            id: "ORD-2025-006",
            customerName: "Grace Eze",
            customerEmail: "grace@example.com",
            vendorName: "Spa & Wellness Center",
            vendorId: "VND-005",
            serviceName: "Full Body Massage Package",
            serviceType: "Wellness",
            bookingDate: "2025-01-16",
            requestedDate: "2025-01-14 15:30",
            amount: "₦45,000",
            status: "completed",
            paymentStatus: "paid",
            duration: "2 hours",
            location: "Lekki, Lagos",
            notes: "Couples massage",
        },
        {
            id: "ORD-2025-007",
            customerName: "Michael Adebayo",
            customerEmail: "michael@example.com",
            vendorName: "Tech Repair Hub",
            vendorId: "VND-006",
            serviceName: "Laptop Screen Replacement",
            serviceType: "Tech Services",
            bookingDate: "2025-01-17",
            requestedDate: "2025-01-15 08:45",
            amount: "₦35,000",
            status: "rejected",
            paymentStatus: "cancelled",
            duration: "3 hours",
            location: "Ikeja, Lagos",
            rejectionReason: "Required parts not in stock. Alternative date suggested for next week.",
            notes: "MacBook Pro 2020",
        },
        {
            id: "ORD-2025-008",
            customerName: "Fatima Hassan",
            customerEmail: "fatima@example.com",
            vendorName: "Premier Catering Services",
            vendorId: "VND-007",
            serviceName: "Wedding Catering Package",
            serviceType: "Catering",
            bookingDate: "2025-03-10",
            requestedDate: "2025-01-15 13:20",
            amount: "₦750,000",
            status: "pending",
            paymentStatus: "deposit_paid",
            duration: "Full day",
            location: "Kano, Nigeria",
            notes: "500 guests, halal menu required",
        },
    ];

    // Stats calculation
    const stats = [
        {
            label: "Total Orders",
            value: ordersData.length,
            subtitle: "All time bookings",
            icon: <FaCheckCircle className="text-blue-600" />,
            bgColor: "bg-blue-50",
        },
        {
            label: "Pending Requests",
            value: ordersData.filter(o => o.status === "pending").length,
            subtitle: "Awaiting vendor response",
            icon: <FaClock className="text-orange-600" />,
            bgColor: "bg-orange-50",
        },
        {
            label: "Completed Orders",
            value: ordersData.filter(o => o.status === "completed").length,
            subtitle: "Successfully fulfilled",
            icon: <FaCheckCircle className="text-green-600" />,
            bgColor: "bg-green-50",
        },
        {
            label: "Rejected Orders",
            value: ordersData.filter(o => o.status === "rejected").length,
            subtitle: "Declined by vendors",
            icon: <FaTimesCircle className="text-red-600" />,
            bgColor: "bg-red-50",
        },
    ];

    // Filter orders based on search and status
    const filteredOrders = ordersData.filter(order => {
        const matchesSearch = 
            order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.vendorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.serviceName.toLowerCase().includes(searchQuery.toLowerCase());
        
        const matchesStatus = statusFilter === "all" || order.status === statusFilter;
        
        return matchesSearch && matchesStatus;
    });

    // Status badge component
    const getStatusBadge = (status) => {
        const statusConfig = {
            pending: { bg: "bg-orange-100", text: "text-orange-700", label: "Pending" },
            accepted: { bg: "bg-blue-100", text: "text-blue-700", label: "Accepted" },
            rejected: { bg: "bg-red-100", text: "text-red-700", label: "Rejected" },
            completed: { bg: "bg-green-100", text: "text-green-700", label: "Completed" },
        };
        
        const config = statusConfig[status] || statusConfig.pending;
        
        return (
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
                {config.label}
            </span>
        );
    };

    // Payment status badge
    const getPaymentBadge = (paymentStatus) => {
        const paymentConfig = {
            paid: { bg: "bg-green-100", text: "text-green-700", label: "Paid" },
            pending: { bg: "bg-yellow-100", text: "text-yellow-700", label: "Pending" },
            refunded: { bg: "bg-gray-100", text: "text-gray-700", label: "Refunded" },
            cancelled: { bg: "bg-red-100", text: "text-red-700", label: "Cancelled" },
            deposit_paid: { bg: "bg-blue-100", text: "text-blue-700", label: "Deposit Paid" },
        };
        
        const config = paymentConfig[paymentStatus] || paymentConfig.pending;
        
        return (
            <span className={`px-2 py-1 rounded text-xs font-medium ${config.bg} ${config.text}`}>
                {config.label}
            </span>
        );
    };

    // Handle view details
    const handleViewDetails = (order) => {
        setSelectedOrder(order);
        setShowDetailsModal(true);
    };

    // Handle export
    const handleExport = () => {
        showInfo("Exporting orders data...");
        // Export logic would go here
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            <div className="sticky top-0 h-screen">
                <BusinessSidebar active="Orders" onLogout={() => console.log('Logout')} />
            </div>
            <div className="flex-1 flex flex-col min-h-screen">
                <BusinessHeader title="Orders & Bookings" subtitle="Track and manage all customer orders" />

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

                    {/* Filters and Search */}
                    <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
                        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                            {/* Search */}
                            <div className="flex-1 w-full md:w-auto">
                                <div className="relative">
                                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search by order ID, customer, vendor, or service..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    />
                                </div>
                            </div>

                            {/* Status Filter */}
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
                                        <option value="accepted">Accepted</option>
                                        <option value="completed">Completed</option>
                                        <option value="rejected">Rejected</option>
                                    </select>
                                </div>

                                {/* Export Button */}
                                <button
                                    onClick={handleExport}
                                    className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                                >
                                    <FaDownload />
                                    Export
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Orders Table */}
                    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Order ID
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Customer
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Vendor
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Service
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Booking Date
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Amount
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Payment
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {filteredOrders.length === 0 ? (
                                        <tr>
                                            <td colSpan="9" className="px-6 py-12 text-center text-gray-500">
                                                <div className="flex flex-col items-center gap-2">
                                                    <FaSearch className="text-4xl text-gray-300" />
                                                    <p>No orders found matching your criteria</p>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredOrders.map((order) => (
                                            <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900">{order.id}</div>
                                                    <div className="text-xs text-gray-500">
                                                        {new Date(order.requestedDate).toLocaleDateString()}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900">{order.customerName}</div>
                                                    <div className="text-xs text-gray-500">{order.customerEmail}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">{order.vendorName}</div>
                                                    <div className="text-xs text-gray-500">{order.vendorId}</div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-sm text-gray-900">{order.serviceName}</div>
                                                    <div className="text-xs text-gray-500">{order.serviceType}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">
                                                        {new Date(order.bookingDate).toLocaleDateString()}
                                                    </div>
                                                    <div className="text-xs text-gray-500">{order.duration}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-semibold text-gray-900">{order.amount}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {getStatusBadge(order.status)}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {getPaymentBadge(order.paymentStatus)}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <button
                                                        onClick={() => handleViewDetails(order)}
                                                        className="flex items-center gap-1 text-orange-500 hover:text-orange-700 transition-colors"
                                                    >
                                                        <FaEye />
                                                        <span className="text-sm">View</span>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Summary Footer */}
                    <div className="mt-4 text-sm text-gray-600 text-center">
                        Showing {filteredOrders.length} of {ordersData.length} orders
                    </div>
                </div>
            </div>

            {/* Order Details Modal */}
            {showDetailsModal && selectedOrder && (
                <PreviewModal
                    isOpen={showDetailsModal}
                    title="Order Details"
                    size="lg"
                    onClose={() => {
                        setShowDetailsModal(false);
                        setSelectedOrder(null);
                    }}
                    footer={
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => {
                                    setShowDetailsModal(false);
                                    setSelectedOrder(null);
                                }}
                                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    }
                >
                    <div className="space-y-6">
                        {/* Order Status Banner */}
                        <div className={`p-4 rounded-lg ${
                            selectedOrder.status === 'completed' ? 'bg-green-50 border border-green-200' :
                            selectedOrder.status === 'rejected' ? 'bg-red-50 border border-red-200' :
                            selectedOrder.status === 'accepted' ? 'bg-blue-50 border border-blue-200' :
                            'bg-orange-50 border border-orange-200'
                        }`}>
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="font-semibold text-gray-900">Order Status</h3>
                                    <p className="text-sm text-gray-600 mt-1">
                                        {selectedOrder.status === 'completed' && 'This order has been successfully completed'}
                                        {selectedOrder.status === 'rejected' && 'This order was rejected by the vendor'}
                                        {selectedOrder.status === 'accepted' && 'This order has been accepted and is in progress'}
                                        {selectedOrder.status === 'pending' && 'This order is awaiting vendor response'}
                                    </p>
                                </div>
                                {getStatusBadge(selectedOrder.status)}
                            </div>
                        </div>

                        {/* Rejection Reason (if applicable) */}
                        {selectedOrder.status === 'rejected' && selectedOrder.rejectionReason && (
                            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                                <h4 className="font-semibold text-red-900 mb-2">Rejection Reason</h4>
                                <p className="text-sm text-red-700">{selectedOrder.rejectionReason}</p>
                            </div>
                        )}

                        {/* Order Information */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-xs text-gray-500 font-medium">Order ID</label>
                                <p className="text-sm font-semibold text-gray-900">{selectedOrder.id}</p>
                            </div>
                            <div>
                                <label className="text-xs text-gray-500 font-medium">Requested Date</label>
                                <p className="text-sm text-gray-900">{selectedOrder.requestedDate}</p>
                            </div>
                            <div>
                                <label className="text-xs text-gray-500 font-medium">Booking Date</label>
                                <p className="text-sm text-gray-900">{selectedOrder.bookingDate}</p>
                            </div>
                            <div>
                                <label className="text-xs text-gray-500 font-medium">Duration</label>
                                <p className="text-sm text-gray-900">{selectedOrder.duration}</p>
                            </div>
                        </div>

                        {/* Customer Information */}
                        <div className="border-t pt-4">
                            <h4 className="font-semibold text-gray-900 mb-3">Customer Information</h4>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs text-gray-500 font-medium">Name</label>
                                    <p className="text-sm text-gray-900">{selectedOrder.customerName}</p>
                                </div>
                                <div>
                                    <label className="text-xs text-gray-500 font-medium">Email</label>
                                    <p className="text-sm text-gray-900">{selectedOrder.customerEmail}</p>
                                </div>
                            </div>
                        </div>

                        {/* Vendor Information */}
                        <div className="border-t pt-4">
                            <h4 className="font-semibold text-gray-900 mb-3">Vendor Information</h4>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs text-gray-500 font-medium">Vendor Name</label>
                                    <p className="text-sm text-gray-900">{selectedOrder.vendorName}</p>
                                </div>
                                <div>
                                    <label className="text-xs text-gray-500 font-medium">Vendor ID</label>
                                    <p className="text-sm text-gray-900">{selectedOrder.vendorId}</p>
                                </div>
                            </div>
                        </div>

                        {/* Service Information */}
                        <div className="border-t pt-4">
                            <h4 className="font-semibold text-gray-900 mb-3">Service Details</h4>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs text-gray-500 font-medium">Service Name</label>
                                    <p className="text-sm text-gray-900">{selectedOrder.serviceName}</p>
                                </div>
                                <div>
                                    <label className="text-xs text-gray-500 font-medium">Service Type</label>
                                    <p className="text-sm text-gray-900">{selectedOrder.serviceType}</p>
                                </div>
                                <div>
                                    <label className="text-xs text-gray-500 font-medium">Location</label>
                                    <p className="text-sm text-gray-900">{selectedOrder.location}</p>
                                </div>
                                <div>
                                    <label className="text-xs text-gray-500 font-medium">Amount</label>
                                    <p className="text-sm font-semibold text-gray-900">{selectedOrder.amount}</p>
                                </div>
                            </div>
                        </div>

                        {/* Payment Information */}
                        <div className="border-t pt-4">
                            <h4 className="font-semibold text-gray-900 mb-3">Payment Information</h4>
                            <div className="flex items-center justify-between">
                                <div>
                                    <label className="text-xs text-gray-500 font-medium">Payment Status</label>
                                    <div className="mt-1">
                                        {getPaymentBadge(selectedOrder.paymentStatus)}
                                    </div>
                                </div>
                                <div className="text-right">
                                    <label className="text-xs text-gray-500 font-medium">Total Amount</label>
                                    <p className="text-2xl font-bold text-gray-900">{selectedOrder.amount}</p>
                                </div>
                            </div>
                        </div>

                        {/* Additional Notes */}
                        {selectedOrder.notes && (
                            <div className="border-t pt-4">
                                <h4 className="font-semibold text-gray-900 mb-2">Additional Notes</h4>
                                <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">{selectedOrder.notes}</p>
                            </div>
                        )}
                    </div>
                </PreviewModal>
            )}
        </div>
    );
}
