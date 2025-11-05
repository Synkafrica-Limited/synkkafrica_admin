"use client";
import React, { useState } from "react";
import { FaSort, FaSortUp, FaSortDown, FaEllipsisV } from "react-icons/fa";

export default function DataTable({ 
  data = [], 
  columns = [], 
  selectable = false,
  selectedRows = [],
  onSelectionChange = () => {},
  searchable = false,
  searchTerm = "",
  onSearchChange = () => {},
  pagination = true,
  itemsPerPage = 10,
  responsive = true,
  emptyMessage = "No data available",
  loading = false
}) {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [showMobileActions, setShowMobileActions] = useState({});

  // Handle sorting
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Sort data
  const sortedData = React.useMemo(() => {
    if (!sortConfig.key) return data;
    
    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      
      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [data, sortConfig]);

  // Pagination
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = pagination ? sortedData.slice(startIndex, endIndex) : sortedData;

  // Handle row selection
  const handleSelectAll = (checked) => {
    if (checked) {
      onSelectionChange(currentData.map(row => row.id));
    } else {
      onSelectionChange([]);
    }
  };

  const handleSelectRow = (id, checked) => {
    if (checked) {
      onSelectionChange([...selectedRows, id]);
    } else {
      onSelectionChange(selectedRows.filter(rowId => rowId !== id));
    }
  };

  const isAllSelected = currentData.length > 0 && currentData.every(row => selectedRows.includes(row.id));
  const isIndeterminate = selectedRows.length > 0 && !isAllSelected;

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) {
      return <FaSort className="text-gray-400" />;
    }
    return sortConfig.direction === 'asc' ? 
      <FaSortUp className="text-orange-600" /> : 
      <FaSortDown className="text-orange-600" />;
  };

  const toggleMobileActions = (rowId) => {
    setShowMobileActions(prev => ({
      ...prev,
      [rowId]: !prev[rowId]
    }));
  };

  // Filter columns for mobile view
  const mobileColumns = columns.filter(col => col.showOnMobile !== false);
  const desktopOnlyColumns = columns.filter(col => col.showOnMobile === false);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600 mx-auto"></div>
        <p className="text-gray-500 mt-2">Loading...</p>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <p className="text-gray-500">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {/* Desktop Table */}
      <div className={`${responsive ? 'hidden lg:block' : ''} overflow-x-auto`}>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {selectable && (
                <th className="w-12 px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    ref={(input) => {
                      if (input) input.indeterminate = isIndeterminate;
                    }}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                  />
                </th>
              )}
              {columns.map((column) => (
                <th
                  key={column.accessor}
                  className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 ${column.className || ''}`}
                  onClick={() => column.sortable !== false && handleSort(column.accessor)}
                >
                  <div className="flex items-center space-x-1">
                    <span>{column.header}</span>
                    {column.sortable !== false && getSortIcon(column.accessor)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentData.map((row, index) => (
              <tr 
                key={row.id || index} 
                className={`hover:bg-gray-50 ${selectedRows.includes(row.id) ? 'bg-orange-50' : ''}`}
              >
                {selectable && (
                  <td className="w-12 px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(row.id)}
                      onChange={(e) => handleSelectRow(row.id, e.target.checked)}
                      className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                    />
                  </td>
                )}
                {columns.map((column) => (
                  <td key={column.accessor} className={`px-6 py-4 whitespace-nowrap text-sm text-gray-900 ${column.cellClassName || ''}`}>
                    {column.cell ? 
                      column.cell(row[column.accessor], row) : 
                      row[column.accessor]
                    }
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      {responsive && (
        <div className="lg:hidden">
          {currentData.map((row, index) => (
            <div key={row.id || index} className={`border-b border-gray-200 p-4 ${selectedRows.includes(row.id) ? 'bg-orange-50' : ''}`}>
              {selectable && (
                <div className="flex items-center mb-3">
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(row.id)}
                    onChange={(e) => handleSelectRow(row.id, e.target.checked)}
                    className="rounded border-gray-300 text-orange-600 focus:ring-orange-500 mr-2"
                  />
                  <span className="text-sm text-gray-500">Select item</span>
                </div>
              )}
              
              {/* Primary column (first mobile column) */}
              {mobileColumns[0] && (
                <div className="mb-3">
                  {mobileColumns[0].cell ? 
                    mobileColumns[0].cell(row[mobileColumns[0].accessor], row) : 
                    <div className="font-medium text-gray-900">{row[mobileColumns[0].accessor]}</div>
                  }
                </div>
              )}
              
              {/* Secondary information */}
              <div className="space-y-2">
                {mobileColumns.slice(1).map((column) => (
                  <div key={column.accessor} className="flex justify-between items-center text-sm">
                    <span className="text-gray-500 font-medium">{column.header}:</span>
                    <span className="text-gray-900">
                      {column.cell ? 
                        column.cell(row[column.accessor], row) : 
                        row[column.accessor]
                      }
                    </span>
                  </div>
                ))}
              </div>
              
              {/* Actions for mobile */}
              {columns.find(col => col.accessor === 'actions') && (
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500 font-medium">Actions</span>
                    <button
                      onClick={() => toggleMobileActions(row.id)}
                      className="p-1 text-gray-400 hover:text-gray-600"
                    >
                      <FaEllipsisV />
                    </button>
                  </div>
                  {showMobileActions[row.id] && (
                    <div className="mt-2">
                      {columns.find(col => col.accessor === 'actions').cell(null, row)}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {pagination && totalPages > 1 && (
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="flex-1 flex justify-between sm:hidden">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
                <span className="font-medium">{Math.min(endIndex, sortedData.length)}</span> of{' '}
                <span className="font-medium">{sortedData.length}</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNumber;
                  if (totalPages <= 5) {
                    pageNumber = i + 1;
                  } else if (currentPage <= 3) {
                    pageNumber = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNumber = totalPages - 4 + i;
                  } else {
                    pageNumber = currentPage - 2 + i;
                  }
                  
                  return (
                    <button
                      key={pageNumber}
                      onClick={() => setCurrentPage(pageNumber)}
                      className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                        currentPage === pageNumber
                          ? 'z-10 bg-orange-50 border-orange-500 text-orange-600'
                          : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      {pageNumber}
                    </button>
                  );
                })}
                
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
