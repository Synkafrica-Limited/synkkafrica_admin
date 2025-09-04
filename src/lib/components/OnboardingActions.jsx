import React from "react";
import { FaUser, FaUserPlus, FaHeadset, FaWhatsapp, FaEnvelope } from "react-icons/fa";

export default function OnboardingActions({ onProfile, onInvite, onAssignSupport }) {
  return (
    <div className="flex flex-wrap gap-4 mt-8">
      <button
        onClick={onProfile}
        className="flex items-center px-5 py-3 bg-primary-500 text-white rounded-lg shadow hover:bg-primary-600 transition"
      >
        <FaUser className="mr-2" /> Go to Profile
      </button>
      <button
        onClick={onInvite}
        className="flex items-center px-5 py-3 bg-primary-100 text-primary-700 rounded-lg shadow hover:bg-primary-200 transition"
      >
        <FaUserPlus className="mr-2" /> Add Team Member / Assign Role
      </button>
      <div className="flex gap-2">
        <button
          onClick={() => onAssignSupport('customer')}
          className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition"
        >
          <FaHeadset className="mr-2" /> Customer Support
        </button>
        <button
          onClick={() => onAssignSupport('vendor')}
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
        >
          <FaHeadset className="mr-2" /> Vendor Support
        </button>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => window.open('https://wa.me/1234567890', '_blank')}
          className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
        >
          <FaWhatsapp className="mr-2" /> WhatsApp Support
        </button>
        <button
          onClick={() => window.open('mailto:support@synkkafrica.com')}
          className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-lg shadow hover:bg-gray-300 transition"
        >
          <FaEnvelope className="mr-2" /> Email Support
        </button>
      </div>
    </div>
  );
}
