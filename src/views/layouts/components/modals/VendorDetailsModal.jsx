import React from 'react';
import AdminButton from "@/ui/button";
import { FaStore, FaCheck, FaTimes } from 'react-icons/fa';

export default function VendorDetailsModal({ vendor, onClose, onApprove, onReject }) {
	if (!vendor) return null;

	return (
		<div className="fixed inset-0 flex items-center justify-center z-50 p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }} onClick={onClose}>
			<div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-xl" onClick={(e) => e.stopPropagation()}>
				<div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
					<h2 className="text-xl font-bold text-gray-900">Vendor Details</h2>
					<button 
						onClick={onClose}
						className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg p-2 transition-colors text-2xl leading-none"
						title="Close"
					>
						×
					</button>
				</div>
				
				<div className="p-6">
					{/* Business Information */}
					<div className="mb-6">
						<h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
							<FaStore className="text-orange-500" />
							Business Information
						</h3>
						<div className="grid grid-cols-2 gap-4">
							<div>
								<label className="text-xs font-medium text-gray-500 uppercase">Business Name</label>
								<p className="text-sm text-gray-900 mt-1">{vendor.businessName}</p>
							</div>
							<div>
								<label className="text-xs font-medium text-gray-500 uppercase">Vendor ID</label>
								<p className="text-sm text-gray-900 mt-1">{vendor.id}</p>
							</div>
							<div>
								<label className="text-xs font-medium text-gray-500 uppercase">Category</label>
								<p className="text-sm text-gray-900 mt-1">{vendor.category}</p>
							</div>
							<div>
								<label className="text-xs font-medium text-gray-500 uppercase">Location</label>
								<p className="text-sm text-gray-900 mt-1">{vendor.location}</p>
							</div>
							<div>
								<label className="text-xs font-medium text-gray-500 uppercase">Registration Number</label>
								<p className="text-sm text-gray-900 mt-1">{vendor.businessRegistrationNumber}</p>
							</div>
							<div>
								<label className="text-xs font-medium text-gray-500 uppercase">Total Listings</label>
								<p className="text-sm text-gray-900 mt-1">{vendor.totalListings} services</p>
							</div>
						</div>
					</div>

					{/* Owner Information */}
					<div className="mb-6">
						<h3 className="text-lg font-semibold text-gray-900 mb-4">Owner Information</h3>
						<div className="grid grid-cols-2 gap-4">
							<div>
								<label className="text-xs font-medium text-gray-500 uppercase">Full Name</label>
								<p className="text-sm text-gray-900 mt-1">{vendor.ownerName}</p>
							</div>
							<div>
								<label className="text-xs font-medium text-gray-500 uppercase">Email</label>
								<p className="text-sm text-gray-900 mt-1">{vendor.email}</p>
							</div>
							<div>
								<label className="text-xs font-medium text-gray-500 uppercase">Phone</label>
								<p className="text-sm text-gray-900 mt-1">{vendor.phone}</p>
							</div>
							<div>
								<label className="text-xs font-medium text-gray-500 uppercase">Onboarding Date</label>
								<p className="text-sm text-gray-900 mt-1">{vendor.onboardingDate}</p>
							</div>
						</div>
					</div>

					{/* Verification Status */}
					<div className="mb-6">
						<h3 className="text-lg font-semibold text-gray-900 mb-4">Verification Status</h3>
						<div className="grid grid-cols-2 gap-4">
							<div>
								<label className="text-xs font-medium text-gray-500 uppercase">Current Status</label>
								<p className="text-sm text-gray-900 mt-1">{vendor.status}</p>
							</div>
							<div>
								<label className="text-xs font-medium text-gray-500 uppercase">Verification Progress</label>
								<div className="mt-1">
									<div className="w-full bg-gray-200 rounded-full h-2">
										<div 
											className="bg-orange-500 h-2 rounded-full" 
											style={{ width: `${vendor.completionPercentage}%` }}
										></div>
									</div>
									<p className="text-xs text-gray-500 mt-1">{vendor.completionPercentage}% complete</p>
								</div>
							</div>
							<div>
								<label className="text-xs font-medium text-gray-500 uppercase">Business Document</label>
								<p className="text-sm text-gray-900 mt-1">{vendor.businessDocument}</p>
							</div>
							<div>
								<label className="text-xs font-medium text-gray-500 uppercase">Verification Details</label>
								<p className="text-sm text-gray-900 mt-1">{vendor.verificationStatus}</p>
							</div>
						</div>
					</div>

					{/* Action Buttons */}
					{vendor.status === 'Pending Approval' && (
						<div className="flex gap-3 pt-4 border-t border-gray-200">
							<AdminButton 
								variant="primary" 
								className="flex-1 flex items-center justify-center gap-2"
								onClick={() => {
									onApprove(vendor.id);
									onClose();
								}}
							>
								<FaCheck />
								Approve Vendor
							</AdminButton>
							<AdminButton 
								variant="secondary" 
								className="flex-1 flex items-center justify-center gap-2 border-red-500 text-red-600"
								onClick={() => {
									onReject(vendor.id);
									onClose();
								}}
							>
								<FaTimes />
								Reject Application
							</AdminButton>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
