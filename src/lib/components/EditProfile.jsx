import React, { useState } from "react";
import AdminButton from "@/lib/ui/button";

const countries = ["Nigeria", "Ghana", "Kenya", "South Africa", "Other"];

export default function EditProfile({ initialData, onSave }) {
  const [fullName, setFullName] = useState(initialData.fullName || "");
  const [gender, setGender] = useState(initialData.gender || "Male");
  const [email, setEmail] = useState(initialData.email || "");
  const [state, setState] = useState(initialData.state || "");
  const [country, setCountry] = useState(initialData.country || countries[0]);
  const [mobile, setMobile] = useState(initialData.mobile || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ fullName, gender, email, state, country, mobile });
  };

  return (
    <form className="grid grid-cols-1 gap-4" onSubmit={handleSubmit}>
      <div>
        <label className="block text-gray-700 font-medium mb-1">Full Name</label>
        <input type="text" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-300" value={fullName} onChange={e => setFullName(e.target.value)} required />
      </div>
      <div>
        <label className="block text-gray-700 font-medium mb-1">Gender</label>
        <div className="flex gap-2">
          <button type="button" className={`flex-1 px-4 py-2 rounded border ${gender === "Male" ? "border-primary-500 text-primary-600" : "border-gray-300 text-gray-600"}`} onClick={() => setGender("Male")}>Male</button>
          <button type="button" className={`flex-1 px-4 py-2 rounded border ${gender === "Female" ? "border-primary-500 text-primary-600" : "border-gray-300 text-gray-600"}`} onClick={() => setGender("Female")}>Female</button>
        </div>
      </div>
      <div>
        <label className="block text-gray-700 font-medium mb-1">Email Address</label>
        <input type="email" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-300" value={email} onChange={e => setEmail(e.target.value)} required />
      </div>
      <div>
        <label className="block text-gray-700 font-medium mb-1">State/LGA/Town</label>
        <input type="text" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-300" value={state} onChange={e => setState(e.target.value)} required />
      </div>
      <div>
        <label className="block text-gray-700 font-medium mb-1">Country/Nationality</label>
        <select className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-300" value={country} onChange={e => setCountry(e.target.value)}>
          {countries.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>
      <div>
        <label className="block text-gray-700 font-medium mb-1">Mobile Number</label>
        <input type="text" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-300" value={mobile} onChange={e => setMobile(e.target.value)} required />
      </div>
  <AdminButton type="submit" variant="primary" className="w-full py-3 mt-4 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition">Save Information</AdminButton>
    </form>
  );
}
