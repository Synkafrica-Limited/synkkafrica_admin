"use client";
import React, { useState } from "react";
import BusinessSidebar from "./BusinessSidebar";
import BusinessHeader from "./BusinessHeader";

/**
 * Mobile-Responsive Dashboard Layout Wrapper
 * 
 * @param {Object} props
 * @param {string} props.activePage - Current active page for sidebar
 * @param {string} props.title - Page title for header
 * @param {string} props.subtitle - Page subtitle for header
 * @param {React.ReactNode} props.children - Page content
 * @param {function} props.onLogout - Logout handler
 */
export default function DashboardLayout({ 
    activePage, 
    title, 
    subtitle, 
    children,
    onLogout 
}) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleLogout = () => {
        if (onLogout) {
            onLogout();
        } else {
            // Default logout behavior
            if (typeof window !== 'undefined') {
                window.location.href = '/auth/sign-in';
            }
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}
            <BusinessSidebar 
                active={activePage}
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
                onLogout={handleLogout}
            />
            
            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Header */}
                <BusinessHeader 
                    title={title} 
                    subtitle={subtitle}
                    onMenuClick={() => setSidebarOpen(true)}
                />
                
                {/* Page Content */}
                <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
