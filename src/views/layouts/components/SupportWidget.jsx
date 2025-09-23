"use client";
import React, { useState, useEffect } from 'react';
import { FaComments, FaTimes, FaPaperPlane, FaUser, FaHeadset } from 'react-icons/fa';
import { SupportController } from '../controllers/business/support.controller.js';

/**
 * Support Widget Component
 * A floating chat widget for customer support
 */
export default function SupportWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [currentTicket, setCurrentTicket] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [customerInfo, setCustomerInfo] = useState({
        name: '',
        email: '',
        subject: '',
        description: ''
    });
    const [chatStep, setChatStep] = useState('info'); // 'info', 'chat'
    const [isLoading, setIsLoading] = useState(false);
    
    const supportController = new SupportController();

    const handleStartChat = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Create new ticket
            const ticketResult = await supportController.createTicket({
                body: {
                    customerName: customerInfo.name,
                    customerEmail: customerInfo.email,
                    subject: customerInfo.subject,
                    description: customerInfo.description,
                    priority: 'Medium',
                    category: 'General'
                }
            });

            if (ticketResult.success) {
                setCurrentTicket(ticketResult.data);
                setChatStep('chat');
                
                // Add welcome message
                const welcomeMessage = {
                    id: 'welcome',
                    content: `Hello ${customerInfo.name}! Thank you for contacting support. We've created ticket #${ticketResult.data.ticketNumber} for you. An agent will be with you shortly.`,
                    senderType: 'system',
                    timestamp: new Date().toISOString()
                };
                setMessages([welcomeMessage]);
            }
        } catch (error) {
            console.error('Error starting chat:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim() || !currentTicket) return;

        const messageData = {
            ticketId: currentTicket.id,
            senderId: 'customer-id',
            senderName: customerInfo.name,
            senderType: 'customer',
            content: newMessage.trim()
        };

        try {
            const result = await supportController.createMessage(messageData);
            if (result.success) {
                setMessages(prev => [...prev, result.data]);
                setNewMessage('');
                
                // Simulate agent response after a delay
                setTimeout(() => {
                    const agentResponse = {
                        id: `agent-${Date.now()}`,
                        content: "Thank you for your message. I'm reviewing your request and will get back to you shortly.",
                        senderType: 'agent',
                        senderName: 'Support Agent',
                        timestamp: new Date().toISOString()
                    };
                    setMessages(prev => [...prev, agentResponse]);
                }, 2000);
            }
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    const resetChat = () => {
        setCurrentTicket(null);
        setMessages([]);
        setCustomerInfo({
            name: '',
            email: '',
            subject: '',
            description: ''
        });
        setChatStep('info');
    };

    const formatTime = (timestamp) => {
        return new Date(timestamp).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (!isOpen) {
        return (
            <div className="fixed bottom-6 right-6 z-50">
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
                >
                    <FaComments className="text-xl" />
                </button>
            </div>
        );
    }

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <div className={`bg-white rounded-lg shadow-xl border transition-all duration-300 ${
                isMinimized ? 'w-80 h-16' : 'w-80 h-96'
            }`}>
                {/* Header */}
                <div className="bg-blue-600 text-white p-4 rounded-t-lg flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <FaHeadset className="text-lg" />
                        <div>
                            <h3 className="font-medium">Support Chat</h3>
                            {currentTicket && (
                                <p className="text-xs opacity-75">#{currentTicket.ticketNumber}</p>
                            )}
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={() => setIsMinimized(!isMinimized)}
                            className="text-white hover:bg-blue-700 p-1 rounded"
                        >
                            {isMinimized ? '▲' : '▼'}
                        </button>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-white hover:bg-blue-700 p-1 rounded"
                        >
                            <FaTimes />
                        </button>
                    </div>
                </div>

                {/* Content */}
                {!isMinimized && (
                    <div className="flex flex-col h-80">
                        {chatStep === 'info' ? (
                            /* Customer Info Form */
                            <div className="p-4 flex-1 overflow-y-auto">
                                <h4 className="font-medium text-gray-900 mb-4">Start a conversation</h4>
                                <form onSubmit={handleStartChat} className="space-y-3">
                                    <input
                                        type="text"
                                        placeholder="Your name"
                                        value={customerInfo.name}
                                        onChange={(e) => setCustomerInfo(prev => ({ ...prev, name: e.target.value }))}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                        required
                                    />
                                    <input
                                        type="email"
                                        placeholder="Your email"
                                        value={customerInfo.email}
                                        onChange={(e) => setCustomerInfo(prev => ({ ...prev, email: e.target.value }))}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                        required
                                    />
                                    <input
                                        type="text"
                                        placeholder="Subject"
                                        value={customerInfo.subject}
                                        onChange={(e) => setCustomerInfo(prev => ({ ...prev, subject: e.target.value }))}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                        required
                                    />
                                    <textarea
                                        placeholder="How can we help you?"
                                        value={customerInfo.description}
                                        onChange={(e) => setCustomerInfo(prev => ({ ...prev, description: e.target.value }))}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none"
                                        rows="3"
                                        required
                                    />
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 text-sm"
                                    >
                                        {isLoading ? 'Starting chat...' : 'Start Chat'}
                                    </button>
                                </form>
                            </div>
                        ) : (
                            /* Chat Interface */
                            <>
                                <div className="flex-1 p-4 overflow-y-auto space-y-3">
                                    {messages.map((message) => (
                                        <div key={message.id} className={`flex ${
                                            message.senderType === 'customer' ? 'justify-end' : 'justify-start'
                                        }`}>
                                            <div className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                                                message.senderType === 'customer'
                                                    ? 'bg-blue-600 text-white'
                                                    : message.senderType === 'system'
                                                    ? 'bg-gray-100 text-gray-600 text-center'
                                                    : 'bg-gray-100 text-gray-900'
                                            }`}>
                                                <p>{message.content}</p>
                                                <p className={`text-xs mt-1 ${
                                                    message.senderType === 'customer' ? 'text-blue-100' : 'text-gray-500'
                                                }`}>
                                                    {formatTime(message.timestamp)}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="p-4 border-t">
                                    <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
                                        <input
                                            type="text"
                                            value={newMessage}
                                            onChange={(e) => setNewMessage(e.target.value)}
                                            placeholder="Type your message..."
                                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                        />
                                        <button
                                            type="submit"
                                            disabled={!newMessage.trim()}
                                            className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                                        >
                                            <FaPaperPlane className="text-sm" />
                                        </button>
                                    </form>
                                    
                                    <button
                                        onClick={resetChat}
                                        className="w-full mt-2 text-xs text-gray-500 hover:text-gray-700"
                                    >
                                        Start new conversation
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
