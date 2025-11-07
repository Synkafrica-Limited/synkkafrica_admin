/**
 * USAGE EXAMPLES FOR MICRO-INTERACTION COMPONENTS
 * 
 * This file demonstrates how to use the micro-interaction components
 * across the SynkkAfrica Admin Dashboard
 */

// ===================================
// 1. CONFIRM DIALOG COMPONENT
// ===================================

import { useState } from 'react';
import ConfirmDialog from '@/views/layouts/components/modals/ConfirmDialog';
import { useToast } from '@/views/layouts/components/ToastContainer';

function ExampleDeleteListing() {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const { showSuccess, showError } = useToast();

  const handleDelete = async () => {
    try {
      // Your delete API call here
      await deleteListing(listingId);
      showSuccess('Success', 'Listing deleted successfully');
    } catch (error) {
      showError('Error', 'Failed to delete listing');
    }
  };

  return (
    <>
      <button onClick={() => setShowDeleteDialog(true)}>
        Delete Listing
      </button>

      <ConfirmDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={handleDelete}
        title="Delete Listing"
        message="Are you sure you want to delete this listing? This action cannot be undone."
        type="danger"
        confirmText="Delete"
        cancelText="Cancel"
      />
    </>
  );
}

// ===================================
// 2. TOAST NOTIFICATIONS
// ===================================

// First, wrap your app with ToastProvider in layout.jsx or _app.jsx:
/*
import { ToastProvider } from '@/views/layouts/components/ToastContainer';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
*/

// Then use in any component:
function ExampleToastUsage() {
  const { showSuccess, showError, showWarning, showInfo } = useToast();

  const handleAction = async () => {
    try {
      // API call
      showSuccess('Success!', 'Vendor approved successfully');
    } catch (error) {
      showError('Error!', 'Failed to approve vendor');
    }
  };

  return (
    <button onClick={handleAction}>Approve Vendor</button>
  );
}

// ===================================
// 3. APPROVAL DIALOG
// ===================================

import ApprovalDialog from '@/views/layouts/components/modals/ApprovalDialog';

function ExampleApproval() {
  const [showApprovalDialog, setShowApprovalDialog] = useState(false);
  const { showSuccess, showError } = useToast();

  const handleApprove = async () => {
    try {
      await approveVendor(vendorId);
      showSuccess('Approved', 'Vendor has been approved');
    } catch (error) {
      showError('Error', 'Failed to approve vendor');
    }
  };

  const handleReject = async (reason) => {
    try {
      await rejectVendor(vendorId, reason);
      showSuccess('Rejected', 'Vendor has been rejected');
    } catch (error) {
      showError('Error', 'Failed to reject vendor');
    }
  };

  return (
    <>
      <button onClick={() => setShowApprovalDialog(true)}>
        Review Vendor
      </button>

      <ApprovalDialog
        isOpen={showApprovalDialog}
        onClose={() => setShowApprovalDialog(false)}
        onApprove={handleApprove}
        onReject={handleReject}
        title="Vendor Approval"
        itemName="Safari Adventures Ltd"
        itemDetails={{
          businessName: 'Safari Adventures Ltd',
          category: 'Tours & Travel',
          location: 'Lagos, Nigeria',
          registrationNumber: 'RC-1234567'
        }}
      />
    </>
  );
}

// ===================================
// 4. PREVIEW MODAL
// ===================================

import PreviewModal from '@/views/layouts/components/modals/PreviewModal';

function ExamplePreview() {
  const [showPreview, setShowPreview] = useState(false);

  return (
    <>
      <button onClick={() => setShowPreview(true)}>
        Preview Listing
      </button>

      <PreviewModal
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
        title="Listing Preview"
        size="lg"
        footer={
          <div className="flex gap-3 justify-end">
            <button className="px-4 py-2 border rounded-lg">Close</button>
            <button className="px-4 py-2 bg-orange-500 text-white rounded-lg">
              Approve
            </button>
          </div>
        }
      >
        <div>
          <h3>Luxury Beach Resort Package</h3>
          <p>Price: ₦299.99</p>
          <p>Location: Lagos, Nigeria</p>
          {/* More content */}
        </div>
      </PreviewModal>
    </>
  );
}

// ===================================
// 5. LOADING SPINNER
// ===================================

import LoadingSpinner from '@/views/layouts/components/LoadingSpinner';

function ExampleLoading() {
  const [isLoading, setIsLoading] = useState(false);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingSpinner size="lg" color="orange" text="Loading..." />
      </div>
    );
  }

  return <div>Content</div>;
}

// ===================================
// 6. COMPLETE EXAMPLE - DELETE WITH CONFIRMATION
// ===================================

function CompleteDeleteExample() {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { showSuccess, showError } = useToast();

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await fetch(`/api/listings/${listingId}`, { method: 'DELETE' });
      showSuccess('Deleted', 'Listing has been deleted successfully');
      // Refresh your data here
    } catch (error) {
      showError('Error', 'Failed to delete listing. Please try again.');
    } finally {
      setIsDeleting(false);
      setShowDeleteDialog(false);
    }
  };

  return (
    <>
      <button 
        onClick={() => setShowDeleteDialog(true)}
        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
      >
        Delete
      </button>

      <ConfirmDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={handleDelete}
        title="Delete Listing"
        message="Are you sure you want to delete this listing? This action cannot be undone and all booking history will be lost."
        type="danger"
        confirmText="Yes, Delete"
        cancelText="Cancel"
        isLoading={isDeleting}
      />
    </>
  );
}

// ===================================
// 7. TOGGLE VISIBILITY EXAMPLE
// ===================================

function ToggleVisibilityExample() {
  const [showConfirm, setShowConfirm] = useState(false);
  const [action, setAction] = useState(null);
  const { showSuccess } = useToast();

  const handleToggleVisibility = (currentVisibility) => {
    setAction(currentVisibility === 'Visible' ? 'hide' : 'show');
    setShowConfirm(true);
  };

  const confirmToggle = async () => {
    try {
      await updateListingVisibility(listingId, action === 'show');
      showSuccess(
        'Updated', 
        `Listing is now ${action === 'show' ? 'visible' : 'hidden'}`
      );
    } catch (error) {
      showError('Error', 'Failed to update visibility');
    }
  };

  return (
    <>
      <button onClick={() => handleToggleVisibility(listing.visibility)}>
        {listing.visibility === 'Visible' ? 'Hide' : 'Show'}
      </button>

      <ConfirmDialog
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={confirmToggle}
        title={`${action === 'show' ? 'Show' : 'Hide'} Listing`}
        message={`Are you sure you want to ${action} this listing ${action === 'show' ? 'to' : 'from'} customers?`}
        type="warning"
        confirmText="Confirm"
      />
    </>
  );
}

export {
  ExampleDeleteListing,
  ExampleToastUsage,
  ExampleApproval,
  ExamplePreview,
  ExampleLoading,
  CompleteDeleteExample,
  ToggleVisibilityExample
};
