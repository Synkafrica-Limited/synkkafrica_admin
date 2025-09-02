"use clients";

import React from 'react';
import Image from "next/image";

export default function AdminAuth() {
	return (
		<div className="min-h-screen flex items-center justify-center bg-white">
			<div className="flex w-full max-w-4xl shadow-lg rounded-2xl overflow-hidden bg-white">
				{/* Left: Logo */}
				<div className="flex flex-col justify-center items-center bg-white w-1/2 p-8">
					<Image src="/images/synkkafrica_logo.png" alt="Logo" className="object-contain" width={150} height={100} />
				</div>
				{/* Right: Auth Form */}
				<div className="flex flex-col justify-center items-center w-1/2 p-8">
					<Image src="images/synkkafrica_logo_small.png" alt="Logo small" className="w-10 h-10 mb-4" />
					<h2 className="text-2xl font-bold mb-2 text-gray-800">Sign in</h2>
					<p className="mb-6 text-gray-500">Welcome to the admin dashboard.</p>
					<form className="w-full max-w-xs space-y-4">
						<select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 mb-2">
							<option>Choose Dashboard</option>
							<option>Business</option>
							<option>Technical</option>
						</select>
						<div className="flex space-x-2">
							<input type="email" placeholder="Email" className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400" />
							<input type="password" placeholder="Password" className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400" />
						</div>
						<button type="submit" className="w-full bg-gradient-to-r from-orange-400 to-pink-400 text-white font-semibold py-2 rounded-lg mt-2 opacity-80 hover:opacity-100 transition">Log in</button>
					</form>
				</div>
			</div>
		</div>
	);
}
