"use client";
import React, { useState, useEffect } from "react";
import BusinessDashboard from "../(business)/dashboard/BusinessDashboard";
import TechnicalDashboard from "../(technical)/dashboard/TechnicalDashboard";

export default function DashboardPage() {
  const [userType, setUserType] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, you would determine user type from:
    // - Authentication context
    // - User session/token
    // - API call to get user role
    // - URL parameters or local storage
    
    // For demo purposes, check URL params or default to business
    const urlParams = new URLSearchParams(window.location.search);
    const type = urlParams.get('type') || 'business'; // Default to business
    
    setUserType(type);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // Render appropriate dashboard based on user type
  if (userType === 'technical') {
    return <TechnicalDashboard />;
  }

  // Default to business dashboard
  return <BusinessDashboard />;
}
