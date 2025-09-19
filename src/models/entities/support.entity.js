/**
 * Chat Message Entity
 * Represents a message in the support chat system
 */

export class ChatMessageEntity {
    constructor(data = {}) {
        this.id = data.id || null;
        this.ticketId = data.ticketId || null;
        this.senderId = data.senderId || null;
        this.senderName = data.senderName || '';
        this.senderType = data.senderType || 'customer'; // customer, agent, system
        this.content = data.content || '';
        this.messageType = data.messageType || 'text'; // text, image, file, system
        this.attachments = data.attachments || [];
        this.timestamp = data.timestamp || new Date().toISOString();
        this.isRead = data.isRead || false;
        this.readAt = data.readAt || null;
        this.isEdited = data.isEdited || false;
        this.editedAt = data.editedAt || null;
        this.isDeleted = data.isDeleted || false;
        this.deletedAt = data.deletedAt || null;
        this.metadata = data.metadata || {};
    }

    markAsRead(readerId = null) {
        this.isRead = true;
        this.readAt = new Date().toISOString();
        if (readerId) {
            this.metadata.readBy = readerId;
        }
    }

    edit(newContent) {
        this.content = newContent;
        this.isEdited = true;
        this.editedAt = new Date().toISOString();
    }

    delete() {
        this.isDeleted = true;
        this.deletedAt = new Date().toISOString();
        this.content = '[Message deleted]';
    }

    addAttachment(attachment) {
        this.attachments.push({
            id: Date.now().toString(),
            name: attachment.name,
            url: attachment.url,
            type: attachment.type,
            size: attachment.size,
            uploadedAt: new Date().toISOString()
        });
    }

    toJSON() {
        return {
            id: this.id,
            ticketId: this.ticketId,
            senderId: this.senderId,
            senderName: this.senderName,
            senderType: this.senderType,
            content: this.content,
            messageType: this.messageType,
            attachments: this.attachments,
            timestamp: this.timestamp,
            isRead: this.isRead,
            readAt: this.readAt,
            isEdited: this.isEdited,
            editedAt: this.editedAt,
            isDeleted: this.isDeleted,
            deletedAt: this.deletedAt,
            metadata: this.metadata
        };
    }
}

/**
 * Support Agent Entity
 * Represents a support agent in the system
 */
export class SupportAgentEntity {
    constructor(data = {}) {
        this.id = data.id || null;
        this.userId = data.userId || null;
        this.name = data.name || '';
        this.email = data.email || '';
        this.department = data.department || 'General Support';
        this.role = data.role || 'Agent'; // Agent, Senior Agent, Supervisor, Manager
        this.isOnline = data.isOnline || false;
        this.isAvailable = data.isAvailable || true;
        this.currentWorkload = data.currentWorkload || 0;
        this.maxWorkload = data.maxWorkload || 10;
        this.skills = data.skills || [];
        this.languages = data.languages || ['English'];
        this.avatar = data.avatar || null;
        this.timezone = data.timezone || 'UTC';
        this.workingHours = data.workingHours || {
            start: '09:00',
            end: '17:00',
            days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
        };
        this.lastSeen = data.lastSeen || new Date().toISOString();
        this.createdAt = data.createdAt || new Date().toISOString();
        this.updatedAt = data.updatedAt || new Date().toISOString();
    }

    setOnlineStatus(isOnline) {
        this.isOnline = isOnline;
        this.lastSeen = new Date().toISOString();
        this.updatedAt = new Date().toISOString();
    }

    setAvailability(isAvailable) {
        this.isAvailable = isAvailable;
        this.updatedAt = new Date().toISOString();
    }

    updateWorkload(increment = true) {
        if (increment) {
            this.currentWorkload = Math.min(this.currentWorkload + 1, this.maxWorkload);
        } else {
            this.currentWorkload = Math.max(this.currentWorkload - 1, 0);
        }
        this.updatedAt = new Date().toISOString();
    }

    canTakeTicket() {
        return this.isOnline && this.isAvailable && this.currentWorkload < this.maxWorkload;
    }

    addSkill(skill) {
        if (!this.skills.includes(skill)) {
            this.skills.push(skill);
        }
    }

    removeSkill(skill) {
        this.skills = this.skills.filter(s => s !== skill);
    }

    toJSON() {
        return {
            id: this.id,
            userId: this.userId,
            name: this.name,
            email: this.email,
            department: this.department,
            role: this.role,
            isOnline: this.isOnline,
            isAvailable: this.isAvailable,
            currentWorkload: this.currentWorkload,
            maxWorkload: this.maxWorkload,
            skills: this.skills,
            languages: this.languages,
            avatar: this.avatar,
            timezone: this.timezone,
            workingHours: this.workingHours,
            lastSeen: this.lastSeen,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        };
    }
}
