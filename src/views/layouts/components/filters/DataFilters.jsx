"use client";
import React from "react";
import { FaSearch, FaFilter, FaDownload } from "react-icons/fa";

/**
 * Reusable Data Filters Component
 * 
 * @param {Object} props
 * @param {string} props.searchQuery - Current search query value
 * @param {function} props.onSearchChange - Callback when search changes
 * @param {string} props.searchPlaceholder - Placeholder text for search input
 * @param {Array} props.filterGroups - Array of filter group objects
 * @param {boolean} props.showExport - Whether to show export button
 * @param {function} props.onExport - Callback when export is clicked
 * @param {boolean} props.showMoreFilters - Whether to show more filters button
 * @param {function} props.onMoreFilters - Callback when more filters is clicked
 * @param {React.ReactNode} props.customActions - Custom action buttons to display
 */
export default function DataFilters({
    searchQuery = "",
    onSearchChange,
    searchPlaceholder = "Search...",
    filterGroups = [],
    showExport = true,
    onExport,
    showMoreFilters = false,
    onMoreFilters,
    customActions,
}) {
    return (
        <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
            {/* Top Row: Actions and Search */}
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
                {/* Left Actions */}
                <div className="flex gap-2 sm:gap-3 flex-wrap w-full lg:w-auto">
                    {customActions}
                    {showExport && onExport && (
                        <button
                            onClick={onExport}
                            className="flex items-center gap-2 px-3 sm:px-4 py-2 border border-gray-300 text-gray-700 bg-white rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm"
                        >
                            <FaDownload className="text-sm" />
                            <span className="hidden sm:inline">Export Data</span>
                            <span className="sm:hidden">Export</span>
                        </button>
                    )}
                    {showMoreFilters && onMoreFilters && (
                        <button
                            onClick={onMoreFilters}
                            className="flex items-center gap-2 px-3 sm:px-4 py-2 border border-gray-300 text-gray-700 bg-white rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm"
                        >
                            <FaFilter className="text-sm" />
                            <span className="hidden sm:inline">More Filters</span>
                            <span className="sm:hidden">Filters</span>
                        </button>
                    )}
                </div>

                {/* Search */}
                {onSearchChange && (
                    <div className="flex gap-3 w-full lg:w-auto flex-wrap">
                        <div className="relative flex-1 lg:w-80 min-w-0">
                            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                            <input
                                type="text"
                                placeholder={searchPlaceholder}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none text-sm sm:text-base"
                                value={searchQuery}
                                onChange={(e) => onSearchChange(e.target.value)}
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* Filter Groups */}
            {filterGroups.length > 0 && (
                <div className="flex gap-3 sm:gap-4 flex-wrap">
                    {filterGroups.map((group, groupIndex) => (
                        <div key={groupIndex} className="flex gap-2 flex-wrap items-center w-full sm:w-auto">
                            <span className="text-xs sm:text-sm font-medium text-gray-700 py-2 whitespace-nowrap">
                                {group.label}:
                            </span>
                            <div className="flex gap-2 flex-wrap flex-1">
                                {group.options.map((option) => (
                                    <button
                                        key={option.value}
                                        onClick={() => group.onChange(option.value)}
                                        className={`px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
                                            group.value === option.value
                                                ? "bg-orange-500 text-white"
                                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                        }`}
                                    >
                                        {option.label}
                                        {option.count !== undefined && (
                                            <span className="ml-1 opacity-75">({option.count})</span>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
