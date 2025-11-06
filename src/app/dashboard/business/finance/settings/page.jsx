"use client";
import React, { useState } from "react";
import { FaCog, FaPercentage, FaSave, FaUndo, FaCalculator, FaInfoCircle } from "react-icons/fa";
import BusinessSidebar from "@/views/layouts/components/business/BusinessSidebar";
import BusinessHeader from "@/views/layouts/components/business/BusinessHeader";
import { useToast } from "@/views/layouts/components/ToastContainer";

export default function FinanceSettingsPage() {
    const { showSuccess, showInfo } = useToast();

    // Commission Settings State
    const [settings, setSettings] = useState({
        vat: 7.5,
        serviceCharge: 5,
        platformFee: 10,
        gatewayFee: 1.5,
        minPayout: 5000,
        payoutFrequency: "weekly",
        autoApprovePayouts: false,
        refundProcessingDays: 5,
    });

    const [hasChanges, setHasChanges] = useState(false);

    // Sample Calculation
    const sampleAmount = 100000;
    const calculateBreakdown = (amount, config) => {
        const vat = (amount * config.vat) / 100;
        const serviceCharge = (amount * config.serviceCharge) / 100;
        const platformFee = (amount * config.platformFee) / 100;
        const gatewayFee = (amount * config.gatewayFee) / 100;
        const totalDeductions = vat + serviceCharge + platformFee + gatewayFee;
        const vendorPayout = amount - totalDeductions;

        return { vat, serviceCharge, platformFee, gatewayFee, totalDeductions, vendorPayout };
    };

    const breakdown = calculateBreakdown(sampleAmount, settings);

    const handleInputChange = (field, value) => {
        setSettings({ ...settings, [field]: value });
        setHasChanges(true);
    };

    const handleSave = () => {
        // Here you would make an API call to save the settings
        showSuccess("Finance settings updated successfully");
        setHasChanges(false);
    };

    const handleReset = () => {
        setSettings({
            vat: 7.5,
            serviceCharge: 5,
            platformFee: 10,
            gatewayFee: 1.5,
            minPayout: 5000,
            payoutFrequency: "weekly",
            autoApprovePayouts: false,
            refundProcessingDays: 5,
        });
        setHasChanges(false);
        showInfo("Settings reset to default values");
    };

    const formatCurrency = (amount) => {
        return `₦${amount.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            <div className="sticky top-0 h-screen">
                <BusinessSidebar active="Finance" onLogout={() => console.log('Logout')} />
            </div>
            <div className="flex-1 flex flex-col min-h-screen">
                <BusinessHeader title="Finance Settings" subtitle="Configure commission rates and payment settings" />

                <div className="flex-1 overflow-y-auto p-6">
                    <div className="max-w-5xl mx-auto">
                        {/* Commission Rates */}
                        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-3 bg-orange-50 rounded-lg">
                                    <FaPercentage className="text-orange-500 text-xl" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900">Commission Rates</h2>
                                    <p className="text-sm text-gray-500">Set platform fees and charges</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* VAT */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        VAT (%)
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            step="0.1"
                                            value={settings.vat}
                                            onChange={(e) => handleInputChange('vat', parseFloat(e.target.value))}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                                        />
                                        <FaPercentage className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">Value Added Tax</p>
                                </div>

                                {/* Service Charge */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Service Charge (%)
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            step="0.1"
                                            value={settings.serviceCharge}
                                            onChange={(e) => handleInputChange('serviceCharge', parseFloat(e.target.value))}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                                        />
                                        <FaPercentage className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">Platform service fee</p>
                                </div>

                                {/* Platform Fee */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Platform Fee (%)
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            step="0.1"
                                            value={settings.platformFee}
                                            onChange={(e) => handleInputChange('platformFee', parseFloat(e.target.value))}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                                        />
                                        <FaPercentage className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">Commission on transactions</p>
                                </div>

                                {/* Gateway Fee */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Gateway Fee (%)
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            step="0.1"
                                            value={settings.gatewayFee}
                                            onChange={(e) => handleInputChange('gatewayFee', parseFloat(e.target.value))}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                                        />
                                        <FaPercentage className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">Stripe processing fee</p>
                                </div>
                            </div>
                        </div>

                        {/* Payout Settings */}
                        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-3 bg-blue-50 rounded-lg">
                                    <FaCog className="text-blue-500 text-xl" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900">Payout Settings</h2>
                                    <p className="text-sm text-gray-500">Configure vendor payout preferences</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Minimum Payout */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Minimum Payout Amount (₦)
                                    </label>
                                    <input
                                        type="number"
                                        step="1000"
                                        value={settings.minPayout}
                                        onChange={(e) => handleInputChange('minPayout', parseFloat(e.target.value))}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">Minimum amount for vendor payouts</p>
                                </div>

                                {/* Payout Frequency */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Payout Frequency
                                    </label>
                                    <select
                                        value={settings.payoutFrequency}
                                        onChange={(e) => handleInputChange('payoutFrequency', e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    >
                                        <option value="daily">Daily</option>
                                        <option value="weekly">Weekly</option>
                                        <option value="biweekly">Bi-Weekly</option>
                                        <option value="monthly">Monthly</option>
                                    </select>
                                    <p className="text-xs text-gray-500 mt-1">How often vendors receive payouts</p>
                                </div>

                                {/* Refund Processing Days */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Refund Processing Days
                                    </label>
                                    <input
                                        type="number"
                                        step="1"
                                        value={settings.refundProcessingDays}
                                        onChange={(e) => handleInputChange('refundProcessingDays', parseInt(e.target.value))}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">Business days to process refunds</p>
                                </div>

                                {/* Auto Approve */}
                                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">Auto-Approve Payouts</p>
                                        <p className="text-xs text-gray-500 mt-1">Automatically approve eligible payouts</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={settings.autoApprovePayouts}
                                            onChange={(e) => handleInputChange('autoApprovePayouts', e.target.checked)}
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Calculation Example */}
                        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg border border-orange-200 p-6 mb-6">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-3 bg-white rounded-lg shadow-sm">
                                    <FaCalculator className="text-orange-500 text-xl" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900">Live Calculation Example</h2>
                                    <p className="text-sm text-gray-600">Based on current settings</p>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg p-5 shadow-sm">
                                <p className="text-sm text-gray-600 mb-4">
                                    <FaInfoCircle className="inline mr-2 text-blue-500" />
                                    Example calculation for a {formatCurrency(sampleAmount)} booking
                                </p>

                                <div className="space-y-3">
                                    <div className="flex justify-between items-center pb-2">
                                        <span className="text-sm font-medium text-gray-700">Booking Amount</span>
                                        <span className="text-sm font-bold text-gray-900">{formatCurrency(sampleAmount)}</span>
                                    </div>

                                    <div className="border-t pt-2 space-y-2">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-gray-600">VAT ({settings.vat}%)</span>
                                            <span className="text-sm text-red-600">- {formatCurrency(breakdown.vat)}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-gray-600">Service Charge ({settings.serviceCharge}%)</span>
                                            <span className="text-sm text-red-600">- {formatCurrency(breakdown.serviceCharge)}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-gray-600">Platform Fee ({settings.platformFee}%)</span>
                                            <span className="text-sm text-red-600">- {formatCurrency(breakdown.platformFee)}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-gray-600">Gateway Fee ({settings.gatewayFee}%)</span>
                                            <span className="text-sm text-red-600">- {formatCurrency(breakdown.gatewayFee)}</span>
                                        </div>
                                    </div>

                                    <div className="border-t pt-2">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm font-medium text-gray-700">Total Deductions</span>
                                            <span className="text-sm font-bold text-red-600">- {formatCurrency(breakdown.totalDeductions)}</span>
                                        </div>
                                    </div>

                                    <div className="border-t-2 border-orange-200 pt-3">
                                        <div className="flex justify-between items-center">
                                            <span className="text-base font-bold text-gray-900">Vendor Payout</span>
                                            <span className="text-lg font-bold text-green-600">{formatCurrency(breakdown.vendorPayout)}</span>
                                        </div>
                                        <p className="text-xs text-gray-500 mt-1 text-right">
                                            {((breakdown.vendorPayout / sampleAmount) * 100).toFixed(1)}% of booking amount
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={handleReset}
                                disabled={!hasChanges}
                                className={`flex items-center gap-2 px-6 py-2 rounded-lg transition-colors ${
                                    hasChanges
                                        ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                }`}
                            >
                                <FaUndo />
                                Reset
                            </button>
                            <button
                                onClick={handleSave}
                                disabled={!hasChanges}
                                className={`flex items-center gap-2 px-6 py-2 rounded-lg transition-colors ${
                                    hasChanges
                                        ? 'bg-orange-500 text-white hover:bg-orange-600'
                                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                }`}
                            >
                                <FaSave />
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
