// Unified Mock Data System for Trac
// All components should use this consistent dataset

window.TracMockData = {
    // Project configuration
    project: {
        name: 'Trac Modernization Project',
        version: '2.1.0',
        startDate: '2024-01-15',
        contributors: ['Alex Chen', 'Sarah Kim', 'Mike Rodriguez', 'Emma Thompson', 'David Park', 'Lisa Wang', 'James Wilson', 'Maria Garcia']
    },
    
    // User system with consistent initials and roles
    users: {
        'AC': { name: 'Alex Chen', email: 'alex.chen@company.com', role: 'Lead Developer', avatar: 'AC' },
        'SK': { name: 'Sarah Kim', email: 'sarah.kim@company.com', role: 'Frontend Developer', avatar: 'SK' },
        'MR': { name: 'Mike Rodriguez', email: 'mike.rodriguez@company.com', role: 'Backend Developer', avatar: 'MR' },
        'ET': { name: 'Emma Thompson', email: 'emma.thompson@company.com', role: 'QA Engineer', avatar: 'ET' },
        'DP': { name: 'David Park', email: 'david.park@company.com', role: 'DevOps Engineer', avatar: 'DP' },
        'LW': { name: 'Lisa Wang', email: 'lisa.wang@company.com', role: 'Product Manager', avatar: 'LW' },
        'JW': { name: 'James Wilson', email: 'james.wilson@company.com', role: 'UI/UX Designer', avatar: 'JW' },
        'MG': { name: 'Maria Garcia', email: 'maria.garcia@company.com', role: 'Senior Developer', avatar: 'MG' }
    },
    
    // Consistent ticket dataset
    tickets: [
        {
            id: '#001',
            title: 'Mobile login authentication fails on iOS Safari',
            description: 'Users experiencing 504 timeout errors when attempting to login on iOS Safari browsers during peak hours.',
            type: 'bug',
            priority: 'high',
            status: 'open',
            assignee: 'AC',
            reporter: 'ET',
            component: 'Authentication',
            milestone: 'v2.1.1',
            created: '2025-01-20T10:30:00Z',
            modified: '2025-01-25T14:22:00Z'
        },
        {
            id: '#002',
            title: 'Implement dark mode toggle for user interface',
            description: 'Add system-wide dark mode support with user preference persistence and smooth transitions.',
            type: 'feature',
            priority: 'medium',
            status: 'in-progress',
            assignee: 'SK',
            reporter: 'JW',
            component: 'Frontend',
            milestone: 'v2.2.0',
            created: '2025-01-18T09:15:00Z',
            modified: '2025-01-24T16:45:00Z'
        },
        {
            id: '#003',
            title: 'Update API documentation for new endpoints',
            description: 'Comprehensive documentation update for authentication and notification API endpoints.',
            type: 'task',
            priority: 'medium',
            status: 'review',
            assignee: 'MG',
            reporter: 'LW',
            component: 'Documentation',
            milestone: 'v2.1.1',
            created: '2025-01-19T11:20:00Z',
            modified: '2025-01-25T09:30:00Z'
        },
        {
            id: '#004',
            title: 'Database query performance optimization',
            description: 'Optimize slow queries in ticket search and analytics dashboard, add proper indexing.',
            type: 'enhancement',
            priority: 'high',
            status: 'done',
            assignee: 'MR',
            reporter: 'DP',
            component: 'Backend',
            milestone: 'v2.1.0',
            created: '2025-01-10T08:45:00Z',
            modified: '2025-01-22T17:20:00Z'
        },
        {
            id: '#005',
            title: 'Add real-time notification system',
            description: 'Implement WebSocket-based real-time notifications for ticket updates and system events.',
            type: 'feature',
            priority: 'medium',
            status: 'open',
            assignee: 'AC',
            reporter: 'LW',
            component: 'Frontend',
            milestone: 'v2.2.0',
            created: '2025-01-21T13:10:00Z',
            modified: '2025-01-25T11:15:00Z'
        },
        {
            id: '#006',
            title: 'Fix file upload timeout for large attachments',
            description: 'Files larger than 5MB timeout during upload, implement chunked upload with progress tracking.',
            type: 'bug',
            priority: 'medium',
            status: 'in-progress',
            assignee: 'MR',
            reporter: 'ET',
            component: 'Backend',
            milestone: 'v2.1.1',
            created: '2025-01-17T14:30:00Z',
            modified: '2025-01-24T10:40:00Z'
        },
        {
            id: '#007',
            title: 'Improve responsive design for tablet devices',
            description: 'Kanban board and analytics dashboard layout issues on iPad and Android tablets.',
            type: 'bug',
            priority: 'low',
            status: 'open',
            assignee: 'SK',
            reporter: 'JW',
            component: 'Frontend',
            milestone: 'v2.2.0',
            created: '2025-01-23T16:20:00Z',
            modified: '2025-01-25T08:45:00Z'
        },
        {
            id: '#008',
            title: 'Setup automated backup system',
            description: 'Implement daily automated backups with retention policy and disaster recovery procedures.',
            type: 'task',
            priority: 'high',
            status: 'review',
            assignee: 'DP',
            reporter: 'LW',
            component: 'Infrastructure',
            milestone: 'v2.1.1',
            created: '2025-01-16T12:00:00Z',
            modified: '2025-01-25T15:30:00Z'
        },
        {
            id: '#009',
            title: 'Add bulk ticket operations',
            description: 'Allow users to select multiple tickets for bulk status updates, assignments, and milestone changes.',
            type: 'enhancement',
            priority: 'low',
            status: 'open',
            assignee: 'MG',
            reporter: 'ET',
            component: 'Frontend',
            milestone: 'v2.3.0',
            created: '2025-01-22T09:30:00Z',
            modified: '2025-01-24T14:15:00Z'
        },
        {
            id: '#010',
            title: 'Security audit and vulnerability fixes',
            description: 'Comprehensive security review, update dependencies, fix identified vulnerabilities.',
            type: 'task',
            priority: 'high',
            status: 'done',
            assignee: 'AC',
            reporter: 'DP',
            component: 'Security',
            milestone: 'v2.1.0',
            created: '2025-01-08T10:00:00Z',
            modified: '2025-01-20T16:45:00Z'
        },
        {
            id: '#011',
            title: 'AI ticket assistant improvements',
            description: 'Enhanced problem analysis with server-side integration and better template matching.',
            type: 'enhancement',
            priority: 'medium',
            status: 'in-progress',
            assignee: 'MG',
            reporter: 'LW',
            component: 'AI Features',
            milestone: 'v2.2.0',
            created: '2025-01-24T11:45:00Z',
            modified: '2025-01-25T13:20:00Z'
        },
        {
            id: '#012',
            title: 'Email notification preferences',
            description: 'Allow users to configure email notification settings for different event types.',
            type: 'feature',
            priority: 'low',
            status: 'open',
            assignee: 'SK',
            reporter: 'MG',
            component: 'Notifications',
            milestone: 'v2.3.0',
            created: '2025-01-25T10:20:00Z',
            modified: '2025-01-25T10:20:00Z'
        }
    ],
    
    // Milestones with consistent dates and progress
    milestones: [
        {
            name: 'v2.1.0',
            description: 'Core stability and security updates',
            due: '2025-01-20T23:59:59Z',
            completed: '2025-01-20T18:30:00Z',
            status: 'completed',
            progress: 100,
            tickets: ['#004', '#010']
        },
        {
            name: 'v2.1.1',
            description: 'Critical bug fixes and improvements',
            due: '2025-01-30T23:59:59Z',
            completed: null,
            status: 'active',
            progress: 67,
            tickets: ['#001', '#003', '#006', '#008']
        },
        {
            name: 'v2.2.0',
            description: 'New features and UI enhancements',
            due: '2025-02-15T23:59:59Z',
            completed: null,
            status: 'planning',
            progress: 23,
            tickets: ['#002', '#005', '#007', '#011']
        },
        {
            name: 'v2.3.0',
            description: 'Advanced features and integrations',
            due: '2025-03-01T23:59:59Z',
            completed: null,
            status: 'planning',
            progress: 5,
            tickets: ['#009', '#012']
        }
    ],
    
    // Components with consistent naming
    components: [
        'Authentication',
        'Frontend',
        'Backend', 
        'Documentation',
        'Infrastructure',
        'Security',
        'AI Features',
        'Notifications'
    ],
    
    // Wiki pages for search
    wikiPages: [
        { title: 'Getting Started Guide', type: 'wiki', component: 'Documentation' },
        { title: 'API Reference', type: 'wiki', component: 'Documentation' },
        { title: 'Troubleshooting Guide', type: 'wiki', component: 'Documentation' },
        { title: 'Security Guidelines', type: 'wiki', component: 'Security' },
        { title: 'Development Setup', type: 'wiki', component: 'Documentation' },
        { title: 'Deployment Process', type: 'wiki', component: 'Infrastructure' }
    ],
    
    // Analytics calculations based on actual ticket data
    getAnalytics: function(period = '7d') {
        const now = new Date();
        const tickets = this.tickets;
        
        // Filter tickets by period
        let filteredTickets = tickets;
        if (period === '7d') {
            const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            filteredTickets = tickets.filter(t => new Date(t.created) >= weekAgo);
        } else if (period === '30d') {
            const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
            filteredTickets = tickets.filter(t => new Date(t.created) >= monthAgo);
        }
        
        const totalTickets = tickets.length;
        const openBugs = tickets.filter(t => t.type === 'bug' && t.status !== 'done').length;
        const activeMilestone = this.milestones.find(m => m.status === 'active');
        const milestoneProgress = activeMilestone ? activeMilestone.progress : 0;
        const activeContributors = [...new Set(tickets.map(t => t.assignee))].length;
        
        return {
            totalTickets,
            openBugs, 
            milestoneProgress,
            activeContributors,
            periodTickets: filteredTickets.length
        };
    },
    
    // Helper to get user info
    getUser: function(initials) {
        return this.users[initials] || { name: 'Unknown User', avatar: initials };
    },
    
    // Helper to format dates
    formatDate: function(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const diff = now - date;
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor(diff / (1000 * 60));
        
        if (minutes < 60) return `${minutes}m ago`;
        if (hours < 24) return `${hours}h ago`;
        if (days < 7) return `${days}d ago`;
        return date.toLocaleDateString();
    }
};

// Initialize the data system
console.log('🎯 Unified Mock Data System Loaded');
console.log(`📊 Total Tickets: ${window.TracMockData.tickets.length}`);
console.log(`👥 Contributors: ${Object.keys(window.TracMockData.users).length}`);
console.log(`🎯 Milestones: ${window.TracMockData.milestones.length}`);
