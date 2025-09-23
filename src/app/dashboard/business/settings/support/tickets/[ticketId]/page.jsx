"use client";
import React, { useState, useEffect, useRef, use } from 'react';
import { FaPaperPlane, FaPaperclip, FaPhone, FaVideo, FaEllipsisV, FaClock, FaUser, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';

// Simplified version for debugging
export default function SupportTicketChat({ params }) {
    const { ticketId } = use(params);
    const [ticket, setTicket] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Debug logging
    console.log('SupportTicketChat rendered with ticketId:', ticketId);

    useEffect(() => {
        // Simulate loading ticket data
        const loadMockData = async () => {
            try {
                setIsLoading(true);
                setError(null);
                
                // Mock data for testing
                setTimeout(() => {
                    setTicket({
                        id: ticketId,
                        ticketNumber: `SP-2025-${ticketId}`,
                        customerName: 'Test Customer',
                        customerEmail: 'test@example.com',
                        subject: 'Test Support Ticket',
                        priority: 'Medium',
                        status: 'Open',
                        category: 'General'
                    });
                    
                    setMessages([
                        {
                            id: '1',
                            content: 'Hello, I need help with my issue.',
                            senderType: 'customer',
                            timestamp: new Date(Date.now() - 3600000).toISOString()
                        },
                        {
                            id: '2',
                            content: 'Hello! I\'m here to help you. What seems to be the problem?',
                            senderType: 'agent',
                            timestamp: new Date(Date.now() - 3300000).toISOString()
                        }
                    ]);
                    
                    setIsLoading(false);
                }, 1000);
            } catch (error) {
                console.error('Error loading ticket data:', error);
                setError(error.message);
                setIsLoading(false);
            }
        };
        
        loadMockData();
    }, [ticketId]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        const newMsg = {
            id: Date.now().toString(),
            content: newMessage.trim(),
            senderType: 'agent',
            timestamp: new Date().toISOString()
        };

        setMessages(prev => [...prev, newMsg]);
        setNewMessage('');
    };

    const formatTime = (timestamp) => {
        return new Date(timestamp).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading conversation...</p>
                    <p className="text-sm text-gray-500">Ticket ID: {ticketId}</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="text-center">
                    <FaExclamationTriangle className="text-red-500 text-4xl mx-auto mb-4" />
                    <p className="text-gray-600">Error loading ticket</p>
                    <p className="text-sm text-red-500">{error}</p>
                </div>
            </div>
        );
    }

    if (!ticket) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="text-center">
                    <FaExclamationTriangle className="text-red-500 text-4xl mx-auto mb-4" />
                    <p className="text-gray-600">Ticket not found</p>
                    <p className="text-sm text-gray-500">Ticket ID: {ticketId}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex h-screen bg-white">
            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col">
                {/* Chat Header */}
                <div className="border-b bg-white p-4 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                            <FaUser className="text-white" />
                        </div>
                        <div>
                            <h2 className="font-semibold text-gray-900">{ticket.customerName}</h2>
                            <p className="text-sm text-gray-500">Ticket #{ticket.ticketNumber}</p>
                        </div>
                        <div className="flex space-x-2">
                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-600">
                                {ticket.priority}
                            </span>
                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-600">
                                {ticket.status}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((message) => (
                        <div key={message.id} className={`flex ${message.senderType === 'agent' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                                message.senderType === 'agent' 
                                    ? 'bg-blue-500 text-white' 
                                    : 'bg-gray-100 text-gray-900'
                            }`}>
                                <p className="text-sm">{message.content}</p>
                                <p className={`text-xs mt-1 ${
                                    message.senderType === 'agent' ? 'text-blue-100' : 'text-gray-500'
                                }`}>
                                    {formatTime(message.timestamp)}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Message Input */}
                <div className="border-t p-4">
                    <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
                        <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Type your message..."
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            type="submit"
                            disabled={!newMessage.trim()}
                            className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
                        >
                            <FaPaperPlane />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
