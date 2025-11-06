// Ticket Communication & Chat System Entity

export class TicketMessage {
    constructor(data = {}) {
        this.id = data.id || null;
        this.ticketId = data.ticketId || null;
        this.senderId = data.senderId || null;
        this.senderName = data.senderName || '';
        this.senderRole = data.senderRole || 'customer'; // customer, agent, system
        this.message = data.message || '';
        this.messageType = data.messageType || 'text'; // text, image, file, system_note
        this.attachments = data.attachments || [];
        this.isInternal = data.isInternal || false; // Internal notes only visible to agents
        this.createdAt = data.createdAt || new Date().toISOString();
        this.readBy = data.readBy || [];
        this.metadata = data.metadata || {};
    }
}

export class TicketTemplate {
    constructor(data = {}) {
        this.id = data.id || null;
        this.name = data.name || '';
        this.category = data.category || '';
        this.subject = data.subject || '';
        this.body = data.body || '';
        this.tags = data.tags || [];
        this.isActive = data.isActive !== undefined ? data.isActive : true;
        this.variables = data.variables || []; // Dynamic variables like {customerName}, {ticketNumber}
    }
}

// Response Templates for Quick Replies
export const responseTemplates = [
    {
        id: 1,
        name: "Payment Investigation - Initial Response",
        category: "Payment",
        subject: "Re: Payment Issue - Under Investigation",
        body: `Dear {customerName},

Thank you for contacting SynkkAfrica Support regarding your payment concern.

We have received your ticket #{ticketNumber} and our team is currently investigating the payment of {amount} with transaction reference {transactionRef}.

Our payment team typically resolves such issues within 24-48 hours. We will update you as soon as we have more information.

In the meantime, if you have any additional details or screenshots, please reply to this message.

Best regards,
{agentName}
SynkkAfrica Support Team`,
        tags: ["payment", "investigation"],
        variables: ["customerName", "ticketNumber", "amount", "transactionRef", "agentName"]
    },
    {
        id: 2,
        name: "Payment Resolved - Refund Issued",
        category: "Payment",
        subject: "Re: Payment Issue - Resolved",
        body: `Dear {customerName},

Great news! We have successfully resolved your payment issue.

A refund of {amount} has been processed to your original payment method. Please allow 3-5 business days for the amount to reflect in your account.

Transaction Details:
- Refund Reference: {refundRef}
- Amount: {amount}
- Original Transaction: {transactionRef}

If you have any other questions, please don't hesitate to reach out.

Thank you for your patience.

Best regards,
{agentName}
SynkkAfrica Support Team`,
        tags: ["payment", "resolved", "refund"],
        variables: ["customerName", "amount", "refundRef", "transactionRef", "agentName"]
    },
    {
        id: 3,
        name: "Vendor Issue - Escalated",
        category: "Vendor",
        subject: "Re: Vendor Issue - Escalated to Management",
        body: `Dear {customerName},

Thank you for bringing this issue with {vendorName} to our attention.

We have escalated your ticket #{ticketNumber} to our vendor management team who will be reaching out to the vendor directly to address your concerns regarding {issue}.

We understand how important this is and we are committed to resolving this matter within 24 hours.

You will receive an update from our senior team member shortly.

Best regards,
{agentName}
SynkkAfrica Support Team`,
        tags: ["vendor", "escalated"],
        variables: ["customerName", "vendorName", "ticketNumber", "issue", "agentName"]
    },
    {
        id: 4,
        name: "Booking Technical Issue - Under Investigation",
        category: "Technical",
        subject: "Re: Booking Issue - Technical Team Notified",
        body: `Dear {customerName},

We have received your report about the technical issue with your booking #{bookingId}.

Our technical team has been notified and is currently investigating the problem you described: "{issueDescription}"

Error Reference: {errorRef}

We will work to resolve this as quickly as possible and will keep you updated on our progress.

If you need immediate assistance, please call our support line at {supportPhone}.

Best regards,
{agentName}
SynkkAfrica Support Team`,
        tags: ["technical", "booking"],
        variables: ["customerName", "bookingId", "issueDescription", "errorRef", "supportPhone", "agentName"]
    },
    {
        id: 5,
        name: "General Inquiry - Resolved",
        category: "General",
        subject: "Re: Your Inquiry",
        body: `Dear {customerName},

Thank you for reaching out to SynkkAfrica Support.

{response}

If you have any other questions or need further assistance, please don't hesitate to contact us.

Best regards,
{agentName}
SynkkAfrica Support Team`,
        tags: ["general", "resolved"],
        variables: ["customerName", "response", "agentName"]
    },
    {
        id: 6,
        name: "Account Issue - Verification Required",
        category: "Account",
        subject: "Re: Account Verification Required",
        body: `Dear {customerName},

To proceed with your request regarding {requestType}, we need to verify your account.

Please provide the following information:
- Full Name as registered
- Email address
- Phone number
- Last booking/transaction reference (if any)

This is to ensure the security of your account and comply with our data protection policies.

Once verified, we will process your request immediately.

Best regards,
{agentName}
SynkkAfrica Support Team`,
        tags: ["account", "verification"],
        variables: ["customerName", "requestType", "agentName"]
    },
    {
        id: 7,
        name: "Dispute Resolution - Final Decision",
        category: "Dispute",
        subject: "Re: Dispute Resolution - Final Decision",
        body: `Dear {customerName},

After careful review of your dispute #{ticketNumber} regarding {disputeSubject}, we have reached a decision.

Decision: {decision}

Reasoning:
{reasoning}

Action Taken:
{action}

This decision is final. However, if you have new information that was not previously considered, please contact us within 7 days.

Best regards,
{agentName}
SynkkAfrica Support Team`,
        tags: ["dispute", "resolved"],
        variables: ["customerName", "ticketNumber", "disputeSubject", "decision", "reasoning", "action", "agentName"]
    },
    {
        id: 8,
        name: "Follow-up - Satisfaction Check",
        category: "Follow-up",
        subject: "How was your support experience?",
        body: `Dear {customerName},

We recently resolved your support ticket #{ticketNumber}.

We'd love to hear about your experience! Could you take a moment to rate our service?

Rate your experience: [Survey Link]

Your feedback helps us improve our service for everyone.

Thank you for choosing SynkkAfrica!

Best regards,
{agentName}
SynkkAfrica Support Team`,
        tags: ["follow-up", "satisfaction"],
        variables: ["customerName", "ticketNumber", "agentName"]
    }
];

// Quick Actions/Macros
export const quickActions = [
    {
        id: 1,
        name: "Acknowledge Receipt",
        action: "send_message",
        template: "Thank you for contacting us. We have received your message and will respond shortly.",
        updateStatus: null,
        category: "general"
    },
    {
        id: 2,
        name: "Request More Information",
        action: "send_message",
        template: "To better assist you, could you please provide more details about {specific_info}?",
        updateStatus: "Pending",
        category: "general"
    },
    {
        id: 3,
        name: "Escalate to Manager",
        action: "escalate",
        template: null,
        updateStatus: "In Progress",
        priority: "Urgent",
        category: "escalation"
    },
    {
        id: 4,
        name: "Mark as Spam",
        action: "update_status",
        template: null,
        updateStatus: "Closed",
        tags: ["spam"],
        category: "moderation"
    },
    {
        id: 5,
        name: "Request Payment Proof",
        action: "send_message",
        template: "To investigate this payment issue, please provide:\n1. Transaction reference\n2. Payment receipt/screenshot\n3. Date and time of payment\n4. Amount paid",
        updateStatus: "Pending",
        category: "payment"
    },
    {
        id: 6,
        name: "Initiate Refund Process",
        action: "send_message",
        template: "We have initiated a refund of {amount} to your original payment method. Please allow 3-5 business days for processing.",
        updateStatus: "In Progress",
        tags: ["refund-initiated"],
        category: "payment"
    },
    {
        id: 7,
        name: "Forward to Technical Team",
        action: "forward",
        template: "This has been forwarded to our technical team who will investigate and respond within 24 hours.",
        updateStatus: "In Progress",
        assignTo: "technical-team",
        category: "technical"
    }
];

// Integration configurations for third-party support tools
export const integrationConfigs = {
    intercom: {
        enabled: true,
        appId: process.env.NEXT_PUBLIC_INTERCOM_APP_ID || '',
        apiKey: process.env.INTERCOM_API_KEY || '',
        features: {
            liveChat: true,
            autoMessages: true,
            helpCenter: true,
            productTours: false
        }
    },
    zendesk: {
        enabled: false,
        subdomain: process.env.NEXT_PUBLIC_ZENDESK_SUBDOMAIN || '',
        apiToken: process.env.ZENDESK_API_TOKEN || '',
        features: {
            ticketSync: true,
            chatWidget: true,
            knowledgeBase: true
        }
    },
    freshdesk: {
        enabled: false,
        domain: process.env.NEXT_PUBLIC_FRESHDESK_DOMAIN || '',
        apiKey: process.env.FRESHDESK_API_KEY || '',
        features: {
            ticketSync: true,
            chatWidget: true
        }
    },
    customWebhook: {
        enabled: true,
        endpoints: {
            newTicket: process.env.WEBHOOK_NEW_TICKET || '',
            ticketUpdate: process.env.WEBHOOK_TICKET_UPDATE || '',
            ticketResolved: process.env.WEBHOOK_TICKET_RESOLVED || ''
        }
    }
};

// Notification channels
export const notificationChannels = {
    email: {
        enabled: true,
        events: ['ticket_created', 'ticket_updated', 'ticket_resolved', 'message_received'],
        provider: 'sendgrid' // or 'ses', 'mailgun'
    },
    sms: {
        enabled: true,
        events: ['ticket_urgent', 'ticket_escalated'],
        provider: 'twilio' // or 'africas-talking'
    },
    push: {
        enabled: true,
        events: ['message_received', 'status_update'],
        provider: 'firebase'
    },
    inApp: {
        enabled: true,
        events: ['all']
    }
};

// SLA (Service Level Agreement) Rules
export const slaRules = {
    firstResponse: {
        urgent: 30, // minutes
        high: 120,
        medium: 240,
        low: 480
    },
    resolution: {
        urgent: 240, // minutes (4 hours)
        high: 1440, // 24 hours
        medium: 2880, // 48 hours
        low: 4320 // 72 hours
    }
};

// Ticket routing rules
export const routingRules = [
    {
        condition: { category: 'Payment', priority: ['Urgent', 'High'] },
        assignTo: 'payment-team',
        autoEscalate: true,
        escalateAfter: 60 // minutes
    },
    {
        condition: { category: 'Technical' },
        assignTo: 'technical-team',
        requiresSkills: ['technical-support', 'troubleshooting']
    },
    {
        condition: { category: 'Billing', tags: ['refund'] },
        assignTo: 'finance-team',
        approvalRequired: true
    },
    {
        condition: { isEscalated: true },
        assignTo: 'senior-support',
        priority: 'Urgent',
        notifyManagement: true
    }
];

// Canned responses for different scenarios
export const cannedResponses = {
    payment: {
        investigating: "We're currently investigating your payment. We'll update you within 24 hours.",
        confirmed: "Your payment has been confirmed and processed successfully.",
        refundInitiated: "Your refund has been initiated and will be processed within 3-5 business days.",
        proofRequired: "Please provide your payment receipt or transaction reference for verification."
    },
    booking: {
        confirmed: "Your booking has been confirmed. You'll receive a confirmation email shortly.",
        modified: "Your booking has been successfully modified.",
        cancelled: "Your booking has been cancelled. If you paid, a refund will be processed.",
        vendorIssue: "We're contacting the vendor about this issue and will update you shortly."
    },
    technical: {
        investigating: "Our technical team is investigating this issue. We'll keep you updated.",
        resolved: "The technical issue has been resolved. Please try again.",
        workaround: "While we work on a permanent fix, here's a workaround: {solution}",
        escalated: "This has been escalated to our senior technical team."
    },
    general: {
        acknowledged: "Thank you for contacting us. We've received your message.",
        moreInfo: "To better assist you, please provide more details.",
        resolved: "We're glad we could help! Is there anything else you need?",
        closing: "I'm marking this ticket as resolved. Feel free to reopen if you need further assistance."
    }
};
