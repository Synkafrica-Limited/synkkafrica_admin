"use client";
import React, { useState } from "react";
import BusinessSidebar from "@/lib/components/BusinessSidebar";
import BusinessHeader from "@/lib/components/BusinessHeader";
import EditProfile from "@/lib/components/EditProfile";
import AdminButton from "@/lib/ui/button";

export default function BusinessProfile() {
  const [showEdit, setShowEdit] = useState(false);
  const initialData = {
    fullName: "Emmanuel Oluwafemi Odeyale",
    gender: "Male",
    email: "eodeyale@synkkafrica.com",
    state: "Lagos state",
    country: "Nigeria",
    mobile: "+2348065017856"
  };
  const handleSave = (data) => {
    setShowEdit(false);
  };
  return (
  <div className="flex flex-col md:flex-row min-h-screen bg-gray-50 ">
      <BusinessSidebar active="Admin user" />
  <div className="flex-1 flex flex-col p-4 md:p-10">
        <BusinessHeader title="Profile" subtitle="Get the best of admin dashboard by updating your details" />
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 mt-4 md:mt-8">
          {/* Left profile card */}
          <div className="bg-white rounded-xl shadow p-4 md:p-8 flex flex-col items-center justify-center">
            <div className="w-28 h-28 rounded-full bg-gray-200 flex items-center justify-center text-3xl font-bold text-gray-500 mb-4">TM</div>
            <div className="text-lg font-semibold text-gray-800 mb-1">Temi Femi</div>
            <div className="text-sm text-primary-500 mb-2">eodeyale@synkkafrica.com</div>
          </div>
          {/* Right profile progress and details */}
          <div className="col-span-1 md:col-span-2 flex flex-col gap-4 md:gap-8">
            <div className="bg-white rounded-xl shadow p-4 md:p-6 mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-gray-800">Your Profile</span>
                <span className="text-sm text-gray-500">20%</span>
              </div>
              <div className="w-full h-2 bg-orange-100 rounded mb-4">
                <div className="h-2 bg-orange-400 rounded" style={{ width: '20%' }}></div>
              </div>
              <div className="text-gray-500 mb-4">Get the best of admin dashbaord by updating your details</div>
              <div className="flex gap-2">
                <AdminButton variant="secondary" className="flex-1 py-2 border-orange-400 text-orange-500 font-medium flex items-center justify-center gap-2"><span className="text-lg">&#9888;</span> Update image</AdminButton>
                <AdminButton variant="secondary" className="flex-1 py-2 border-orange-400 text-orange-500 font-medium flex items-center justify-center gap-2"><span className="text-lg">&#9888;</span> Complete information</AdminButton>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow p-4 md:p-6">
              <div className="font-semibold text-gray-800 mb-2">Complete your profile</div>
              <div className="text-gray-500 mb-4 text-sm">Basic information, for a faster booking experience</div>
              <div className="border border-orange-200 rounded-xl p-4 md:p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 mb-4">
                  <div>
                    <div className="text-xs text-gray-500 mb-1">First Name</div>
                    <div className="text-base text-gray-800">Temi</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Last Name</div>
                    <div className="text-base text-gray-800">Femi</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Middle Name <span className="text-gray-400">(optional)</span></div>
                    <div className="text-base text-gray-800">-</div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 mb-4">
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Gender</div>
                    <div className="text-base text-gray-800">Male</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">State/Town</div>
                    <div className="text-base text-gray-800">Lagos</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Email Address</div>
                    <div className="text-base text-gray-800">eodeyale@synkkafrica.com</div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 mb-4">
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Country</div>
                    <div className="text-base text-gray-800">Nigeria</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Phone Number</div>
                    <div className="text-base text-gray-800">+234 8065017856</div>
                  </div>
                  <div className="flex items-center justify-end">
                    <AdminButton variant="primary" className="px-4 py-2 border-orange-400 text-orange-500 font-medium" onClick={() => setShowEdit(true)}>Edit</AdminButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {showEdit && (
          <div className="fixed inset-0 bg-opacity-299 flex items-center justify-center z-50 px-2">
            <div className="bg-white rounded-xl shadow-xl p-4 md:p-6 max-w-xs md:max-w-xl w-full relative  flex flex-col justify-center">
              <button className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 text-lg" onClick={() => setShowEdit(false)}>&times;</button>
              <h2 className="text-xl font-bold text-gray-800 mb-2 text-center">Complete Profile Information</h2>
              <p className="text-gray-600 mb-6 text-center text-sm">This travel information will be used for all bookings within synkafrica. Please ensure your information matches your govt.ID used for travel.</p>
              <div className="flex flex-col items-center mb-4">
                <div className="w-30 h-30 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center mb-2">
                  <img src="/images/profile-placeholder.png" alt="Profile" className="object-cover w-full h-full" />
                </div>
                <AdminButton variant="secondary" className="flex items-center gap-2 px-4 py-2 shadow text-gray-700 font-medium"><span className="material-icons">Edit Photo</span></AdminButton>
              </div>
              <EditProfile initialData={initialData} onSave={handleSave} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
