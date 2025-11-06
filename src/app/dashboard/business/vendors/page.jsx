"use client";
import React, { useState } from "react";
import BusinessSidebar from "@/views/layouts/components/business/BusinessSidebar";
import BusinessHeader from "@/views/layouts/components/business/BusinessHeader";
import VendorDetailsModal from "@/views/layouts/components/modals/VendorDetailsModal";
import DataFilters from "@/views/layouts/components/filters/DataFilters";
import { vendors } from "../../../..//models/entities/vendor.entity";
import { FaEye, FaCheck, FaTimes, FaStore, FaClock, FaExclamationCircle } from 'react-icons/fa';
import { useToast } from "@/views/layouts/components/ToastContainer";

export default function VendorsPage() {
	const [search, setSearch] = useState("");
	const [statusFilter, setStatusFilter] = useState('All');
	const [selectedVendor, setSelectedVendor] = useState(null);
	const [showModal, setShowModal] = useState(false);
	const { showInfo } = useToast();

	// Filter vendors
	const filteredVendors = vendors.filter(vendor => {
		const matchesSearch = search === '' || 
			vendor.businessName.toLowerCase().includes(search.toLowerCase()) ||
			vendor.ownerName.toLowerCase().includes(search.toLowerCase()) ||
			vendor.email.toLowerCase().includes(search.toLowerCase()) ||
			vendor.id.toLowerCase().includes(search.toLowerCase()) ||
			vendor.category.toLowerCase().includes(search.toLowerCase());
		
		const matchesStatus = statusFilter === 'All' || vendor.status === statusFilter;
		
		return matchesSearch && matchesStatus;
	});

	// Stats
	const stats = {
		total: vendors.length,
		pending: vendors.filter(v => v.status === 'Pending Approval').length,
		approved: vendors.filter(v => v.status === 'Approved').length,
		underReview: vendors.filter(v => v.status === 'Under Review').length,
		rejected: vendors.filter(v => v.status === 'Rejected').length,
	};

	// Filter groups for DataFilters component
	const filterGroups = [
		{
			label: "Status",
			value: statusFilter,
			onChange: setStatusFilter,
			options: [
				{ value: "All", label: "All", count: stats.total },
				{ value: "Pending Approval", label: "Pending", count: stats.pending },
				{ value: "Approved", label: "Approved", count: stats.approved },
				{ value: "Under Review", label: "Under Review", count: stats.underReview },
				{ value: "Rejected", label: "Rejected", count: stats.rejected },
			]
		}
	];

	const handleExport = () => {
		showInfo("Exporting vendor data...");
		// Export logic would go here
	};

	const handleViewDetails = (vendor) => {
		setSelectedVendor(vendor);
		setShowModal(true);
	};

	const handleApprove = (vendorId) => {
		console.log('Approving vendor:', vendorId);
		// Add approval logic here
	};

	const handleReject = (vendorId) => {
		console.log('Rejecting vendor:', vendorId);
		// Add rejection logic here
	};

	return (
		<div className="flex min-h-screen bg-gray-50">
			<div className="sticky top-0 h-screen">
				<BusinessSidebar active="Vendors" />
			</div>
			<div className="flex-1 flex flex-col min-h-screen">
				{/* Header */}
				<BusinessHeader title="Vendor Management" subtitle="Review and manage vendor applications" />

				<div className="flex-1 overflow-y-auto p-6">
					{/* Stats Cards */}
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
						<div className="bg-white rounded-lg border border-gray-200 p-5">
							<div className="flex items-center gap-3 mb-3">
								<div className="p-2 bg-blue-50 rounded-lg">
									<FaStore className="text-blue-600" />
								</div>
								<h3 className="text-sm font-medium text-gray-600">Total Vendors</h3>
							</div>
							<p className="text-2xl font-bold text-gray-900 mb-1">{stats.total}</p>
							<p className="text-xs text-gray-500">All registered vendors</p>
						</div>

						<div className="bg-white rounded-lg border border-gray-200 p-5">
							<div className="flex items-center gap-3 mb-3">
								<div className="p-2 bg-yellow-50 rounded-lg">
									<FaClock className="text-yellow-600" />
								</div>
								<h3 className="text-sm font-medium text-gray-600">Pending Approval</h3>
							</div>
							<p className="text-2xl font-bold text-gray-900 mb-1">{stats.pending}</p>
							<p className="text-xs text-gray-500">Awaiting verification</p>
						</div>

						<div className="bg-white rounded-lg border border-gray-200 p-5">
							<div className="flex items-center gap-3 mb-3">
								<div className="p-2 bg-green-50 rounded-lg">
									<FaCheck className="text-green-600" />
								</div>
								<h3 className="text-sm font-medium text-gray-600">Approved</h3>
							</div>
							<p className="text-2xl font-bold text-gray-900 mb-1">{stats.approved}</p>
							<p className="text-xs text-gray-500">Active vendors</p>
						</div>

						<div className="bg-white rounded-lg border border-gray-200 p-5">
							<div className="flex items-center gap-3 mb-3">
								<div className="p-2 bg-red-50 rounded-lg">
									<FaExclamationCircle className="text-red-600" />
								</div>
								<h3 className="text-sm font-medium text-gray-600">Rejected</h3>
							</div>
							<p className="text-2xl font-bold text-gray-900 mb-1">{stats.rejected}</p>
							<p className="text-xs text-gray-500">Failed verification</p>
						</div>
					</div>

					{/* Filters */}
					<DataFilters 
						searchQuery={search}
						onSearchChange={(value) => setSearch(value)}
						searchPlaceholder="Search vendors by name, email, or category"
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
										<th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Vendor</th>
										<th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
										<th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
										<th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
										<th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Onboarding Date</th>
										<th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Verification</th>
										<th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
										<th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
									</tr>
								</thead>
								<tbody className="divide-y divide-gray-200">
									{filteredVendors.map((vendor) => (
										<tr key={vendor.id} className="hover:bg-gray-50 transition-colors">
											<td className="py-4 px-4">
												<div>
													<div className="font-medium text-gray-900">{vendor.businessName}</div>
													<div className="text-xs text-gray-500">{vendor.id}</div>
												</div>
											</td>
											<td className="py-4 px-4">
												<div>
													<div className="text-sm text-gray-900">{vendor.ownerName}</div>
													<div className="text-xs text-gray-500">{vendor.email}</div>
													<div className="text-xs text-gray-500">{vendor.phone}</div>
												</div>
											</td>
											<td className="py-4 px-4">
												<span className="text-sm text-gray-700">{vendor.category}</span>
											</td>
											<td className="py-4 px-4">
												<span className="text-sm text-gray-600">{vendor.location}</span>
											</td>
											<td className="py-4 px-4">
												<span className="text-sm text-gray-600">{vendor.onboardingDate}</span>
											</td>
											<td className="py-4 px-4">
												<div>
													<div className="text-sm text-gray-700">{vendor.verificationStatus}</div>
													<div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
														<div 
															className="bg-orange-500 h-1.5 rounded-full" 
															style={{ width: `${vendor.completionPercentage}%` }}
														></div>
													</div>
													<div className="text-xs text-gray-500 mt-0.5">{vendor.completionPercentage}% complete</div>
												</div>
											</td>
											<td className="py-4 px-4">
												{vendor.status === 'Approved' && (
													<span className="inline-flex items-center gap-1 px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium border border-green-200">
														<FaCheck className="text-xs" />
														Approved
													</span>
												)}
												{vendor.status === 'Pending Approval' && (
													<span className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-50 text-yellow-700 rounded-full text-xs font-medium border border-yellow-200">
														<FaClock className="text-xs" />
														Pending
													</span>
												)}
												{vendor.status === 'Under Review' && (
													<span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium border border-blue-200">
														Under Review
													</span>
												)}
												{vendor.status === 'Rejected' && (
													<span className="inline-flex items-center gap-1 px-3 py-1 bg-red-50 text-red-700 rounded-full text-xs font-medium border border-red-200">
														<FaTimes className="text-xs" />
														Rejected
													</span>
												)}
											</td>
											<td className="py-4 px-4">
												<div className="flex gap-2">
													<button 
														onClick={() => handleViewDetails(vendor)}
														className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" 
														title="View Details"
													>
														<FaEye />
													</button>
													{vendor.status === 'Pending Approval' && (
														<>
															<button 
																onClick={() => handleApprove(vendor.id)}
																className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors" 
																title="Approve"
															>
																<FaCheck />
															</button>
															<button 
																onClick={() => handleReject(vendor.id)}
																className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" 
																title="Reject"
															>
																<FaTimes />
															</button>
														</>
													)}
												</div>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>

						{/* Pagination */}
						<div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
							<p className="text-sm text-gray-600">Showing 1 to {filteredVendors.length} of {vendors.length} results</p>
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

			{/* Vendor Details Modal */}
			<VendorDetailsModal 
				vendor={selectedVendor}
				onClose={() => {
					setShowModal(false);
					setSelectedVendor(null);
				}}
				onApprove={handleApprove}
				onReject={handleReject}
			/>
		</div>
	);
}
