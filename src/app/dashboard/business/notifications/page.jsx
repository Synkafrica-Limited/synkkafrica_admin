"use client";
import React, { useState } from "react";
import { 
    FaBell, 
    FaCheckCircle, 
    FaExclamationTriangle, 
    FaInfoCircle, 
    FaTimesCircle,
    FaTrash,
    FaCheck,
    FaEnvelope,
    FaEnvelopeOpen,
    FaUserPlus,
    FaMoneyBillWave,
    FaStore,
    FaClipboardList
} from "react-icons/fa";
import BusinessSidebar from "@/views/layouts/components/business/BusinessSidebar";
import BusinessHeader from "@/views/layouts/components/business/BusinessHeader";
import DataFilters from "@/views/layouts/components/filters/DataFilters";
import { useToast } from "@/views/layouts/components/ToastContainer";
import ConfirmDialog from "@/views/layouts/components/modals/ConfirmDialog";

export default function NotificationsPage() {
    const { showSuccess, showError } = useToast();
    const [filter, setFilter] = useState("all"); // all, unread, read
    const [categoryFilter, setCategoryFilter] = useState("all");
    const [selectedNotifications, setSelectedNotifications] = useState([]);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [notificationToDelete, setNotificationToDelete] = useState(null);

    // Mock notifications data
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            type: "success",
            category: "orders",
            title: "New Booking Confirmed",
            message: "Emmanuel Johnson has confirmed booking for Mercedes Benz S-Class (Order #ORD-2025-001). Payment of ₦150,000 received.",
            timestamp: "2 mins ago",
            time: new Date(Date.now() - 2 * 60 * 1000),
            isRead: false,
            actionUrl: "/dashboard/business/orders",
        },
        {
            id: 2,
            type: "warning",
            category: "vendors",
            title: "Vendor Verification Pending",
            message: "Luxury Car Rentals Ltd has submitted documents for verification. Review required within 24 hours.",
            timestamp: "15 mins ago",
            time: new Date(Date.now() - 15 * 60 * 1000),
            isRead: false,
            actionUrl: "/dashboard/business/vendors",
        },
        {
            id: 3,
            type: "info",
            category: "users",
            title: "New User Registration",
            message: "5 new users registered in the last hour. Total active users: 2,847.",
            timestamp: "30 mins ago",
            time: new Date(Date.now() - 30 * 60 * 1000),
            isRead: false,
            actionUrl: "/dashboard/business/customers",
        },
        {
            id: 4,
            type: "error",
            category: "orders",
            title: "Booking Rejected",
            message: "Tech Repair Hub rejected booking request #ORD-2025-007. Reason: Required parts not in stock.",
            timestamp: "1 hour ago",
            time: new Date(Date.now() - 60 * 60 * 1000),
            isRead: true,
            actionUrl: "/dashboard/business/orders",
        },
        {
            id: 5,
            type: "success",
            category: "finance",
            title: "Payment Received",
            message: "Payment of ₦200,000 received for Order #ORD-2025-005 from John Okafor.",
            timestamp: "2 hours ago",
            time: new Date(Date.now() - 2 * 60 * 60 * 1000),
            isRead: true,
            actionUrl: "/dashboard/business/finance",
        },
        {
            id: 6,
            type: "warning",
            category: "vendors",
            title: "Vendor Performance Alert",
            message: "Ocean View Restaurants has a pending review with 3.2 rating. Customer feedback requires attention.",
            timestamp: "3 hours ago",
            time: new Date(Date.now() - 3 * 60 * 60 * 1000),
            isRead: true,
            actionUrl: "/dashboard/business/vendors",
        },
        {
            id: 7,
            type: "info",
            category: "approvals",
            title: "Listing Awaiting Approval",
            message: "New listing 'Premium Spa Package' from Wellness Center requires approval.",
            timestamp: "5 hours ago",
            time: new Date(Date.now() - 5 * 60 * 60 * 1000),
            isRead: false,
            actionUrl: "/dashboard/business/approvals",
        },
        {
            id: 8,
            type: "success",
            category: "orders",
            title: "Order Completed",
            message: "Grace Eze completed booking #ORD-2025-006. Service rated 5 stars.",
            timestamp: "6 hours ago",
            time: new Date(Date.now() - 6 * 60 * 60 * 1000),
            isRead: true,
            actionUrl: "/dashboard/business/orders",
        },
        {
            id: 9,
            type: "info",
            category: "finance",
            title: "Weekly Revenue Report",
            message: "This week's revenue: ₦1,250,000. Up 15% from last week.",
            timestamp: "1 day ago",
            time: new Date(Date.now() - 24 * 60 * 60 * 1000),
            isRead: true,
            actionUrl: "/dashboard/business/finance",
        },
        {
            id: 10,
            type: "warning",
            category: "orders",
            title: "Pending Order Response",
            message: "Order #ORD-2025-004 has been pending for 48 hours. Vendor Elite Event Planning has not responded.",
            timestamp: "2 days ago",
            time: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
            isRead: true,
            actionUrl: "/dashboard/business/orders",
        },
    ]);

    // Stats
    const totalNotifications = notifications.length;
    const unreadCount = notifications.filter(n => !n.isRead).length;
    const readCount = notifications.filter(n => n.isRead).length;
    const todayCount = notifications.filter(n => {
        const today = new Date();
        return n.time.toDateString() === today.toDateString();
    }).length;

    // Category counts
    const categoryStats = {
        all: notifications.length,
        orders: notifications.filter(n => n.category === 'orders').length,
        vendors: notifications.filter(n => n.category === 'vendors').length,
        users: notifications.filter(n => n.category === 'users').length,
        finance: notifications.filter(n => n.category === 'finance').length,
        approvals: notifications.filter(n => n.category === 'approvals').length,
    };

    // Filter groups for DataFilters component
    const filterGroups = [
        {
            label: "Status",
            value: filter,
            onChange: setFilter,
            options: [
                { value: "all", label: "All", count: totalNotifications },
                { value: "unread", label: "Unread", count: unreadCount },
                { value: "read", label: "Read", count: readCount },
            ]
        },
        {
            label: "Category",
            value: categoryFilter,
            onChange: setCategoryFilter,
            options: [
                { value: "all", label: "All Categories", count: categoryStats.all },
                { value: "orders", label: "Orders", count: categoryStats.orders },
                { value: "vendors", label: "Vendors", count: categoryStats.vendors },
                { value: "users", label: "Users", count: categoryStats.users },
                { value: "finance", label: "Finance", count: categoryStats.finance },
                { value: "approvals", label: "Approvals", count: categoryStats.approvals },
            ]
        }
    ];

    // Filter notifications
    const filteredNotifications = notifications.filter(notification => {
        const matchesReadFilter = 
            filter === "all" || 
            (filter === "unread" && !notification.isRead) ||
            (filter === "read" && notification.isRead);
        
        const matchesCategory = 
            categoryFilter === "all" || 
            notification.category === categoryFilter;
        
        return matchesReadFilter && matchesCategory;
    });

    // Get notification icon and color
    const getNotificationConfig = (type) => {
        const configs = {
            success: {
                icon: <FaCheckCircle />,
                bgColor: "bg-green-100",
                textColor: "text-green-600",
                borderColor: "border-green-200",
            },
            warning: {
                icon: <FaExclamationTriangle />,
                bgColor: "bg-orange-100",
                textColor: "text-orange-600",
                borderColor: "border-orange-200",
            },
            error: {
                icon: <FaTimesCircle />,
                bgColor: "bg-red-100",
                textColor: "text-red-600",
                borderColor: "border-red-200",
            },
            info: {
                icon: <FaInfoCircle />,
                bgColor: "bg-blue-100",
                textColor: "text-blue-600",
                borderColor: "border-blue-200",
            },
        };
        return configs[type] || configs.info;
    };

    // Get category icon
    const getCategoryIcon = (category) => {
        const icons = {
            orders: <FaClipboardList className="text-blue-500" />,
            vendors: <FaStore className="text-purple-500" />,
            users: <FaUserPlus className="text-green-500" />,
            finance: <FaMoneyBillWave className="text-yellow-500" />,
            approvals: <FaCheckCircle className="text-orange-500" />,
        };
        return icons[category] || <FaBell className="text-gray-500" />;
    };

    // Mark as read
    const handleMarkAsRead = (id) => {
        setNotifications(notifications.map(n => 
            n.id === id ? { ...n, isRead: true } : n
        ));
        showSuccess("Notification marked as read");
    };

    // Mark all as read
    const handleMarkAllAsRead = () => {
        setNotifications(notifications.map(n => ({ ...n, isRead: true })));
        showSuccess("All notifications marked as read");
    };

    // Delete notification
    const handleDeleteClick = (notification) => {
        setNotificationToDelete(notification);
        setShowDeleteDialog(true);
    };

    const confirmDelete = () => {
        if (notificationToDelete) {
            setNotifications(notifications.filter(n => n.id !== notificationToDelete.id));
            showSuccess("Notification deleted successfully");
            setShowDeleteDialog(false);
            setNotificationToDelete(null);
        }
    };

    // Delete selected
    const handleDeleteSelected = () => {
        if (selectedNotifications.length === 0) {
            showError("No notifications selected");
            return;
        }
        setNotifications(notifications.filter(n => !selectedNotifications.includes(n.id)));
        showSuccess(`${selectedNotifications.length} notification(s) deleted`);
        setSelectedNotifications([]);
    };

    // Toggle selection
    const toggleSelection = (id) => {
        if (selectedNotifications.includes(id)) {
            setSelectedNotifications(selectedNotifications.filter(nId => nId !== id));
        } else {
            setSelectedNotifications([...selectedNotifications, id]);
        }
    };

    // Select all
    const handleSelectAll = () => {
        if (selectedNotifications.length === filteredNotifications.length) {
            setSelectedNotifications([]);
        } else {
            setSelectedNotifications(filteredNotifications.map(n => n.id));
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            <div className="sticky top-0 h-screen">
                <BusinessSidebar active="Notifications" onLogout={() => console.log('Logout')} />
            </div>
            <div className="flex-1 flex flex-col min-h-screen">
                <BusinessHeader title="Notifications" subtitle="Stay updated with all activities" />

                <div className="flex-1 overflow-y-auto p-6">
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                        <div className="bg-white rounded-lg border border-gray-200 p-5">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 rounded-lg bg-blue-50">
                                    <FaBell className="text-blue-600" />
                                </div>
                                <h3 className="text-sm font-medium text-gray-600">Total Notifications</h3>
                            </div>
                            <p className="text-2xl font-bold text-gray-900">{totalNotifications}</p>
                        </div>

                        <div className="bg-white rounded-lg border border-gray-200 p-5">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 rounded-lg bg-orange-50">
                                    <FaEnvelope className="text-orange-600" />
                                </div>
                                <h3 className="text-sm font-medium text-gray-600">Unread</h3>
                            </div>
                            <p className="text-2xl font-bold text-gray-900">{unreadCount}</p>
                        </div>

                        <div className="bg-white rounded-lg border border-gray-200 p-5">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 rounded-lg bg-green-50">
                                    <FaCheckCircle className="text-green-600" />
                                </div>
                                <h3 className="text-sm font-medium text-gray-600">Today</h3>
                            </div>
                            <p className="text-2xl font-bold text-gray-900">{todayCount}</p>
                        </div>
                    </div>

                    {/* Filters and Actions */}
                    <DataFilters 
                        filterGroups={filterGroups}
                        customActions={
                            <div className="flex gap-2 flex-wrap">
                                {selectedNotifications.length > 0 && (
                                    <button
                                        onClick={handleDeleteSelected}
                                        className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                                    >
                                        <FaTrash />
                                        Delete Selected ({selectedNotifications.length})
                                    </button>
                                )}
                                {unreadCount > 0 && (
                                    <button
                                        onClick={handleMarkAllAsRead}
                                        className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                                    >
                                        <FaEnvelopeOpen />
                                        Mark All as Read
                                    </button>
                                )}
                            </div>
                        }
                    />

                    {/* Notifications List */}
                    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                        {/* Select All Header */}
                        {filteredNotifications.length > 0 && (
                            <div className="border-b border-gray-200 px-6 py-3 bg-gray-50">
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={selectedNotifications.length === filteredNotifications.length}
                                        onChange={handleSelectAll}
                                        className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                                    />
                                    <span className="text-sm font-medium text-gray-700">
                                        Select All ({filteredNotifications.length})
                                    </span>
                                </label>
                            </div>
                        )}

                        {/* Notifications */}
                        <div className="divide-y divide-gray-200">
                            {filteredNotifications.length === 0 ? (
                                <div className="px-6 py-12 text-center">
                                    <FaBell className="mx-auto text-5xl text-gray-300 mb-3" />
                                    <p className="text-gray-500">No notifications found</p>
                                    <p className="text-sm text-gray-400 mt-1">
                                        {filter !== "all" 
                                            ? "Try changing your filter settings"
                                            : "You're all caught up!"}
                                    </p>
                                </div>
                            ) : (
                                filteredNotifications.map((notification) => {
                                    const config = getNotificationConfig(notification.type);
                                    const isSelected = selectedNotifications.includes(notification.id);
                                    
                                    return (
                                        <div
                                            key={notification.id}
                                            className={`px-6 py-4 hover:bg-gray-50 transition-colors ${
                                                !notification.isRead ? 'bg-blue-50/30' : ''
                                            } ${isSelected ? 'bg-orange-50' : ''}`}
                                        >
                                            <div className="flex items-start gap-4">
                                                {/* Checkbox */}
                                                <input
                                                    type="checkbox"
                                                    checked={isSelected}
                                                    onChange={() => toggleSelection(notification.id)}
                                                    className="mt-1 w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                                                />

                                                {/* Icon */}
                                                <div className={`flex-shrink-0 p-3 rounded-lg ${config.bgColor} ${config.textColor} text-xl`}>
                                                    {getCategoryIcon(notification.category)}
                                                </div>

                                                {/* Content */}
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-start justify-between gap-4 mb-1">
                                                        <h3 className={`font-semibold ${!notification.isRead ? 'text-gray-900' : 'text-gray-700'}`}>
                                                            {notification.title}
                                                        </h3>
                                                        <span className="text-xs text-gray-500 whitespace-nowrap">
                                                            {notification.timestamp}
                                                        </span>
                                                    </div>
                                                    <p className="text-sm text-gray-600 mb-2">
                                                        {notification.message}
                                                    </p>
                                                    <div className="flex items-center gap-3 flex-wrap">
                                                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${config.bgColor} ${config.textColor}`}>
                                                            {config.icon}
                                                            {notification.type}
                                                        </span>
                                                        <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium capitalize">
                                                            {notification.category}
                                                        </span>
                                                        {!notification.isRead && (
                                                            <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                                                                New
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Actions */}
                                                <div className="flex items-center gap-2">
                                                    {!notification.isRead && (
                                                        <button
                                                            onClick={() => handleMarkAsRead(notification.id)}
                                                            className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                                            title="Mark as read"
                                                        >
                                                            <FaCheck />
                                                        </button>
                                                    )}
                                                    <button
                                                        onClick={() => handleDeleteClick(notification)}
                                                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                        title="Delete"
                                                    >
                                                        <FaTrash />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </div>

                    {/* Summary */}
                    {filteredNotifications.length > 0 && (
                        <div className="mt-4 text-sm text-gray-600 text-center">
                            Showing {filteredNotifications.length} of {totalNotifications} notifications
                        </div>
                    )}
                </div>
            </div>

            {/* Delete Confirmation Dialog */}
            <ConfirmDialog
                isOpen={showDeleteDialog}
                title="Delete Notification"
                message={`Are you sure you want to delete this notification? This action cannot be undone.`}
                type="danger"
                confirmText="Delete"
                cancelText="Cancel"
                onConfirm={confirmDelete}
                onCancel={() => {
                    setShowDeleteDialog(false);
                    setNotificationToDelete(null);
                }}
            />
        </div>
    );
}
