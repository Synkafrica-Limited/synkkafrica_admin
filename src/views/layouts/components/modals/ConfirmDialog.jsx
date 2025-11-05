import React from 'react';
import { FaExclamationTriangle, FaTrash, FaCheck, FaTimes, FaInfoCircle } from 'react-icons/fa';

/**
 * Reusable Confirmation Dialog Component
 * @param {boolean} isOpen - Whether the dialog is visible
 * @param {function} onClose - Function to close the dialog
 * @param {function} onConfirm - Function to execute on confirmation
 * @param {string} title - Dialog title
 * @param {string} message - Dialog message
 * @param {string} type - Dialog type: 'danger', 'warning', 'success', 'info'
 * @param {string} confirmText - Text for confirm button
 * @param {string} cancelText - Text for cancel button
 */
export default function ConfirmDialog({
	isOpen,
	onClose,
	onConfirm,
	title = "Confirm Action",
	message = "Are you sure you want to proceed?",
	type = "warning",
	confirmText = "Confirm",
	cancelText = "Cancel",
	isLoading = false
}) {
	if (!isOpen) return null;

	const typeConfig = {
		danger: {
			icon: FaTrash,
			iconBg: 'bg-red-100',
			iconColor: 'text-red-600',
			confirmBg: 'bg-red-600 hover:bg-red-700',
			borderColor: 'border-red-200'
		},
		warning: {
			icon: FaExclamationTriangle,
			iconBg: 'bg-yellow-100',
			iconColor: 'text-yellow-600',
			confirmBg: 'bg-orange-600 hover:bg-orange-700',
			borderColor: 'border-yellow-200'
		},
		success: {
			icon: FaCheck,
			iconBg: 'bg-green-100',
			iconColor: 'text-green-600',
			confirmBg: 'bg-green-600 hover:bg-green-700',
			borderColor: 'border-green-200'
		},
		info: {
			icon: FaInfoCircle,
			iconBg: 'bg-blue-100',
			iconColor: 'text-blue-600',
			confirmBg: 'bg-blue-600 hover:bg-blue-700',
			borderColor: 'border-blue-200'
		}
	};

	const config = typeConfig[type] || typeConfig.warning;
	const Icon = config.icon;

	const handleConfirm = () => {
		onConfirm();
		if (!isLoading) {
			onClose();
		}
	};

	return (
		<div 
			className="fixed inset-0 flex items-center justify-center z-50 p-4" 
			style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
			onClick={onClose}
		>
			<div 
				className="bg-white rounded-lg max-w-md w-full shadow-2xl transform transition-all"
				onClick={(e) => e.stopPropagation()}
			>
				{/* Header */}
				<div className={`px-6 pt-6 pb-4 border-b ${config.borderColor}`}>
					<div className="flex items-start gap-4">
						<div className={`p-3 rounded-full ${config.iconBg} flex-shrink-0`}>
							<Icon className={`w-6 h-6 ${config.iconColor}`} />
						</div>
						<div className="flex-1">
							<h3 className="text-lg font-bold text-gray-900 mb-1">{title}</h3>
							<p className="text-sm text-gray-600">{message}</p>
						</div>
					</div>
				</div>

				{/* Actions */}
				<div className="px-6 py-4 flex gap-3 justify-end">
					<button
						onClick={onClose}
						disabled={isLoading}
						className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
					>
						{cancelText}
					</button>
					<button
						onClick={handleConfirm}
						disabled={isLoading}
						className={`px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${config.confirmBg}`}
					>
						{isLoading ? (
							<span className="flex items-center gap-2">
								<svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
									<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
									<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
								</svg>
								Processing...
							</span>
						) : confirmText}
					</button>
				</div>
			</div>
		</div>
	);
}
