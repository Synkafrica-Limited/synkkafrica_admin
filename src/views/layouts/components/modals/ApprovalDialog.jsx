import React, { useState } from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';
import AdminButton from '@/ui/button';

/**
 * Approval Dialog Component for vendor/listing approvals
 * @param {boolean} isOpen - Whether the dialog is visible
 * @param {function} onClose - Function to close the dialog
 * @param {function} onApprove - Function to execute on approval
 * @param {function} onReject - Function to execute on rejection
 * @param {string} title - Dialog title
 * @param {string} itemName - Name of the item being approved
 * @param {object} itemDetails - Additional details to display
 */
export default function ApprovalDialog({
	isOpen,
	onClose,
	onApprove,
	onReject,
	title = "Approve Item",
	itemName,
	itemDetails = {},
	isLoading = false
}) {
	const [rejectionReason, setRejectionReason] = useState('');
	const [showRejectForm, setShowRejectForm] = useState(false);

	if (!isOpen) return null;

	const handleApprove = () => {
		onApprove();
		if (!isLoading) {
			onClose();
		}
	};

	const handleReject = () => {
		if (rejectionReason.trim()) {
			onReject(rejectionReason);
			if (!isLoading) {
				setRejectionReason('');
				setShowRejectForm(false);
				onClose();
			}
		}
	};

	return (
		<div 
			className="fixed inset-0 flex items-center justify-center z-50 p-4" 
			style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
			onClick={onClose}
		>
			<div 
				className="bg-white rounded-lg max-w-lg w-full shadow-2xl"
				onClick={(e) => e.stopPropagation()}
			>
				{/* Header */}
				<div className="px-6 py-4 border-b border-gray-200">
					<div className="flex items-center justify-between">
						<h3 className="text-xl font-bold text-gray-900">{title}</h3>
						<button 
							onClick={onClose}
							className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg p-2 transition-colors"
						>
							<FaTimes className="w-5 h-5" />
						</button>
					</div>
				</div>

				{/* Content */}
				<div className="px-6 py-4">
					{!showRejectForm ? (
						<>
							<p className="text-gray-700 mb-4">
								You are about to approve: <span className="font-semibold">{itemName}</span>
							</p>
							
							{Object.keys(itemDetails).length > 0 && (
								<div className="bg-gray-50 rounded-lg p-4 mb-4">
									{Object.entries(itemDetails).map(([key, value]) => (
										<div key={key} className="flex justify-between py-2 border-b border-gray-200 last:border-0">
											<span className="text-sm text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
											<span className="text-sm font-medium text-gray-900">{value}</span>
										</div>
									))}
								</div>
							)}

							<p className="text-sm text-gray-600 bg-blue-50 border border-blue-200 rounded-lg p-3">
								<FaCheck className="inline text-blue-600 mr-2" />
								Once approved, this item will be live on the platform.
							</p>
						</>
					) : (
						<div>
							<p className="text-gray-700 mb-4">
								Please provide a reason for rejecting: <span className="font-semibold">{itemName}</span>
							</p>
							<textarea
								value={rejectionReason}
								onChange={(e) => setRejectionReason(e.target.value)}
								placeholder="Enter reason for rejection..."
								className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
								rows={4}
							/>
							<p className="text-xs text-gray-500 mt-2">
								This reason will be sent to the vendor.
							</p>
						</div>
					)}
				</div>

				{/* Actions */}
				<div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex gap-3 justify-end">
					{!showRejectForm ? (
						<>
							<button
								onClick={() => setShowRejectForm(true)}
								disabled={isLoading}
								className="px-4 py-2 text-sm font-medium text-red-600 bg-white border border-red-300 rounded-lg hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
							>
								<FaTimes />
								Reject
							</button>
							<button
								onClick={handleApprove}
								disabled={isLoading}
								className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
							>
								{isLoading ? (
									<>
										<svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
											<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
											<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
										</svg>
										Approving...
									</>
								) : (
									<>
										<FaCheck />
										Approve
									</>
								)}
							</button>
						</>
					) : (
						<>
							<button
								onClick={() => {
									setShowRejectForm(false);
									setRejectionReason('');
								}}
								disabled={isLoading}
								className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
							>
								Back
							</button>
							<button
								onClick={handleReject}
								disabled={isLoading || !rejectionReason.trim()}
								className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
							>
								{isLoading ? (
									<>
										<svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
											<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
											<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
										</svg>
										Rejecting...
									</>
								) : (
									<>
										<FaTimes />
										Confirm Rejection
									</>
								)}
							</button>
						</>
					)}
				</div>
			</div>
		</div>
	);
}
