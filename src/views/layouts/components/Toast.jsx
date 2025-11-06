import React, { useEffect } from 'react';
import { FaCheck, FaTimes, FaExclamationTriangle, FaInfoCircle } from 'react-icons/fa';

/**
 * Toast Notification Component
 * @param {string} id - Unique identifier for the toast
 * @param {string} type - Toast type: 'success', 'error', 'warning', 'info'
 * @param {string} title - Toast title
 * @param {string} message - Toast message
 * @param {function} onClose - Function to close the toast
 * @param {number} duration - Auto-close duration in ms (0 to disable)
 */
export default function Toast({
	id,
	type = 'info',
	title,
	message,
	onClose,
	duration = 5000
}) {
	useEffect(() => {
		if (duration > 0) {
			const timer = setTimeout(() => {
				onClose(id);
			}, duration);
			return () => clearTimeout(timer);
		}
	}, [duration, id, onClose]);

	const typeConfig = {
		success: {
			icon: FaCheck,
			bgColor: 'bg-green-50',
			borderColor: 'border-green-500',
			iconColor: 'text-green-600',
			titleColor: 'text-green-900'
		},
		error: {
			icon: FaTimes,
			bgColor: 'bg-red-50',
			borderColor: 'border-red-500',
			iconColor: 'text-red-600',
			titleColor: 'text-red-900'
		},
		warning: {
			icon: FaExclamationTriangle,
			bgColor: 'bg-yellow-50',
			borderColor: 'border-yellow-500',
			iconColor: 'text-yellow-600',
			titleColor: 'text-yellow-900'
		},
		info: {
			icon: FaInfoCircle,
			bgColor: 'bg-blue-50',
			borderColor: 'border-blue-500',
			iconColor: 'text-blue-600',
			titleColor: 'text-blue-900'
		}
	};

	const config = typeConfig[type] || typeConfig.info;
	const Icon = config.icon;

	return (
		<div className={`${config.bgColor} border-l-4 ${config.borderColor} rounded-lg shadow-lg p-4 mb-3 max-w-md w-full animate-slideIn`}>
			<div className="flex items-start gap-3">
				<div className={`p-2 rounded-full ${config.bgColor} flex-shrink-0`}>
					<Icon className={`w-5 h-5 ${config.iconColor}`} />
				</div>
				<div className="flex-1 min-w-0">
					{title && (
						<h4 className={`font-semibold text-sm ${config.titleColor} mb-1`}>
							{title}
						</h4>
					)}
					{message && (
						<p className="text-sm text-gray-600">{message}</p>
					)}
				</div>
				<button
					onClick={() => onClose(id)}
					className="text-gray-400 hover:text-gray-600 flex-shrink-0"
				>
					<FaTimes className="w-4 h-4" />
				</button>
			</div>
		</div>
	);
}
