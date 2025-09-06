
import React, { useState, useEffect } from "react";
import AdminButton from "@/lib/ui/button";
import { getProfile, updateProfile } from "@/app/controllers/business/editProfile.controller";

const countries = ["Nigeria", "Ghana", "Kenya", "South Africa", "Other"];

export default function EditProfile({ onSave }) {
  const [form, setForm] = useState({
    fullName: "",
    gender: "Male",
    email: "",
    state: "",
    country: countries[0],
    mobile: ""
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const profile = getProfile();
    setForm({
      fullName: profile.fullName || "",
      gender: profile.gender || "Male",
      email: profile.email || "",
      state: profile.state || "",
      country: profile.country || countries[0],
      mobile: profile.mobile || ""
    });
    setLoading(false);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleGender = (gender) => {
    setForm((prev) => ({ ...prev, gender }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.fullName.trim()) newErrors.fullName = "Full name is required.";
    if (!form.email.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) newErrors.email = "Valid email required.";
    if (!form.state.trim()) newErrors.state = "State/LGA/Town is required.";
    if (!form.mobile.trim() || !/^\+?\d{7,}$/.test(form.mobile)) newErrors.mobile = "Valid mobile number required.";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      const updated = updateProfile(form);
      if (onSave) onSave(updated);
    }
  };

  return (
    <form className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full" onSubmit={handleSubmit}>
      <div className="flex flex-col">
        <label className="block text-gray-700 font-medium mb-1">Full Name</label>
        <input
          type="text"
          name="fullName"
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-300 ${errors.fullName ? 'border-red-400' : ''}`}
          value={form.fullName}
          onChange={handleChange}
          required
        />
        {errors.fullName && <span className="text-xs text-red-500 mt-1">{errors.fullName}</span>}
      </div>
      <div className="flex flex-col">
        <label className="block text-gray-700 font-medium mb-1">Gender</label>
        <div className="flex gap-2">
          <button type="button" className={`flex-1 px-4 py-2 rounded border ${form.gender === "Male" ? "border-primary-500 text-primary-600 bg-primary-50" : "border-gray-300 text-gray-600"}`} onClick={() => handleGender("Male")}>Male</button>
          <button type="button" className={`flex-1 px-4 py-2 rounded border ${form.gender === "Female" ? "border-primary-500 text-primary-600 bg-primary-50" : "border-gray-300 text-gray-600"}`} onClick={() => handleGender("Female")}>Female</button>
        </div>
      </div>
      <div className="flex flex-col">
        <label className="block text-gray-700 font-medium mb-1">Email Address</label>
        <input
          type="email"
          name="email"
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-300 ${errors.email ? 'border-red-400' : ''}`}
          value={form.email}
          onChange={handleChange}
          required
        />
        {errors.email && <span className="text-xs text-red-500 mt-1">{errors.email}</span>}
      </div>
      <div className="flex flex-col">
        <label className="block text-gray-700 font-medium mb-1">State/LGA/Town</label>
        <input
          type="text"
          name="state"
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-300 ${errors.state ? 'border-red-400' : ''}`}
          value={form.state}
          onChange={handleChange}
          required
        />
        {errors.state && <span className="text-xs text-red-500 mt-1">{errors.state}</span>}
      </div>
      <div className="flex flex-col">
        <label className="block text-gray-700 font-medium mb-1">Country/Nationality</label>
        <select
          name="country"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-300"
          value={form.country}
          onChange={handleChange}
        >
          {countries.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>
      <div className="flex flex-col">
        <label className="block text-gray-700 font-medium mb-1">Mobile Number</label>
        <input
          type="text"
          name="mobile"
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-300 ${errors.mobile ? 'border-red-400' : ''}`}
          value={form.mobile}
          onChange={handleChange}
          required
        />
        {errors.mobile && <span className="text-xs text-red-500 mt-1">{errors.mobile}</span>}
      </div>
      <div className="md:col-span-2">
        <AdminButton type="submit" variant="primary" className="w-full py-3 mt-4 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition">Save Information</AdminButton>
      </div>
    </form>
  );
}
