# Ticket Communication System - Documentation

## Overview
Complete ticket communication and handling system for SynkkAfrica Admin Panel with third-party integration support (Intercom, Zendesk, Freshdesk).

## Components Created

### 1. TicketChatBox Component
**Location:** `src/views/layouts/components/support/TicketChatBox.jsx`

**Features:**
- Real-time chat interface for ticket conversations
- Message grouping by date
- Support for text messages, attachments, and internal notes
- Read receipts and typing indicators
- Attachment preview and management
- Quick reply suggestions
- Keyboard shortcuts (Enter to send, Shift+Enter for new line)

**Usage:**
```jsx
import TicketChatBox from '@/views/layouts/components/support/TicketChatBox';

<TicketChatBox
  ticket={ticketData}
  messages={messagesArray}
  onSendMessage={handleSendMessage}
  currentAgent={currentAgentData}
  onClose={handleClose}
/>
```

**Message Structure:**
```javascript
{
  id: 1,
  ticketId: 'ticket-1',
  senderId: 'agent-1',
  senderName: 'Sarah Johnson',
  senderRole: 'agent', // 'agent' | 'customer' | 'system'
  message: 'Message text...',
  messageType: 'text', // 'text' | 'image' | 'file' | 'system_note'
  attachments: [],
  isInternal: false, // Internal notes not visible to customer
  createdAt: '2024-01-15T10:30:00',
  readBy: ['agent-1']
}
```

### 2. TemplateSelector Component
**Location:** `src/views/layouts/components/support/TemplateSelector.jsx`

**Features:**
- Search templates by name or content
- Filter by category (Payment, Vendor, Technical, General)
- Preview template content
- Variable highlighting
- Quick template selection

**Usage:**
```jsx
import TemplateSelector from '@/views/layouts/components/support/TemplateSelector';

<TemplateSelector
  onSelectTemplate={handleTemplateSelection}
  onClose={() => setShowTemplates(false)}
/>
```

**Available Templates:**
1. Payment Investigation
2. Payment Resolved
3. Vendor Escalation
4. Technical Issue Investigation
5. General Inquiry Response
6. Account Verification
7. Dispute Resolution
8. Satisfaction Follow-up

### 3. QuickActionsPanel Component
**Location:** `src/views/layouts/components/support/QuickActionsPanel.jsx`

**Features:**
- Quick action buttons for common ticket operations
- SLA timer with visual progress indicator
- Color-coded priority-based actions
- One-click macro execution

**Quick Actions Available:**
1. **Acknowledge Receipt** - Send acknowledgment to customer
2. **Request More Info** - Ask customer for additional details
3. **Escalate to Manager** - Escalate urgent issues
4. **Mark as Spam** - Flag and close spam tickets
5. **Request Payment Proof** - Ask for payment evidence
6. **Initiate Refund** - Start refund process
7. **Forward to Technical** - Send to technical team

**Usage:**
```jsx
import QuickActionsPanel from '@/views/layouts/components/support/QuickActionsPanel';

<QuickActionsPanel
  ticket={ticketData}
  onExecuteAction={handleQuickAction}
/>
```

### 4. Ticket Details Page
**Location:** `src/app/dashboard/business/settings/support/tickets/[ticketId]/page.jsx`

**Features:**
- Complete ticket overview with customer info
- Ticket details sidebar
- Chat interface integration
- Activity timeline
- Quick actions panel
- Template selector integration
- Status management
- Real-time updates

**Route:** `/dashboard/business/settings/support/tickets/[ticketId]`

### 5. ChatWidgetIntegration Component
**Location:** `src/views/layouts/components/support/ChatWidgetIntegration.jsx`

**Features:**
- Third-party chat widget integration
- Support for Intercom, Zendesk, Freshdesk
- Automatic user data prefilling
- Custom branding (orange theme)
- Webhook support for ticket creation

**Usage:**
```jsx
import ChatWidgetIntegration from '@/views/layouts/components/support/ChatWidgetIntegration';

// In your main layout or app component
<ChatWidgetIntegration
  provider="intercom" // or "zendesk" | "freshdesk"
  user={{
    id: "user123",
    name: "John Doe",
    email: "john@example.com",
    plan: "premium",
    totalBookings: 15
  }}
/>
```

**useChatWidget Hook:**
```jsx
import { useChatWidget } from '@/views/layouts/components/support/ChatWidgetIntegration';

function MyComponent() {
  const { showChat, hideChat, sendMessage, updateUser } = useChatWidget();
  
  const handleContactSupport = () => {
    showChat();
    sendMessage("I need help with my booking");
  };
  
  return (
    <button onClick={handleContactSupport}>
      Contact Support
    </button>
  );
}
```

### 6. Ticket Communication Entity
**Location:** `src/models/entities/ticket-communication.entity.js`

**Exports:**
- `TicketMessage` - Message class
- `TicketTemplate` - Template class
- `responseTemplates` - Array of predefined templates
- `quickActions` - Array of quick action macros
- `integrationConfigs` - Third-party integration settings
- `notificationChannels` - Email, SMS, Push, In-app configs
- `slaRules` - Response and resolution time rules
- `routingRules` - Auto-assignment rules
- `cannedResponses` - Quick reply templates

## Configuration

### Third-Party Integration Setup

**Intercom:**
```javascript
integrationConfigs.intercom = {
  enabled: true,
  appId: 'your_intercom_app_id',
  apiKey: 'your_intercom_api_key',
  webhookUrl: '/api/webhooks/intercom'
}
```

**Zendesk:**
```javascript
integrationConfigs.zendesk = {
  enabled: false,
  subdomain: 'your_subdomain',
  zendeskKey: 'your_zendesk_key',
  apiToken: 'your_api_token'
}
```

**Freshdesk:**
```javascript
integrationConfigs.freshdesk = {
  enabled: false,
  domain: 'your_domain.freshdesk.com',
  apiKey: 'your_freshdesk_api_key',
  widgetId: 'your_widget_id'
}
```

### Notification Channels

**Email (SendGrid):**
```javascript
notificationChannels.email = {
  provider: 'sendgrid',
  apiKey: 'your_sendgrid_api_key',
  fromEmail: 'support@synkkafrica.com',
  templates: {
    newTicket: 'template_id_1',
    statusUpdate: 'template_id_2',
    newMessage: 'template_id_3'
  }
}
```

**SMS (Twilio):**
```javascript
notificationChannels.sms = {
  provider: 'twilio',
  accountSid: 'your_account_sid',
  authToken: 'your_auth_token',
  fromNumber: '+1234567890'
}
```

### SLA Rules
- **Urgent**: 30 minutes first response, 4 hours resolution
- **High**: 2 hours first response, 24 hours resolution
- **Medium**: 4 hours first response, 48 hours resolution
- **Low**: 8 hours first response, 72 hours resolution

## Workflow

### 1. Customer Creates Ticket
```
Customer → Chat Widget/Form → Ticket Created → Auto-assigned via routing rules → Agent Notified
```

### 2. Agent Handles Ticket
```
Agent Opens Ticket → Reviews Details → Uses Quick Actions or Templates → Sends Response → Updates Status
```

### 3. Escalation Flow
```
SLA Breach Detected → Auto-escalate → Manager Notified → Priority Increased → Reassigned
```

### 4. Resolution Flow
```
Agent Resolves Issue → Status Updated to Resolved → Customer Notified → Satisfaction Survey Sent → Ticket Closed
```

## API Integration Points

### Required Endpoints (to be implemented):

1. **GET /api/tickets/:id** - Fetch ticket details
2. **POST /api/tickets** - Create new ticket
3. **PATCH /api/tickets/:id** - Update ticket
4. **GET /api/tickets/:id/messages** - Get ticket messages
5. **POST /api/tickets/:id/messages** - Send message
6. **POST /api/tickets/:id/assign** - Assign to agent
7. **POST /api/tickets/:id/escalate** - Escalate ticket
8. **POST /api/webhooks/intercom** - Intercom webhook handler
9. **POST /api/webhooks/zendesk** - Zendesk webhook handler
10. **POST /api/webhooks/freshdesk** - Freshdesk webhook handler

## Real-Time Features (To Implement)

### WebSocket Events:
- `ticket:new_message` - New message received
- `ticket:status_updated` - Status changed
- `ticket:assigned` - Ticket assigned to agent
- `agent:typing` - Agent is typing
- `ticket:escalated` - Ticket escalated

### Polling Alternative:
```javascript
// Poll for new messages every 5 seconds
useEffect(() => {
  const interval = setInterval(() => {
    fetchNewMessages(ticketId);
  }, 5000);
  
  return () => clearInterval(interval);
}, [ticketId]);
```

## Best Practices

### 1. Template Usage
- Use templates for common responses
- Customize variables before sending
- Keep templates updated

### 2. Internal Notes
- Use internal notes for agent communication
- Document investigation steps
- Never expose internal notes to customers

### 3. Quick Actions
- Use quick actions for efficiency
- Verify action before executing
- Document action in activity log

### 4. SLA Management
- Monitor SLA timers
- Escalate before breach
- Set realistic expectations

### 5. Customer Communication
- Be professional and courteous
- Provide clear timelines
- Follow up proactively

## Troubleshooting

### Chat Widget Not Loading
1. Check integration config enabled status
2. Verify API keys are correct
3. Check browser console for errors
4. Ensure script is loaded after DOM ready

### Messages Not Sending
1. Verify API endpoint is accessible
2. Check authentication tokens
3. Validate message format
4. Check network requests in DevTools

### Templates Not Showing
1. Verify template entity is imported
2. Check template category matches filter
3. Ensure templates array is not empty

## Future Enhancements

1. **AI-Powered Responses** - Suggested responses using AI
2. **Sentiment Analysis** - Detect customer sentiment
3. **Automated Routing** - ML-based ticket routing
4. **Knowledge Base** - Integrate help articles
5. **Video Chat** - Face-to-face support option
6. **Multi-language** - Automatic translation
7. **Analytics Dashboard** - Detailed metrics and insights
8. **Mobile App** - Native mobile support app

## Support

For questions or issues with the ticket communication system, contact the development team or refer to the component documentation in each file.
