import React, { useState } from 'react';
import { FaSearch, FaTimes, FaCheck } from 'react-icons/fa';
import { responseTemplates } from '@/models/entities/ticket-communication.entity';

export default function TemplateSelector({ onSelectTemplate, onClose }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    const categories = [
        { value: 'all', label: 'All Templates' },
        { value: 'payment', label: 'Payment' },
        { value: 'vendor', label: 'Vendor' },
        { value: 'technical', label: 'Technical' },
        { value: 'general', label: 'General' }
    ];

    const filteredTemplates = responseTemplates.filter(template => {
        const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            template.subject.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const handleSelectTemplate = (template) => {
        onSelectTemplate(template);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-full max-w-3xl max-h-[80vh] flex flex-col">
                {/* Header */}
                <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">Select Response Template</h3>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <FaTimes className="text-gray-500" />
                    </button>
                </div>

                {/* Search and Filter */}
                <div className="px-6 py-4 border-b border-gray-200 space-y-3">
                    <div className="relative">
                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search templates..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                    </div>

                    <div className="flex gap-2 overflow-x-auto pb-2">
                        {categories.map(category => (
                            <button
                                key={category.value}
                                onClick={() => setSelectedCategory(category.value)}
                                className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                    selectedCategory === category.value
                                        ? 'bg-orange-500 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                {category.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Templates List */}
                <div className="flex-1 overflow-y-auto p-6">
                    {filteredTemplates.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-gray-500">No templates found matching your search.</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {filteredTemplates.map(template => (
                                <div
                                    key={template.id}
                                    onClick={() => handleSelectTemplate(template)}
                                    className="border border-gray-200 rounded-lg p-4 hover:border-orange-500 hover:shadow-md transition-all cursor-pointer group"
                                >
                                    <div className="flex items-start justify-between mb-2">
                                        <div className="flex-1">
                                            <h4 className="font-semibold text-gray-900 group-hover:text-orange-500 transition-colors">
                                                {template.name}
                                            </h4>
                                            <p className="text-sm text-gray-600 mt-1">{template.subject}</p>
                                        </div>
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                            template.category === 'payment' ? 'bg-green-100 text-green-700' :
                                            template.category === 'vendor' ? 'bg-purple-100 text-purple-700' :
                                            template.category === 'technical' ? 'bg-blue-100 text-blue-700' :
                                            'bg-gray-100 text-gray-700'
                                        }`}>
                                            {template.category}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-600 line-clamp-2">{template.body}</p>
                                    
                                    {template.variables && template.variables.length > 0 && (
                                        <div className="mt-3 flex flex-wrap gap-2">
                                            <span className="text-xs text-gray-500">Variables:</span>
                                            {template.variables.map((variable, index) => (
                                                <span
                                                    key={index}
                                                    className="px-2 py-1 bg-orange-50 text-orange-700 rounded text-xs font-mono"
                                                >
                                                    {`{${variable}}`}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-600">
                            {filteredTemplates.length} template{filteredTemplates.length !== 1 ? 's' : ''} available
                        </p>
                        <button
                            onClick={onClose}
                            className="px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
