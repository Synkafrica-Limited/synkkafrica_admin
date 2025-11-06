"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaPlus, FaSearch, FaFilter, FaClock, FaUser, FaExclamationTriangle, FaCheckCircle, FaComments, FaPhone, FaEnvelope } from 'react-icons/fa';
import { SupportController } from '../../../../../controllers/business/support.controller.js';

export default function SupportDashboard() {
    const router = useRouter();
    const [tickets, setTickets] = useState([]);
    const [filteredTickets, setFilteredTickets] = useState([]);
    const [analytics, setAnalytics] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [priorityFilter, setPriorityFilter] = useState('All');
    const [isLoading, setIsLoading] = useState(true);
    const [showNewTicketModal, setShowNewTicketModal] = useState(false);
    
    const supportController = new SupportController();

    useEffect(() => {
        loadSupportData();
    }, []);

    useEffect(() => {
        filterTickets();
    }, [tickets, searchTerm, statusFilter, priorityFilter]);

    const loadSupportData = async () => {
        try {
            setIsLoading(true);
            
            // Load tickets
            const ticketsResult = await supportController.getAllTickets();
            if (ticketsResult.success) {
                setTickets(ticketsResult.data);
            }

            // Load analytics
            const analyticsResult = await supportController.getTicketAnalytics();
            if (analyticsResult.success) {
                setAnalytics(analyticsResult.data);
            }
        } catch (error) {
            console.error('Error loading support data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const filterTickets = () => {
        let filtered = tickets;

        // Search filter
        if (searchTerm) {
            filtered = filtered.filter(ticket =>
                ticket.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                ticket.ticketNumber.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Status filter
        if (statusFilter !== 'All') {
            filtered = filtered.filter(ticket => ticket.status === statusFilter);
        }

        // Priority filter
        if (priorityFilter !== 'All') {
            filtered = filtered.filter(ticket => ticket.priority === priorityFilter);
        }

        setFilteredTickets(filtered);
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'Low': return 'text-green-600 bg-green-100';
            case 'Medium': return 'text-yellow-600 bg-yellow-100';
            case 'High': return 'text-orange-600 bg-orange-100';
            case 'Urgent': return 'text-red-600 bg-red-100';
            default: return 'text-gray-600 bg-gray-100';
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Open': return 'text-blue-600 bg-blue-100';
            case 'In Progress': return 'text-yellow-600 bg-yellow-100';
            case 'Pending': return 'text-orange-600 bg-orange-100';
            case 'Resolved': return 'text-green-600 bg-green-100';
            case 'Closed': return 'text-gray-600 bg-gray-100';
            default: return 'text-gray-600 bg-gray-100';
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const StatCard = ({ title, value, icon, color, description }) => (
        <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-600">{title}</p>
                    <p className="text-2xl font-bold text-gray-900">{value}</p>
                    {description && <p className="text-xs text-gray-500 mt-1">{description}</p>}
                </div>
                <div className={`p-3 rounded-full ${color}`}>
                    {icon}
                </div>
            </div>
        </div>
    );

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading support dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Support Center</h1>
                    <p className="text-gray-600">Manage customer support tickets and conversations</p>
                </div>
                <button
                    onClick={() => setShowNewTicketModal(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
                >
                    <FaPlus />
                    <span>New Ticket</span>
                </button>
            </div>

            {/* Analytics Cards */}
            {analytics && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard
                        title="Total Tickets"
                        value={analytics.totalTickets}
                        icon={<FaComments className="text-blue-600" />}
                        color="bg-blue-100"
                        description="All time"
                    />
                    <StatCard
                        title="Open Tickets"
                        value={analytics.statusBreakdown.Open || 0}
                        icon={<FaClock className="text-orange-600" />}
                        color="bg-orange-100"
                        description="Awaiting response"
                    />
                    <StatCard
                        title="Avg Resolution"
                        value={`${analytics.averageResolutionTime}m`}
                        icon={<FaCheckCircle className="text-green-600" />}
                        color="bg-green-100"
                        description="Minutes"
                    />
                    <StatCard
                        title="Satisfaction"
                        value={`${analytics.customerSatisfaction}/5`}
                        icon={<FaUser className="text-purple-600" />}
                        color="bg-purple-100"
                        description="Average rating"
                    />
                </div>
            )}

            {/* Filters */}
            <div className="bg-white p-4 rounded-lg shadow-sm border">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                    <div className="relative flex-1 max-w-md">
                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search tickets, customers..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    
                    <div className="flex space-x-4">
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="All">All Status</option>
                            <option value="Open">Open</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Pending">Pending</option>
                            <option value="Resolved">Resolved</option>
                            <option value="Closed">Closed</option>
                        </select>
                        
                        <select
                            value={priorityFilter}
                            onChange={(e) => setPriorityFilter(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="All">All Priority</option>
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                            <option value="Urgent">Urgent</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Tickets Table */}
            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Ticket
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Customer
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Subject
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Priority
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Created
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredTickets.map((ticket) => (
                                <tr key={ticket.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">
                                            #{ticket.ticketNumber}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            {ticket.category}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                                                <FaUser className="text-white text-xs" />
                                            </div>
                                            <div>
                                                <div className="text-sm font-medium text-gray-900">
                                                    {ticket.customerName}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {ticket.customerEmail}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-gray-900 max-w-xs truncate">
                                            {ticket.subject}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(ticket.priority)}`}>
                                            {ticket.priority}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}>
                                            {ticket.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {formatDate(ticket.createdAt)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => {
                                                    // Open in new tab to avoid route conflicts
                                                    const chatUrl = `/settings/support/tickets/${ticket.id}`;
                                                    window.open(chatUrl, '_blank');
                                                }}
                                                className="text-blue-600 hover:text-blue-800"
                                                title="Open Chat"
                                            >
                                                <FaComments />
                                            </button>
                                            <button className="text-green-600 hover:text-green-800" title="Call Customer">
                                                <FaPhone />
                                            </button>
                                            <button className="text-purple-600 hover:text-purple-800" title="Send Email">
                                                <FaEnvelope />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredTickets.length === 0 && (
                    <div className="text-center py-12">
                        <FaComments className="text-gray-400 text-4xl mx-auto mb-4" />
                        <p className="text-gray-600">No tickets found matching your criteria</p>
                    </div>
                )}
            </div>
        </div>
    );
}
