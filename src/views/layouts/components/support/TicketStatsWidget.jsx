import React from 'react';
import { 
    FaTicketAlt, 
    FaClock, 
    FaCheckCircle, 
    FaExclamationTriangle,
    FaChartLine,
    FaUserClock,
    FaStar
} from 'react-icons/fa';

export default function TicketStatsWidget({ tickets = [], agents = [] }) {
    // Calculate statistics
    const stats = {
        total: tickets.length,
        open: tickets.filter(t => t.status === 'Open').length,
        inProgress: tickets.filter(t => t.status === 'In Progress').length,
        resolved: tickets.filter(t => t.status === 'Resolved').length,
        urgent: tickets.filter(t => t.priority === 'Urgent').length,
        avgResponseTime: calculateAvgResponseTime(tickets),
        satisfactionRate: calculateSatisfactionRate(tickets),
        slaCompliance: calculateSLACompliance(tickets)
    };

    function calculateAvgResponseTime(tickets) {
        const ticketsWithResponse = tickets.filter(t => t.firstResponseAt);
        if (ticketsWithResponse.length === 0) return '0m';
        
        const totalMinutes = ticketsWithResponse.reduce((sum, ticket) => {
            const created = new Date(ticket.createdAt);
            const responded = new Date(ticket.firstResponseAt);
            const diff = (responded - created) / (1000 * 60);
            return sum + diff;
        }, 0);
        
        const avgMinutes = Math.round(totalMinutes / ticketsWithResponse.length);
        
        if (avgMinutes < 60) return `${avgMinutes}m`;
        const hours = Math.floor(avgMinutes / 60);
        const minutes = avgMinutes % 60;
        return `${hours}h ${minutes}m`;
    }

    function calculateSatisfactionRate(tickets) {
        const ratedTickets = tickets.filter(t => t.satisfactionRating);
        if (ratedTickets.length === 0) return 0;
        
        const positiveRatings = ratedTickets.filter(t => t.satisfactionRating >= 4).length;
        return Math.round((positiveRatings / ratedTickets.length) * 100);
    }

    function calculateSLACompliance(tickets) {
        const ticketsWithSLA = tickets.filter(t => t.slaCompliant !== undefined);
        if (ticketsWithSLA.length === 0) return 100;
        
        const compliantTickets = ticketsWithSLA.filter(t => t.slaCompliant).length;
        return Math.round((compliantTickets / ticketsWithSLA.length) * 100);
    }

    const statCards = [
        {
            label: 'Total Tickets',
            value: stats.total,
            icon: FaTicketAlt,
            color: 'blue',
            bgColor: 'bg-blue-50',
            iconColor: 'text-blue-600',
            textColor: 'text-blue-900'
        },
        {
            label: 'Open',
            value: stats.open,
            icon: FaClock,
            color: 'orange',
            bgColor: 'bg-orange-50',
            iconColor: 'text-orange-600',
            textColor: 'text-orange-900'
        },
        {
            label: 'In Progress',
            value: stats.inProgress,
            icon: FaUserClock,
            color: 'yellow',
            bgColor: 'bg-yellow-50',
            iconColor: 'text-yellow-600',
            textColor: 'text-yellow-900'
        },
        {
            label: 'Resolved',
            value: stats.resolved,
            icon: FaCheckCircle,
            color: 'green',
            bgColor: 'bg-green-50',
            iconColor: 'text-green-600',
            textColor: 'text-green-900'
        },
        {
            label: 'Urgent',
            value: stats.urgent,
            icon: FaExclamationTriangle,
            color: 'red',
            bgColor: 'bg-red-50',
            iconColor: 'text-red-600',
            textColor: 'text-red-900'
        },
        {
            label: 'Avg Response',
            value: stats.avgResponseTime,
            icon: FaChartLine,
            color: 'purple',
            bgColor: 'bg-purple-50',
            iconColor: 'text-purple-600',
            textColor: 'text-purple-900'
        },
        {
            label: 'SLA Compliance',
            value: `${stats.slaCompliance}%`,
            icon: FaCheckCircle,
            color: stats.slaCompliance >= 90 ? 'green' : stats.slaCompliance >= 75 ? 'yellow' : 'red',
            bgColor: stats.slaCompliance >= 90 ? 'bg-green-50' : stats.slaCompliance >= 75 ? 'bg-yellow-50' : 'bg-red-50',
            iconColor: stats.slaCompliance >= 90 ? 'text-green-600' : stats.slaCompliance >= 75 ? 'text-yellow-600' : 'text-red-600',
            textColor: stats.slaCompliance >= 90 ? 'text-green-900' : stats.slaCompliance >= 75 ? 'text-yellow-900' : 'text-red-900'
        },
        {
            label: 'Satisfaction',
            value: `${stats.satisfactionRate}%`,
            icon: FaStar,
            color: 'amber',
            bgColor: 'bg-amber-50',
            iconColor: 'text-amber-600',
            textColor: 'text-amber-900'
        }
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {statCards.map((stat, index) => {
                const Icon = stat.icon;
                return (
                    <div
                        key={index}
                        className={`${stat.bgColor} border border-${stat.color}-200 rounded-lg p-4 hover:shadow-md transition-shadow`}
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex-1">
                                <p className={`text-sm font-medium ${stat.textColor} opacity-75`}>
                                    {stat.label}
                                </p>
                                <p className={`text-2xl font-bold ${stat.textColor} mt-1`}>
                                    {stat.value}
                                </p>
                            </div>
                            <div className={`${stat.bgColor} p-3 rounded-lg`}>
                                <Icon className={`text-xl ${stat.iconColor}`} />
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
