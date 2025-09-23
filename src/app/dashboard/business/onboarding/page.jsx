
"use client";

import React from "react";
import BusinessSidebar from "@/views/layouts/components/BusinessSidebar";
import BusinessHeader from "@/views/layouts/components/BusinessHeader";
import OnboardingActions from "@/views/layouts/components/OnboardingActions";

export default function BusinessOnboarding() {
	return (
		<div className="flex min-h-screen bg-gray-50">
			<BusinessSidebar active="Home" />
			<div className="flex-1 flex flex-col">
				<BusinessHeader title="Onboarding" subtitle="Set up your business admin dashboard" />
					<main className="p-8">
						<div className="bg-white rounded-xl shadow p-8">
							<h2 className="text-xl font-bold text-gray-800 mb-4">Welcome to Synkkafrica Business Admin!</h2>
							<p className="text-gray-600 mb-6">Let's get your dashboard ready. Complete the onboarding steps below to start managing vendors, customers, and payments.</p>
							<ul className="space-y-4">
								<li className="flex items-center">
									<span className="w-6 h-6 bg-primary-500 text-white rounded-full flex items-center justify-center mr-3 font-bold">1</span>
									<span className="font-medium text-gray-700">Add your business details</span>
								</li>
								<li className="flex items-center">
									<span className="w-6 h-6 bg-primary-500 text-white rounded-full flex items-center justify-center mr-3 font-bold">2</span>
									<span className="font-medium text-gray-700">Invite team members</span>
								</li>
								<li className="flex items-center">
									<span className="w-6 h-6 bg-primary-500 text-white rounded-full flex items-center justify-center mr-3 font-bold">3</span>
									<span className="font-medium text-gray-700">Set up payment methods</span>
								</li>
								<li className="flex items-center">
									<span className="w-6 h-6 bg-primary-500 text-white rounded-full flex items-center justify-center mr-3 font-bold">4</span>
									<span className="font-medium text-gray-700">Review and launch dashboard</span>
								</li>
							</ul>
							<OnboardingActions
								onProfile={() => window.location.href = '/dashboard/profile'}
								onInvite={() => window.location.href = '/dashboard/team'}
								onAssignSupport={(role) => alert(`Assigning support for ${role}`)}
							/>
						</div>
					</main>
			</div>
		</div>
	);
}
