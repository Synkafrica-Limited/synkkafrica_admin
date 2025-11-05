"use client";
import React, { useState } from "react";
import BusinessSidebar from "@/views/layouts/components/business/BusinessSidebar";
import BusinessHeader from "@/views/layouts/components/business/BusinessHeader";

const roles = [
  { label: "Customer Support", value: "customer_support" },
  { label: "Vendor Support", value: "vendor_support" },
  { label: "Finance", value: "finance" },
  { label: "Technical", value: "technical" },
];

export default function AddTeamMember() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState(roles[0].value);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Team member added: ${name} (${email}) as ${role}`);
    setName("");
    setEmail("");
    setRole(roles[0].value);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <BusinessSidebar active="Home" />
      <div className="flex-1 flex flex-col">
        <BusinessHeader title="Add Team Member / Assign Role" subtitle="Invite new team members and assign their roles" />
        <main className="p-8">
          <div className="bg-white rounded-xl shadow p-8 max-w-xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Full Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-300"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-300"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Role</label>
                <select
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-300"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  {roles.map((r) => (
                    <option key={r.value} value={r.value}>{r.label}</option>
                  ))}
                </select>
              </div>
              <button type="submit" className="w-full py-3 bg-primary-500 text-white rounded-lg font-semibold hover:bg-primary-600 transition">Add Team Member</button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
