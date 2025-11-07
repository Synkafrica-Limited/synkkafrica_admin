import React from 'react';
import { 
    FaCheck, 
    FaQuestionCircle, 
    FaExclamationTriangle, 
    FaBan, 
    FaMoneyBillWave, 
    FaShareSquare,
    FaClock
} from 'react-icons/fa';
import { quickActions } from '@/models/entities/ticket-communication.entity';

export default function QuickActionsPanel({ ticket, onExecuteAction }) {
    const actionIcons = {
        'acknowledge': FaCheck,
        'request-info': FaQuestionCircle,
        'escalate': FaExclamationTriangle,
        'mark-spam': FaBan,
        'request-payment-proof': FaMoneyBillWave,
        'initiate-refund': FaMoneyBillWave,
        'forward-technical': FaShareSquare
    };

    const actionColors = {
        'acknowledge': 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100',
        'request-info': 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100',
        'escalate': 'bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100',
        'mark-spam': 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100',
        'request-payment-proof': 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100',
        'initiate-refund': 'bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100',
        'forward-technical': 'bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100'
    };

    const handleActionClick = (action) => {
        if (onExecuteAction) {
            onExecuteAction(action, ticket);
        }
    };

    return (
        <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <FaClock className="text-orange-500" />
                Quick Actions
            </h4>
            
            <div className="space-y-2">
                {quickActions.map((action) => {
                    const Icon = actionIcons[action.id] || FaCheck;
                    const colorClass = actionColors[action.id] || 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100';
                    
                    return (
                        <button
                            key={action.id}
                            onClick={() => handleActionClick(action)}
                            className={`w-full flex items-start gap-3 p-3 border rounded-lg transition-all ${colorClass}`}
                        >
                            <Icon className="mt-0.5 flex-shrink-0" />
                            <div className="flex-1 text-left">
                                <div className="font-medium text-sm">{action.label}</div>
                                <div className="text-xs mt-1 opacity-80">{action.description}</div>
                            </div>
                        </button>
                    );
                })}
            </div>

            {/* SLA Timer */}
            <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Response Due:</span>
                    <span className={`font-semibold ${
                        ticket.priority === 'Urgent' ? 'text-red-600' :
                        ticket.priority === 'High' ? 'text-orange-600' :
                        'text-gray-900'
                    }`}>
                        {ticket.priority === 'Urgent' ? '30 mins' :
                         ticket.priority === 'High' ? '2 hours' :
                         ticket.priority === 'Medium' ? '4 hours' : '8 hours'}
                    </span>
                </div>
                <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                        className={`h-full ${
                            ticket.priority === 'Urgent' ? 'bg-red-500' :
                            ticket.priority === 'High' ? 'bg-orange-500' :
                            'bg-green-500'
                        }`}
                        style={{ width: '35%' }}
                    ></div>
                </div>
                <div className="mt-1 text-xs text-gray-500">
                    Time remaining: 18 minutes
                </div>
            </div>
        </div>
    );
}
