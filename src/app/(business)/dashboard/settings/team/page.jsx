"use client";


import React, { useState } from "react";
import AdminButton from "@/lib/ui/button";
import BusinessSidebar from "@/lib/components/BusinessSidebar";
import BusinessHeader from "@/lib/components/BusinessHeader";

const dummyUser = {
  name: "Faluyi Temidayo",
  email: "tfaluyi@synkkafrica.com",
  role: "Business Admin",
  image: "https://randomuser.me/api/portraits/men/32.jpg"
};

const roles = ["Business Admin", "Technical Admin"];
const permissions = [
  "View Content",
  "Edit Content",
  "Delete User / Admin / Content",
];

export default function ManageUserPage() { 
  const [user, setUser] = useState(dummyUser);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "", role: roles[0] });

  const handleEdit = () => setShowForm(true);
  const handleDelete = () => setUser(null);
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    setUser({ ...form, image: dummyUser.image });
    setShowForm(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <BusinessSidebar active="Admin user" />
      <div className="flex-1 flex flex-col">
        <BusinessHeader title="Manage User" subtitle="Add, edit, or assign roles and permissions to admin users" />
        <div className="flex flex-col md:flex-row w-full h-full p-4 md:p-10 gap-6">
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-2xl min-h-[400px] flex flex-col gap-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Manage User</h2>
                {!showForm && <AdminButton variant="primary" className="bg-orange-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-orange-600" onClick={() => setShowForm(true)}>Add User</AdminButton>}
              </div>
              {!showForm && user && (
                <div className="flex flex-col items-center gap-2 bg-white rounded-xl shadow p-6 w-full max-w-sm mx-auto">
                  <img src={user.image} alt={user.name} className="w-20 h-20 rounded-full mb-2" />
                  <div className="font-bold text-lg text-gray-800">{user.name}</div>
                  <div className="text-gray-500 text-sm">{user.email}</div>
                  <div className="text-orange-500 text-sm mb-2">{user.role}</div>
                  <div className="flex gap-2 w-full mt-2">
                    <AdminButton variant="secondary" className="flex-1 border-orange-400 text-orange-500 font-medium" onClick={handleEdit}>Edit</AdminButton>
                    <AdminButton variant="secondary" className="flex-1 border-orange-400 text-orange-500 font-medium" onClick={handleDelete}>Delete</AdminButton>
                  </div>
                </div>
              )}
              {showForm && (
                <form className="flex flex-col gap-4 w-full max-w-md mx-auto" onSubmit={handleSubmit}>
                  <select name="role" value={form.role} onChange={handleChange} className="border rounded-lg px-4 py-2">
                    <option value="">Select Dashboard</option>
                    {roles.map((r) => <option key={r} value={r}>{r}</option>)}
                  </select>
                  <input name="name" type="text" placeholder="Name" value={form.name} onChange={handleChange} className="border rounded-lg px-4 py-2" required />
                  <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} className="border rounded-lg px-4 py-2" required />
                  <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} className="border rounded-lg px-4 py-2" required />
                  <AdminButton type="submit" variant="primary" className="w-full py-3 mt-2 bg-orange-300 text-white rounded-lg font-semibold hover:bg-orange-400 transition">Add Admin User</AdminButton>
                </form>
              )}
            </div>
          </div>
          <div className="w-full md:w-96 flex flex-col items-center justify-center">
            <div className="bg-white rounded-2xl shadow-lg p-8 w-full">
              <h3 className="font-bold text-lg mb-4">Roles and Permission</h3>
              <div className="mb-4">
                <div className="font-semibold mb-2">Assign Roles</div>
                <ul className="space-y-1">
                  <li className="flex items-center gap-2 text-sm"><span className="w-2 h-2 rounded-full bg-orange-400 inline-block"></span> Business Admin</li>
                  <li className="flex items-center gap-2 text-sm"><span className="w-2 h-2 rounded-full bg-gray-300 inline-block"></span> Technical Admin</li>
                </ul>
              </div>
              <div>
                <div className="font-semibold mb-2">Manage Permission</div>
                <ul className="space-y-1">
                  <li className="flex items-center gap-2 text-sm"><span className="w-2 h-2 rounded-full bg-orange-400 inline-block"></span> View Content</li>
                  <li className="flex items-center gap-2 text-sm"><span className="w-2 h-2 rounded-full bg-orange-400 inline-block"></span> Edit Content</li>
                  <li className="flex items-center gap-2 text-sm"><span className="w-2 h-2 rounded-full bg-orange-400 inline-block"></span> Delete User / Admin / Content</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
