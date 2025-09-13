"use client";
import React, { useState } from "react";
import BusinessSidebar from "@/lib/components/BusinessSidebar";
import BusinessHeader from "@/lib/components/BusinessHeader";
import AdminButton from "@/lib/ui/button";
import DashboardStatsWidget from "@/views/layouts/widgets/DashboardStatsWidget";

// Toggle component
function StatusToggle({ checked, onChange }) {
	return (
		<label className="inline-flex items-center cursor-pointer">
			<input
				type="checkbox"
				checked={checked}
				onChange={onChange}
				className="sr-only peer"
			/>
			<span
				className={`w-10 h-5 flex items-center rounded-full transition-colors duration-200 ${
					checked ? "bg-orange-400" : "bg-gray-300"
				}`}
			>
				<span
					className={`h-4 w-4 bg-white rounded-full shadow transform transition-transform duration-200 ${
						checked ? "translate-x-5" : "translate-x-1"
					}`}
				/>
			</span>
		</label>
	);
}

const stats = [
	{
		label: "All listings",
		value: 1400,
		sub: "Across all vendors",
		icon: "listings",
	},
	{
		label: "Active listings",
		value: 700,
		sub: "Currently managing",
		icon: "listings",
	},
	{
		label: "Non-active listings",
		value: 14,
		sub: "",
		icon: "non_active_listings",
	},
];

const tabs = ["All Listings", "Active Listings", "Non-active listings"];

const listings = [
	{
		vendor: "Livery Lane",
		email: "Temi@gmail.com",
		phone: "+234 806 5017 856",
		service: "Car",
		serviceType: "Mercedes Benz GLE coupe",
		active: true,
	},
	{
		vendor: "Pura vida",
		email: "Temi@gmail.com",
		phone: "+234 806 5017 856",
		service: "Beach",
		serviceType: "Pura vida Beach",
		active: true,
	},
	{
		vendor: "Soho",
		email: "Temi@gmail.com",
		phone: "+234 806 5017 856",
		service: "Restaurant",
		serviceType: "Soho Restaurant",
		active: false,
	},
	{
		vendor: "Nok By Alara",
		email: "Temi@gmail.com",
		phone: "+234 806 5017 856",
		service: "Restaurant",
		serviceType: "Nok by Alara Restaurant",
		active: true,
	},
	{
		vendor: "Maison bali",
		email: "Temi@gmail.com",
		phone: "+234 806 5017 856",
		service: "Beach",
		serviceType: "Maison bali Beach",
		active: false,
	},
	{
		vendor: "Circa",
		email: "Temi@gmail.com",
		phone: "+234 806 5017 856",
		service: "Restaurant",
		serviceType: "Circa Restaurant",
		active: true,
	},
	// ...repeat for demo pagination
];

const approvals = [
	{
		id: 1,
		vendor: "Livery Lane",
		service: "Car",
		request: "New listing approval",
		date: "2025/07/14",
		status: "Pending",
	},
	{
		id: 2,
		vendor: "Maison bali",
		service: "Beach",
		request: "Edit listing request",
		date: "2025/07/13",
		status: "Approved",
	},
	{
		id: 3,
		vendor: "Circa",
		service: "Restaurant",
		request: "Delete listing request",
		date: "2025/07/12",
		status: "Rejected",
	},
];

const statusColors = {
	Pending: "bg-yellow-100 text-yellow-700 border-yellow-300",
	Approved: "bg-green-100 text-green-700 border-green-300",
	Rejected: "bg-red-100 text-red-700 border-red-300",
};

export default function ListingsPage() {
	const [tab, setTab] = useState("All Listings");
	const [showApprovals, setShowApprovals] = useState(false);
	const [listingState, setListingState] = useState(listings);

	// Handle toggle change
	const handleToggle = (idx) => {
		setListingState((prev) =>
			prev.map((l, i) => (i === idx ? { ...l, active: !l.active } : l))
		);
	};

	return (
		<div className="flex min-h-screen bg-gray-50">
			{/* Sidebar: fixed, not scrollable */}
			<div className="sticky top-0 h-screen">
				<BusinessSidebar active="Listings" />
			</div>
			{/* Main area: header fixed, content scrollable */}
			<div className="flex-1 flex flex-col h-screen">
				<div className="sticky top-0 z-30 bg-gray-50">
					<BusinessHeader
						title="All Listings"
						subtitle="Overview of all vendor listings"
					/>
				</div>
				<div className="flex-1 overflow-y-auto p-4 md:p-10">
					<DashboardStatsWidget stats={stats} />
					<div className="flex justify-between items-center mb-4 gap-2">
						<div className="flex gap-2">
							<AdminButton
								variant="primary"
								className="px-4 py-2 bg-orange-500 text-white font-medium border-orange-500"
								onClick={() => setShowApprovals((v) => !v)}
							>
								{showApprovals
									? "Hide Requests/Approvals"
									: "Listing Requests/Approvals"}
							</AdminButton>
						</div>
					</div>
					{/* Tabs */}
					<div className="bg-white rounded-t-xl shadow p-2 flex gap-2 mb-0">
						{tabs.map((t) => (
							<button
								key={t}
								className={`px-4 py-2 rounded-lg font-medium transition-colors ${
									tab === t
										? "bg-orange-100 text-orange-700"
										: "bg-gray-100 text-gray-500 hover:bg-orange-50 hover:text-orange-600"
								}`}
								onClick={() => setTab(t)}
							>
								{t}
							</button>
						))}
					</div>
					{/* Listings Table */}
					<div className="bg-white rounded-b-xl shadow p-6 mb-6">
						<table className="min-w-full text-sm">
							<thead>
								<tr className="text-left text-gray-500">
									<th className="py-2">Vendor Name</th>
									<th className="py-2">Contact Details</th>
									<th className="py-2">Service</th>
									<th className="py-2">Service Type</th>
									<th className="py-2">Status</th>
									<th className="py-2">Actions</th>
								</tr>
							</thead>
							<tbody>
								{listingState
									.filter((l) => {
										if (tab === "All Listings") return true;
										if (tab === "Active Listings") return l.active;
										if (tab === "Non-active listings")
											return !l.active;
										return true;
									})
									.map((l, i) => (
										<tr key={i} className="border-b last:border-b-0">
											<td className="py-2">{l.vendor}</td>
											<td className="py-2">
												<div>{l.email}</div>
												<div className="text-xs text-gray-400">
													{l.phone}
												</div>
											</td>
											<td className="py-2">{l.service}</td>
											<td className="py-2">{l.serviceType}</td>
											<td className="py-2">
												<StatusToggle
													checked={l.active}
													onChange={() => handleToggle(i)}
												/>
											</td>
											<td className="py-2">
												<button className="px-2 py-1 rounded hover:bg-gray-100">
													<span className="text-xl">≡</span>
												</button>
											</td>
										</tr>
									))}
							</tbody>
						</table>
						<div className="flex justify-between items-center text-xs text-gray-500 mt-4">
							<span>Showing 1 to 11 of 30 results</span>
							<span>
								<button className="px-2">&lt; Previous</button>
								<span className="mx-2">1</span>
								<button className="px-2">2</button>
								<button className="px-2">Next &gt;</button>
							</span>
						</div>
					</div>
					{/* Listing Requests/Approvals */}
					{showApprovals && (
						<div className="bg-white rounded-xl shadow p-6 mb-6">
							<div className="font-semibold text-gray-800 mb-4">
								Listing Requests & Approvals
							</div>
							<table className="min-w-full text-sm">
								<thead>
									<tr className="text-left text-gray-500">
										<th className="py-2">Vendor Name</th>
										<th className="py-2">Service</th>
										<th className="py-2">Request</th>
										<th className="py-2">Date</th>
										<th className="py-2">Status</th>
										<th className="py-2">Action</th>
									</tr>
								</thead>
								<tbody>
									{approvals.map((a) => (
										<tr key={a.id} className="border-b last:border-b-0">
											<td className="py-2">{a.vendor}</td>
											<td className="py-2">{a.service}</td>
											<td className="py-2">{a.request}</td>
											<td className="py-2">{a.date}</td>
											<td className="py-2">
												<span
													className={`px-3 py-1 rounded-full border text-xs font-semibold ${statusColors[a.status]}`}
												>
													{a.status}
												</span>
											</td>
											<td className="py-2">
												<AdminButton
													variant="secondary"
													className="px-3 py-1 text-xs"
												>
													View
												</AdminButton>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}