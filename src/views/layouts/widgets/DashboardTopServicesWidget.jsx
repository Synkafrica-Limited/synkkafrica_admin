"use client";
import React from "react";

/**
 * DashboardTopServicesWidget - Reusable top services/items list component
 * @param {String} title - Widget title
 * @param {Array} services - Array of service objects with { name, price }
 */
export default function DashboardTopServicesWidget({ 
    title = "Top service by price sold",
    services = []
}) {
    return (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">{title}</h2>
            <div className="space-y-3">
                {services.map((service, index) => (
                    <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                        <span className="text-sm text-gray-700">{service.name}</span>
                        <span className="text-sm font-semibold text-gray-900">{service.price}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
