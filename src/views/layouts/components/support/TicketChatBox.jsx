import React, { useState, useRef, useEffect } from 'react';
import { FaPaperPlane, FaPaperclip, FaImage, FaTimes, FaRobot, FaClock, FaCheck, FaCheckDouble, FaExclamationCircle } from 'react-icons/fa';

export default function TicketChatBox({ 
    ticket, 
    messages = [], 
    onSendMessage, 
    currentAgent,
    onClose 
}) {
    const [newMessage, setNewMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [showTemplates, setShowTemplates] = useState(false);
    const [attachments, setAttachments] = useState([]);
    const [isInternal, setIsInternal] = useState(false);
    const messagesEndRef = useRef(null);
    const fileInputRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = () => {
        if (!newMessage.trim() && attachments.length === 0) return;

        const message = {
            ticketId: ticket.id,
            senderId: currentAgent.id,
            senderName: currentAgent.name,
            senderRole: 'agent',
            message: newMessage,
            messageType: attachments.length > 0 ? 'file' : 'text',
            attachments: attachments,
            isInternal: isInternal,
            createdAt: new Date().toISOString()
        };

        onSendMessage(message);
        setNewMessage('');
        setAttachments([]);
        setIsInternal(false);
    };

    const handleFileSelect = (e) => {
        const files = Array.from(e.target.files);
        const fileData = files.map(file => ({
            name: file.name,
            size: file.size,
            type: file.type,
            url: URL.createObjectURL(file)
        }));
        setAttachments([...attachments, ...fileData]);
    };

    const removeAttachment = (index) => {
        setAttachments(attachments.filter((_, i) => i !== index));
    };

    const quickReplies = [
        "We're investigating this issue.",
        "Could you provide more details?",
        "This has been resolved.",
        "We'll get back to you within 24 hours.",
        "Thank you for your patience."
    ];

    const formatTime = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        if (date.toDateString() === today.toDateString()) {
            return 'Today';
        } else if (date.toDateString() === yesterday.toDateString()) {
            return 'Yesterday';
        } else {
            return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        }
    };

    const groupMessagesByDate = (messages) => {
        const groups = {};
        messages.forEach(msg => {
            const date = formatDate(msg.createdAt);
            if (!groups[date]) {
                groups[date] = [];
            }
            groups[date].push(msg);
        });
        return groups;
    };

    const messageGroups = groupMessagesByDate(messages);

    return (
        <div className="flex flex-col h-full bg-white">
            {/* Chat Header */}
            <div className="border-b border-gray-200 px-4 py-3 bg-gray-50">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="font-semibold text-gray-900">{ticket.ticketNumber}</h3>
                        <p className="text-sm text-gray-600">{ticket.customerName}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                    >
                        <FaTimes className="text-gray-500" />
                    </button>
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {Object.entries(messageGroups).map(([date, msgs]) => (
                    <div key={date}>
                        {/* Date Separator */}
                        <div className="flex items-center justify-center my-4">
                            <div className="px-3 py-1 bg-gray-200 rounded-full text-xs text-gray-600">
                                {date}
                            </div>
                        </div>

                        {/* Messages for this date */}
                        {msgs.map((msg, index) => {
                            const isAgent = msg.senderRole === 'agent';
                            const isSystem = msg.senderRole === 'system';
                            const isSelf = msg.senderId === currentAgent?.id;

                            if (isSystem) {
                                return (
                                    <div key={index} className="flex justify-center my-2">
                                        <div className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs flex items-center gap-2">
                                            <FaRobot />
                                            {msg.message}
                                        </div>
                                    </div>
                                );
                            }

                            return (
                                <div
                                    key={index}
                                    className={`flex ${isSelf ? 'justify-end' : 'justify-start'} mb-3`}
                                >
                                    <div className={`max-w-[70%] ${isSelf ? 'order-2' : 'order-1'}`}>
                                        {/* Sender name (only for other agents) */}
                                        {!isSelf && isAgent && (
                                            <div className="text-xs text-gray-500 mb-1 ml-2">
                                                {msg.senderName}
                                            </div>
                                        )}

                                        {/* Message bubble */}
                                        <div
                                            className={`rounded-lg px-4 py-2 ${
                                                msg.isInternal
                                                    ? 'bg-yellow-50 border border-yellow-200'
                                                    : isSelf
                                                    ? 'bg-orange-500 text-white'
                                                    : 'bg-gray-100 text-gray-900'
                                            }`}
                                        >
                                            {msg.isInternal && (
                                                <div className="flex items-center gap-1 text-xs text-yellow-700 mb-1">
                                                    <FaExclamationCircle />
                                                    Internal Note
                                                </div>
                                            )}
                                            <p className="text-sm whitespace-pre-wrap">{msg.message}</p>

                                            {/* Attachments */}
                                            {msg.attachments && msg.attachments.length > 0 && (
                                                <div className="mt-2 space-y-1">
                                                    {msg.attachments.map((file, i) => (
                                                        <a
                                                            key={i}
                                                            href={file.url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className={`flex items-center gap-2 text-xs ${
                                                                isSelf ? 'text-white' : 'text-blue-600'
                                                            } hover:underline`}
                                                        >
                                                            <FaPaperclip />
                                                            {file.name}
                                                        </a>
                                                    ))}
                                                </div>
                                            )}

                                            {/* Timestamp and read status */}
                                            <div className={`flex items-center gap-1 mt-1 text-xs ${
                                                isSelf ? 'text-white/80' : 'text-gray-500'
                                            }`}>
                                                <span>{formatTime(msg.createdAt)}</span>
                                                {isSelf && (
                                                    msg.readBy && msg.readBy.length > 0 ? (
                                                        <FaCheckDouble className="text-blue-300" />
                                                    ) : (
                                                        <FaCheck />
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ))}
                
                {isTyping && (
                    <div className="flex justify-start">
                        <div className="bg-gray-100 rounded-lg px-4 py-2">
                            <div className="flex gap-1">
                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            <div className="border-t border-gray-200 px-4 py-2 bg-gray-50">
                <div className="flex gap-2 overflow-x-auto pb-2">
                    {quickReplies.map((reply, index) => (
                        <button
                            key={index}
                            onClick={() => setNewMessage(reply)}
                            className="flex-shrink-0 px-3 py-1 text-xs bg-white border border-gray-300 rounded-full hover:bg-gray-100 transition-colors"
                        >
                            {reply}
                        </button>
                    ))}
                </div>
            </div>

            {/* Attachments Preview */}
            {attachments.length > 0 && (
                <div className="border-t border-gray-200 px-4 py-2 bg-gray-50">
                    <div className="flex flex-wrap gap-2">
                        {attachments.map((file, index) => (
                            <div key={index} className="flex items-center gap-2 bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm">
                                <FaPaperclip className="text-gray-400" />
                                <span className="text-gray-700">{file.name}</span>
                                <button
                                    onClick={() => removeAttachment(index)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    <FaTimes className="text-xs" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Input Area */}
            <div className="border-t border-gray-200 p-4">
                <div className="flex items-end gap-2">
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileSelect}
                        className="hidden"
                        multiple
                    />
                    
                    <button
                        onClick={() => fileInputRef.current?.click()}
                        className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Attach file"
                    >
                        <FaPaperclip />
                    </button>

                    <div className="flex-1">
                        <textarea
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSend();
                                }
                            }}
                            placeholder="Type your message..."
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                            rows="2"
                        />
                        
                        <div className="flex items-center gap-2 mt-2">
                            <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={isInternal}
                                    onChange={(e) => setIsInternal(e.target.checked)}
                                    className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                                />
                                <span className="text-xs">Internal note (not visible to customer)</span>
                            </label>
                        </div>
                    </div>

                    <button
                        onClick={handleSend}
                        disabled={!newMessage.trim() && attachments.length === 0}
                        className="p-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <FaPaperPlane />
                    </button>
                </div>
            </div>
        </div>
    );
}
