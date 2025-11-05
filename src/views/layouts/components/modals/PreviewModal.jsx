import React from 'react';
import { FaTimes } from 'react-icons/fa';

/**
 * Generic Preview Modal Component
 * @param {boolean} isOpen - Whether the modal is visible
 * @param {function} onClose - Function to close the modal
 * @param {string} title - Modal title
 * @param {ReactNode} children - Modal content
 * @param {string} size - Modal size: 'sm', 'md', 'lg', 'xl', 'full'
 * @param {ReactNode} footer - Optional footer content
 */
export default function PreviewModal({
	isOpen,
	onClose,
	title,
	children,
	size = 'lg',
	footer
}) {
	if (!isOpen) return null;

	const sizeClasses = {
		sm: 'max-w-md',
		md: 'max-w-2xl',
		lg: 'max-w-4xl',
		xl: 'max-w-6xl',
		full: 'max-w-7xl'
	};

	return (
		<div 
			className="fixed inset-0 flex items-center justify-center z-50 p-4" 
			style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
			onClick={onClose}
		>
			<div 
				className={`bg-white rounded-lg ${sizeClasses[size]} w-full max-h-[90vh] overflow-hidden shadow-2xl flex flex-col`}
				onClick={(e) => e.stopPropagation()}
			>
				{/* Header */}
				<div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
					<h2 className="text-xl font-bold text-gray-900">{title}</h2>
					<button 
						onClick={onClose}
						className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg p-2 transition-colors"
						title="Close"
					>
						<FaTimes className="w-5 h-5" />
					</button>
				</div>

				{/* Content */}
				<div className="flex-1 overflow-y-auto p-6">
					{children}
				</div>

				{/* Footer */}
				{footer && (
					<div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4">
						{footer}
					</div>
				)}
			</div>
		</div>
	);
}
