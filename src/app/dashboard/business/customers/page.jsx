"use client";
import React, { useState } from "react";
import BusinessSidebar from "@/views/layouts/components/business/BusinessSidebar";
import AdminButton from "@/ui/button";
import DataTable from "@/views/layouts/components/tables/DataTable";
import { FaSearch, FaEye, FaEdit, FaBan, FaDownload, FaUserPlus } from 'react-icons/fa';
import { customers } from "../../../../models/entities/customer.entity";
import BusinessHeader from "@/views/layouts/components/business/BusinessHeader";

export default function CustomerPage() {
	const [search, setSearch] = useState("");
	const [statusFilter, setStatusFilter] = useState('All');
	const [selectedPeriod, setSelectedPeriod] = useState('All Time');

	// Filter customers
	const filteredCustomers = customers.filter(customer => {
		const matchesSearch = search === '' || 
			customer.name.toLowerCase().includes(search.toLowerCase()) ||
			customer.email.toLowerCase().includes(search.toLowerCase()) ||
			customer.phone.includes(search) ||
			customer.id.toLowerCase().includes(search.toLowerCase());
		
		const matchesStatus = statusFilter === 'All' || customer.status === statusFilter;
		
		return matchesSearch && matchesStatus;
	});

	// Table columns
	const columns = [
		{
			header: 'Customer',
			accessor: 'name',
			cell: (row) => (
				<div className="flex items-center gap-3">
					<img
						src="https://randomuser.me/api/portraits/men/32.jpg"
						alt={row.name}
						className="w-10 h-10 rounded-full"
					/>
					<div>
						<div className="font-medium text-gray-900">{row.name}</div>
						<div className="text-sm text-gray-500">{row.id}</div>
					</div>
				</div>
			),
		},
		{
			header: 'Contact Details',
			accessor: 'email',
			cell: (row) => (
				<div>
					<div className="text-sm text-gray-900">{row.email}</div>
					<div className="text-sm text-gray-500">{row.phone}</div>
				</div>
			),
			showOnMobile: false,
		},
		{
			header: 'Bookings',
			accessor: 'bookings',
			cell: (row) => (
				<div className="font-medium text-gray-900">{row.bookings}</div>
			),
		},
		{
			header: 'Total Spent',
			accessor: 'totalSpent',
			cell: (row) => (
				<div className="font-semibold text-gray-900">{row.totalSpent}</div>
			),
		},
		{
			header: 'Last Booking',
			accessor: 'lastBooking',
			cell: (row) => (
				<div className="text-sm text-gray-600">{row.lastBooking}</div>
			),
			showOnMobile: false,
		},
		{
			header: 'Joined',
			accessor: 'joinedDate',
			cell: (row) => (
				<div className="text-sm text-gray-600">{row.joinedDate}</div>
			),
			showOnMobile: false,
		},
		{
			header: 'Status',
			accessor: 'status',
			cell: (row) => {
				const statusColors = {
					Active: 'bg-green-100 text-green-800',
					Inactive: 'bg-yellow-100 text-yellow-800',
					Blocked: 'bg-red-100 text-red-800',
				};
				return (
					<span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[row.status]}`}>
						{row.status}
					</span>
				);
			},
		},
		{
			header: 'Actions',
			accessor: 'actions',
			cell: (row) => (
				<div className="flex gap-2">
					<button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="View Details">
						<FaEye />
					</button>
					<button className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors" title="Edit">
						<FaEdit />
					</button>
					{row.status !== 'Blocked' && (
						<button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Block">
							<FaBan />
						</button>
					)}
				</div>
			),
		},
	];

	return (
		<div className="flex min-h-screen bg-gray-50">
			<div className="sticky top-0 h-screen">
				<BusinessSidebar active="Customers" />
			</div>
			<div className="flex-1 flex flex-col min-h-screen">
				{/* Header */}
				<BusinessHeader title="Customers" subtitle="Manage your customers effectively" />

				<div className="flex-1 overflow-y-auto p-6">
					{/* Stats Cards */}
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
						<div className="bg-white rounded-lg border border-gray-200 p-5">
							<div className="flex items-center gap-3 mb-3">
								<div className="p-2 bg-blue-50 rounded-lg">
									<svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
									</svg>
								</div>
								<h3 className="text-sm font-medium text-gray-600">Total customers</h3>
							</div>
							<p className="text-3xl font-bold text-gray-900 mb-1">1400</p>
							<p className="text-xs text-gray-500">+20% from last month</p>
						</div>

						<div className="bg-white rounded-lg border border-gray-200 p-5">
							<div className="flex items-center gap-3 mb-3">
								<div className="p-2 bg-green-50 rounded-lg">
									<svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
									</svg>
								</div>
								<h3 className="text-sm font-medium text-gray-600">Active booking</h3>
							</div>
							<p className="text-3xl font-bold text-gray-900 mb-1">700</p>
							<p className="text-xs text-gray-500">+15% from last month</p>
						</div>

						<div className="bg-white rounded-lg border border-gray-200 p-5">
							<div className="flex items-center gap-3 mb-3">
								<div className="p-2 bg-purple-50 rounded-lg">
									<FaUserPlus className="text-purple-600" />
								</div>
								<h3 className="text-sm font-medium text-gray-600">New customer (Last month)</h3>
							</div>
							<p className="text-3xl font-bold text-gray-900 mb-1">150</p>
							<p className="text-xs text-gray-500">+5% from last month</p>
						</div>

						<div className="bg-white rounded-lg border border-gray-200 p-5">
							<div className="flex items-center gap-3 mb-3">
								<div className="p-2 bg-orange-50 rounded-lg">
									<svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
									</svg>
								</div>
								<h3 className="text-sm font-medium text-gray-600">Avg. booking value</h3>
							</div>
							<p className="text-3xl font-bold text-gray-900 mb-1">₦60.80</p>
							<p className="text-xs text-gray-500">+1% from last month</p>
						</div>
					</div>

					{/* Export Button and Search */}
					<div className="bg-white rounded-lg border border-gray-200 p-6">
						<div className="flex items-center justify-between mb-6">
							<AdminButton variant="secondary" className="flex items-center gap-2 border-gray-300 text-gray-700">
								<FaDownload className="text-sm" />
								Export Data
							</AdminButton>
							<div className="relative w-80">
								<FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
								<input
									type="text"
									placeholder="Search customers"
									className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
									value={search}
									onChange={(e) => setSearch(e.target.value)}
								/>
							</div>
						</div>

						{/* Table */}
						<div className="overflow-x-auto">
							<table className="w-full">
								<thead>
									<tr className="border-b border-gray-200">
										<th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Customer Name</th>
										<th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Contact Details</th>
										<th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Bookings</th>
										<th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Last Booking</th>
										<th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
										<th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
									</tr>
								</thead>
								<tbody className="divide-y divide-gray-200">
									{filteredCustomers.map((customer) => (
										<tr key={customer.id} className="hover:bg-gray-50 transition-colors">
											<td className="py-4 px-4">
												<div className="flex items-center gap-3">
													<img
														src="https://randomuser.me/api/portraits/men/32.jpg"
														alt={customer.name}
														className="w-10 h-10 rounded-full"
													/>
													<span className="font-medium text-gray-900">{customer.name}</span>
												</div>
											</td>
											<td className="py-4 px-4">
												<div>
													<div className="text-sm text-gray-900">{customer.email}</div>
													<div className="text-xs text-gray-500">{customer.phone}</div>
												</div>
											</td>
											<td className="py-4 px-4">
												<span className="font-medium text-gray-900">{customer.bookings}</span>
											</td>
											<td className="py-4 px-4">
												<span className="text-sm text-gray-600">{customer.lastBooking}</span>
											</td>
											<td className="py-4 px-4">
												{customer.status === 'Active' && (
													<span className="inline-flex items-center gap-1 px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium border border-green-200">
														<span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
														Active
													</span>
												)}
												{customer.status === 'Inactive' && (
													<span className="inline-flex items-center gap-1 px-3 py-1 bg-red-50 text-red-700 rounded-full text-xs font-medium border border-red-200">
														<span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
														Inactive
													</span>
												)}
												{customer.status === 'Blocked' && (
													<span className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium border border-gray-300">
														<span className="w-1.5 h-1.5 bg-gray-500 rounded-full"></span>
														Blocked
													</span>
												)}
											</td>
											<td className="py-4 px-4">
												<div className="relative group">
													<button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
														<svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
															<path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
														</svg>
													</button>
													<div className="absolute right-0 mt-1 w-40 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
														<button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-t-lg">
															Send check-up
														</button>
														<button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-b-lg">
															Blacklist
														</button>
													</div>
												</div>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>

						{/* Pagination */}
						<div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
							<p className="text-sm text-gray-600">Showing 1 to 6 of 20 results</p>
							<div className="flex items-center gap-2">
								<button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
									&lt; Previous
								</button>
								<button className="px-3 py-1 text-sm bg-orange-500 text-white rounded-lg">1</button>
								<button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">2</button>
								<button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
									Next &gt;
								</button>
							</div>
						</div>
					</div>

					{/* Recent Activity and User Statistics */}
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
						{/* Recent Activity */}
						<div className="bg-white rounded-lg border border-gray-200 p-6">
							<div className="mb-4">
								<h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
									<svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
									</svg>
									Recent Activity
								</h3>
								<p className="text-sm text-gray-500 mt-1">Latest interactions and changes in customer profiles.</p>
							</div>
							<div className="space-y-3">
								{[
									{ time: '2 mins ago', desc: 'Emmanuel created a new booking for luxury sedan.' },
									{ time: '1 hour ago', desc: 'Reju updated visa contact phone number.' },
									{ time: '6 hour ago', desc: 'Temi completed a trip.' },
									{ time: '10 hour ago', desc: 'Dammy created a new booking for laundry.' },
									{ time: '3 days ago', desc: 'Ezra created a new booking for dining.' },
									{ time: '3 days ago', desc: 'Toyosi cancelled a refund.' },
									{ time: '2 weeks ago', desc: 'New customer signed-up for an account.' },
								].map((activity, index) => (
									<div key={index} className="flex items-start gap-3 pb-3 border-b border-gray-100 last:border-0">
										<div className="w-2 h-2 bg-orange-500 rounded-full mt-1.5 flex-shrink-0"></div>
										<div className="flex-1">
											<p className="text-sm text-gray-700">{activity.desc}</p>
											<p className="text-xs text-gray-400 mt-0.5">{activity.time}</p>
										</div>
									</div>
								))}
							</div>
						</div>

						{/* User Statistics */}
						<div className="bg-white rounded-lg border border-gray-200 p-6">
							<div className="mb-4">
								<h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
									<svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
									</svg>
									User Statistics
								</h3>
								<p className="text-sm text-gray-500 mt-1">Key insights into your user base.</p>
							</div>
							<div className="space-y-4">
								{[
									{ label: 'New Users (Last 30 days)', value: '150' },
									{ label: 'Total Active Users', value: '1500' },
									{ label: 'Registered Users', value: '2500' },
									{ label: 'Average Daily Sessions', value: '500' },
								].map((stat, index) => (
									<div key={index} className="flex items-center justify-between pb-4 border-b border-gray-100 last:border-0">
										<span className="text-sm text-gray-600">{stat.label}</span>
										<span className="text-2xl font-bold text-gray-900">{stat.value}</span>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
