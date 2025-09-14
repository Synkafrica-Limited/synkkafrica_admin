// Example usage of ViewDetailsModal component in notifications page

import React, { useState } from "react";
import ViewDetailsModal from "@/lib/components/ViewDetailsModal";

// Example React component showing proper usage
export default function ExamplePage() {
  // Component state - useState hooks must be inside React component
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Example notification data structure
  const notification = {
    id: 1,
    type: "booking",
    title: "New booking created",
    related: "John Doe",
    time: "2 hours ago",
    status: "Unread",
    priority: "High",
    description: "A new booking has been created for luxury sedan service."
  };

  // Example payment data structure  
  const payment = {
    id: 1,
    amount: "₦25,000",
    customer: "Jane Smith",
    transactionId: "TXN123456789",
    date: "2025/07/14",
    time: "2:30 PM",
    status: "Failed",
    reason: "Insufficient funds in account"
  };

  // Example approval data structure
  const approval = {
    id: 1,
    vendor: "Livery Lane",
    service: "Car",
    request: "New listing approval",
    description: "Request to add luxury car service",
    date: "2025/07/14",
    priority: "High",
    status: "Pending"
  };

  // Handler functions
  const handleApprove = (id) => {
    // Handle approval logic
    console.log('Approving item:', id);
  };

  const handleReject = (id) => {
    // Handle rejection logic
    console.log('Rejecting item:', id);
  };

  const handleMarkAsRead = (id) => {
    // Handle mark as read logic
    console.log('Marking as read:', id);
  };

  // Component JSX
  return (
    <div>
      {/* Trigger buttons */}
      <button onClick={() => {
        setSelectedItem(notification);
        setModalOpen(true);
      }}>
        View Notification Details
      </button>
      
      <button onClick={() => {
        setSelectedItem(payment);
        setModalOpen(true);
      }}>
        View Payment Details
      </button>
      
      <button onClick={() => {
        setSelectedItem(approval);
        setModalOpen(true);
      }}>
        View Approval Details
      </button>

      {/* Modal Component */}
      <ViewDetailsModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={`${selectedItem?.type || 'Item'} Details`}
        data={selectedItem || {}}
        type={selectedItem?.type === 'booking' ? 'notification' : selectedItem?.amount ? 'payment' : 'approval'}
        showActions={true}
        onApprove={handleApprove}
        onReject={handleReject}
        onMarkAsRead={handleMarkAsRead}
      />
    </div>
  );
}
