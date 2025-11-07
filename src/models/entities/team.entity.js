// Team Members Entity
export const teamMembers = [
    {
        id: "TM-001",
        name: "Faluyi Temidayo",
        email: "tfaluyi@synkkafrica.com",
        role: "Business Admin",
        department: "Operations",
        permissions: ["view_content", "edit_content", "delete_content", "manage_users", "manage_vendors", "view_finance"],
        status: "active",
        joinedDate: "2024-01-15",
        lastActive: "2025-01-05",
        image: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
        id: "TM-002",
        name: "Sarah Okafor",
        email: "sokafor@synkkafrica.com",
        role: "Technical Admin",
        department: "Engineering",
        permissions: ["view_content", "edit_content", "manage_system", "view_analytics", "manage_integrations"],
        status: "active",
        joinedDate: "2024-02-20",
        lastActive: "2025-01-04",
        image: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
        id: "TM-003",
        name: "John Adebayo",
        email: "jadebayo@synkkafrica.com",
        role: "Finance Manager",
        department: "Finance",
        permissions: ["view_finance", "manage_finance", "process_payouts", "handle_disputes"],
        status: "active",
        joinedDate: "2024-03-10",
        lastActive: "2025-01-05",
        image: "https://randomuser.me/api/portraits/men/52.jpg"
    },
    {
        id: "TM-004",
        name: "Grace Eze",
        email: "geze@synkkafrica.com",
        role: "Support Manager",
        department: "Customer Support",
        permissions: ["view_content", "manage_tickets", "view_customers", "manage_bookings"],
        status: "active",
        joinedDate: "2024-04-05",
        lastActive: "2025-01-03",
        image: "https://randomuser.me/api/portraits/women/68.jpg"
    },
    {
        id: "TM-005",
        name: "Emmanuel Johnson",
        email: "ejohnson@synkkafrica.com",
        role: "Content Manager",
        department: "Marketing",
        permissions: ["view_content", "edit_content", "manage_cms"],
        status: "inactive",
        joinedDate: "2023-11-20",
        lastActive: "2024-12-15",
        image: "https://randomuser.me/api/portraits/men/75.jpg"
    }
];

// Available roles with default permissions
export const roles = [
    {
        name: "Business Admin",
        description: "Full access to business operations and management",
        permissions: ["view_content", "edit_content", "delete_content", "manage_users", "manage_vendors", "view_finance", "manage_bookings", "manage_tickets"]
    },
    {
        name: "Technical Admin",
        description: "System administration and technical management",
        permissions: ["view_content", "edit_content", "manage_system", "view_analytics", "manage_integrations", "view_logs"]
    },
    {
        name: "Finance Manager",
        description: "Financial operations and transaction management",
        permissions: ["view_finance", "manage_finance", "process_payouts", "handle_disputes", "view_reports"]
    },
    {
        name: "Support Manager",
        description: "Customer support and ticket management",
        permissions: ["view_content", "manage_tickets", "view_customers", "manage_bookings", "view_vendors"]
    },
    {
        name: "Content Manager",
        description: "Content creation and management",
        permissions: ["view_content", "edit_content", "manage_cms", "view_analytics"]
    },
    {
        name: "Operations Manager",
        description: "Day-to-day operations management",
        permissions: ["view_content", "manage_vendors", "manage_bookings", "view_customers", "view_finance"]
    }
];

// All available permissions
export const allPermissions = [
    { id: "view_content", name: "View Content", category: "Content" },
    { id: "edit_content", name: "Edit Content", category: "Content" },
    { id: "delete_content", name: "Delete Content", category: "Content" },
    { id: "manage_cms", name: "Manage CMS", category: "Content" },
    
    { id: "view_customers", name: "View Customers", category: "Users" },
    { id: "manage_users", name: "Manage Users", category: "Users" },
    
    { id: "view_vendors", name: "View Vendors", category: "Vendors" },
    { id: "manage_vendors", name: "Manage Vendors", category: "Vendors" },
    
    { id: "view_bookings", name: "View Bookings", category: "Operations" },
    { id: "manage_bookings", name: "Manage Bookings", category: "Operations" },
    
    { id: "view_finance", name: "View Finance", category: "Finance" },
    { id: "manage_finance", name: "Manage Finance", category: "Finance" },
    { id: "process_payouts", name: "Process Payouts", category: "Finance" },
    { id: "handle_disputes", name: "Handle Disputes", category: "Finance" },
    
    { id: "manage_tickets", name: "Manage Support Tickets", category: "Support" },
    
    { id: "manage_system", name: "System Administration", category: "System" },
    { id: "view_analytics", name: "View Analytics", category: "System" },
    { id: "manage_integrations", name: "Manage Integrations", category: "System" },
    { id: "view_logs", name: "View System Logs", category: "System" },
    { id: "view_reports", name: "View Reports", category: "System" }
];

export const departments = [
    "Operations",
    "Engineering",
    "Finance",
    "Customer Support",
    "Marketing",
    "Product",
    "Sales"
];
