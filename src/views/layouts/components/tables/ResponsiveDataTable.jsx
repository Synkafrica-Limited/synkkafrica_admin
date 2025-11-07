"use client";
import React from "react";

/**
 * Mobile-Responsive Data Table Component
 * Automatically switches between table view (desktop) and card view (mobile)
 * 
 * @param {Object} props
 * @param {Array} props.columns - Column definitions: [{ key, label, render?, className? }]
 * @param {Array} props.data - Data array
 * @param {function} props.renderActions - Function to render action buttons (data) => JSX
 * @param {function} props.onRowClick - Optional row click handler
 * @param {string} props.keyExtractor - Function to extract unique key from data item
 * @param {React.ReactNode} props.emptyState - Custom empty state component
 */
export default function ResponsiveDataTable({
    columns = [],
    data = [],
    renderActions,
    onRowClick,
    keyExtractor = (item, index) => item.id || index,
    emptyState
}) {
    if (data.length === 0) {
        return (
            <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                {emptyState || (
                    <div className="text-gray-500">
                        <p className="text-lg font-medium mb-2">No data available</p>
                        <p className="text-sm">There are no items to display at this time.</p>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
            {/* Desktop Table View */}
            <div className="hidden lg:block overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-gray-200">
                            {columns.map((column, index) => (
                                <th
                                    key={index}
                                    className={`text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider ${column.className || ''}`}
                                >
                                    {column.label}
                                </th>
                            ))}
                            {renderActions && (
                                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            )}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {data.map((item, rowIndex) => (
                            <tr
                                key={keyExtractor(item, rowIndex)}
                                onClick={() => onRowClick?.(item)}
                                className={`transition-colors ${onRowClick ? 'cursor-pointer hover:bg-gray-50' : 'hover:bg-gray-50'}`}
                            >
                                {columns.map((column, colIndex) => (
                                    <td key={colIndex} className={`py-4 px-4 ${column.cellClassName || ''}`}>
                                        {column.render 
                                            ? column.render(item[column.key], item, rowIndex)
                                            : item[column.key]
                                        }
                                    </td>
                                ))}
                                {renderActions && (
                                    <td className="py-4 px-4">
                                        {renderActions(item, rowIndex)}
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile Card View */}
            <div className="lg:hidden space-y-4">
                {data.map((item, index) => (
                    <div
                        key={keyExtractor(item, index)}
                        onClick={() => onRowClick?.(item)}
                        className={`border border-gray-200 rounded-lg p-4 transition-shadow ${
                            onRowClick ? 'cursor-pointer hover:shadow-md' : 'hover:shadow-md'
                        }`}
                    >
                        {/* Render each column as a row in the card */}
                        <div className="space-y-3">
                            {columns.map((column, colIndex) => (
                                <div key={colIndex} className="flex items-start gap-3">
                                    <span className="text-xs font-medium text-gray-500 uppercase min-w-[100px]">
                                        {column.label}:
                                    </span>
                                    <div className="flex-1 min-w-0 text-sm text-gray-900">
                                        {column.render 
                                            ? column.render(item[column.key], item, index)
                                            : item[column.key]
                                        }
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Actions */}
                        {renderActions && (
                            <div className="mt-4 pt-4 border-t border-gray-100">
                                {renderActions(item, index)}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
