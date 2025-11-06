import React, { useState, useEffect } from 'react';
import { FaTimes, FaUser, FaEnvelope, FaLock, FaBriefcase, FaUserTag, FaBuilding } from 'react-icons/fa';
import { roles, allPermissions, departments } from '@/models/entities/team.entity';

export default function TeamMemberModal({ isOpen, onClose, onSubmit, member = null, isLoading = false }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: '',
        department: '',
        permissions: []
    });

    const [selectedRole, setSelectedRole] = useState(null);

    useEffect(() => {
        if (member) {
            setFormData({
                name: member.name || '',
                email: member.email || '',
                password: '',
                role: member.role || '',
                department: member.department || '',
                permissions: member.permissions || []
            });
            const role = roles.find(r => r.name === member.role);
            setSelectedRole(role);
        } else {
            setFormData({
                name: '',
                email: '',
                password: '',
                role: '',
                department: '',
                permissions: []
            });
            setSelectedRole(null);
        }
    }, [member, isOpen]);

    const handleRoleChange = (roleName) => {
        const role = roles.find(r => r.name === roleName);
        setFormData({
            ...formData,
            role: roleName,
            permissions: role ? role.permissions : []
        });
        setSelectedRole(role);
    };

    const handlePermissionToggle = (permissionId) => {
        const newPermissions = formData.permissions.includes(permissionId)
            ? formData.permissions.filter(p => p !== permissionId)
            : [...formData.permissions, permissionId];
        
        setFormData({ ...formData, permissions: newPermissions });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const groupedPermissions = allPermissions.reduce((acc, permission) => {
        if (!acc[permission.category]) {
            acc[permission.category] = [];
        }
        acc[permission.category].push(permission);
        return acc;
    }, {});

    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 flex items-center justify-center z-50 p-4" 
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
            onClick={onClose}
        >
            <div 
                className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">
                            {member ? 'Edit Team Member' : 'Add New Team Member'}
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">
                            {member ? 'Update member details and permissions' : 'Create a new team member account'}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <FaTimes className="text-gray-500" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Basic Information */}
                        <div className="md:col-span-2">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                <FaUser className="inline mr-2 text-gray-400" />
                                Full Name
                            </label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                placeholder="Enter full name"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                <FaEnvelope className="inline mr-2 text-gray-400" />
                                Email Address
                            </label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                placeholder="email@synkkafrica.com"
                                required
                            />
                        </div>

                        {!member && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <FaLock className="inline mr-2 text-gray-400" />
                                    Password
                                </label>
                                <input
                                    type="password"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                    placeholder="Enter password"
                                    required={!member}
                                />
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                <FaBuilding className="inline mr-2 text-gray-400" />
                                Department
                            </label>
                            <select
                                value={formData.department}
                                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                required
                            >
                                <option value="">Select department</option>
                                {departments.map(dept => (
                                    <option key={dept} value={dept}>{dept}</option>
                                ))}
                            </select>
                        </div>

                        {/* Role Assignment */}
                        <div className="md:col-span-2 mt-4">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                <FaUserTag className="inline mr-2 text-orange-500" />
                                Role Assignment
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                {roles.map(role => (
                                    <button
                                        key={role.name}
                                        type="button"
                                        onClick={() => handleRoleChange(role.name)}
                                        className={`p-4 border-2 rounded-lg text-left transition-all ${
                                            formData.role === role.name
                                                ? 'border-orange-500 bg-orange-50'
                                                : 'border-gray-200 hover:border-orange-300'
                                        }`}
                                    >
                                        <div className="font-semibold text-gray-900">{role.name}</div>
                                        <div className="text-xs text-gray-500 mt-1">{role.description}</div>
                                        {formData.role === role.name && (
                                            <div className="mt-2 text-xs text-orange-600 font-medium">
                                                ✓ Selected
                                            </div>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Permissions */}
                        {formData.role && (
                            <div className="md:col-span-2 mt-4">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Permissions</h3>
                                <p className="text-sm text-gray-500 mb-4">
                                    Customize permissions for this role. Default permissions are pre-selected.
                                </p>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {Object.entries(groupedPermissions).map(([category, permissions]) => (
                                        <div key={category} className="bg-gray-50 rounded-lg p-4">
                                            <h4 className="font-semibold text-gray-900 mb-3">{category}</h4>
                                            <div className="space-y-2">
                                                {permissions.map(permission => (
                                                    <label key={permission.id} className="flex items-center gap-2 cursor-pointer">
                                                        <input
                                                            type="checkbox"
                                                            checked={formData.permissions.includes(permission.id)}
                                                            onChange={() => handlePermissionToggle(permission.id)}
                                                            className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                                                        />
                                                        <span className="text-sm text-gray-700">{permission.name}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 justify-end mt-8 pt-6 border-t border-gray-200">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isLoading}
                            className="px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading || !formData.role}
                            className="px-6 py-2 text-sm font-medium text-white bg-orange-500 rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <span className="flex items-center gap-2">
                                    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Processing...
                                </span>
                            ) : (
                                member ? 'Update Member' : 'Add Member'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
