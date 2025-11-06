'use client';

import React from 'react';
import { FaTimes, FaExclamationTriangle } from 'react-icons/fa';

export default function ConfirmModal({ title, message, onConfirm, onCancel, confirmText = 'Confirm', cancelText = 'Cancel', type = 'warning' }) {
    const getIconColor = () => {
        switch (type) {
            case 'danger':
                return 'text-red-600';
            case 'success':
                return 'text-green-600';
            case 'info':
                return 'text-blue-600';
            default:
                return 'text-yellow-600';
        }
    };

    const getConfirmButtonColor = () => {
        switch (type) {
            case 'danger':
                return 'bg-red-600 hover:bg-red-700';
            case 'success':
                return 'bg-green-600 hover:bg-green-700';
            case 'info':
                return 'bg-blue-600 hover:bg-blue-700';
            default:
                return 'bg-yellow-600 hover:bg-yellow-700';
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg max-w-md w-full mx-4">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
                    <button
                        onClick={onCancel}
                        className="text-gray-400 hover:text-gray-600"
                    >
                        <FaTimes className="w-5 h-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6">
                    <div className="flex items-start">
                        <div className={`flex-shrink-0 ${getIconColor()}`}>
                            <FaExclamationTriangle className="w-6 h-6" />
                        </div>
                        <div className="ml-3">
                            <p className="text-sm text-gray-600">{message}</p>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end space-x-3 px-6 py-4 border-t border-gray-200">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
                    >
                        {cancelText}
                    </button>
                    <button
                        onClick={onConfirm}
                        className={`px-4 py-2 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 ${getConfirmButtonColor()}`}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
}
