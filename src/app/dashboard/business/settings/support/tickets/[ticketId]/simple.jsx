"use client";
import React from 'react';

export default function SimpleTicketChat({ params }) {
    const { ticketId } = params;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Support Chat - Ticket {ticketId}</h1>
            
            <div className="bg-white border rounded-lg p-4 mb-4">
                <h2 className="font-semibold mb-2">Debug Info:</h2>
                <p>Ticket ID: {ticketId}</p>
                <p>Component loaded successfully!</p>
                <p>Current time: {new Date().toLocaleString()}</p>
            </div>
            
            <div className="bg-gray-50 border rounded-lg p-4 h-64">
                <p className="text-gray-600">Chat interface will load here...</p>
                <p className="text-sm text-gray-500 mt-2">
                    If you see this message, the routing is working correctly.
                </p>
            </div>
        </div>
    );
}
