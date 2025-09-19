/**
 * Support Ticket Entity
 * Represents a customer support ticket in the system
 */

export class TicketEntity {
    constructor(data = {}) {
        this.id = data.id || null;
        this.ticketNumber = data.ticketNumber || this.generateTicketNumber();
        this.customerId = data.customerId || null;
        this.customerName = data.customerName || '';
        this.customerEmail = data.customerEmail || '';
        this.customerPhone = data.customerPhone || '';
        this.subject = data.subject || '';
        this.description = data.description || '';
        this.priority = data.priority || 'Medium'; // Low, Medium, High, Urgent
        this.status = data.status || 'Open'; // Open, In Progress, Pending, Resolved, Closed
        this.category = data.category || 'General'; // General, Payment, Technical, Billing, Account
        this.assignedTo = data.assignedTo || null;
        this.assignedAgent = data.assignedAgent || '';
        this.tags = data.tags || [];
        this.attachments = data.attachments || [];
        this.createdAt = data.createdAt || new Date().toISOString();
        this.updatedAt = data.updatedAt || new Date().toISOString();
        this.resolvedAt = data.resolvedAt || null;
        this.firstResponseTime = data.firstResponseTime || null;
        this.resolutionTime = data.resolutionTime || null;
        this.satisfaction = data.satisfaction || null; // 1-5 rating
        this.isEscalated = data.isEscalated || false;
        this.escalatedAt = data.escalatedAt || null;
        this.escalatedTo = data.escalatedTo || null;
        this.lastActivity = data.lastActivity || new Date().toISOString();
    }

    generateTicketNumber() {
        const prefix = 'SP';
        const timestamp = Date.now().toString().slice(-6);
        const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
        return `${prefix}-${new Date().getFullYear()}-${timestamp}${random}`;
    }

    updateStatus(newStatus, agentId = null) {
        this.status = newStatus;
        this.updatedAt = new Date().toISOString();
        this.lastActivity = new Date().toISOString();
        
        if (newStatus === 'Resolved' && !this.resolvedAt) {
            this.resolvedAt = new Date().toISOString();
            this.calculateResolutionTime();
        }
        
        if (agentId && !this.assignedTo) {
            this.assignedTo = agentId;
        }
    }

    escalate(escalatedTo, reason = '') {
        this.isEscalated = true;
        this.escalatedAt = new Date().toISOString();
        this.escalatedTo = escalatedTo;
        this.priority = 'Urgent';
        this.status = 'In Progress';
        this.updatedAt = new Date().toISOString();
        this.lastActivity = new Date().toISOString();
    }

    calculateResolutionTime() {
        if (this.resolvedAt && this.createdAt) {
            const created = new Date(this.createdAt);
            const resolved = new Date(this.resolvedAt);
            this.resolutionTime = Math.floor((resolved - created) / (1000 * 60)); // in minutes
        }
    }

    addTag(tag) {
        if (!this.tags.includes(tag)) {
            this.tags.push(tag);
        }
    }

    removeTag(tag) {
        this.tags = this.tags.filter(t => t !== tag);
    }

    toJSON() {
        return {
            id: this.id,
            ticketNumber: this.ticketNumber,
            customerId: this.customerId,
            customerName: this.customerName,
            customerEmail: this.customerEmail,
            customerPhone: this.customerPhone,
            subject: this.subject,
            description: this.description,
            priority: this.priority,
            status: this.status,
            category: this.category,
            assignedTo: this.assignedTo,
            assignedAgent: this.assignedAgent,
            tags: this.tags,
            attachments: this.attachments,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            resolvedAt: this.resolvedAt,
            firstResponseTime: this.firstResponseTime,
            resolutionTime: this.resolutionTime,
            satisfaction: this.satisfaction,
            isEscalated: this.isEscalated,
            escalatedAt: this.escalatedAt,
            escalatedTo: this.escalatedTo,
            lastActivity: this.lastActivity
        };
    }
}
