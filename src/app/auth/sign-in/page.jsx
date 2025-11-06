"use client";

import React, { useState } from 'react';
import Image from "next/image";
import { useRouter } from "next/navigation";
import AdminButton from '../../../ui/button';

export default function AdminAuth() {
	const router = useRouter();
	const [formData, setFormData] = useState({
		dashboardType: '',
		email: '',
		password: ''
	});
	const [errors, setErrors] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const [showConfirmation, setShowConfirmation] = useState(false);

	// Validation function
	const validateForm = () => {
		const newErrors = {};

		// Dashboard type validation
		if (!formData.dashboardType) {
			newErrors.dashboardType = 'Please select a dashboard type';
		}

		// Email validation
		if (!formData.email) {
			newErrors.email = 'Email is required';
		} else if (!/\S+@\S+\.\S+/.test(formData.email)) {
			newErrors.email = 'Please enter a valid email address';
		}

		// Password validation
		if (!formData.password) {
			newErrors.password = 'Password is required';
		} else if (formData.password.length < 6) {
			newErrors.password = 'Password must be at least 6 characters long';
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	// Handle input changes
	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData(prev => ({
			...prev,
			[name]: value
		}));
		
		// Clear error for this field when user starts typing
		if (errors[name]) {
			setErrors(prev => ({
				...prev,
				[name]: ''
			}));
		}
	};

	// Handle form submission
	const handleSubmit = (e) => {
		e.preventDefault();
		
		if (validateForm()) {
			setShowConfirmation(true);
		}
	};

	// Handle login confirmation
	const handleConfirmLogin = async () => {
		setIsLoading(true);
		setShowConfirmation(false);

		try {
			// Simulate login process (replace with actual authentication logic)
			await new Promise(resolve => setTimeout(resolve, 1500));

			// Route based on dashboard type
			if (formData.dashboardType === 'business') {
				router.push('/dashboard?type=business');
			} else if (formData.dashboardType === 'technical') {
				router.push('/dashboard?type=technical');
			}
		} catch (error) {
			console.error('Login failed:', error);
			setErrors({ general: 'Login failed. Please try again.' });
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-white">
			<div className="flex w-full max-w-5xl shadow-lg rounded-2xl overflow-hidden bg-white">
				{/* Left: Logo */}
				<div className="flex flex-col justify-center items-center bg-white w-1/2 p-8">
					<Image src="/image/synkkafrica_logo.png" alt="Logo" className="object-contain" width={350} height={350} />
				</div>
				
				{/* Right: Auth Form */}
				<div className="flex flex-col justify-center items-center w-1/2 p-8">
					<Image src="/image/synkkafrica_logo.png" alt="Logo small" width={40} height={40} className="w-10 h-10 mb-4" />
					<h2 className="text-2xl font-bold mb-2 text-gray-800">Sign in</h2>
					<p className="mb-6 text-gray-500">Welcome to the admin dashboard.</p>
					
					{errors.general && (
						<div className="w-full max-w-xs mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
							{errors.general}
						</div>
					)}

					<form onSubmit={handleSubmit} className="w-full max-w-xs space-y-4">
						{/* Dashboard Type Selection */}
						<div>
							<select 
								name="dashboardType"
								value={formData.dashboardType}
								onChange={handleInputChange}
								className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 ${
									errors.dashboardType ? 'border-red-500' : 'border-gray-300'
								}`}
							>
								<option value="">Choose Dashboard</option>
								<option value="business">Business Dashboard</option>
								<option value="technical">Technical Dashboard</option>
							</select>
							{errors.dashboardType && (
								<p className="text-red-500 text-xs mt-1">{errors.dashboardType}</p>
							)}
						</div>

						{/* Email and Password */}
						<div className="flex space-x-2">
							<div className="flex-1">
								<input 
									type="email" 
									name="email"
									value={formData.email}
									onChange={handleInputChange}
									placeholder="Email" 
									className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 ${
										errors.email ? 'border-red-500' : 'border-gray-300'
									}`}
								/>
								{errors.email && (
									<p className="text-red-500 text-xs mt-1">{errors.email}</p>
								)}
							</div>
							<div className="flex-1">
								<input 
									type="password" 
									name="password"
									value={formData.password}
									onChange={handleInputChange}
									placeholder="Password" 
									className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 ${
										errors.password ? 'border-red-500' : 'border-gray-300'
									}`}
								/>
								{errors.password && (
									<p className="text-red-500 text-xs mt-1">{errors.password}</p>
								)}
							</div>
						</div>

						{/* Submit Button */}
						<AdminButton 
							type="submit"
							variant="filled" 
							className="w-full h-[50px] bg-primary-500 text-white"
							disabled={isLoading}
						>
							{isLoading ? 'Signing in...' : 'Sign in'}
						</AdminButton>
					</form>
				</div>
			</div>

			{/* Confirmation Modal */}
			{showConfirmation && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
					<div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
						<h3 className="text-lg font-semibold mb-4">Confirm Login</h3>
						<p className="text-gray-600 mb-4">
							You are about to sign in to the <strong>{formData.dashboardType}</strong> dashboard with email: <strong>{formData.email}</strong>
						</p>
						<p className="text-sm text-gray-500 mb-6">
							Are you sure you want to proceed?
						</p>
						<div className="flex space-x-3">
							<button
								onClick={() => setShowConfirmation(false)}
								className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
							>
								Cancel
							</button>
							<AdminButton
								onClick={handleConfirmLogin}
								variant="filled"
								className="flex-1 bg-primary-500 text-white"
							>
								Confirm
							</AdminButton>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
