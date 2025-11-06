import { SupportRepository } from '../../models/repositories/support.repository.js';

/**
 * Support Controller
 * Handles business logic for support operations
 */
export class SupportController {
    constructor() {
        this.supportRepository = new SupportRepository();
    }

    // Ticket Management
    async createTicket(req) {
        try {
            const {
                customerName,
                customerEmail,
                customerPhone,
                subject,
                description,
                priority = 'Medium',
                category = 'General'
            } = req.body;

            // Validate required fields
            if (!customerName || !customerEmail || !subject || !description) {
                return {
                    success: false,
                    error: 'Missing required fields: customerName, customerEmail, subject, description'
                };
            }

            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(customerEmail)) {
                return {
                    success: false,
                    error: 'Invalid email format'
                };
            }

            const ticketData = {
                customerName,
                customerEmail,
                customerPhone,
                subject,
                description,
                priority,
                category
            };

            const result = await this.supportRepository.createTicket(ticketData);

            if (result.success) {
                // Auto-assign to available agent
                await this.autoAssignTicket(result.data.id);
                
                // Send notification to customer
                await this.sendTicketCreatedNotification(result.data);
            }

            return result;
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }

    async getTicket(ticketId) {
        try {
            if (!ticketId) {
                return {
                    success: false,
                    error: 'Ticket ID is required'
                };
            }

            return await this.supportRepository.getTicketById(ticketId);
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }

    async getAllTickets(filters = {}) {
        try {
            return await this.supportRepository.getAllTickets(filters);
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }

    async updateTicketStatus(ticketId, status, agentId = null) {
        try {
            if (!ticketId || !status) {
                return {
                    success: false,
                    error: 'Ticket ID and status are required'
                };
            }

            const validStatuses = ['Open', 'In Progress', 'Pending', 'Resolved', 'Closed'];
            if (!validStatuses.includes(status)) {
                return {
                    success: false,
                    error: 'Invalid status'
                };
            }

            const result = await this.supportRepository.updateTicket(ticketId, {
                status,
                assignedTo: agentId,
                updatedAt: new Date().toISOString()
            });

            if (result.success && status === 'Resolved') {
                // Send resolution notification
                await this.sendTicketResolvedNotification(result.data);
            }

            return result;
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }

    async escalateTicket(ticketId, escalatedTo, reason = '') {
        try {
            if (!ticketId || !escalatedTo) {
                return {
                    success: false,
                    error: 'Ticket ID and escalation target are required'
                };
            }

            const ticket = await this.supportRepository.getTicketById(ticketId);
            if (!ticket.success) {
                return ticket;
            }

            const updateData = {
                isEscalated: true,
                escalatedAt: new Date().toISOString(),
                escalatedTo,
                priority: 'Urgent',
                status: 'In Progress'
            };

            const result = await this.supportRepository.updateTicket(ticketId, updateData);

            if (result.success) {
                // Create system message about escalation
                await this.createMessage({
                    ticketId,
                    senderType: 'system',
                    content: `Ticket escalated to ${escalatedTo}. Reason: ${reason || 'No reason provided'}`,
                    messageType: 'system'
                });

                // Send escalation notification
                await this.sendTicketEscalatedNotification(result.data, reason);
            }

            return result;
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }

    // Message Management
    async createMessage(messageData) {
        try {
            const {
                ticketId,
                senderId,
                senderName,
                senderType,
                content,
                messageType = 'text',
                attachments = []
            } = messageData;

            if (!ticketId || !content) {
                return {
                    success: false,
                    error: 'Ticket ID and content are required'
                };
            }

            const result = await this.supportRepository.createMessage({
                ticketId,
                senderId,
                senderName,
                senderType,
                content,
                messageType,
                attachments
            });

            if (result.success) {
                // Send real-time notification
                await this.sendRealTimeMessage(result.data);
            }

            return result;
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }

    async getTicketMessages(ticketId) {
        try {
            if (!ticketId) {
                return {
                    success: false,
                    error: 'Ticket ID is required'
                };
            }

            return await this.supportRepository.getMessagesByTicketId(ticketId);
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }

    // Agent Management
    async getAvailableAgents() {
        try {
            return await this.supportRepository.getAvailableAgents();
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }

    async getAllAgents() {
        try {
            return await this.supportRepository.getAllAgents();
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }

    // Auto-assignment logic
    async autoAssignTicket(ticketId) {
        try {
            const availableAgents = await this.supportRepository.getAvailableAgents();
            
            if (availableAgents.success && availableAgents.data.length > 0) {
                // Get agent with lowest workload
                const assignedAgent = availableAgents.data[0];
                
                await this.supportRepository.updateTicket(ticketId, {
                    assignedTo: assignedAgent.id,
                    assignedAgent: assignedAgent.name,
                    status: 'In Progress'
                });

                // Create system message
                await this.createMessage({
                    ticketId,
                    senderType: 'system',
                    content: `Ticket assigned to ${assignedAgent.name}`,
                    messageType: 'system'
                });

                return {
                    success: true,
                    assignedAgent
                };
            }

            return {
                success: false,
                error: 'No available agents'
            };
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }

    // Analytics and Reporting
    async getTicketAnalytics(dateRange = 30) {
        try {
            const allTickets = await this.supportRepository.getAllTickets();
            
            if (!allTickets.success) {
                return allTickets;
            }

            const tickets = allTickets.data;
            const cutoffDate = new Date();
            cutoffDate.setDate(cutoffDate.getDate() - dateRange);

            const recentTickets = tickets.filter(
                ticket => new Date(ticket.createdAt) >= cutoffDate
            );

            const analytics = {
                totalTickets: tickets.length,
                recentTickets: recentTickets.length,
                statusBreakdown: this.getStatusBreakdown(tickets),
                priorityBreakdown: this.getPriorityBreakdown(tickets),
                categoryBreakdown: this.getCategoryBreakdown(tickets),
                averageResolutionTime: this.calculateAverageResolutionTime(tickets),
                customerSatisfaction: this.calculateCustomerSatisfaction(tickets),
                escalationRate: this.calculateEscalationRate(tickets)
            };

            return {
                success: true,
                data: analytics
            };
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }

    // Helper methods for analytics
    getStatusBreakdown(tickets) {
        const breakdown = {};
        tickets.forEach(ticket => {
            breakdown[ticket.status] = (breakdown[ticket.status] || 0) + 1;
        });
        return breakdown;
    }

    getPriorityBreakdown(tickets) {
        const breakdown = {};
        tickets.forEach(ticket => {
            breakdown[ticket.priority] = (breakdown[ticket.priority] || 0) + 1;
        });
        return breakdown;
    }

    getCategoryBreakdown(tickets) {
        const breakdown = {};
        tickets.forEach(ticket => {
            breakdown[ticket.category] = (breakdown[ticket.category] || 0) + 1;
        });
        return breakdown;
    }

    calculateAverageResolutionTime(tickets) {
        const resolvedTickets = tickets.filter(ticket => ticket.resolutionTime);
        if (resolvedTickets.length === 0) return 0;
        
        const totalTime = resolvedTickets.reduce((sum, ticket) => sum + ticket.resolutionTime, 0);
        return Math.round(totalTime / resolvedTickets.length);
    }

    calculateCustomerSatisfaction(tickets) {
        const ratedTickets = tickets.filter(ticket => ticket.satisfaction);
        if (ratedTickets.length === 0) return 0;
        
        const totalRating = ratedTickets.reduce((sum, ticket) => sum + ticket.satisfaction, 0);
        return (totalRating / ratedTickets.length).toFixed(1);
    }

    calculateEscalationRate(tickets) {
        const escalatedTickets = tickets.filter(ticket => ticket.isEscalated);
        return tickets.length > 0 ? ((escalatedTickets.length / tickets.length) * 100).toFixed(1) : 0;
    }

    // Notification methods (to be implemented with actual notification service)
    async sendTicketCreatedNotification(ticket) {
        // Implementation for sending ticket created notification
        console.log(`Ticket ${ticket.ticketNumber} created for ${ticket.customerEmail}`);
    }

    async sendTicketResolvedNotification(ticket) {
        // Implementation for sending ticket resolved notification
        console.log(`Ticket ${ticket.ticketNumber} resolved`);
    }

    async sendTicketEscalatedNotification(ticket, reason) {
        // Implementation for sending ticket escalated notification
        console.log(`Ticket ${ticket.ticketNumber} escalated. Reason: ${reason}`);
    }

    async sendRealTimeMessage(message) {
        // Implementation for real-time message broadcasting using Socket.io
        console.log(`New message in ticket ${message.ticketId}: ${message.content}`);
    }
}
