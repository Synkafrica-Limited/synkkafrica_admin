import { TicketEntity } from '../entities/ticket.entity.js';
import { ChatMessageEntity, SupportAgentEntity } from '../entities/support.entity.js';

/**
 * Support Repository
 * Handles data operations for support tickets and chat messages
 */
export class SupportRepository {
    constructor() {
        // In a real application, this would connect to your database
        this.tickets = new Map();
        this.messages = new Map();
        this.agents = new Map();
        this.ticketMessages = new Map(); // ticketId -> messageIds[]
        
        // Initialize with some sample data
        this.initializeSampleData();
    }

    // Ticket Operations
    async createTicket(ticketData) {
        try {
            const ticket = new TicketEntity(ticketData);
            ticket.id = this.generateId();
            this.tickets.set(ticket.id, ticket);
            this.ticketMessages.set(ticket.id, []);
            
            return {
                success: true,
                data: ticket.toJSON(),
                message: 'Ticket created successfully'
            };
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }

    async getTicketById(ticketId) {
        try {
            const ticket = this.tickets.get(ticketId);
            if (!ticket) {
                return {
                    success: false,
                    error: 'Ticket not found'
                };
            }

            return {
                success: true,
                data: ticket.toJSON()
            };
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }

    async getTicketsByStatus(status) {
        try {
            const tickets = Array.from(this.tickets.values())
                .filter(ticket => ticket.status === status)
                .map(ticket => ticket.toJSON())
                .sort((a, b) => new Date(b.lastActivity) - new Date(a.lastActivity));

            return {
                success: true,
                data: tickets
            };
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }

    async getTicketsByPriority(priority) {
        try {
            const tickets = Array.from(this.tickets.values())
                .filter(ticket => ticket.priority === priority)
                .map(ticket => ticket.toJSON())
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

            return {
                success: true,
                data: tickets
            };
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }

    async getAllTickets(filters = {}) {
        try {
            let tickets = Array.from(this.tickets.values());

            // Apply filters
            if (filters.status) {
                tickets = tickets.filter(ticket => ticket.status === filters.status);
            }
            if (filters.priority) {
                tickets = tickets.filter(ticket => ticket.priority === filters.priority);
            }
            if (filters.category) {
                tickets = tickets.filter(ticket => ticket.category === filters.category);
            }
            if (filters.assignedTo) {
                tickets = tickets.filter(ticket => ticket.assignedTo === filters.assignedTo);
            }

            // Sort by last activity
            tickets.sort((a, b) => new Date(b.lastActivity) - new Date(a.lastActivity));

            return {
                success: true,
                data: tickets.map(ticket => ticket.toJSON())
            };
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }

    async updateTicket(ticketId, updateData) {
        try {
            const ticket = this.tickets.get(ticketId);
            if (!ticket) {
                return {
                    success: false,
                    error: 'Ticket not found'
                };
            }

            // Update ticket properties
            Object.keys(updateData).forEach(key => {
                if (key !== 'id' && ticket.hasOwnProperty(key)) {
                    ticket[key] = updateData[key];
                }
            });

            ticket.updatedAt = new Date().toISOString();
            ticket.lastActivity = new Date().toISOString();

            return {
                success: true,
                data: ticket.toJSON(),
                message: 'Ticket updated successfully'
            };
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }

    // Message Operations
    async createMessage(messageData) {
        try {
            const message = new ChatMessageEntity(messageData);
            message.id = this.generateId();
            this.messages.set(message.id, message);

            // Add to ticket messages
            if (!this.ticketMessages.has(message.ticketId)) {
                this.ticketMessages.set(message.ticketId, []);
            }
            this.ticketMessages.get(message.ticketId).push(message.id);

            // Update ticket last activity
            const ticket = this.tickets.get(message.ticketId);
            if (ticket) {
                ticket.lastActivity = new Date().toISOString();
                
                // Set first response time if this is the first agent response
                if (message.senderType === 'agent' && !ticket.firstResponseTime) {
                    const created = new Date(ticket.createdAt);
                    const responded = new Date(message.timestamp);
                    ticket.firstResponseTime = Math.floor((responded - created) / (1000 * 60)); // in minutes
                }
            }

            return {
                success: true,
                data: message.toJSON(),
                message: 'Message created successfully'
            };
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }

    async getMessagesByTicketId(ticketId) {
        try {
            const messageIds = this.ticketMessages.get(ticketId) || [];
            const messages = messageIds
                .map(id => this.messages.get(id))
                .filter(msg => msg && !msg.isDeleted)
                .map(msg => msg.toJSON())
                .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

            return {
                success: true,
                data: messages
            };
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }

    // Agent Operations
    async createAgent(agentData) {
        try {
            const agent = new SupportAgentEntity(agentData);
            agent.id = this.generateId();
            this.agents.set(agent.id, agent);

            return {
                success: true,
                data: agent.toJSON(),
                message: 'Agent created successfully'
            };
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }

    async getAvailableAgents() {
        try {
            const agents = Array.from(this.agents.values())
                .filter(agent => agent.canTakeTicket())
                .map(agent => agent.toJSON())
                .sort((a, b) => a.currentWorkload - b.currentWorkload);

            return {
                success: true,
                data: agents
            };
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }

    async getAllAgents() {
        try {
            const agents = Array.from(this.agents.values())
                .map(agent => agent.toJSON())
                .sort((a, b) => a.name.localeCompare(b.name));

            return {
                success: true,
                data: agents
            };
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }

    // Utility Methods
    generateId() {
        return Date.now().toString() + Math.random().toString(36).substr(2, 9);
    }

    // Initialize sample data for development
    initializeSampleData() {
        // Create sample agents
        const agents = [
            {
                name: 'John Smith',
                email: 'john.smith@synkkafrica.com',
                department: 'General Support',
                role: 'Senior Agent',
                isOnline: true,
                isAvailable: true,
                currentWorkload: 3,
                skills: ['Payment Issues', 'General Inquiries', 'Technical Support'],
                avatar: '/images/agents/john.jpg'
            },
            {
                name: 'Sarah Johnson',
                email: 'sarah.johnson@synkkafrica.com',
                department: 'Technical Support',
                role: 'Agent',
                isOnline: true,
                isAvailable: true,
                currentWorkload: 2,
                skills: ['Technical Issues', 'Account Problems', 'Bug Reports'],
                avatar: '/images/agents/sarah.jpg'
            },
            {
                name: 'Mike Wilson',
                email: 'mike.wilson@synkkafrica.com',
                department: 'Billing Support',
                role: 'Supervisor',
                isOnline: false,
                isAvailable: false,
                currentWorkload: 1,
                skills: ['Billing Issues', 'Payment Problems', 'Refunds'],
                avatar: '/images/agents/mike.jpg'
            }
        ];

        agents.forEach(agentData => {
            this.createAgent(agentData);
        });

        // Create sample tickets with fixed IDs
        const tickets = [
            {
                customerName: 'Temi Femi',
                customerEmail: 'eodeyale@synkkafrica.com',
                customerPhone: '+2348 06501 7856',
                subject: 'Payment issue with order #112233',
                description: 'Hi, I\'m having trouble with my recent payment. The transaction went through but my order status still shows as pending. Can you help?',
                priority: 'Urgent',
                status: 'Open',
                category: 'Payment'
            },
            {
                customerName: 'James Adebayo',
                customerEmail: 'james.adebayo@email.com',
                customerPhone: '+2348 12345 6789',
                subject: 'Unable to access my account',
                description: 'I can\'t log into my account. I keep getting an error message saying my credentials are invalid.',
                priority: 'High',
                status: 'In Progress',
                category: 'Account'
            },
            {
                customerName: 'Mary Okafor',
                customerEmail: 'mary.okafor@email.com',
                customerPhone: '+2348 98765 4321',
                subject: 'Question about listing my property',
                description: 'I want to list my property on your platform. Can you guide me through the process?',
                priority: 'Medium',
                status: 'Resolved',
                category: 'General'
            }
        ];

        // Create tickets with predictable IDs
        tickets.forEach((ticketData, index) => {
            const ticket = new TicketEntity(ticketData);
            ticket.id = `ticket_${index + 1}`; // Use predictable IDs
            this.tickets.set(ticket.id, ticket);
            this.ticketMessages.set(ticket.id, []);
            
            // Add some sample messages for each ticket
            this.createSampleMessages(ticket.id, ticketData.customerName);
        });
    }
    
    // Helper method to create sample messages
    createSampleMessages(ticketId, customerName) {
        const sampleMessages = [
            {
                ticketId,
                senderName: customerName,
                senderType: 'customer',
                content: 'Hello, I need help with my issue.',
                timestamp: new Date(Date.now() - 3600000).toISOString() // 1 hour ago
            },
            {
                ticketId,
                senderName: 'Support Agent',
                senderType: 'agent',
                content: 'Hello! Thank you for contacting support. I\'ve received your ticket and I\'m here to help. Let me review your issue.',
                timestamp: new Date(Date.now() - 3300000).toISOString() // 55 minutes ago
            },
            {
                ticketId,
                senderName: customerName,
                senderType: 'customer',
                content: 'Thank you for the quick response. I really appreciate your help.',
                timestamp: new Date(Date.now() - 1800000).toISOString() // 30 minutes ago
            }
        ];
        
        sampleMessages.forEach(messageData => {
            const message = new ChatMessageEntity(messageData);
            message.id = this.generateId();
            this.messages.set(message.id, message);
            this.ticketMessages.get(ticketId).push(message.id);
        });
    }
}
