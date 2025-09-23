"use client";
import React from "react";
import { FaTimes, FaCheck, FaBan, FaEye } from "react-icons/fa";
import AdminButton from "@/ui/button";

export default function ViewDetailsModal({ 
  isOpen, 
  onClose, 
  title = "Details",
  data = {},
  type = "notification", // notification, payment, approval
  onApprove,
  onReject,
  onMarkAsRead,
  showActions = false 
}) {
  if (!isOpen) return null;

  const renderNotificationDetails = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-gray-500">Type</label>
          <p className="text-gray-800">{data.type || "N/A"}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-500">Status</label>
          <span className={`px-3 py-1 rounded-full border text-xs font-semibold ${getStatusColor(data.status)}`}>
            {data.status || "N/A"}
          </span>
        </div>
      </div>
      
      <div>
        <label className="text-sm font-medium text-gray-500">Title</label>
        <p className="text-gray-800">{data.title || "N/A"}</p>
      </div>
      
      {data.related && (
        <div>
          <label className="text-sm font-medium text-gray-500">Related To</label>
          <p className="text-gray-800">{data.related}</p>
        </div>
      )}
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-gray-500">Time</label>
          <p className="text-gray-800">{data.time || "N/A"}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-500">Priority</label>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(data.priority)}`}>
            {data.priority || "Normal"}
          </span>
        </div>
      </div>
      
      {data.description && (
        <div>
          <label className="text-sm font-medium text-gray-500">Description</label>
          <p className="text-gray-800">{data.description}</p>
        </div>
      )}
    </div>
  );

  const renderPaymentDetails = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-gray-500">Amount</label>
          <p className="text-gray-800 font-semibold">{data.amount || "N/A"}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-500">Status</label>
          <span className={`px-3 py-1 rounded-full border text-xs font-semibold ${getStatusColor(data.status)}`}>
            {data.status || "N/A"}
          </span>
        </div>
      </div>
      
      <div>
        <label className="text-sm font-medium text-gray-500">Customer/Vendor</label>
        <p className="text-gray-800">{data.customer || data.vendor || "N/A"}</p>
      </div>
      
      {data.transactionId && (
        <div>
          <label className="text-sm font-medium text-gray-500">Transaction ID</label>
          <p className="text-gray-800 font-mono text-sm">{data.transactionId}</p>
        </div>
      )}
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-gray-500">Date</label>
          <p className="text-gray-800">{data.date || "N/A"}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-500">Time</label>
          <p className="text-gray-800">{data.time || "N/A"}</p>
        </div>
      </div>
      
      {data.reason && (
        <div>
          <label className="text-sm font-medium text-gray-500">Reason</label>
          <p className="text-gray-800">{data.reason}</p>
        </div>
      )}
    </div>
  );

  const renderApprovalDetails = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-gray-500">Vendor</label>
          <p className="text-gray-800">{data.vendor || "N/A"}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-500">Service</label>
          <p className="text-gray-800">{data.service || "N/A"}</p>
        </div>
      </div>
      
      <div>
        <label className="text-sm font-medium text-gray-500">Request Type</label>
        <p className="text-gray-800">{data.request || "N/A"}</p>
      </div>
      
      <div>
        <label className="text-sm font-medium text-gray-500">Description</label>
        <p className="text-gray-800">{data.description || "N/A"}</p>
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="text-sm font-medium text-gray-500">Date</label>
          <p className="text-gray-800">{data.date || "N/A"}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-500">Priority</label>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(data.priority)}`}>
            {data.priority || "Normal"}
          </span>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-500">Status</label>
          <span className={`px-3 py-1 rounded-full border text-xs font-semibold ${getStatusColor(data.status)}`}>
            {data.status || "N/A"}
          </span>
        </div>
      </div>
    </div>
  );

  const getStatusColor = (status) => {
    const colors = {
      Pending: "bg-yellow-100 text-yellow-700 border-yellow-300",
      Success: "bg-green-100 text-green-700 border-green-300",
      Approved: "bg-green-100 text-green-700 border-green-300",
      Rejected: "bg-red-100 text-red-700 border-red-300",
      Failed: "bg-red-100 text-red-700 border-red-300",
      Declined: "bg-red-100 text-red-700 border-red-300",
      Unread: "bg-orange-100 text-orange-700 border-orange-300",
      Read: "bg-gray-100 text-gray-700 border-gray-300",
      Paid: "bg-green-100 text-green-700 border-green-300"
    };
    return colors[status] || "bg-gray-100 text-gray-700 border-gray-300";
  };

  const getPriorityColor = (priority) => {
    const colors = {
      High: "bg-red-100 text-red-700",
      Medium: "bg-yellow-100 text-yellow-700",
      Low: "bg-gray-100 text-gray-700",
      Normal: "bg-blue-100 text-blue-700"
    };
    return colors[priority] || "bg-blue-100 text-blue-700";
  };

  const renderContent = () => {
    switch (type) {
      case "payment":
        return renderPaymentDetails();
      case "approval":
        return renderApprovalDetails();
      default:
        return renderNotificationDetails();
    }
  };

  const canApprove = type === "approval" && data.status === "Pending";
  const canMarkAsRead = type === "notification" && data.status === "Unread";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              {title}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 p-1"
            >
              <FaTimes />
            </button>
          </div>
          
          {renderContent()}
          
          {/* Action Buttons */}
          {showActions && (
            <div className="flex gap-3 mt-6 pt-4 border-t">
              {canApprove && onApprove && (
                <AdminButton
                  variant="primary"
                  className="flex-1 bg-green-500 text-white border-green-500 flex items-center justify-center gap-2"
                  onClick={() => {
                    onApprove(data.id);
                    onClose();
                  }}
                >
                  <FaCheck />
                  Approve
                </AdminButton>
              )}
              
              {canApprove && onReject && (
                <AdminButton
                  variant="secondary"
                  className="flex-1 border-red-400 text-red-600 flex items-center justify-center gap-2"
                  onClick={() => {
                    onReject(data.id);
                    onClose();
                  }}
                >
                  <FaBan />
                  Reject
                </AdminButton>
              )}
              
              {canMarkAsRead && onMarkAsRead && (
                <AdminButton
                  variant="primary"
                  className="flex-1 bg-blue-500 text-white border-blue-500 flex items-center justify-center gap-2"
                  onClick={() => {
                    onMarkAsRead(data.id);
                    onClose();
                  }}
                >
                  <FaEye />
                  Mark as Read
                </AdminButton>
              )}
              
              {!canApprove && !canMarkAsRead && (
                <AdminButton
                  variant="secondary"
                  className="flex-1 border-gray-400 text-gray-600 flex items-center justify-center gap-2"
                  onClick={onClose}
                >
                  Close
                </AdminButton>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
