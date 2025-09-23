'use client';

import React from 'react';
import { 
    FaTimes, 
    FaEdit, 
    FaStar, 
    FaEye, 
    FaUsers, 
    FaMapMarkerAlt, 
    FaDollarSign,
    FaCalendarAlt,
    FaToggleOn,
    FaToggleOff,
    FaCheckCircle,
    FaTimesCircle,
    FaChartLine
} from 'react-icons/fa';

export default function ServiceDetailsModal({ service, onClose, onEdit }) {
    if (!service) return null;

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Published':
                return 'bg-green-100 text-green-800';
            case 'Draft':
                return 'bg-yellow-100 text-yellow-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getCategoryColor = (category) => {
        const colors = {
            'Car': 'bg-blue-100 text-blue-800',
            'Beach': 'bg-cyan-100 text-cyan-800',
            'Dining': 'bg-purple-100 text-purple-800',
            'Laundry': 'bg-indigo-100 text-indigo-800',
            'Conveniences': 'bg-pink-100 text-pink-800'
        };
        return colors[category] || 'bg-gray-100 text-gray-800';
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">{service.name}</h2>
                        <p className="text-gray-600">{service.productName}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={onEdit}
                            className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 flex items-center space-x-2"
                        >
                            <FaEdit className="w-4 h-4" />
                            <span>Edit</span>
                        </button>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600"
                        >
                            <FaTimes className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                <div className="p-6">
                    {/* Status and Category Bar */}
                    <div className="flex items-center justify-between mb-6 p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-4">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(service.status)}`}>
                                {service.status}
                            </span>
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(service.category)}`}>
                                {service.category}
                            </span>
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                                {service.package}
                            </span>
                        </div>
                        <div className="text-right">
                            <div className="text-2xl font-bold text-gray-900">
                                {service.getFormattedPrice()}
                            </div>
                            {service.getOriginalPrice() && (
                                <div className="text-sm text-gray-500 line-through">
                                    {service.getOriginalPrice()}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Main Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Left Column - Service Info */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Basic Information */}
                            <div className="bg-white border border-gray-200 rounded-lg p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Service Information</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-500">Provider</label>
                                        <p className="mt-1 text-sm text-gray-900">{service.provider}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-500">Provider Email</label>
                                        <p className="mt-1 text-sm text-gray-900">{service.providerEmail}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-500">Contact Email</label>
                                        <p className="mt-1 text-sm text-gray-900">{service.email}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-500">Capacity</label>
                                        <p className="mt-1 text-sm text-gray-900">{service.capacity} person(s)</p>
                                    </div>
                                    {service.location && (
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-gray-500">Location</label>
                                            <p className="mt-1 text-sm text-gray-900 flex items-center">
                                                <FaMapMarkerAlt className="w-4 h-4 mr-2 text-gray-400" />
                                                {service.location}
                                            </p>
                                        </div>
                                    )}
                                    {service.description && (
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-gray-500">Description</label>
                                            <p className="mt-1 text-sm text-gray-900">{service.description}</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Features */}
                            <div className="bg-white border border-gray-200 rounded-lg p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Features</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex items-center">
                                        {service.features.greatDeal ? (
                                            <FaCheckCircle className="w-5 h-5 text-green-500 mr-2" />
                                        ) : (
                                            <FaTimesCircle className="w-5 h-5 text-gray-300 mr-2" />
                                        )}
                                        <span className={`text-sm ${service.features.greatDeal ? 'text-gray-900' : 'text-gray-500'}`}>
                                            Great Deal
                                        </span>
                                    </div>
                                    <div className="flex items-center">
                                        {service.features.airConditioning ? (
                                            <FaCheckCircle className="w-5 h-5 text-green-500 mr-2" />
                                        ) : (
                                            <FaTimesCircle className="w-5 h-5 text-gray-300 mr-2" />
                                        )}
                                        <span className={`text-sm ${service.features.airConditioning ? 'text-gray-900' : 'text-gray-500'}`}>
                                            Air Conditioning
                                        </span>
                                    </div>
                                    <div className="flex items-center">
                                        {service.features.unlimitedMileage ? (
                                            <FaCheckCircle className="w-5 h-5 text-green-500 mr-2" />
                                        ) : (
                                            <FaTimesCircle className="w-5 h-5 text-gray-300 mr-2" />
                                        )}
                                        <span className={`text-sm ${service.features.unlimitedMileage ? 'text-gray-900' : 'text-gray-500'}`}>
                                            Unlimited Mileage
                                        </span>
                                    </div>
                                    <div className="flex items-center">
                                        {service.features.automatic ? (
                                            <FaCheckCircle className="w-5 h-5 text-green-500 mr-2" />
                                        ) : (
                                            <FaTimesCircle className="w-5 h-5 text-gray-300 mr-2" />
                                        )}
                                        <span className={`text-sm ${service.features.automatic ? 'text-gray-900' : 'text-gray-500'}`}>
                                            Automatic
                                        </span>
                                    </div>
                                </div>

                                {service.hasGreatDeal() && (
                                    <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                                        <div className="flex items-center">
                                            <FaStar className="w-5 h-5 text-red-500 mr-2" />
                                            <span className="text-sm font-medium text-red-800">
                                                Great Deal - {service.getDiscountPercentage()}% off!
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Images */}
                            <div className="bg-white border border-gray-200 rounded-lg p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Images</h3>
                                {service.images && service.images.length > 0 ? (
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                        {service.images.map((image, index) => (
                                            <div key={index} className="relative">
                                                <img
                                                    src={image.url}
                                                    alt={image.alt || `Service image ${index + 1}`}
                                                    className="w-full h-32 object-cover rounded-lg"
                                                />
                                                {image.isPrimary && (
                                                    <div className="absolute top-2 left-2 bg-orange-500 text-white px-2 py-1 rounded text-xs font-medium">
                                                        Primary
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-8 text-gray-500">
                                        <p>No images uploaded yet</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Right Column - Performance & Metadata */}
                        <div className="space-y-6">
                            {/* Performance Metrics */}
                            <div className="bg-white border border-gray-200 rounded-lg p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <FaEye className="w-4 h-4 text-gray-400 mr-2" />
                                            <span className="text-sm text-gray-600">Views</span>
                                        </div>
                                        <span className="text-sm font-medium text-gray-900">{service.views.toLocaleString()}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <FaUsers className="w-4 h-4 text-gray-400 mr-2" />
                                            <span className="text-sm text-gray-600">Bookings</span>
                                        </div>
                                        <span className="text-sm font-medium text-gray-900">{service.bookings}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <FaStar className="w-4 h-4 text-yellow-500 mr-2" />
                                            <span className="text-sm text-gray-600">Rating</span>
                                        </div>
                                        <span className="text-sm font-medium text-gray-900">{service.rating}/5</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <FaChartLine className="w-4 h-4 text-gray-400 mr-2" />
                                            <span className="text-sm text-gray-600">Conversion</span>
                                        </div>
                                        <span className="text-sm font-medium text-gray-900">
                                            {service.views > 0 ? ((service.bookings / service.views) * 100).toFixed(1) : 0}%
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <FaDollarSign className="w-4 h-4 text-green-500 mr-2" />
                                            <span className="text-sm text-gray-600">Revenue</span>
                                        </div>
                                        <span className="text-sm font-medium text-gray-900">
                                            ${(service.bookings * (service.discountedPrice || service.normalPrice)).toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Reviews Summary */}
                            {service.reviews && service.reviews.length > 0 && (
                                <div className="bg-white border border-gray-200 rounded-lg p-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Reviews</h3>
                                    <div className="space-y-3">
                                        {service.reviews.slice(-3).map((review, index) => (
                                            <div key={index} className="border-b border-gray-100 last:border-b-0 pb-3 last:pb-0">
                                                <div className="flex items-center justify-between mb-1">
                                                    <span className="text-sm font-medium text-gray-900">{review.customerName}</span>
                                                    <div className="flex items-center">
                                                        <FaStar className="w-4 h-4 text-yellow-500 mr-1" />
                                                        <span className="text-sm text-gray-600">{review.rating}</span>
                                                    </div>
                                                </div>
                                                <p className="text-sm text-gray-600">{review.comment}</p>
                                                <p className="text-xs text-gray-400 mt-1">
                                                    {formatDate(review.createdAt)}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Metadata */}
                            <div className="bg-white border border-gray-200 rounded-lg p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Metadata</h3>
                                <div className="space-y-3">
                                    <div>
                                        <label className="block text-xs font-medium text-gray-500">Service ID</label>
                                        <p className="text-sm text-gray-900 font-mono">{service.id}</p>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-500">Created</label>
                                        <p className="text-sm text-gray-900">{formatDate(service.createdAt)}</p>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-500">Last Updated</label>
                                        <p className="text-sm text-gray-900">{formatDate(service.updatedAt)}</p>
                                    </div>
                                    {service.publishedAt && (
                                        <div>
                                            <label className="block text-xs font-medium text-gray-500">Published</label>
                                            <p className="text-sm text-gray-900">{formatDate(service.publishedAt)}</p>
                                        </div>
                                    )}
                                    <div>
                                        <label className="block text-xs font-medium text-gray-500">Availability</label>
                                        <p className="text-sm text-gray-900">{service.availability}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
