console.log('Support system test - checking ticket data');

// Test the SupportController directly
import { SupportController } from '../controllers/business/support.controller.js';

const supportController = new SupportController();

// Test data loading
const testTicketLoading = async () => {
    console.log('Testing support controller...');
    
    try {
        // Get all tickets
        const allTickets = await supportController.getAllTickets();
        console.log('All tickets result:', allTickets);
        
        if (allTickets.success && allTickets.data.length > 0) {
            const firstTicket = allTickets.data[0];
            console.log('First ticket:', firstTicket);
            
            // Test getting individual ticket
            const ticketResult = await supportController.getTicket(firstTicket.id);
            console.log('Individual ticket result:', ticketResult);
            
            // Test getting messages
            const messagesResult = await supportController.getTicketMessages(firstTicket.id);
            console.log('Messages result:', messagesResult);
        }
    } catch (error) {
        console.error('Test error:', error);
    }
};

// Run test
testTicketLoading();
