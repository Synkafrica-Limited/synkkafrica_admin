"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import BusinessSidebar from "@/views/layouts/components/business/BusinessSidebar";
import BusinessHeader from "@/views/layouts/components/business/BusinessHeader";
import DataFilters from "@/views/layouts/components/filters/DataFilters";
import { useToast } from "@/views/layouts/components/ToastContainer";
import { supportTickets as initialTickets, supportAgents, ticketStatuses, ticketPriorities, ticketCategories } from "@/models/entities/support-tickets.entity";
import { FaTicketAlt, FaClock, FaCheckCircle, FaExclamationTriangle, FaUser, FaEye, FaEdit, FaUserPlus, FaStar, FaArrowUp, FaTimes } from "react-icons/fa";

export default function SupportPage() {
  const router = useRouter();
  const { showSuccess, showInfo, showError } = useToast();
  const [tickets, setTickets] = useState(initialTickets);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [showTicketDetails, setShowTicketDetails] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);

  // Stats
  const stats = {
    total: tickets.length,
    open: tickets.filter(t => t.status === "Open").length,
    inProgress: tickets.filter(t => t.status === "In Progress").length,
    pending: tickets.filter(t => t.status === "Pending").length,
    resolved: tickets.filter(t => t.status === "Resolved").length,
    urgent: tickets.filter(t => t.priority === "Urgent").length,
    escalated: tickets.filter(t => t.isEscalated).length,
  };

  // Filter groups
  const filterGroups = [
    {
      label: "Status",
      value: statusFilter,
      onChange: setStatusFilter,
      options: [
        { value: "all", label: "All", count: stats.total },
        { value: "Open", label: "Open", count: stats.open },
        { value: "In Progress", label: "In Progress", count: stats.inProgress },
        { value: "Pending", label: "Pending", count: stats.pending },
        { value: "Resolved", label: "Resolved", count: stats.resolved },
        { value: "Closed", label: "Closed", count: tickets.filter(t => t.status === "Closed").length },
      ]
    },
    {
      label: "Priority",
      value: priorityFilter,
      onChange: setPriorityFilter,
      options: [
        { value: "all", label: "All", count: stats.total },
        { value: "Urgent", label: "Urgent", count: stats.urgent },
        { value: "High", label: "High", count: tickets.filter(t => t.priority === "High").length },
        { value: "Medium", label: "Medium", count: tickets.filter(t => t.priority === "Medium").length },
        { value: "Low", label: "Low", count: tickets.filter(t => t.priority === "Low").length },
      ]
    }
  ];

  // Filtered tickets
  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = searchQuery === "" || 
      ticket.ticketNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || ticket.status === statusFilter;
    const matchesPriority = priorityFilter === "all" || ticket.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const handleExport = () => {
    showInfo("Exporting ticket data...");
  };

  const handleViewTicket = (ticket) => {
    router.push(`/dashboard/business/settings/support/tickets/${ticket.id}`);
  };

  const handleAssignTicket = (ticket) => {
    setSelectedTicket(ticket);
    setShowAssignModal(true);
  };

  const handleAssignAgent = (agentId) => {
    const agent = supportAgents.find(a => a.id === agentId);
    setTickets(tickets.map(t => 
      t.id === selectedTicket.id 
        ? { ...t, assignedTo: agentId, assignedAgent: agent.name, status: "In Progress", updatedAt: new Date().toISOString() }
        : t
    ));
    showSuccess(`Ticket assigned to ${agent.name}`);
    setShowAssignModal(false);
    setSelectedTicket(null);
  };

  const handleUpdateStatus = (ticketId, newStatus) => {
    setTickets(tickets.map(t => 
      t.id === ticketId 
        ? { 
            ...t, 
            status: newStatus, 
            updatedAt: new Date().toISOString(),
            resolvedAt: newStatus === "Resolved" ? new Date().toISOString() : t.resolvedAt
          }
        : t
    ));
    showSuccess(`Ticket status updated to ${newStatus}`);
  };

  const getPriorityBadge = (priority) => {
    const configs = {
      Urgent: { bg: "bg-red-100", text: "text-red-700", border: "border-red-200", icon: FaExclamationTriangle },
      High: { bg: "bg-orange-100", text: "text-orange-700", border: "border-orange-200", icon: FaArrowUp },
      Medium: { bg: "bg-yellow-100", text: "text-yellow-700", border: "border-yellow-200", icon: FaClock },
      Low: { bg: "bg-blue-100", text: "text-blue-700", border: "border-blue-200", icon: FaClock },
    };
    const config = configs[priority] || configs.Medium;
    const Icon = config.icon;
    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${config.bg} ${config.text} ${config.border}`}>
        <Icon className="text-xs" />
        {priority}
      </span>
    );
  };

  const getStatusBadge = (status) => {
    const configs = {
      Open: { bg: "bg-blue-100", text: "text-blue-700", border: "border-blue-200" },
      "In Progress": { bg: "bg-purple-100", text: "text-purple-700", border: "border-purple-200" },
      Pending: { bg: "bg-yellow-100", text: "text-yellow-700", border: "border-yellow-200" },
      Resolved: { bg: "bg-green-100", text: "text-green-700", border: "border-green-200" },
      Closed: { bg: "bg-gray-100", text: "text-gray-700", border: "border-gray-200" },
    };
    const config = configs[status] || configs.Open;
    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${config.bg} ${config.text} ${config.border}`}>
        <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
        {status}
      </span>
    );
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (hours < 1) {
      const minutes = Math.floor(diff / (1000 * 60));
      return `${minutes} min ago`;
    } else if (hours < 24) {
      return `${hours} hours ago`;
    } else {
      const days = Math.floor(hours / 24);
      return `${days} day${days > 1 ? 's' : ''} ago`;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="sticky top-0 h-screen">
        <BusinessSidebar active="Settings" />
      </div>
      <div className="flex-1 flex flex-col min-h-screen">
        <BusinessHeader 
          title="Support Center" 
          subtitle="Manage customer support tickets and agents" 
        />
        
        <div className="flex-1 overflow-y-auto p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-6">
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center gap-2 mb-2">
                <FaTicketAlt className="text-blue-600" />
                <h3 className="text-xs font-medium text-gray-600">Total</h3>
              </div>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center gap-2 mb-2">
                <FaClock className="text-blue-600" />
                <h3 className="text-xs font-medium text-gray-600">Open</h3>
              </div>
              <p className="text-2xl font-bold text-gray-900">{stats.open}</p>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center gap-2 mb-2">
                <FaClock className="text-purple-600" />
                <h3 className="text-xs font-medium text-gray-600">In Progress</h3>
              </div>
              <p className="text-2xl font-bold text-gray-900">{stats.inProgress}</p>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center gap-2 mb-2">
                <FaClock className="text-yellow-600" />
                <h3 className="text-xs font-medium text-gray-600">Pending</h3>
              </div>
              <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center gap-2 mb-2">
                <FaCheckCircle className="text-green-600" />
                <h3 className="text-xs font-medium text-gray-600">Resolved</h3>
              </div>
              <p className="text-2xl font-bold text-gray-900">{stats.resolved}</p>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center gap-2 mb-2">
                <FaExclamationTriangle className="text-red-600" />
                <h3 className="text-xs font-medium text-gray-600">Urgent</h3>
              </div>
              <p className="text-2xl font-bold text-gray-900">{stats.urgent}</p>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center gap-2 mb-2">
                <FaArrowUp className="text-orange-600" />
                <h3 className="text-xs font-medium text-gray-600">Escalated</h3>
              </div>
              <p className="text-2xl font-bold text-gray-900">{stats.escalated}</p>
            </div>
          </div>

          {/* Support Agents */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Support Agents</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {supportAgents.map(agent => (
                <div key={agent.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <img src={agent.avatar} alt={agent.name} className="w-12 h-12 rounded-full" />
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{agent.name}</div>
                    <div className="text-xs text-gray-500">{agent.role}</div>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-xs text-gray-600">{agent.assignedTickets} tickets</span>
                      <span className="text-xs text-gray-600">•</span>
                      <span className="text-xs text-green-600 flex items-center gap-1">
                        <FaStar className="text-xs" />
                        {agent.satisfaction}
                      </span>
                    </div>
                  </div>
                  <div>
                    {agent.status === "available" ? (
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                        Available
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs">
                        <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                        Busy
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Filters */}
          <DataFilters 
            searchQuery={searchQuery}
            onSearchChange={(value) => setSearchQuery(value)}
            searchPlaceholder="Search by ticket #, customer, subject, or category"
            filterGroups={filterGroups}
            showExport={true}
            onExport={handleExport}
          />

          {/* Tickets Table */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Ticket</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned To</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredTickets.length === 0 ? (
                    <tr>
                      <td colSpan="9" className="py-12 text-center text-gray-500">
                        <FaTicketAlt className="mx-auto text-4xl text-gray-300 mb-3" />
                        <p className="text-sm">No tickets found</p>
                      </td>
                    </tr>
                  ) : (
                    filteredTickets.map((ticket) => (
                      <tr key={ticket.id} className="hover:bg-gray-50 transition-colors">
                        <td className="py-4 px-4">
                          <div>
                            <div className="font-medium text-gray-900">{ticket.ticketNumber}</div>
                            {ticket.isEscalated && (
                              <span className="text-xs text-red-600 flex items-center gap-1 mt-1">
                                <FaArrowUp className="text-xs" />
                                Escalated
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div>
                            <div className="font-medium text-gray-900">{ticket.customerName}</div>
                            <div className="text-xs text-gray-500">{ticket.customerEmail}</div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="max-w-xs">
                            <div className="font-medium text-gray-900 truncate">{ticket.subject}</div>
                            <div className="text-xs text-gray-500 truncate">{ticket.description}</div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-sm text-gray-700">{ticket.category}</span>
                        </td>
                        <td className="py-4 px-4">
                          {getPriorityBadge(ticket.priority)}
                        </td>
                        <td className="py-4 px-4">
                          {getStatusBadge(ticket.status)}
                        </td>
                        <td className="py-4 px-4">
                          {ticket.assignedAgent ? (
                            <div className="flex items-center gap-2">
                              <FaUser className="text-gray-400 text-xs" />
                              <span className="text-sm text-gray-700">{ticket.assignedAgent}</span>
                            </div>
                          ) : (
                            <button
                              onClick={() => handleAssignTicket(ticket)}
                              className="text-sm text-orange-600 hover:text-orange-700 font-medium flex items-center gap-1"
                            >
                              <FaUserPlus className="text-xs" />
                              Assign
                            </button>
                          )}
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-sm text-gray-600">{formatDate(ticket.updatedAt)}</span>
                        </td>
                        <td className="py-4 px-4">
                          <button
                            onClick={() => handleViewTicket(ticket)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="View details"
                          >
                            <FaEye />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Assign Agent Modal */}
      {showAssignModal && selectedTicket && (
        <div 
          className="fixed inset-0 flex items-center justify-center z-50 p-4" 
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          onClick={() => {
            setShowAssignModal(false);
            setSelectedTicket(null);
          }}
        >
          <div 
            className="bg-white rounded-lg max-w-md w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="border-b border-gray-200 px-6 py-4">
              <h3 className="text-lg font-bold text-gray-900">Assign Ticket</h3>
              <p className="text-sm text-gray-500 mt-1">Select an agent for {selectedTicket.ticketNumber}</p>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                {supportAgents.map(agent => (
                  <button
                    key={agent.id}
                    onClick={() => handleAssignAgent(agent.id)}
                    className="w-full flex items-center gap-4 p-4 border-2 border-gray-200 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-all"
                  >
                    <img src={agent.avatar} alt={agent.name} className="w-10 h-10 rounded-full" />
                    <div className="flex-1 text-left">
                      <div className="font-medium text-gray-900">{agent.name}</div>
                      <div className="text-xs text-gray-500">{agent.assignedTickets} tickets • Avg: {agent.avgResponseTime}</div>
                    </div>
                    {agent.status === "available" && (
                      <span className="text-xs text-green-600 font-medium">Available</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
            <div className="border-t border-gray-200 px-6 py-4 flex justify-end">
              <button
                onClick={() => {
                  setShowAssignModal(false);
                  setSelectedTicket(null);
                }}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Ticket Details Modal */}
      {showTicketDetails && selectedTicket && (
        <div 
          className="fixed inset-0 flex items-center justify-center z-50 p-4" 
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          onClick={() => {
            setShowTicketDetails(false);
            setSelectedTicket(null);
          }}
        >
          <div 
            className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-gray-900">{selectedTicket.ticketNumber}</h3>
                <p className="text-sm text-gray-500 mt-1">{selectedTicket.subject}</p>
              </div>
              <button
                onClick={() => {
                  setShowTicketDetails(false);
                  setSelectedTicket(null);
                }}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <FaTimes className="text-gray-500" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</label>
                  <div className="mt-2">
                    <div className="font-medium text-gray-900">{selectedTicket.customerName}</div>
                    <div className="text-sm text-gray-600">{selectedTicket.customerEmail}</div>
                    <div className="text-sm text-gray-600">{selectedTicket.customerPhone}</div>
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Details</label>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">Category:</span>
                      <span className="font-medium text-gray-900">{selectedTicket.category}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">Priority:</span>
                      {getPriorityBadge(selectedTicket.priority)}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">Status:</span>
                      {getStatusBadge(selectedTicket.status)}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Description</label>
                <p className="mt-2 text-gray-700 whitespace-pre-wrap">{selectedTicket.description}</p>
              </div>

              {selectedTicket.assignedAgent && (
                <div className="mb-6">
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned Agent</label>
                  <div className="mt-2 flex items-center gap-2">
                    <FaUser className="text-gray-400" />
                    <span className="text-gray-900">{selectedTicket.assignedAgent}</span>
                  </div>
                </div>
              )}

              <div className="mb-6">
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Timeline</label>
                <div className="mt-2 space-y-2 text-sm text-gray-600">
                  <div>Created: {new Date(selectedTicket.createdAt).toLocaleString()}</div>
                  <div>Last Updated: {new Date(selectedTicket.updatedAt).toLocaleString()}</div>
                  {selectedTicket.resolvedAt && (
                    <div>Resolved: {new Date(selectedTicket.resolvedAt).toLocaleString()}</div>
                  )}
                  {selectedTicket.responseTime && (
                    <div>Response Time: {selectedTicket.responseTime}</div>
                  )}
                  {selectedTicket.resolutionTime && (
                    <div>Resolution Time: {selectedTicket.resolutionTime}</div>
                  )}
                </div>
              </div>

              {selectedTicket.tags && selectedTicket.tags.length > 0 && (
                <div className="mb-6">
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Tags</label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {selectedTicket.tags.map((tag, index) => (
                      <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3 block">Update Status</label>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                  {ticketStatuses.map(status => (
                    <button
                      key={status}
                      onClick={() => handleUpdateStatus(selectedTicket.id, status)}
                      disabled={selectedTicket.status === status}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        selectedTicket.status === status
                          ? 'bg-orange-500 text-white cursor-default'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 px-6 py-4 flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowTicketDetails(false);
                  setSelectedTicket(null);
                }}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
