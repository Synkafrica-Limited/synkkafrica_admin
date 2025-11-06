"use client";

import React, { useState } from 'react';
import { 
    FaArrowLeft, 
    FaUser, 
    FaEnvelope, 
    FaPhone, 
    FaClock, 
    FaTag,
    FaFileAlt,
    FaRobot,
    FaHistory
} from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import TicketChatBox from '@/views/layouts/components/support/TicketChatBox';
import TemplateSelector from '@/views/layouts/components/support/TemplateSelector';
import QuickActionsPanel from '@/views/layouts/components/support/QuickActionsPanel';

export default function TicketDetailsPage({ params }) {
    const router = useRouter();
    const [showTemplates, setShowTemplates] = useState(false);
    const [activeTab, setActiveTab] = useState('chat');

    // Mock current agent
    const currentAgent = {
        id: 'agent-1',
        name: 'Sarah Johnson',
        email: 'sarah.johnson@synkkafrica.com'
    };

    // Mock ticket data - in real app, fetch based on params.ticketId
    const ticket = {
        id: params.ticketId || 'ticket-1',
        ticketNumber: '#TKT-10245',
        subject: 'Payment not received for booking #BK-5678',
        category: 'Payment',
        priority: 'High',
        status: 'In Progress',
        customerName: 'John Mensah',
        customerEmail: 'john.mensah@example.com',
        customerPhone: '+233 24 123 4567',
        createdAt: '2024-01-15T10:30:00',
        updatedAt: '2024-01-15T14:20:00',
        assignedAgent: 'Sarah Johnson',
        description: 'Customer reports payment was deducted but booking confirmation was not received.',
        relatedBooking: '#BK-5678',
        tags: ['payment', 'booking', 'urgent']
    };

    // Mock messages
    const [messages, setMessages] = useState([
        {
            id: 1,
            ticketId: 'ticket-1',
            senderId: 'customer-1',
            senderName: 'John Mensah',
            senderRole: 'customer',
            message: 'Hello, I made a payment for booking #BK-5678 yesterday but I haven\'t received any confirmation. The amount was deducted from my account.',
            messageType: 'text',
            attachments: [],
            isInternal: false,
            createdAt: '2024-01-15T10:30:00',
            readBy: ['agent-1']
        },
        {
            id: 2,
            ticketId: 'ticket-1',
            senderId: 'system',
            senderName: 'System',
            senderRole: 'system',
            message: 'Ticket assigned to Sarah Johnson',
            messageType: 'text',
            isInternal: false,
            createdAt: '2024-01-15T10:31:00'
        },
        {
            id: 3,
            ticketId: 'ticket-1',
            senderId: 'agent-1',
            senderName: 'Sarah Johnson',
            senderRole: 'agent',
            message: 'Hello John, thank you for contacting us. I\'m looking into your payment issue right now. Could you please provide the transaction reference number?',
            messageType: 'text',
            attachments: [],
            isInternal: false,
            createdAt: '2024-01-15T10:35:00',
            readBy: ['customer-1']
        },
        {
            id: 4,
            ticketId: 'ticket-1',
            senderId: 'agent-1',
            senderName: 'Sarah Johnson',
            senderRole: 'agent',
            message: 'Checking payment gateway logs - transaction appears to be pending on provider side.',
            messageType: 'text',
            attachments: [],
            isInternal: true,
            createdAt: '2024-01-15T10:36:00'
        },
        {
            id: 5,
            ticketId: 'ticket-1',
            senderId: 'customer-1',
            senderName: 'John Mensah',
            senderRole: 'customer',
            message: 'The transaction reference is TXN-20240115-7890. Here is the receipt from my bank.',
            messageType: 'file',
            attachments: [
                { name: 'bank_receipt.pdf', size: 245000, type: 'application/pdf', url: '#' }
            ],
            isInternal: false,
            createdAt: '2024-01-15T10:45:00',
            readBy: ['agent-1']
        },
        {
            id: 6,
            ticketId: 'ticket-1',
            senderId: 'agent-1',
            senderName: 'Sarah Johnson',
            senderRole: 'agent',
            message: 'Thank you! I\'ve verified the payment. I\'m processing your booking confirmation now. You should receive it within the next 10 minutes.',
            messageType: 'text',
            attachments: [],
            isInternal: false,
            createdAt: '2024-01-15T14:20:00'
        }
    ]);

    // Mock activity timeline
    const activityTimeline = [
        { action: 'Ticket created', user: 'John Mensah', timestamp: '2024-01-15T10:30:00' },
        { action: 'Assigned to Sarah Johnson', user: 'System', timestamp: '2024-01-15T10:31:00' },
        { action: 'Status changed to In Progress', user: 'Sarah Johnson', timestamp: '2024-01-15T10:35:00' },
        { action: 'Priority changed to High', user: 'Sarah Johnson', timestamp: '2024-01-15T10:36:00' },
        { action: 'File attached', user: 'John Mensah', timestamp: '2024-01-15T10:45:00' }
    ];

    const handleSendMessage = (message) => {
        setMessages([...messages, { ...message, id: messages.length + 1 }]);
    };

    const handleSelectTemplate = (template) => {
        // Replace variables in template with actual data
        let messageBody = template.body;
        messageBody = messageBody.replace('{customerName}', ticket.customerName);
        messageBody = messageBody.replace('{ticketNumber}', ticket.ticketNumber);
        messageBody = messageBody.replace('{agentName}', currentAgent.name);
        
        const newMessage = {
            id: messages.length + 1,
            ticketId: ticket.id,
            senderId: currentAgent.id,
            senderName: currentAgent.name,
            senderRole: 'agent',
            message: messageBody,
            messageType: 'text',
            attachments: [],
            isInternal: false,
            createdAt: new Date().toISOString()
        };
        
        setMessages([...messages, newMessage]);
    };

    const handleQuickAction = (action, ticket) => {
        console.log('Executing action:', action.id, 'for ticket:', ticket.ticketNumber);
        
        // Execute the action
        if (action.action) {
            // In real app, this would call an API
            const systemMessage = {
                id: messages.length + 1,
                ticketId: ticket.id,
                senderId: 'system',
                senderName: 'System',
                senderRole: 'system',
                message: `${action.label} executed`,
                messageType: 'text',
                isInternal: false,
                createdAt: new Date().toISOString()
            };
            setMessages([...messages, systemMessage]);
        }
    };

    const formatDateTime = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getStatusColor = (status) => {
        const colors = {
            'Open': 'bg-blue-100 text-blue-700',
            'In Progress': 'bg-yellow-100 text-yellow-700',
            'Resolved': 'bg-green-100 text-green-700',
            'Closed': 'bg-gray-100 text-gray-700'
        };
        return colors[status] || 'bg-gray-100 text-gray-700';
    };

    const getPriorityColor = (priority) => {
        const colors = {
            'Urgent': 'bg-red-100 text-red-700',
            'High': 'bg-orange-100 text-orange-700',
            'Medium': 'bg-yellow-100 text-yellow-700',
            'Low': 'bg-gray-100 text-gray-700'
        };
        return colors[priority] || 'bg-gray-100 text-gray-700';
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => router.back()}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <FaArrowLeft className="text-gray-600" />
                            </button>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">{ticket.ticketNumber}</h1>
                                <p className="text-gray-600 mt-1">{ticket.subject}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(ticket.priority)}`}>
                                {ticket.priority}
                            </span>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(ticket.status)}`}>
                                {ticket.status}
                            </span>
                            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                                <option>Change Status</option>
                                <option>Open</option>
                                <option>In Progress</option>
                                <option>Resolved</option>
                                <option>Closed</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column - Customer Info & Quick Actions */}
                    <div className="space-y-6">
                        {/* Customer Information */}
                        <div className="bg-white border border-gray-200 rounded-lg p-4">
                            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                <FaUser className="text-orange-500" />
                                Customer Information
                            </h3>
                            <div className="space-y-3">
                                <div>
                                    <div className="text-sm text-gray-600">Name</div>
                                    <div className="font-medium text-gray-900">{ticket.customerName}</div>
                                </div>
                                <div>
                                    <div className="text-sm text-gray-600 flex items-center gap-1">
                                        <FaEnvelope className="text-xs" />
                                        Email
                                    </div>
                                    <div className="font-medium text-gray-900">{ticket.customerEmail}</div>
                                </div>
                                <div>
                                    <div className="text-sm text-gray-600 flex items-center gap-1">
                                        <FaPhone className="text-xs" />
                                        Phone
                                    </div>
                                    <div className="font-medium text-gray-900">{ticket.customerPhone}</div>
                                </div>
                            </div>
                        </div>

                        {/* Ticket Details */}
                        <div className="bg-white border border-gray-200 rounded-lg p-4">
                            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                <FaFileAlt className="text-orange-500" />
                                Ticket Details
                            </h3>
                            <div className="space-y-3">
                                <div>
                                    <div className="text-sm text-gray-600">Category</div>
                                    <div className="font-medium text-gray-900">{ticket.category}</div>
                                </div>
                                <div>
                                    <div className="text-sm text-gray-600">Assigned Agent</div>
                                    <div className="font-medium text-gray-900">{ticket.assignedAgent}</div>
                                </div>
                                <div>
                                    <div className="text-sm text-gray-600 flex items-center gap-1">
                                        <FaClock className="text-xs" />
                                        Created
                                    </div>
                                    <div className="font-medium text-gray-900">{formatDateTime(ticket.createdAt)}</div>
                                </div>
                                <div>
                                    <div className="text-sm text-gray-600">Last Updated</div>
                                    <div className="font-medium text-gray-900">{formatDateTime(ticket.updatedAt)}</div>
                                </div>
                                {ticket.relatedBooking && (
                                    <div>
                                        <div className="text-sm text-gray-600">Related Booking</div>
                                        <div className="font-medium text-blue-600 hover:underline cursor-pointer">
                                            {ticket.relatedBooking}
                                        </div>
                                    </div>
                                )}
                                {ticket.tags && ticket.tags.length > 0 && (
                                    <div>
                                        <div className="text-sm text-gray-600 mb-2 flex items-center gap-1">
                                            <FaTag className="text-xs" />
                                            Tags
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {ticket.tags.map((tag, index) => (
                                                <span
                                                    key={index}
                                                    className="px-2 py-1 bg-orange-50 text-orange-700 rounded-full text-xs"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <QuickActionsPanel ticket={ticket} onExecuteAction={handleQuickAction} />
                    </div>

                    {/* Middle Column - Chat */}
                    <div className="lg:col-span-2">
                        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden" style={{ height: '750px' }}>
                            {/* Tabs */}
                            <div className="border-b border-gray-200 bg-gray-50">
                                <div className="flex">
                                    <button
                                        onClick={() => setActiveTab('chat')}
                                        className={`px-6 py-3 font-medium transition-colors ${
                                            activeTab === 'chat'
                                                ? 'text-orange-500 border-b-2 border-orange-500'
                                                : 'text-gray-600 hover:text-gray-900'
                                        }`}
                                    >
                                        Chat
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('activity')}
                                        className={`px-6 py-3 font-medium transition-colors ${
                                            activeTab === 'activity'
                                                ? 'text-orange-500 border-b-2 border-orange-500'
                                                : 'text-gray-600 hover:text-gray-900'
                                        }`}
                                    >
                                        Activity
                                    </button>
                                    <div className="flex-1"></div>
                                    <button
                                        onClick={() => setShowTemplates(true)}
                                        className="px-6 py-3 text-orange-500 hover:bg-orange-50 font-medium transition-colors flex items-center gap-2"
                                    >
                                        <FaRobot />
                                        Use Template
                                    </button>
                                </div>
                            </div>

                            {/* Tab Content */}
                            {activeTab === 'chat' ? (
                                <TicketChatBox
                                    ticket={ticket}
                                    messages={messages}
                                    onSendMessage={handleSendMessage}
                                    currentAgent={currentAgent}
                                    onClose={() => {}}
                                />
                            ) : (
                                <div className="p-6 overflow-y-auto" style={{ height: 'calc(750px - 53px)' }}>
                                    <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                        <FaHistory className="text-orange-500" />
                                        Activity Timeline
                                    </h3>
                                    <div className="space-y-4">
                                        {activityTimeline.map((activity, index) => (
                                            <div key={index} className="flex gap-3">
                                                <div className="flex flex-col items-center">
                                                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                                                    {index < activityTimeline.length - 1 && (
                                                        <div className="w-0.5 h-full bg-gray-300 mt-1"></div>
                                                    )}
                                                </div>
                                                <div className="flex-1 pb-4">
                                                    <div className="font-medium text-gray-900">{activity.action}</div>
                                                    <div className="text-sm text-gray-600 mt-1">
                                                        by {activity.user} • {formatDateTime(activity.timestamp)}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Template Selector Modal */}
            {showTemplates && (
                <TemplateSelector
                    onSelectTemplate={handleSelectTemplate}
                    onClose={() => setShowTemplates(false)}
                />
            )}
        </div>
    );
}
