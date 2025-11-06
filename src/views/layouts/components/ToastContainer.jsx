'use client';
import React, { createContext, useContext, useState, useCallback } from 'react';
import Toast from './Toast';

const ToastContext = createContext();

export function ToastProvider({ children }) {
	const [toasts, setToasts] = useState([]);

	const addToast = useCallback(({ type, title, message, duration }) => {
		const id = Date.now() + Math.random();
		setToasts(prev => [...prev, { id, type, title, message, duration }]);
		return id;
	}, []);

	const removeToast = useCallback((id) => {
		setToasts(prev => prev.filter(toast => toast.id !== id));
	}, []);

	const showSuccess = useCallback((title, message, duration) => {
		return addToast({ type: 'success', title, message, duration });
	}, [addToast]);

	const showError = useCallback((title, message, duration) => {
		return addToast({ type: 'error', title, message, duration });
	}, [addToast]);

	const showWarning = useCallback((title, message, duration) => {
		return addToast({ type: 'warning', title, message, duration });
	}, [addToast]);

	const showInfo = useCallback((title, message, duration) => {
		return addToast({ type: 'info', title, message, duration });
	}, [addToast]);

	return (
		<ToastContext.Provider value={{ showSuccess, showError, showWarning, showInfo }}>
			{children}
			<div className="fixed top-4 right-4 z-50 flex flex-col items-end">
				{toasts.map(toast => (
					<Toast
						key={toast.id}
						{...toast}
						onClose={removeToast}
					/>
				))}
			</div>
		</ToastContext.Provider>
	);
}

export function useToast() {
	const context = useContext(ToastContext);
	if (!context) {
		throw new Error('useToast must be used within a ToastProvider');
	}
	return context;
}
