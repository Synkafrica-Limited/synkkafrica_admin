# Support System Setup Guide

This guide will help you set up the complete support system with third-party integrations for real-time chat and enhanced customer service.

## 🚀 Quick Start

The support system is already functional with our custom implementation. However, for production use, we recommend integrating with the following third-party services:

## 📦 Required Dependencies

```bash
npm install socket.io-client
npm install socket.io
npm install express
npm install cors
npm install helmet
npm install rate-limiter-flexible
```

## 🔧 Third-Party Service Integrations

### 1. Socket.io for Real-time Chat

**Setup Socket.io Server:**

Create a new file `server/socket-server.js`:

```javascript
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// Socket.io event handlers
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Join ticket room
  socket.on('join_ticket', (data) => {
    socket.join(`ticket_${data.ticketId}`);
    console.log(`User ${socket.id} joined ticket room: ${data.ticketId}`);
  });

  // Send message
  socket.on('send_message', (data) => {
    io.to(`ticket_${data.ticketId}`).emit('new_message', data);
  });

  // Update ticket status
  socket.on('update_ticket_status', (data) => {
    io.to(`ticket_${data.ticketId}`).emit('ticket_updated', data);
  });

  // Agent status updates
  socket.on('update_agent_status', (data) => {
    socket.broadcast.emit('agent_status_changed', {
      agentId: socket.userId,
      ...data
    });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.SOCKET_PORT || 3001;
server.listen(PORT, () => {
  console.log(`Socket.io server running on port ${PORT}`);
});
```

**Environment Variables:**
```env
SOCKET_PORT=3001
CLIENT_URL=http://localhost:3000
```

### 2. Email Service Integration (Recommended: SendGrid or AWS SES)

**SendGrid Setup:**

```bash
npm install @sendgrid/mail
```

Create `lib/services/email.service.js`:

```javascript
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export class EmailService {
  static async sendTicketCreatedEmail(ticket) {
    const msg = {
      to: ticket.customerEmail,
      from: process.env.SUPPORT_EMAIL,
      subject: `Support Ticket Created - #${ticket.ticketNumber}`,
      html: `
        <h2>Your support ticket has been created</h2>
        <p>Hello ${ticket.customerName},</p>
        <p>We've received your support request and created ticket #${ticket.ticketNumber}.</p>
        <p><strong>Subject:</strong> ${ticket.subject}</p>
        <p>We'll get back to you as soon as possible.</p>
      `
    };
    return await sgMail.send(msg);
  }
}
```

### 3. SMS Notifications (Recommended: Twilio)

**Twilio Setup:**

```bash
npm install twilio
```

Create `lib/services/sms.service.js`:

```javascript
const twilio = require('twilio');
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

export class SMSService {
  static async sendTicketUpdateSMS(phone, message) {
    return await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phone
    });
  }
}
```

### 4. File Upload Service (Recommended: AWS S3 or Cloudinary)

**AWS S3 Setup:**

```bash
npm install aws-sdk
npm install multer
npm install multer-s3
```

### 5. Analytics and Monitoring (Recommended: Mixpanel or Google Analytics)

**Mixpanel Setup:**

```bash
npm install mixpanel
```

## 🔐 Security Considerations

1. **Rate Limiting:**
```bash
npm install express-rate-limit
```

2. **Input Validation:**
```bash
npm install joi
npm install express-validator
```

3. **CORS Configuration:**
```javascript
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
  credentials: true
}));
```

## 🗄️ Database Integration

### MongoDB Setup (Recommended)

```bash
npm install mongoose
```

### PostgreSQL Setup (Alternative)

```bash
npm install pg
npm install sequelize
```

## 📱 Mobile App Support

For mobile app integration, consider:

1. **React Native:** Use the same Socket.io client
2. **Push Notifications:** Firebase Cloud Messaging (FCM)
3. **Deep Linking:** For direct ticket access

## 🔄 Webhook Integrations

### Slack Integration

```javascript
// Slack webhook for agent notifications
const webhook = new IncomingWebhook(process.env.SLACK_WEBHOOK_URL);

await webhook.send({
  text: `New urgent ticket #${ticket.ticketNumber} from ${ticket.customerName}`
});
```

### Microsoft Teams Integration

```javascript
// Teams webhook
const teamsMessage = {
  "@type": "MessageCard",
  "@context": "http://schema.org/extensions",
  "summary": "New Support Ticket",
  "themeColor": "0078D4",
  "sections": [{
    "activityTitle": `New Ticket #${ticket.ticketNumber}`,
    "activitySubtitle": ticket.customerName,
    "facts": [{
      "name": "Priority:",
      "value": ticket.priority
    }]
  }]
};
```

## 🚀 Deployment

### Vercel Deployment

```bash
# Deploy the main app
vercel --prod

# Deploy Socket.io server separately
# Use Heroku, Railway, or DigitalOcean for Socket.io server
```

### Docker Setup

```dockerfile
# Dockerfile for Socket.io server
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3001
CMD ["node", "socket-server.js"]
```

## 📊 Monitoring and Analytics

1. **Error Tracking:** Sentry
```bash
npm install @sentry/nextjs
```

2. **Performance Monitoring:** New Relic or DataDog
3. **Uptime Monitoring:** UptimeRobot or Pingdom

## 🧪 Testing

```bash
npm install jest
npm install @testing-library/react
npm install socket.io-client
```

Create test files for:
- Support controller
- Socket.io integration
- Message handling
- Ticket creation

## 📚 Documentation

The support system includes:

1. **Customer-facing chat widget**
2. **Agent dashboard**
3. **Real-time messaging**
4. **Ticket management**
5. **Analytics and reporting**
6. **Email notifications**
7. **File attachments**
8. **Mobile responsive design**

## 🔧 Configuration

Update your `.env.local`:

```env
# Socket.io
NEXT_PUBLIC_SOCKET_URL=ws://localhost:3001

# Email Service
SENDGRID_API_KEY=your_sendgrid_key
SUPPORT_EMAIL=support@synkkafrica.com

# SMS Service
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
TWILIO_PHONE_NUMBER=+1234567890

# File Upload
AWS_ACCESS_KEY_ID=your_aws_key
AWS_SECRET_ACCESS_KEY=your_aws_secret
AWS_BUCKET_NAME=your_bucket_name

# Database
DATABASE_URL=your_database_url
```

## 🎯 Next Steps

1. Set up Socket.io server
2. Configure email service
3. Add file upload functionality
4. Implement push notifications
5. Set up monitoring and analytics
6. Add automated testing
7. Deploy to production

The support system is ready to use and can be enhanced with these integrations based on your specific needs and scale requirements.
