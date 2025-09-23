'use client';

import React, { useState, useEffect } from 'react';
import {
    FaPlus,
    FaSearch,
    FaEdit,
    FaTrash,
    FaEye,
    FaToggleOn,
    FaToggleOff,
    FaCopy,
    FaUpload,
    FaUsers,
    FaStar,
    FaChartBar,
    FaCalendarAlt
} from 'react-icons/fa';
import CMSController from '../../../../controllers/technical/cms.controller.js';

export default function TechnicalCMSPage() {
    // State management for CMS
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [stats, setStats] = useState(null);
    
    // Filters and search
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedStatus, setSelectedStatus] = useState('All');
    const [selectedPackage, setSelectedPackage] = useState('All');
    const [sortBy, setSortBy] = useState('created_new');
    
    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    
    // Modal states
    const [showServiceForm, setShowServiceForm] = useState(false);
    const [showServiceDetails, setShowServiceDetails] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [editingService, setEditingService] = useState(null);
    const [actionType, setActionType] = useState('');
    const [actionTarget, setActionTarget] = useState(null);
    
    // Selection for bulk actions
    const [selectedServices, setSelectedServices] = useState([]);
    
    // Load initial data
    useEffect(() => {
        loadInitialData();
    }, []);
    
    const loadInitialData = async () => {
        try {
            setLoading(true);
            setError(null);
            
            // Load services and stats
            const [servicesResponse, statsResponse] = await Promise.all([
                CMSController.getAllServices(),
                CMSController.getStats()
            ]);
            
            // Handle response structure
            if (servicesResponse.success) {
                setServices(servicesResponse.data.services || []);
            } else {
                throw new Error(servicesResponse.message);
            }
            
            if (statsResponse.success) {
                setStats(statsResponse.data);
            } else {
                throw new Error(statsResponse.message);
            }
        } catch (err) {
            setError(err.message || 'Failed to load CMS data');
        } finally {
            setLoading(false);
        }
    };
    
    // Get unique categories and packages for filters
    const categories = [...new Set(services.map(service => service.category))];
    const packages = [...new Set(services.map(service => service.package))];
    
    // Filter and sort services
    const filteredServices = services
        .filter(service => {
            const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                service.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                service.productName.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = selectedCategory === 'All' || service.category === selectedCategory;
            const matchesStatus = selectedStatus === 'All' || service.status === selectedStatus;
            const matchesPackage = selectedPackage === 'All' || service.package === selectedPackage;
            
            return matchesSearch && matchesCategory && matchesStatus && matchesPackage;
        })
        .sort((a, b) => {
            switch (sortBy) {
                case 'created_new':
                    return new Date(b.createdAt) - new Date(a.createdAt);
                case 'created_old':
                    return new Date(a.createdAt) - new Date(b.createdAt);
                case 'name':
                    return a.name.localeCompare(b.name);
                case 'price_low':
                    return a.price - b.price;
                case 'price_high':
                    return b.price - a.price;
                case 'rating':
                    return b.rating - a.rating;
                case 'views':
                    return b.views - a.views;
                case 'bookings':
                    return b.bookings - a.bookings;
                default:
                    return 0;
            }
        });
    
    // ... (include all other handler functions from the original file)
    
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500"></div>
            </div>
        );
    }
    
    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading CMS</h2>
                    <p className="text-gray-600 mb-4">{error}</p>
                    <button
                        onClick={loadInitialData}
                        className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6">
            <div className="mb-8">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Content Management System</h1>
                        <p className="text-gray-600">Manage services and listings for the platform</p>
                    </div>
                    <button
                        className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 flex items-center space-x-2"
                    >
                        <FaPlus className="w-4 h-4" />
                        <span>Add Service</span>
                    </button>
                </div>

                {/* Stats Cards */}
                {stats && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <div className="bg-white p-6 rounded-lg shadow">
                            <div className="flex items-center">
                                <div className="p-3 bg-blue-100 rounded-lg">
                                    <FaChartBar className="w-6 h-6 text-blue-600" />
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm text-gray-600">Total Services</p>
                                    <p className="text-2xl font-bold text-gray-900">{stats.totalServices}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow">
                            <div className="flex items-center">
                                <div className="p-3 bg-green-100 rounded-lg">
                                    <FaToggleOn className="w-6 h-6 text-green-600" />
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm text-gray-600">Published</p>
                                    <p className="text-2xl font-bold text-gray-900">{stats.publishedServices}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow">
                            <div className="flex items-center">
                                <div className="p-3 bg-yellow-100 rounded-lg">
                                    <FaEye className="w-6 h-6 text-yellow-600" />
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm text-gray-600">Total Views</p>
                                    <p className="text-2xl font-bold text-gray-900">{stats.totalViews?.toLocaleString() || 0}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow">
                            <div className="flex items-center">
                                <div className="p-3 bg-purple-100 rounded-lg">
                                    <FaUsers className="w-6 h-6 text-purple-600" />
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm text-gray-600">Total Bookings</p>
                                    <p className="text-2xl font-bold text-gray-900">{stats.totalBookings}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">CMS Dashboard</h2>
                <p className="text-gray-600">The full CMS functionality will be restored here. Basic implementation is active.</p>
                
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                        <h3 className="font-medium text-blue-900">Services</h3>
                        <p className="text-2xl font-bold text-blue-600">{services.length}</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                        <h3 className="font-medium text-green-900">Categories</h3>
                        <p className="text-2xl font-bold text-green-600">{categories.length}</p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                        <h3 className="font-medium text-purple-900">Packages</h3>
                        <p className="text-2xl font-bold text-purple-600">{packages.length}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
