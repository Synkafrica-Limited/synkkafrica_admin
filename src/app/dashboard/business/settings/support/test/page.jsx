"use client";
import React from 'react';
import { useRouter } from 'next/navigation';

export default function SupportTestPage() {
    const router = useRouter();

    const testTickets = [
        { id: '1', number: 'SP-2025-001', customer: 'Temi Femi' },
        { id: '2', number: 'SP-2025-002', customer: 'James Adebayo' },
        { id: '3', number: 'SP-2025-003', customer: 'Mary Okafor' }
    ];

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Support System Test</h1>
            
            <div className="space-y-4">
                <h2 className="text-lg font-semibold">Test Navigation to Chat Interface:</h2>
                
                {testTickets.map(ticket => (
                    <div key={ticket.id} className="p-4 border rounded-lg flex items-center justify-between">
                        <div>
                            <p className="font-medium">Ticket #{ticket.number}</p>
                            <p className="text-gray-600">Customer: {ticket.customer}</p>
                        </div>
                        <button
                            onClick={() => router.push(`/settings/support/tickets/${ticket.id}`)}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Open Chat
                        </button>
                    </div>
                ))}
                
                <div className="mt-8 p-4 bg-gray-100 rounded-lg">
                    <h3 className="font-semibold mb-2">Debug Info:</h3>
                    <p>Current URL: {typeof window !== 'undefined' ? window.location.href : 'N/A'}</p>
                    <p>Expected chat URLs:</p>
                    <ul className="list-disc list-inside ml-4">
                        {testTickets.map(ticket => (
                            <li key={ticket.id} className="text-sm text-gray-600">
                                /settings/support/tickets/{ticket.id}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
