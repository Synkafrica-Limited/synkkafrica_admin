"use client";
import React, { useState } from "react";
import BusinessSidebar from "@/views/layouts/components/business/BusinessSidebar";
import DataTable from "@/views/layouts/components/tables/DataTable";
import DataFilters from "@/views/layouts/components/filters/DataFilters";
import { FaEye, FaEdit, FaBan, FaUserPlus } from 'react-icons/fa';
import { customers } from "../../../../models/entities/customer.entity";
import BusinessHeader from "@/views/layouts/components/business/BusinessHeader";
import { useToast } from "@/views/layouts/components/ToastContainer";

export default function CustomerPage() {
	const { showInfo } = useToast();
	const [search, setSearch] = useState("");
	const [statusFilter, setStatusFilter] = useState('All');
	const [selectedPeriod, setSelectedPeriod] = useState('All Time');

	// Stats calculation
	const stats = {
		total: customers.length,
		active: customers.filter(c => c.status === 'Active').length,
		inactive: customers.filter(c => c.status === 'Inactive').length,
		blocked: customers.filter(c => c.status === 'Blocked').length,
	};

	// Filter groups for DataFilters
	const filterGroups = [
		{
			label: "Status",
			value: statusFilter,
			onChange: setStatusFilter,
			options: [
				{ value: "All", label: "All Customers", count: stats.total },
				{ value: "Active", label: "Active", count: stats.active },
				{ value: "Inactive", label: "Inactive", count: stats.inactive },
				{ value: "Blocked", label: "Blocked", count: stats.blocked },
			],
		},
	];

	const handleExport = () => {
		showInfo('Export', 'Exporting customer data...');
	};

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

				{/* Filters */}
				<DataFilters 
					searchQuery={search}
					onSearchChange={(value) => setSearch(value)}
					searchPlaceholder="Search customers by name, email, or phone"
					filterGroups={filterGroups}
					showExport={true}
					onExport={handleExport}
				/>

				{/* Table */}
				<div className="bg-white rounded-lg border border-gray-200 p-6">
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


				</div>
			</div>
		</div>
	);
}
