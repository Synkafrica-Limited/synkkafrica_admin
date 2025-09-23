"use client";
import React, { useState } from "react";
import BusinessSidebar from "@/views/layouts/components/BusinessSidebar";
import BusinessHeader from "@/views/layouts/components/BusinessHeader";
import AdminButton from "@/ui/button";
import { customers } from "@/models/entities/customer.entity";
import { statusColors } from "../../../../ui/statusColors";
import DashboardStatsWidget from "@/views/layouts/widgets/DashboardStatsWidget";
import DashboardRecentActivityWidget from "@/views/layouts/widgets/DashboardRecentActivityWidget";
import DashboardUserStatsWidget from "@/views/layouts/widgets/DashboardUserStatsWidget";

const userStats = [
	{ value: 150, label: "New Users (Last 30 days)" },
	{ value: 1500, label: "Total Active Users" },
	{ value: 2500, label: "Registered Users" },
	{ value: 500, label: "Average Daily Sessions" },
];

const activities = [
	{
		time: "2 hours ago",
		description: "John Doe updated his profile information.",
	},
	{ time: "1 day ago", description: "Jane Smith made a new booking." },
	{ time: "3 days ago", description: "Michael Johnson left a review." },
	{
		time: "1 week ago",
		description: "Emily Davis signed up as a new customer.",
	},
	{
		time: "2 weeks ago",
		description: "David Wilson changed his contact details.",
	},
	{
		time: "1 month ago",
		description: "Sarah Brown completed her first booking.",
	},
	{
		time: "2 months ago",
		description: "Chris Lee referred a friend to the platform.",
	},
];

export default function CustomerPage() {
	const [search, setSearch] = useState("");
	const [actionOpen, setActionOpen] = useState(-1);

	return (
		<div className="flex min-h-screen bg-gray-50">
			{/* Sidebar: fixed, not scrollable */}
			<div className="sticky top-0 h-screen">
				<BusinessSidebar active="Customers" />
			</div>
			{/* Main area: header fixed, content scrollable */}
			<div className="flex-1 flex flex-col h-screen">
				<div className="sticky top-0 z-30 bg-gray-50">
					<BusinessHeader
						title="Customer List"
						subtitle="Overview of all customers and their bookings"
					/>
				</div>
				<div className="flex-1 overflow-y-auto p-4 md:p-10">
					<div className="p-4 md:p-10">
						<DashboardStatsWidget
							stats={[
								{
									label: "Total customers",
									value: 1400,
									sub: "+20.1% from last month",
									icon: "user",
								},
								{
									label: "Active booking",
									value: 700,
									sub: "+15% from last month",
									icon: "bell",
								},
								{
									label: "New customers",
									value: 150,
									sub: "+5% from last month",
									icon: "users",
								},
								{
									label: "Avg. booking value",
									value: "$60.80",
									sub: "+1% from last month",
									icon: "money",
								},
							]}
						/>
						<div className="bg-white rounded-xl shadow p-6 mb-6">
							<div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
								<AdminButton
									variant="secondary"
									className="px-4 py-2 border-orange-400 text-orange-500 font-medium"
								>
									Export Data
								</AdminButton>
								<input
									type="text"
									placeholder="Search customers"
									value={search}
									onChange={(e) => setSearch(e.target.value)}
									className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-300 w-full md:w-64"
								/>
							</div>
							<div className="overflow-x-auto">
								<table className="min-w-full text-sm">
									<thead>
										<tr className="text-left text-gray-500">
											<th className="py-2">Customer Name</th>
											<th className="py-2">Contact Details</th>
											<th className="py-2">Bookings</th>
											<th className="py-2">Last Booking</th>
											<th className="py-2">Status</th>
											<th className="py-2">Actions</th>
										</tr>
									</thead>
									<tbody>
										{customers
											.filter((c) =>
												c.name
													.toLowerCase()
													.includes(search.toLowerCase())
											)
											.map((c, i) => (
												<tr
													key={i}
													className="border-b last:border-b-0"
												>
													<td className="py-2 flex items-center gap-2">
														<img
															src="https://randomuser.me/api/portraits/men/32.jpg"
															alt={c.name}
															className="w-8 h-8 rounded-full"
														/>
														<span>{c.name}</span>
													</td>
													<td className="py-2">
														<div>{c.email}</div>
														<div className="text-xs text-gray-400">
															{c.phone}
														</div>
													</td>
													<td className="py-2">{c.bookings}</td>
													<td className="py-2">{c.lastBooking}</td>
													<td className="py-2">
														<span
															className={`px-3 py-1 rounded-full border text-xs font-semibold ${statusColors[
																c.status
															]}`}
														>
															{c.status}
														</span>
													</td>
													<td className="py-2 relative">
														<button
															onClick={() =>
																setActionOpen(
																	actionOpen === i
																		? -1
																		: i
																)
															}
															className="px-2 py-1 rounded hover:bg-gray-100"
														>
															<span className="text-xl">≡</span>
														</button>
														{actionOpen === i && (
															<div className="absolute right-0 mt-2 w-32 bg-white rounded shadow z-10">
																<button className="block w-full text-left px-4 py-2 text-sm hover:bg-orange-50">
																	Send check-up
																</button>
																<button className="block w-full text-left px-4 py-2 text-sm hover:bg-orange-50">
																	Blacklist
																</button>
															</div>
														)}
													</td>
												</tr>
											))}
									</tbody>
								</table>
								<div className="flex justify-between items-center text-xs text-gray-500 mt-4">
									<span>Showing 1 to 6 of 20 results</span>
									<span>
										<button className="px-2">&lt; Previous</button>
										<span className="mx-2">1</span>
										<button className="px-2">2</button>
										<button className="px-2">Next &gt;</button>
									</span>
								</div>
							</div>
						</div>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<DashboardRecentActivityWidget
								title="Recent Activity"
								description="Latest interactions and changes in customer profiles."
								activities={activities}
							/>
							<DashboardUserStatsWidget
								title="User Statistics"
								description="Key insights into your user base."
								stats={userStats}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
