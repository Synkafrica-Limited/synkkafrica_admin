'use client';

import React, { useState, useEffect } from 'react';
import { FaTimes, FaUpload, FaTrash, FaStar, FaToggleOn, FaToggleOff } from 'react-icons/fa';

export default function ServiceFormModal({ service, categories, packages, onSubmit, onClose }) {
    const [formData, setFormData] = useState({
        name: '',
        productName: '',
        provider: '',
        providerEmail: '',
        category: 'Choose category',
        package: 'Choose package',
        capacity: 1,
        normalPrice: '',
        discountedPrice: '',
        email: '',
        status: 'Draft',
        features: {
            greatDeal: false,
            airConditioning: false,
            unlimitedMileage: false,
            automatic: false
        },
        description: '',
        location: ''
    });

    const [errors, setErrors] = useState({});
    const [imageFiles, setImageFiles] = useState([]);

    useEffect(() => {
        if (service) {
            setFormData({
                name: service.name || '',
                productName: service.productName || '',
                provider: service.provider || '',
                providerEmail: service.providerEmail || '',
                category: service.category || 'Choose category',
                package: service.package || 'Choose package',
                capacity: service.capacity || 1,
                normalPrice: service.normalPrice || '',
                discountedPrice: service.discountedPrice || '',
                email: service.email || '',
                status: service.status || 'Draft',
                features: {
                    greatDeal: service.features?.greatDeal || false,
                    airConditioning: service.features?.airConditioning || false,
                    unlimitedMileage: service.features?.unlimitedMileage || false,
                    automatic: service.features?.automatic || false
                },
                description: service.description || '',
                location: service.location || ''
            });
        }
    }, [service]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        
        if (name.startsWith('features.')) {
            const featureName = name.split('.')[1];
            setFormData(prev => ({
                ...prev,
                features: {
                    ...prev.features,
                    [featureName]: checked
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: type === 'checkbox' ? checked : value
            }));
        }
        
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        setImageFiles(prev => [...prev, ...files]);
    };

    const removeImage = (index) => {
        setImageFiles(prev => prev.filter((_, i) => i !== index));
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Service name is required';
        }

        if (!formData.productName.trim()) {
            newErrors.productName = 'Product name is required';
        }

        if (!formData.provider.trim()) {
            newErrors.provider = 'Provider is required';
        }

        if (!formData.providerEmail.trim()) {
            newErrors.providerEmail = 'Provider email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.providerEmail)) {
            newErrors.providerEmail = 'Provider email is invalid';
        }

        if (formData.category === 'Choose category') {
            newErrors.category = 'Category is required';
        }

        if (formData.package === 'Choose package') {
            newErrors.package = 'Package is required';
        }

        if (!formData.normalPrice || formData.normalPrice <= 0) {
            newErrors.normalPrice = 'Valid price is required';
        }

        if (formData.discountedPrice && formData.discountedPrice >= formData.normalPrice) {
            newErrors.discountedPrice = 'Discounted price must be less than normal price';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        if (formData.capacity <= 0) {
            newErrors.capacity = 'Capacity must be greater than 0';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        // Convert string values to numbers
        const submitData = {
            ...formData,
            normalPrice: parseFloat(formData.normalPrice),
            discountedPrice: formData.discountedPrice ? parseFloat(formData.discountedPrice) : null,
            capacity: parseInt(formData.capacity)
        };

        onSubmit(submitData);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-900">
                        {service ? 'Edit Service' : 'Add New Service'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600"
                    >
                        <FaTimes className="w-6 h-6" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Service Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Service Name *
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                                    errors.name ? 'border-red-500' : 'border-gray-300'
                                }`}
                                placeholder="Enter service name"
                            />
                            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                        </div>

                        {/* Product Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Product Name *
                            </label>
                            <input
                                type="text"
                                name="productName"
                                value={formData.productName}
                                onChange={handleInputChange}
                                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                                    errors.productName ? 'border-red-500' : 'border-gray-300'
                                }`}
                                placeholder="e.g., Mercedes Benz Gle Coupe AMG"
                            />
                            {errors.productName && <p className="mt-1 text-sm text-red-600">{errors.productName}</p>}
                        </div>

                        {/* Provider */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Provider *
                            </label>
                            <input
                                type="text"
                                name="provider"
                                value={formData.provider}
                                onChange={handleInputChange}
                                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                                    errors.provider ? 'border-red-500' : 'border-gray-300'
                                }`}
                                placeholder="Provider name"
                            />
                            {errors.provider && <p className="mt-1 text-sm text-red-600">{errors.provider}</p>}
                        </div>

                        {/* Provider Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Provider Email *
                            </label>
                            <input
                                type="email"
                                name="providerEmail"
                                value={formData.providerEmail}
                                onChange={handleInputChange}
                                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                                    errors.providerEmail ? 'border-red-500' : 'border-gray-300'
                                }`}
                                placeholder="provider@example.com"
                            />
                            {errors.providerEmail && <p className="mt-1 text-sm text-red-600">{errors.providerEmail}</p>}
                        </div>

                        {/* Category */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Category *
                            </label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleInputChange}
                                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                                    errors.category ? 'border-red-500' : 'border-gray-300'
                                }`}
                            >
                                <option value="Choose category">Choose category</option>
                                {categories.map(category => (
                                    <option key={category} value={category}>{category}</option>
                                ))}
                            </select>
                            {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
                        </div>

                        {/* Package */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Package *
                            </label>
                            <select
                                name="package"
                                value={formData.package}
                                onChange={handleInputChange}
                                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                                    errors.package ? 'border-red-500' : 'border-gray-300'
                                }`}
                            >
                                <option value="Choose package">Choose package</option>
                                {packages.map(pkg => (
                                    <option key={pkg} value={pkg}>{pkg}</option>
                                ))}
                            </select>
                            {errors.package && <p className="mt-1 text-sm text-red-600">{errors.package}</p>}
                        </div>

                        {/* Capacity */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Capacity *
                            </label>
                            <input
                                type="number"
                                name="capacity"
                                value={formData.capacity}
                                onChange={handleInputChange}
                                min="1"
                                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                                    errors.capacity ? 'border-red-500' : 'border-gray-300'
                                }`}
                            />
                            {errors.capacity && <p className="mt-1 text-sm text-red-600">{errors.capacity}</p>}
                        </div>

                        {/* Normal Price */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Normal Price/Discounted Price *
                            </label>
                            <input
                                type="number"
                                name="normalPrice"
                                value={formData.normalPrice}
                                onChange={handleInputChange}
                                step="0.01"
                                min="0"
                                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                                    errors.normalPrice ? 'border-red-500' : 'border-gray-300'
                                }`}
                                placeholder="$125 / $100"
                            />
                            {errors.normalPrice && <p className="mt-1 text-sm text-red-600">{errors.normalPrice}</p>}
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email *
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                                    errors.email ? 'border-red-500' : 'border-gray-300'
                                }`}
                                placeholder="eodeyale@synkkafrica.com"
                            />
                            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                        </div>

                        {/* Status */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Status
                            </label>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            >
                                <option value="Draft">Draft</option>
                                <option value="Published">Published</option>
                            </select>
                        </div>

                        {/* Location */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Location
                            </label>
                            <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                placeholder="Lagos, Nigeria"
                            />
                        </div>

                        {/* Description */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Description
                            </label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                rows={4}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                placeholder="Describe the service..."
                            />
                        </div>
                    </div>

                    {/* Features */}
                    <div className="mt-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Features</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="features.greatDeal"
                                    checked={formData.features.greatDeal}
                                    onChange={handleInputChange}
                                    className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                                />
                                <label className="ml-2 text-sm text-gray-700">Great Deal</label>
                                {formData.features.greatDeal && (
                                    <FaToggleOn className="ml-2 text-orange-500" />
                                )}
                            </div>

                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="features.airConditioning"
                                    checked={formData.features.airConditioning}
                                    onChange={handleInputChange}
                                    className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                                />
                                <label className="ml-2 text-sm text-gray-700">A/C</label>
                                {formData.features.airConditioning && (
                                    <FaToggleOn className="ml-2 text-orange-500" />
                                )}
                            </div>

                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="features.unlimitedMileage"
                                    checked={formData.features.unlimitedMileage}
                                    onChange={handleInputChange}
                                    className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                                />
                                <label className="ml-2 text-sm text-gray-700">Unlimited Mileage</label>
                                {formData.features.unlimitedMileage && (
                                    <FaToggleOn className="ml-2 text-orange-500" />
                                )}
                            </div>

                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="features.automatic"
                                    checked={formData.features.automatic}
                                    onChange={handleInputChange}
                                    className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                                />
                                <label className="ml-2 text-sm text-gray-700">Automatic</label>
                                {formData.features.automatic && (
                                    <FaToggleOn className="ml-2 text-orange-500" />
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Image Upload */}
                    <div className="mt-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Add Pictures</h3>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                            <div className="text-center">
                                <FaUpload className="mx-auto h-12 w-12 text-gray-400" />
                                <div className="mt-4">
                                    <label htmlFor="images" className="cursor-pointer">
                                        <span className="mt-2 block text-sm font-medium text-gray-900">
                                            Add pictures
                                        </span>
                                        <input
                                            id="images"
                                            name="images"
                                            type="file"
                                            multiple
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                            className="sr-only"
                                        />
                                    </label>
                                    <p className="mt-1 text-xs text-gray-500">
                                        PNG, JPG, GIF up to 10MB each
                                    </p>
                                </div>
                            </div>

                            {/* Image Preview */}
                            {imageFiles.length > 0 && (
                                <div className="mt-4 grid grid-cols-3 gap-4">
                                    {imageFiles.map((file, index) => (
                                        <div key={index} className="relative">
                                            <img
                                                src={URL.createObjectURL(file)}
                                                alt={`Preview ${index + 1}`}
                                                className="h-24 w-full object-cover rounded-lg"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeImage(index)}
                                                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                                            >
                                                <FaTrash className="w-3 h-3" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Form Actions */}
                    <div className="flex items-center justify-end space-x-4 mt-8 pt-6 border-t border-gray-200">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                        >
                            {service ? 'Update Service' : 'Add Service'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
