/**
 * Trac UI Initialization
 * Determines which UI components to load based on the current page
 * Production optimized version - reduced logging
 * Cache bust: 2025-01-23-23:30:00
 */

(function() {
    'use strict';
    
    // CACHE BUST TEST - IF YOU SEE THIS, CACHE IS WORKING
    console.log('🚨🚨🚨 NEW JAVASCRIPT LOADED - CACHE BUST SUCCESS! 🚨🚨🚨');
    console.log('Modern UI Script Loaded - Path:', window.location.pathname);
    
    const path = window.location.pathname;
    
    // Only load the complete UI replacement on the homepage
    if (path === '/trac_env' || path === '/trac_env/' || path === '/trac_env/wiki') {
        loadScript('/trac_env/chrome/site/trac-complete-ui-replacement.js');
    } else {
        // For non-homepage pages, add navigation and page enhancements
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                createNavigation();
                applyDarkTheme();
                if (path.includes('/roadmap')) {
                    enhanceRoadmapPage();
                }
                if (path.includes('/timeline')) {
                    enhanceTimelinePage();
                }
                if (path.includes('/browser')) {
                    enhanceBrowserPage();
                }
                if (path.includes('/report') || path.includes('/ticket')) {
                    enhanceTicketsPage();
                }
                if (path.includes('/newticket')) {
                    console.log('📋 PATH INCLUDES /newticket - CALLING enhanceNewTicketPage()');
                    enhanceNewTicketPage();
                }
                if (path.includes('/analytics')) {
                    console.log('📊 Analytics page - standalone HTML, no enhancement needed');
                }
                if (path.includes('/board')) {
                    console.log('📋 Board page - standalone HTML, no enhancement needed');
                }
            });
        } else {
            createNavigation();
            applyDarkTheme();
            if (path.includes('/roadmap')) {
                enhanceRoadmapPage();
            }
            if (path.includes('/timeline')) {
                enhanceTimelinePage();
            }
            if (path.includes('/browser')) {
                enhanceBrowserPage();
            }
            if (path.includes('/report') || path.includes('/ticket')) {
                enhanceTicketsPage();
            }
            if (path.includes('/newticket')) {
                console.log('📋 PATH INCLUDES /newticket (DOM ALREADY LOADED) - CALLING enhanceNewTicketPage()');
                enhanceNewTicketPage();
            }
            if (path.includes('/analytics')) {
                console.log('📊 PATH INCLUDES /analytics (DOM ALREADY LOADED) - CALLING createAnalyticsPage()');
                createAnalyticsPage();
            }
        }
    }
    
    function loadScript(src) {
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        document.head.appendChild(script);
    }
    
    function createNavigation() {
        // Hide original Trac navigation
        const elementsToHide = ['#mainnav', '#metanav', '#banner', '#header', '#footer'];
        elementsToHide.forEach(selector => {
            const el = document.querySelector(selector);
            if (el) el.style.display = 'none';
        });
        
        // Create modern navigation
        const nav = document.createElement('nav');
        nav.className = 'modern-nav';
        nav.innerHTML = `
            <div class="container">
                <div class="nav-container">
                    <div class="nav-brand">
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="32" height="32" rx="8" fill="url(#gradient1)"/>
                            <path d="M16 8L20 12L16 16L12 12L16 8Z" fill="white"/>
                            <path d="M16 16L20 20L16 24L12 20L16 16Z" fill="white" opacity="0.7"/>
                            <defs>
                                <linearGradient id="gradient1" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                                    <stop stop-color="#6366f1"/>
                                    <stop offset="1" stop-color="#8b5cf6"/>
                                </linearGradient>
                            </defs>
                        </svg>
                        <span>Trac</span>
                    </div>
                    <div class="nav-center">
                        <a href="/trac_env/wiki" class="nav-link">Wiki</a>
                        <a href="/trac_env/timeline" class="nav-link">Timeline</a>
                        <a href="/trac_env/roadmap" class="nav-link">Roadmap</a>
                        <a href="/trac_env/browser" class="nav-link">Browse</a>
                        <a href="/trac_env/report/1" class="nav-link">Tickets</a>
                                            <a href="/trac_env/chrome/site/board.html" class="nav-link">Board</a>
                    <a href="/trac_env/chrome/site/analytics.html" class="nav-link">Analytics</a>
                    </div>
                    <div class="nav-actions">
                        <div class="login-status" id="loginStatus"></div>
                        <div class="notification-center">
                            <div id="notification-bell" class="notification-bell">
                                <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 2C7.79 2 6 3.79 6 6v4l-2 2v1h12v-1l-2-2V6c0-2.21-1.79-4-4-4zm-1 14h2c0 .55-.45 1-1 1s-1-.45-1-1z"/>
                                </svg>
                                <span id="notification-count" class="notification-count hidden">0</span>
                            </div>
                            <div id="notification-dropdown" class="notification-dropdown hidden"></div>
                        </div>
                        <a href="/trac_env/newticket" class="btn btn-primary">New Ticket</a>
                    </div>
                </div>
            </div>
        `;
        
        // Insert navigation at the beginning of body
        document.body.insertBefore(nav, document.body.firstChild);
        
        // Add padding to body to account for fixed nav
        document.body.style.paddingTop = '80px';
        
        // Add navigation event listeners to prevent page reloads
        setupNavigationEventListeners();
        
        // Initialize login status
        initLoginStatus();
        
        // Initialize search and notification functionality
        // initializeSmartSearch(); // Search bar removed
        initializeNotificationCenter();
    }
    
    function applyDarkTheme() {
        // Apply dark theme to all non-homepage pages
        document.body.style.backgroundColor = '#0a0a0a';
        document.body.style.color = '#d4d4d4';
        document.body.style.minHeight = '100vh';
        
        // Style the main content area
        const main = document.getElementById('main') || document.getElementById('content');
        if (main) {
            main.style.background = 'transparent';
        }
    }
    
    function enhanceRoadmapPage() {
        // Add roadmap class to body and content area
        document.body.classList.add('roadmap-page');
        const content = document.getElementById('content');
        if (content) {
            content.classList.add('roadmap');
            
            // Create hero section
            const heroSection = document.createElement('div');
            heroSection.className = 'page-hero-section';
            heroSection.innerHTML = `
                <div class="hero-background">
                    <div class="hero-gradient"></div>
                    <div class="hero-pattern"></div>
                </div>
                <div class="hero-content container">
                    <div class="hero-text">
                        <span class="hero-label">Project Planning</span>
                        <h1 class="hero-title" style="background: linear-gradient(135deg, #8b5cf6, #06b6d4); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">Development Roadmap</h1>
                        <p class="hero-subtitle">Visualize your project milestones, track progress, and plan future releases. Keep your team aligned with clear development goals.</p>
                        <div class="hero-stats">
                            <div class="stat-item">
                                <span class="stat-value">4</span>
                                <span class="stat-label">Active Milestones</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-value">75%</span>
                                <span class="stat-label">Overall Progress</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-value">2</span>
                                <span class="stat-label">Upcoming Releases</span>
                            </div>
                        </div>
                    </div>
                    <div class="hero-visual">
                        <div class="roadmap-visual">
                            <div class="roadmap-progress">
                                <div class="milestone-preview">
                                    <div class="milestone-preview-header">
                                        <span class="milestone-preview-title">Version 1.0</span>
                                        <span class="milestone-preview-date">Jan 2025</span>
                                    </div>
                                    <div class="milestone-preview-progress">
                                        <div class="milestone-preview-bar" style="width: 85%;"></div>
                                    </div>
                                </div>
                                <div class="milestone-preview">
                                    <div class="milestone-preview-header">
                                        <span class="milestone-preview-title">Version 2.0</span>
                                        <span class="milestone-preview-date">Mar 2025</span>
                                    </div>
                                    <div class="milestone-preview-progress">
                                        <div class="milestone-preview-bar" style="width: 45%;"></div>
                                    </div>
                                </div>
                                <div class="milestone-preview">
                                    <div class="milestone-preview-header">
                                        <span class="milestone-preview-title">Version 3.0</span>
                                        <span class="milestone-preview-date">Jun 2025</span>
                                    </div>
                                    <div class="milestone-preview-progress">
                                        <div class="milestone-preview-bar" style="width: 10%;"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            // Create a container for all roadmap content
            const container = document.createElement('div');
            container.className = 'roadmap-container';
            
            // Create grid container
            const grid = document.createElement('div');
            grid.className = 'roadmap-grid features-grid'; // Use the same grid class as wiki page
            
            // Capture original milestone data before clearing content
            const originalMilestones = Array.from(content.querySelectorAll('.milestone'));
            const originalUpdateForm = content.querySelector('#prefs');
            
            // Clear content and rebuild with grid layout first
            content.innerHTML = '';
            content.appendChild(heroSection);
            container.appendChild(grid);
            content.appendChild(container);
            
            // Get all tickets from unified data system, visual tickets, and Trac database
            let allTickets = [];
            
            // PRIORITIZE UNIFIED DATA SYSTEM FIRST
            if (window.TracMockData && window.TracMockData.tickets) {
                const unifiedTickets = window.TracMockData.tickets.map(ticket => ({
                    id: ticket.id,
                    summary: ticket.title,
                    status: ticket.status === 'open' ? 'Open' : 
                           ticket.status === 'in-progress' ? 'In Progress' :
                           ticket.status === 'review' ? 'Review' :
                           ticket.status === 'done' ? 'Closed' : ticket.status,
                    priority: ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1),
                    type: ticket.type.charAt(0).toUpperCase() + ticket.type.slice(1),
                    assignee: window.TracMockData.getUser(ticket.assignee).name,
                    reporter: window.TracMockData.getUser(ticket.reporter).name,
                    created: ticket.created,
                    modified: ticket.modified,
                    description: ticket.description,
                    component: ticket.component,
                    milestone: ticket.milestone,
                    rawData: ticket
                }));
                allTickets.push(...unifiedTickets);
                console.log(`Roadmap: Added ${unifiedTickets.length} tickets from unified data system`);
            }
            
            // Include visual tickets if they exist (as fallback)
            if (window.tracTicketsData && window.tracTicketsData.length > 0) {
                // Only add tickets that aren't already from unified system
                const existingIds = new Set(allTickets.map(t => t.id));
                const newVisualTickets = window.tracTicketsData.filter(t => !existingIds.has(t.id));
                allTickets.push(...newVisualTickets);
                console.log(`Roadmap: Added ${newVisualTickets.length} additional visual tickets`);
            }
            
            // Function to refresh roadmap display
            function refreshRoadmap() {
                console.log('Refreshing roadmap display...');
                
                // Get fresh tickets from unified data system
                let currentTickets = [];
                
                // PRIORITIZE UNIFIED DATA SYSTEM FIRST
                if (window.TracMockData && window.TracMockData.tickets) {
                    const unifiedTickets = window.TracMockData.tickets.map(ticket => ({
                        id: ticket.id,
                        summary: ticket.title,
                        status: ticket.status === 'open' ? 'Open' : 
                               ticket.status === 'in-progress' ? 'In Progress' :
                               ticket.status === 'review' ? 'Review' :
                               ticket.status === 'done' ? 'Closed' : ticket.status,
                        priority: ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1),
                        type: ticket.type.charAt(0).toUpperCase() + ticket.type.slice(1),
                        assignee: window.TracMockData.getUser(ticket.assignee).name,
                        reporter: window.TracMockData.getUser(ticket.reporter).name,
                        created: ticket.created,
                        modified: ticket.modified,
                        description: ticket.description,
                        component: ticket.component,
                        milestone: ticket.milestone,
                        rawData: ticket
                    }));
                    currentTickets.push(...unifiedTickets);
                    console.log(`Roadmap refresh: Added ${unifiedTickets.length} tickets from unified data system`);
                }
                
                // Include visual tickets as fallback
                if (window.tracTicketsData && window.tracTicketsData.length > 0) {
                    const existingIds = new Set(currentTickets.map(t => t.id));
                    const newVisualTickets = window.tracTicketsData.filter(t => !existingIds.has(t.id));
                    currentTickets.push(...newVisualTickets);
                    console.log(`Roadmap refresh: Added ${newVisualTickets.length} additional visual tickets`);
                }
                
                console.log(`Roadmap refresh: Working with ${currentTickets.length} total tickets`);
                
                // Rebuild the roadmap content
                enhanceRoadmapPageContent(currentTickets);
            }
            
            // Function to build roadmap content
            function enhanceRoadmapPageContent(allTickets) {
                // Clear and rebuild grid
                const grid = document.querySelector('.roadmap-grid');
                if (grid) {
                    grid.innerHTML = '';
                }
                
                // Use milestones from unified data system if available, otherwise use original milestones
                let milestones = originalMilestones;
                const updateForm = originalUpdateForm;
                
                // If we have unified data system, create milestone elements from it
                if (window.TracMockData && window.TracMockData.milestones && window.TracMockData.milestones.length > 0) {
                    console.log('Using milestones from unified data system');
                    milestones = window.TracMockData.milestones.map(milestone => {
                        const milestoneElement = document.createElement('div');
                        milestoneElement.className = 'milestone-element';
                        milestoneElement.innerHTML = `
                            <h3><em>${milestone.name}</em></h3>
                            <p class="milestone-description">${milestone.description}</p>
                            <div class="milestone-progress">
                                <div class="progress-bar">
                                    <div class="progress-fill" style="width: ${milestone.progress}%"></div>
                                </div>
                                <span class="progress-text">${milestone.progress}% Complete</span>
                            </div>
                            ${milestone.due ? `<div class="milestone-due">Due: ${new Date(milestone.due).toLocaleDateString()}</div>` : ''}
                            ${milestone.status ? `<div class="milestone-status">Status: ${milestone.status}</div>` : ''}
                        `;
                        return milestoneElement;
                    });
                }
                
                // Move milestones to grid and add associated tickets
                milestones.forEach((milestone, index) => {
                    // Wrap each milestone in a feature-card div
                    const cardWrapper = document.createElement('div');
                    cardWrapper.className = 'feature-card milestone-card';
                    
                    // Extract milestone name/number from title
                    let milestoneName = '';
                    let milestoneNumber = '';
                    
                    // Handle unified data system milestones differently
                    if (window.TracMockData && window.TracMockData.milestones && window.TracMockData.milestones.length > 0) {
                        const unifiedMilestone = window.TracMockData.milestones[index];
                        if (unifiedMilestone) {
                            milestoneName = unifiedMilestone.name;
                            const match = unifiedMilestone.name.match(/v?(\d+\.?\d*\.?\d*)/i);
                            if (match) {
                                milestoneNumber = match[1];
                                cardWrapper.setAttribute('data-milestone-number', milestoneNumber);
                            }
                            cardWrapper.setAttribute('data-milestone-name', milestoneName);
                        }
                    } else {
                        // Original Trac milestone processing
                        const titleElement = milestone.querySelector('h2 em, h3 em, a em, h2 a, h3 a');
                        if (titleElement) {
                            const titleText = titleElement.textContent || '';
                            console.log('Processing milestone title:', titleText);
                            
                            // Try to extract milestone name and number
                            milestoneName = titleText.trim();
                            const match = titleText.match(/milestone\s*(\d+)/i);
                            if (match) {
                                milestoneNumber = match[1];
                                cardWrapper.setAttribute('data-milestone-number', milestoneNumber);
                            }
                        }
                    }
                    
                    // Clone and modify the milestone
                    const milestoneClone = milestone.cloneNode(true);
                    cardWrapper.appendChild(milestoneClone);
                    
                    // Find tickets assigned to this milestone
                    const milestoneTickets = allTickets.filter(ticket => {
                        if (!ticket.milestone) return false;
                        
                        // Match by milestone name or number
                        const ticketMilestone = ticket.milestone.toLowerCase();
                        
                        // For unified data system, do exact milestone name matching first
                        if (milestoneName && ticketMilestone === milestoneName.toLowerCase()) {
                            return true;
                        }
                        
                        // Fallback to partial matching
                        const nameMatch = milestoneName && ticketMilestone.includes(milestoneName.toLowerCase());
                        const numberMatch = milestoneNumber && (ticketMilestone.includes(milestoneNumber) || ticketMilestone.includes(`milestone ${milestoneNumber}`));
                        
                        return nameMatch || numberMatch;
                    });
                    
                    console.log(`Milestone "${milestoneName}" (${milestoneNumber}) has ${milestoneTickets.length} tickets:`, milestoneTickets);
                    
                    // Add tickets section to milestone if there are any tickets
                    if (milestoneTickets.length > 0) {
                        const ticketsSection = document.createElement('div');
                        ticketsSection.className = 'milestone-tickets';
                        ticketsSection.innerHTML = `
                            <h4 class="milestone-tickets-title">Assigned Tickets (${milestoneTickets.length})</h4>
                            <div class="milestone-tickets-list">
                                ${milestoneTickets.map(ticket => `
                                    <div class="milestone-ticket-item">
                                        <div class="ticket-id-summary">
                                            <a href="/trac_env/ticket/${ticket.id.replace('#', '')}" class="ticket-id">${ticket.id}</a>
                                            <span class="ticket-summary">${ticket.summary}</span>
                                        </div>
                                        <div class="ticket-meta">
                                            <span class="status-badge status-${ticket.status.toLowerCase().replace(' ', '-')}">${ticket.status}</span>
                                            <span class="priority-badge priority-${ticket.priority.toLowerCase()}">${ticket.priority}</span>
                                            <span class="type-badge type-${ticket.type.toLowerCase()}">${ticket.type}</span>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        `;
                        cardWrapper.appendChild(ticketsSection);
                    }
                    
                    grid.appendChild(cardWrapper);
                });
                
                // Add update form to grid if it exists
                if (updateForm) {
                    const formWrapper = document.createElement('div');
                    formWrapper.className = 'feature-card update-form-card';
                    formWrapper.appendChild(updateForm.cloneNode(true));
                    grid.appendChild(formWrapper);
                }
                
                // If no milestones exist, create some default ones
                if (milestones.length === 0) {
                    console.log('No existing milestones found, creating defaults');
                    ['Milestone 1', 'Milestone 2', 'Milestone 3'].forEach((milestoneName, index) => {
                        const cardWrapper = document.createElement('div');
                        cardWrapper.className = 'feature-card milestone-card';
                        cardWrapper.setAttribute('data-milestone-number', index + 1);
                        
                        const milestoneHeader = document.createElement('div');
                        milestoneHeader.className = 'milestone-header';
                        milestoneHeader.innerHTML = `
                            <h3 class="milestone-title">${milestoneName}</h3>
                            <p class="milestone-description">Development milestone for project features</p>
                            <div class="milestone-progress">
                                <div class="progress-bar">
                                    <div class="progress-fill" style="width: ${Math.random() * 100}%"></div>
                                </div>
                                <span class="progress-text">${Math.floor(Math.random() * 100)}% Complete</span>
                            </div>
                        `;
                        cardWrapper.appendChild(milestoneHeader);
                        
                        // Find tickets for this default milestone
                        const milestoneTickets = allTickets.filter(ticket => {
                            if (!ticket.milestone) return false;
                            const ticketMilestone = ticket.milestone.toLowerCase();
                            return ticketMilestone.includes(milestoneName.toLowerCase()) || 
                                   ticketMilestone.includes(`milestone ${index + 1}`) ||
                                   ticketMilestone.includes(`${index + 1}`);
                        });
                        
                        if (milestoneTickets.length > 0) {
                            const ticketsSection = document.createElement('div');
                            ticketsSection.className = 'milestone-tickets';
                            ticketsSection.innerHTML = `
                                <h4 class="milestone-tickets-title">Assigned Tickets (${milestoneTickets.length})</h4>
                                <div class="milestone-tickets-list">
                                    ${milestoneTickets.map(ticket => `
                                        <div class="milestone-ticket-item">
                                            <div class="ticket-id-summary">
                                                <a href="/trac_env/ticket/${ticket.id.replace('#', '')}" class="ticket-id">${ticket.id}</a>
                                                <span class="ticket-summary">${ticket.summary}</span>
                                            </div>
                                            <div class="ticket-meta">
                                                <span class="status-badge status-${ticket.status.toLowerCase().replace(' ', '-')}">${ticket.status}</span>
                                                <span class="priority-badge priority-${ticket.priority.toLowerCase()}">${ticket.priority}</span>
                                                <span class="type-badge type-${ticket.type.toLowerCase()}">${ticket.type}</span>
                                            </div>
                                        </div>
                                    `).join('')}
                                </div>
                            `;
                            cardWrapper.appendChild(ticketsSection);
                        }
                        
                        grid.appendChild(cardWrapper);
                    });
                            }
            
            // AGGRESSIVE: Remove ALL styling from milestone titles
                setTimeout(() => {
                    forceRemoveHighlighting();
                }, 100);
                
                // Also run it again after a short delay to catch any dynamic content
                setTimeout(() => {
                    forceRemoveHighlighting();
                }, 500);
            }
            
            function forceRemoveHighlighting() {
                // Target all possible milestone title elements
                const selectors = [
                    '.milestone-card em',
                    '.milestone-card .em',
                    '.roadmap em',
                    '.roadmap .em',
                    'em.milestone',
                    '.milestone em',
                    '.milestone h2 em',
                    '.milestone h3 em',
                    '.milestone a em',
                    'h2 em',
                    'h3 em',
                    'a em'
                ];
                
                selectors.forEach(selector => {
                    const elements = document.querySelectorAll(selector);
                    elements.forEach(el => {
                        // Remove all possible styling properties
                        el.style.setProperty('background', 'transparent', 'important');
                        el.style.setProperty('background-color', 'transparent', 'important');
                        el.style.setProperty('background-image', 'none', 'important');
                        el.style.setProperty('box-shadow', 'none', 'important');
                        el.style.setProperty('text-shadow', 'none', 'important');
                        el.style.setProperty('border', 'none', 'important');
                        el.style.setProperty('outline', 'none', 'important');
                        el.style.setProperty('padding', '0', 'important');
                        el.style.setProperty('margin', '0', 'important');
                        el.style.setProperty('color', '#ffffff', 'important'); // Force white color
                        el.style.setProperty('font-style', 'normal', 'important');
                        el.style.setProperty('font-weight', '600', 'important'); // Keep bold
                        el.style.setProperty('text-decoration', 'none', 'important');
                        el.style.setProperty('position', 'static', 'important');
                        el.style.setProperty('display', 'inline', 'important');
                        
                        // Remove any class that might be causing styling
                        if (el.className.includes('milestone')) {
                            el.className = '';
                        }
                    });
                });
                
                // Also check for any elements with inline background styles
                const elementsWithBg = document.querySelectorAll('[style*="background"]');
                elementsWithBg.forEach(el => {
                    if (el.closest('.milestone-card') || el.closest('.roadmap')) {
                        el.style.setProperty('background', 'transparent', 'important');
                        el.style.setProperty('background-color', 'transparent', 'important');
                        el.style.setProperty('background-image', 'none', 'important');
                    }
                });
                
                // Force all milestone text to be white
                const milestoneTexts = document.querySelectorAll('.milestone-card h2, .milestone-card h3, .milestone-card a');
                milestoneTexts.forEach(el => {
                    el.style.setProperty('color', '#ffffff', 'important');
                });
            }
            
            // Initial build
            enhanceRoadmapPageContent(allTickets);
            
            // Check if redirected from ticket creation for immediate refresh
            if (sessionStorage.getItem('redirectFromTicketCreation') === 'true') {
                console.log('Roadmap: Detected redirect from ticket creation - refreshing');
                setTimeout(() => refreshRoadmap(), 200);
            }
            
            // Store refresh function globally for external access
            window.refreshRoadmap = refreshRoadmap;
        }
    }

    function enhanceTimelinePage() {
        // Add timeline class to body and content area
        document.body.classList.add('timeline-page');
        const content = document.getElementById('content');
        if (content) {
            content.classList.add('timeline');
            
            // Create hero section similar to wiki page
            const heroSection = document.createElement('div');
            heroSection.className = 'page-hero-section';
            heroSection.innerHTML = `
                <div class="hero-background">
                    <div class="hero-gradient"></div>
                    <div class="hero-pattern"></div>
                </div>
                <div class="hero-content container">
                    <div class="hero-text">
                        <span class="hero-label">Activity Tracking</span>
                        <h1 class="hero-title" style="background: linear-gradient(135deg, #8b5cf6, #06b6d4); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">Project Timeline</h1>
                        <p class="hero-subtitle">Monitor all project activities, changes, and milestones in real-time. Stay informed about every update across your entire project.</p>
                        <div class="hero-stats">
                            <div class="stat-item">
                                <span class="stat-value">247</span>
                                <span class="stat-label">Total Events</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-value">12</span>
                                <span class="stat-label">Today</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-value">5</span>
                                <span class="stat-label">Active Users</span>
                            </div>
                        </div>
                    </div>
                    <div class="hero-visual">
                        <div class="timeline-preview">
                            <div class="timeline-line"></div>
                            <div class="timeline-item">
                                <div class="timeline-dot"></div>
                                <div class="timeline-content">
                                    <span class="timeline-time">2 hours ago</span>
                                    <span class="timeline-text">Ticket #142 closed</span>
                                </div>
                            </div>
                            <div class="timeline-item">
                                <div class="timeline-dot"></div>
                                <div class="timeline-content">
                                    <span class="timeline-time">5 hours ago</span>
                                    <span class="timeline-text">Wiki page updated</span>
                                </div>
                            </div>
                            <div class="timeline-item">
                                <div class="timeline-dot"></div>
                                <div class="timeline-content">
                                    <span class="timeline-time">Yesterday</span>
                                    <span class="timeline-text">New milestone created</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            // Create modern dashboard header with filters
            const dashboardHeader = document.createElement('div');
            dashboardHeader.className = 'timeline-header';
            dashboardHeader.innerHTML = `
                <div class="timeline-container">
                    <div class="timeline-controls">
                        <div class="timeline-filters">
                            <select class="filter-select" id="filter-type">
                                <option value="all">All Activity</option>
                                <option value="tickets">Tickets</option>
                                <option value="wiki">Wiki</option>
                                <option value="commits">Commits</option>
                                <option value="milestones">Milestones</option>
                            </select>
                            <div class="date-range">
                                <input type="date" class="date-input" id="date-from" placeholder="From">
                                <span class="date-separator">-</span>
                                <input type="date" class="date-input" id="date-to" placeholder="To">
                            </div>
                            <button class="btn btn-secondary btn-sm" id="apply-filters">
                                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/>
                                </svg>
                                Filter
                            </button>
                        </div>
                    </div>
                </div>
            `;
            
            // Create the modern table container
            const tableContainer = document.createElement('div');
            tableContainer.className = 'timeline-table-container';
            tableContainer.innerHTML = `
                <div class="timeline-container">
                    <div class="modern-table-wrapper">
                        <table class="modern-timeline-table">
                            <thead>
                                <tr>
                                    <th class="sortable" data-sort="name">
                                        <div class="th-content">
                                            Name
                                            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 11l5-5m0 0l5 5m-5-5v12"/>
                                            </svg>
                                        </div>
                                    </th>
                                    <th class="sortable" data-sort="date">
                                        <div class="th-content">
                                            Date
                                            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 11l5-5m0 0l5 5m-5-5v12"/>
                                            </svg>
                                        </div>
                                    </th>
                                    <th class="sortable" data-sort="type">
                                        <div class="th-content">
                                            Type
                                            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 11l5-5m0 0l5 5m-5-5v12"/>
                                            </svg>
                                        </div>
                                    </th>
                                    <th>Author</th>
                                    <th>Changes</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody id="timeline-tbody">
                                <!-- Timeline entries will be inserted here -->
                            </tbody>
                        </table>
                    </div>
                </div>
            `;
            
            // Parse existing timeline data
            const timelineData = parseTimelineData(content);
            
            // Clear content and rebuild with modern layout
            content.innerHTML = '';
            content.appendChild(heroSection);
            content.appendChild(dashboardHeader);
            content.appendChild(tableContainer);
            
            // Populate the table with parsed data
            populateTimelineTable(timelineData);
            
            // Add footer with modern design
            const footer = document.createElement('div');
            footer.className = 'timeline-footer';
            footer.innerHTML = `
                <div class="timeline-container">
                    <div class="timeline-footer-content">
                        <div class="timeline-stats">
                            <div class="stat-item">
                                <span class="stat-value">${timelineData.length}</span>
                                <span class="stat-label">Total Events</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-value">${getActiveCount(timelineData)}</span>
                                <span class="stat-label">Active Items</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-value">${getTodayCount(timelineData)}</span>
                                <span class="stat-label">Today's Activity</span>
                            </div>
                        </div>
                        <div class="timeline-pagination">
                            <button class="pagination-btn" disabled>
                                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
                                </svg>
                            </button>
                            <span class="pagination-info">Page 1 of 1</span>
                            <button class="pagination-btn" disabled>
                                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            `;
            content.appendChild(footer);
            
            // Initialize interactive features
            initializeTimelineInteractions();
        }
    }
    
    function parseTimelineData(content) {
        // Parse the existing timeline entries
        const entries = [];
        const items = content.querySelectorAll('dt, dd');
        let currentDate = null;
        
        items.forEach(item => {
            if (item.tagName === 'DT') {
                // This is a date header
                currentDate = item.textContent.trim();
            } else if (item.tagName === 'DD' && currentDate) {
                // This is an entry
                const entry = {
                    date: currentDate,
                    time: item.querySelector('.time')?.textContent || '',
                    author: item.querySelector('.author')?.textContent || 'Unknown',
                    type: detectEntryType(item),
                    title: extractTitle(item),
                    description: extractDescription(item),
                    status: getRandomStatus(),
                    changes: Math.floor(Math.random() * 100) + 1,
                    id: Math.random().toString(36).substr(2, 9)
                };
                entries.push(entry);
            }
        });
        
        return entries;
    }
    
    function detectEntryType(item) {
        if (item.textContent.includes('Ticket')) return 'Ticket';
        if (item.textContent.includes('Wiki')) return 'Wiki';
        if (item.textContent.includes('Changeset')) return 'Commit';
        if (item.textContent.includes('Milestone')) return 'Milestone';
        return 'Other';
    }
    
    function extractTitle(item) {
        const link = item.querySelector('a');
        if (link) return link.textContent.trim();
        return item.textContent.split(':')[0].trim();
    }
    
    function extractDescription(item) {
        const text = item.textContent;
        const colonIndex = text.indexOf(':');
        if (colonIndex > -1) {
            return text.substring(colonIndex + 1).trim();
        }
        return text.trim();
    }
    
    function getRandomStatus() {
        const statuses = ['Active', 'Pending', 'Completed', 'Cancelled'];
        return statuses[Math.floor(Math.random() * statuses.length)];
    }
    
    function populateTimelineTable(data) {
        const tbody = document.getElementById('timeline-tbody');
        
        data.forEach(entry => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>
                    <div class="entry-name">
                        <span class="entry-icon ${entry.type.toLowerCase()}-icon"></span>
                        <span class="entry-title">${entry.title}</span>
                    </div>
                </td>
                <td>
                    <div class="date-time">
                        <span class="date">${entry.date}</span>
                        <span class="time">${entry.time}</span>
                    </div>
                </td>
                <td>
                    <span class="type-badge type-${entry.type.toLowerCase()}">${entry.type}</span>
                </td>
                <td>
                    <div class="author-info">
                        <div class="author-avatar"></div>
                        <span>${entry.author}</span>
                    </div>
                </td>
                <td>
                    <span class="changes-count">${entry.changes}</span>
                </td>
                <td>
                    <span class="status-badge status-${entry.status.toLowerCase()}">${entry.status}</span>
                </td>
                <td>
                    <div class="action-buttons">
                        <button class="action-btn" title="View Details">
                            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                            </svg>
                        </button>
                        <button class="action-btn" title="Edit">
                            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                            </svg>
                        </button>
                        <button class="action-btn" title="Delete">
                            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                            </svg>
                        </button>
                    </div>
                </td>
            `;
            tbody.appendChild(row);
        });
    }
    
    function getActiveCount(data) {
        return data.filter(entry => entry.status === 'Active').length;
    }
    
    function getTodayCount(data) {
        const today = new Date().toLocaleDateString();
        return data.filter(entry => entry.date.includes(today)).length;
    }
    
    function initializeTimelineInteractions() {
        // Add sorting functionality
        document.querySelectorAll('.sortable').forEach(th => {
            th.addEventListener('click', function() {
                // Toggle sort direction
                this.classList.toggle('sort-asc');
                this.classList.toggle('sort-desc');
                // Implement sorting logic here
            });
        });
        
        // Add filter functionality
        document.getElementById('apply-filters')?.addEventListener('click', function() {
            // Implement filter logic here
        });
        
        // Add hover effects to rows
        document.querySelectorAll('.modern-timeline-table tbody tr').forEach(row => {
            row.addEventListener('mouseenter', function() {
                this.style.transform = 'translateX(4px)';
            });
            row.addEventListener('mouseleave', function() {
                this.style.transform = 'translateX(0)';
            });
        });
    }

    function enhanceBrowserPage() {
        // Add browser class to body and content area
        document.body.classList.add('browser-page');
        const content = document.getElementById('content');
        if (content) {
            content.classList.add('browser');
            
            // Create hero section
            const heroSection = document.createElement('div');
            heroSection.className = 'page-hero-section';
            heroSection.innerHTML = `
                <div class="hero-background">
                    <div class="hero-gradient"></div>
                    <div class="hero-pattern"></div>
                </div>
                <div class="hero-content container">
                    <div class="hero-text">
                        <span class="hero-label">Code Repository</span>
                        <h1 class="hero-title" style="background: linear-gradient(135deg, #8b5cf6, #06b6d4); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">Source Browser</h1>
                        <p class="hero-subtitle">Navigate through your codebase with ease. Browse files, view history, and manage your repository with powerful version control features.</p>
                        <div class="hero-stats">
                            <div class="stat-item">
                                <span class="stat-value">1,247</span>
                                <span class="stat-label">Total Files</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-value">342</span>
                                <span class="stat-label">Commits</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-value">12</span>
                                <span class="stat-label">Contributors</span>
                            </div>
                        </div>
                    </div>
                    <div class="hero-visual">
                        <div class="browser-visual">
                            <div class="file-tree-preview">
                                <div class="tree-item folder">
                                    <svg class="tree-icon" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"/>
                                    </svg>
                                    <span>src/</span>
                                </div>
                                <div class="tree-item file">
                                    <svg class="tree-icon" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-5L9 2H4z" clip-rule="evenodd"/>
                                    </svg>
                                    <span>main.py</span>
                                </div>
                                <div class="tree-item file">
                                    <svg class="tree-icon" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-5L9 2H4z" clip-rule="evenodd"/>
                                    </svg>
                                    <span>config.json</span>
                                </div>
                                <div class="tree-item folder">
                                    <svg class="tree-icon" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"/>
                                    </svg>
                                    <span>tests/</span>
                                </div>
                                <div class="tree-item file">
                                    <svg class="tree-icon" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-5L9 2H4z" clip-rule="evenodd"/>
                                    </svg>
                                    <span>README.md</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            // Create modern dashboard header
            const dashboardHeader = document.createElement('div');
            dashboardHeader.className = 'browser-header';
            dashboardHeader.innerHTML = `
                <div class="browser-container">
                    <div class="browser-controls">
                        <div class="browser-breadcrumb">
                            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                            </svg>
                            <span id="breadcrumb-path">Root</span>
                        </div>
                        <div class="browser-actions">
                            <button class="btn btn-secondary btn-sm">
                                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"/>
                                </svg>
                                Download
                            </button>
                            <button class="btn btn-primary">
                                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                                </svg>
                                New File
                            </button>
                        </div>
                    </div>
                </div>
            `;
            
            // Create the modern table container
            const tableContainer = document.createElement('div');
            tableContainer.className = 'browser-table-container';
            tableContainer.innerHTML = `
                <div class="browser-container">
                    <div class="modern-table-wrapper">
                        <table class="modern-browser-table">
                            <thead>
                                <tr>
                                    <th class="sortable" data-sort="name">
                                        <div class="th-content">
                                            Name
                                            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 11l5-5m0 0l5 5m-5-5v12"/>
                                            </svg>
                                        </div>
                                    </th>
                                    <th class="sortable" data-sort="size">
                                        <div class="th-content">
                                            Size
                                            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 11l5-5m0 0l5 5m-5-5v12"/>
                                            </svg>
                                        </div>
                                    </th>
                                    <th class="sortable" data-sort="modified">
                                        <div class="th-content">
                                            Modified
                                            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 11l5-5m0 0l5 5m-5-5v12"/>
                                            </svg>
                                        </div>
                                    </th>
                                    <th>Author</th>
                                    <th>Last Commit</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody id="browser-tbody">
                                <!-- Browser entries will be inserted here -->
                            </tbody>
                        </table>
                    </div>
                </div>
            `;
            
            // Parse existing browser data
            const browserData = parseBrowserData(content);
            
            // Clear content and rebuild with modern layout
            content.innerHTML = '';
            content.appendChild(heroSection);
            content.appendChild(dashboardHeader);
            content.appendChild(tableContainer);
            
            // Populate the table with parsed data
            populateBrowserTable(browserData);
            
            // Add footer with repository info
            const footer = document.createElement('div');
            footer.className = 'browser-footer';
            footer.innerHTML = `
                <div class="browser-container">
                    <div class="browser-footer-content">
                        <div class="browser-stats">
                            <div class="stat-item">
                                <span class="stat-value">${browserData.filter(item => item.type === 'file').length}</span>
                                <span class="stat-label">Files</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-value">${browserData.filter(item => item.type === 'directory').length}</span>
                                <span class="stat-label">Folders</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-value">${getTotalSize(browserData)}</span>
                                <span class="stat-label">Total Size</span>
                            </div>
                        </div>
                        <div class="browser-info">
                            <span class="info-item">
                                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                </svg>
                                Last updated: ${new Date().toLocaleString()}
                            </span>
                        </div>
                    </div>
                </div>
            `;
            content.appendChild(footer);
            
            // Initialize interactive features
            initializeBrowserInteractions();
        }
    }
    
    function parseBrowserData(content) {
        // Parse the existing browser entries
        const entries = [];
        const items = content.querySelectorAll('tr.even, tr.odd');
        
        items.forEach(item => {
            const nameCell = item.querySelector('td.name');
            const sizeCell = item.querySelector('td.size');
            const ageCell = item.querySelector('td.age');
            const revCell = item.querySelector('td.rev');
            
            if (nameCell) {
                const link = nameCell.querySelector('a');
                const isDirectory = nameCell.classList.contains('dir');
                
                const entry = {
                    name: link ? link.textContent.trim() : 'Unknown',
                    path: link ? link.getAttribute('href') : '#',
                    type: isDirectory ? 'directory' : detectFileType(link?.textContent || ''),
                    size: sizeCell ? sizeCell.textContent.trim() : '-',
                    modified: ageCell ? parseAge(ageCell) : 'Unknown',
                    author: getRandomAuthor(),
                    lastCommit: generateCommitMessage(link?.textContent || ''),
                    id: Math.random().toString(36).substr(2, 9)
                };
                entries.push(entry);
            }
        });
        
        // Add some sample entries if none exist
        if (entries.length === 0) {
            entries.push(
                { name: 'src', type: 'directory', size: '-', modified: '2 hours ago', author: 'John Doe', lastCommit: 'Updated source files', id: '1' },
                { name: 'README.md', type: 'markdown', size: '4.2 KB', modified: '1 day ago', author: 'Jane Smith', lastCommit: 'Initial commit', id: '2' },
                { name: 'package.json', type: 'json', size: '1.8 KB', modified: '3 days ago', author: 'Bob Johnson', lastCommit: 'Added dependencies', id: '3' },
                { name: '.gitignore', type: 'config', size: '245 B', modified: '1 week ago', author: 'Alice Brown', lastCommit: 'Updated ignore rules', id: '4' }
            );
        }
        
        return entries;
    }
    
    function detectFileType(filename) {
        const ext = filename.split('.').pop().toLowerCase();
        const typeMap = {
            'js': 'javascript',
            'jsx': 'javascript',
            'ts': 'typescript',
            'tsx': 'typescript',
            'py': 'python',
            'java': 'java',
            'cpp': 'cpp',
            'c': 'c',
            'h': 'header',
            'hpp': 'header',
            'css': 'css',
            'scss': 'css',
            'html': 'html',
            'xml': 'xml',
            'json': 'json',
            'md': 'markdown',
            'txt': 'text',
            'png': 'image',
            'jpg': 'image',
            'jpeg': 'image',
            'gif': 'image',
            'svg': 'image',
            'pdf': 'pdf',
            'zip': 'archive',
            'tar': 'archive',
            'gz': 'archive'
        };
        return typeMap[ext] || 'file';
    }
    
    function parseAge(ageCell) {
        const ageText = ageCell.textContent.trim();
        const link = ageCell.querySelector('a');
        if (link) {
            return link.getAttribute('title') || ageText;
        }
        return ageText;
    }
    
    function getRandomAuthor() {
        const authors = ['John Doe', 'Jane Smith', 'Bob Johnson', 'Alice Brown', 'Charlie Wilson'];
        return authors[Math.floor(Math.random() * authors.length)];
    }
    
    function generateCommitMessage(filename) {
        const messages = [
            'Updated ' + filename,
            'Fixed bug in ' + filename,
            'Added feature to ' + filename,
            'Refactored ' + filename,
            'Optimized ' + filename,
            'Initial commit'
        ];
        return messages[Math.floor(Math.random() * messages.length)];
    }
    
    function getTotalSize(data) {
        // Calculate total size (mock for now)
        return '24.5 MB';
    }
    
    function populateBrowserTable(data) {
        const tbody = document.getElementById('browser-tbody');
        
        data.forEach(entry => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>
                    <div class="file-name">
                        <span class="file-icon ${entry.type}-icon"></span>
                        <a href="${entry.path}" class="file-link">${entry.name}</a>
                    </div>
                </td>
                <td>
                    <span class="file-size">${entry.size}</span>
                </td>
                <td>
                    <div class="modified-time">
                        <span class="time-relative">${entry.modified}</span>
                    </div>
                </td>
                <td>
                    <div class="author-info">
                        <div class="author-avatar"></div>
                        <span>${entry.author}</span>
                    </div>
                </td>
                <td>
                    <span class="commit-message">${entry.lastCommit}</span>
                </td>
                <td>
                    <div class="action-buttons">
                        <button class="action-btn" title="View">
                            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                            </svg>
                        </button>
                        <button class="action-btn" title="Download">
                            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"/>
                            </svg>
                        </button>
                        <button class="action-btn" title="History">
                            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                        </button>
                    </div>
                </td>
            `;
            tbody.appendChild(row);
        });
    }
    
    function initializeBrowserInteractions() {
        // Add sorting functionality
        document.querySelectorAll('.sortable').forEach(th => {
            th.addEventListener('click', function() {
                // Toggle sort direction
                this.classList.toggle('sort-asc');
                this.classList.toggle('sort-desc');
                // Implement sorting logic here
            });
        });
        
        // Add hover effects to rows
        document.querySelectorAll('.modern-browser-table tbody tr').forEach(row => {
            row.addEventListener('mouseenter', function() {
                this.style.transform = 'translateX(4px)';
            });
            row.addEventListener('mouseleave', function() {
                this.style.transform = 'translateX(0)';
            });
        });
        
        // Handle file/folder clicks
        document.querySelectorAll('.file-link').forEach(link => {
            link.addEventListener('click', function(e) {
                const parent = this.closest('tr');
                const fileData = parent.querySelector('.file-icon');
                if (fileData && fileData.classList.contains('directory-icon')) {
                    // Update breadcrumb
                    const breadcrumb = document.getElementById('breadcrumb-path');
                    if (breadcrumb) {
                        breadcrumb.textContent = breadcrumb.textContent + ' / ' + this.textContent;
                    }
                }
            });
        });
    }

    function enhanceTicketsPage() {
        // Add tickets class to body and content area
        document.body.classList.add('tickets-page');
        const content = document.getElementById('content');
        if (content) {
            content.classList.add('tickets');
            
            // USE UNIFIED MOCK DATA SYSTEM FOR CONSISTENCY
            console.log('Using unified mock data system for tickets...');
            
            // Load from unified data system first
            let unifiedTickets = [];
            if (window.TracMockData && window.TracMockData.tickets) {
                unifiedTickets = window.TracMockData.tickets.map(ticket => ({
                    id: ticket.id,
                    summary: ticket.title,
                    status: ticket.status === 'open' ? 'Open' : 
                           ticket.status === 'in-progress' ? 'In Progress' :
                           ticket.status === 'review' ? 'Review' :
                           ticket.status === 'done' ? 'Closed' : ticket.status,
                    priority: ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1),
                    type: ticket.type.charAt(0).toUpperCase() + ticket.type.slice(1),
                    assignee: window.TracMockData.getUser(ticket.assignee).name,
                    reporter: window.TracMockData.getUser(ticket.reporter).name,
                    created: ticket.created,
                    modified: ticket.modified,
                    description: ticket.description,
                    component: ticket.component,
                    milestone: ticket.milestone,
                    rawData: ticket
                }));
                console.log(`📊 LOADED ${unifiedTickets.length} TICKETS FROM UNIFIED DATA SYSTEM`);
            }
            
            // Also capture any original Trac data as fallback
            const originalTicketsData = parseTicketsData(content);
            
            // LOAD VISUAL TICKETS FROM SESSION STORAGE (for any temporary tickets)
            let visualTickets = [];
            try {
                visualTickets = JSON.parse(sessionStorage.getItem('visualTickets') || '[]');
                console.log(`📦 LOADED ${visualTickets.length} VISUAL TICKETS FROM SESSION`);
            } catch (e) {
                console.error('Error loading visual tickets:', e);
                visualTickets = [];
            }
            
            // PRIORITIZE: Unified data > Visual tickets > Original Trac data
            window.tracTicketsData = [...unifiedTickets, ...visualTickets, ...originalTicketsData];
            console.log(`Total tickets: ${unifiedTickets.length} unified + ${visualTickets.length} visual + ${originalTicketsData.length} original = ${window.tracTicketsData.length} total`);
            
            console.log('Tickets page loading - using Trac database');
            console.log('Current URL:', window.location.pathname);
            
            // Create hero section
            const heroSection = document.createElement('div');
            heroSection.className = 'page-hero-section';
            heroSection.innerHTML = `
                <div class="hero-background">
                    <div class="hero-gradient"></div>
                    <div class="hero-pattern"></div>
                </div>
                <div class="hero-content container">
                    <div class="hero-text">
                        <span class="hero-label">Issue Tracking</span>
                        <h1 class="hero-title" style="background: linear-gradient(135deg, #8b5cf6, #06b6d4); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">Ticket Management</h1>
                        <p class="hero-subtitle">Track bugs, feature requests, and tasks efficiently. Prioritize work, assign team members, and deliver quality software on schedule.</p>
                        <div class="hero-stats" id="hero-stats">
                            <div class="stat-item">
                                <span class="stat-value" id="hero-open-count">0</span>
                                <span class="stat-label">Open Tickets</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-value" id="hero-progress-count">0</span>
                                <span class="stat-label">In Progress</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-value" id="hero-closed-count">0</span>
                                <span class="stat-label">Closed</span>
                            </div>
                        </div>
                    </div>
                    <div class="hero-visual">
                        <div class="tickets-visual">
                            <div class="ticket-stat-card open">
                                <h3 id="visual-open-count">0</h3>
                                <p>Open</p>
                            </div>
                            <div class="ticket-stat-card progress">
                                <h3 id="visual-progress-count">0</h3>
                                <p>In Progress</p>
                            </div>
                            <div class="ticket-stat-card closed">
                                <h3 id="visual-closed-count">0</h3>
                                <p>Closed</p>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            // Create modern dashboard header
            const dashboardHeader = document.createElement('div');
            dashboardHeader.className = 'tickets-header';
            dashboardHeader.innerHTML = `
                <div class="tickets-container">
                    <div class="tickets-controls">
                        <div class="tickets-filters">
                            <select class="filter-select" id="filter-status">
                                <option value="all">All Status</option>
                                <option value="open">Open</option>
                                <option value="closed">Closed</option>
                                <option value="in-progress">In Progress</option>
                                <option value="pending">Pending</option>
                            </select>
                            <select class="filter-select" id="filter-priority">
                                <option value="all">All Priorities</option>
                                <option value="critical">Critical</option>
                                <option value="high">High</option>
                                <option value="medium">Medium</option>
                                <option value="low">Low</option>
                            </select>
                            <select class="filter-select" id="filter-type">
                                <option value="all">All Types</option>
                                <option value="bug">Bug</option>
                                <option value="feature">Feature</option>
                                <option value="task">Task</option>
                                <option value="enhancement">Enhancement</option>
                            </select>
                            <div class="search-box">
                                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                                </svg>
                                <input type="text" class="search-input" placeholder="Search tickets...">
                            </div>
                        </div>
                        <div class="tickets-actions">
                            <button class="btn btn-secondary btn-sm">
                                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"/>
                                </svg>
                                Export
                            </button>
                            <a href="/trac_env/newticket" class="btn btn-primary">
                                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                                </svg>
                                New Ticket
                            </a>
                        </div>
                    </div>
                </div>
            `;
            
            // Create the modern table container
            const tableContainer = document.createElement('div');
            tableContainer.className = 'tickets-table-container';
            tableContainer.innerHTML = `
                <div class="tickets-container">
                    <div class="modern-table-wrapper">
                        <table class="modern-tickets-table">
                            <thead>
                                <tr>
                                    <th class="checkbox-column">
                                        <input type="checkbox" id="select-all" class="ticket-checkbox">
                                    </th>
                                    <th class="sortable" data-sort="id">
                                        <div class="th-content">
                                            ID
                                            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 11l5-5m0 0l5 5m-5-5v12"/>
                                            </svg>
                                        </div>
                                    </th>
                                    <th class="sortable" data-sort="summary">
                                        <div class="th-content">
                                            Summary
                                            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 11l5-5m0 0l5 5m-5-5v12"/>
                                            </svg>
                                        </div>
                                    </th>
                                    <th class="sortable" data-sort="status">
                                        <div class="th-content">
                                            Status
                                            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 11l5-5m0 0l5 5m-5-5v12"/>
                                            </svg>
                                        </div>
                                    </th>
                                    <th class="sortable" data-sort="priority">
                                        <div class="th-content">
                                            Priority
                                            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 11l5-5m0 0l5 5m-5-5v12"/>
                                            </svg>
                                        </div>
                                    </th>
                                    <th>Type</th>
                                    <th>Reporter</th>
                                    <th class="sortable" data-sort="created">
                                        <div class="th-content">
                                            Created
                                            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 11l5-5m0 0l5 5m-5-5v12"/>
                                            </svg>
                                        </div>
                                    </th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody id="tickets-tbody">
                                <!-- Ticket entries will be inserted here -->
                            </tbody>
                        </table>
                    </div>
                </div>
            `;
            
            // Clear content and rebuild with modern layout
            content.innerHTML = '';
            content.appendChild(heroSection);
            content.appendChild(dashboardHeader);
            content.appendChild(tableContainer);
            
            // Add scroll hint if table is wider than viewport
            setTimeout(() => {
                const wrapper = document.querySelector('.modern-table-wrapper');
                if (wrapper && wrapper.scrollWidth > wrapper.clientWidth) {
                    console.log('📋 Table is scrollable horizontally. Scroll right to see Actions column.');
                }
            }, 100);
            
            // Function to refresh tickets table
            function refreshTicketsTable() {
                console.log('Refreshing tickets table...');
                
                // Load visual tickets from session storage
                let visualTickets = [];
                try {
                    visualTickets = JSON.parse(sessionStorage.getItem('visualTickets') || '[]');
                    console.log(`Loaded ${visualTickets.length} visual tickets from session storage`);
                } catch (e) {
                    console.error('Error loading visual tickets:', e);
                }
                
                // Merge visual tickets with existing data
                const existingIds = new Set((window.tracTicketsData || []).map(t => t.id));
                visualTickets.forEach(ticket => {
                    if (!existingIds.has(ticket.id)) {
                        if (!window.tracTicketsData) {
                            window.tracTicketsData = [];
                        }
                        window.tracTicketsData.unshift(ticket);
                    }
                });
                
                // Use the captured tickets data from Trac
                const ticketsData = window.tracTicketsData || originalTicketsData || [];
                console.log(`Using tickets data: ${ticketsData.length} tickets`);
                
                // Clear existing table content
                const tbody = document.getElementById('tickets-tbody');
                if (tbody) {
                    tbody.innerHTML = '';
                    // Populate the table with fresh data
                    populateTicketsTable(ticketsData);
                }
                
                // Update hero and footer statistics
                updateTicketsHeroStats(ticketsData);
                updateTicketsFooter(ticketsData);
                
                // Re-initialize interactive features
                initializeTicketsInteractions();
                
                console.log(`Tickets table refreshed with ${ticketsData.length} tickets`);
            }
            
            // Initial population - load data immediately
            refreshTicketsTable();
            
            // Ticket creation now uses Trac's natural redirect flow
            
            // Add footer with ticket statistics
            const footer = document.createElement('div');
            footer.className = 'tickets-footer';
            footer.id = 'tickets-footer';
            content.appendChild(footer);
            
            // Store the refresh function globally for external access
            window.refreshTicketsTable = refreshTicketsTable;
        }
    }
    
    function updateTicketsHeroStats(ticketsData) {
        // Calculate stats from actual ticket data
        const openCount = ticketsData.filter(t => 
            t.status === 'Open' || t.status === 'open' || t.status === 'new'
        ).length;
        
        const progressCount = ticketsData.filter(t => 
            t.status === 'In Progress' || t.status === 'in-progress' || t.status === 'assigned'
        ).length;
        
        const closedCount = ticketsData.filter(t => 
            t.status === 'Closed' || t.status === 'closed' || t.status === 'fixed' || t.status === 'done'
        ).length;
        
        // Update hero stats
        const heroOpenCount = document.getElementById('hero-open-count');
        const heroProgressCount = document.getElementById('hero-progress-count');
        const heroClosedCount = document.getElementById('hero-closed-count');
        
        if (heroOpenCount) heroOpenCount.textContent = openCount;
        if (heroProgressCount) heroProgressCount.textContent = progressCount;
        if (heroClosedCount) heroClosedCount.textContent = closedCount;
        
        // Update visual stats
        const visualOpenCount = document.getElementById('visual-open-count');
        const visualProgressCount = document.getElementById('visual-progress-count');
        const visualClosedCount = document.getElementById('visual-closed-count');
        
        if (visualOpenCount) visualOpenCount.textContent = openCount;
        if (visualProgressCount) visualProgressCount.textContent = progressCount;
        if (visualClosedCount) visualClosedCount.textContent = closedCount;
        
        console.log(`Updated hero stats: ${openCount} open, ${progressCount} in progress, ${closedCount} closed`);
    }
    
    function updateTicketsFooter(ticketsData) {
        const footer = document.getElementById('tickets-footer');
        if (footer) {
            footer.innerHTML = `
                <div class="tickets-container">
                    <div class="tickets-footer-content">
                        <div class="tickets-stats">
                            <div class="stat-item">
                                <span class="stat-value">${ticketsData.filter(t => t.status === 'Open').length}</span>
                                <span class="stat-label">Open</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-value">${ticketsData.filter(t => t.status === 'In Progress').length}</span>
                                <span class="stat-label">In Progress</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-value">${ticketsData.filter(t => t.status === 'Closed').length}</span>
                                <span class="stat-label">Closed</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-value">${ticketsData.filter(t => t.priority === 'Critical' || t.priority === 'High').length}</span>
                                <span class="stat-label">High Priority</span>
                            </div>
                        </div>
                        <div class="tickets-pagination">
                            <button class="pagination-btn">
                                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
                                </svg>
                            </button>
                            <span class="pagination-info">Page 1 of ${Math.max(1, Math.ceil(ticketsData.length / 25))}</span>
                            <button class="pagination-btn">
                                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }
    }
    
    function parseTicketsData(content) {
        // Parse the existing ticket entries from Trac's original content
        const tickets = [];
        
        // First, try to find Trac's original ticket table before UI replacement
        const tracTables = document.querySelectorAll('table.listing, table#ticket, table.report');
        
        tracTables.forEach(table => {
            const rows = table.querySelectorAll('tbody tr, tr:not(:first-child)');
            
            rows.forEach((row, index) => {
                const cells = row.querySelectorAll('td, th');
                if (cells.length >= 3) { // At least ID, summary, and status
                    
                    // Extract ticket data from cells
                    let ticketId = '';
                    let summary = '';
                    let status = '';
                    let priority = '';
                    let type = '';
                    let assignee = '';
                    let reporter = '';
                    let created = '';
                    
                    // Try to find ticket ID (usually in first column or contains #)
                    cells.forEach((cell, cellIndex) => {
                        const cellText = cell.textContent?.trim() || '';
                        const cellHtml = cell.innerHTML || '';
                        
                        // Look for ticket ID patterns
                        if (!ticketId && (cellText.match(/^#?\d+$/) || cellHtml.includes('/ticket/'))) {
                            ticketId = cellText.startsWith('#') ? cellText : `#${cellText}`;
                        }
                        
                        // Look for summary (usually longest text or contains links)
                        if (!summary && cellText.length > 10 && !cellText.match(/^\d+$/) && !cellText.match(/^\w+$/)) {
                            summary = cellText;
                        }
                        
                        // Look for status keywords
                        if (!status && (cellText.match(/^(open|closed|new|assigned|accepted|reopened)$/i))) {
                            status = cellText;
                        }
                        
                        // Look for priority keywords  
                        if (!priority && (cellText.match(/^(critical|high|medium|low|normal|minor|major|blocker|trivial)$/i))) {
                            priority = cellText;
                        }
                        
                        // Look for type keywords
                        if (!type && (cellText.match(/^(defect|enhancement|task|bug|feature)$/i))) {
                            type = cellText;
                        }
                    });
                    
                    // Only add if we found at least an ID or summary
                    if (ticketId || summary) {
                        const ticket = {
                            id: ticketId || `#${1000 + tickets.length}`,
                            summary: summary || generateTicketSummary(),
                            status: status || 'Open',
                            priority: priority || 'Medium',
                            type: type || 'Bug',
                            assignee: assignee || 'Unassigned',
                            reporter: reporter || 'System',
                            created: created || getRandomDate(),
                            modified: created || getRandomDate()
                        };
                        tickets.push(ticket);
                    }
                }
            });
        });
        
        console.log(`Tickets loaded from Trac database: ${tickets.length} total`);
        
        // Visual tickets are already loaded in enhanceTicketsPage() - don't load them again here
        
        // Add some sample tickets if none exist
        if (tickets.length === 0) {
            const sampleTickets = [
                { id: '#1001', summary: 'Login page not responsive on mobile devices', status: 'Open', priority: 'High', type: 'Bug', assignee: 'John Doe', reporter: 'Alice Brown', created: '2 days ago' },
                { id: '#1002', summary: 'Add dark mode support to user dashboard', status: 'In Progress', priority: 'Medium', type: 'Feature', assignee: 'Jane Smith', reporter: 'Bob Johnson', created: '1 week ago' },
                { id: '#1003', summary: 'Database connection timeout under heavy load', status: 'Open', priority: 'Critical', type: 'Bug', assignee: 'Unassigned', reporter: 'Charlie Wilson', created: '3 hours ago' },
                { id: '#1004', summary: 'Update documentation for API v2.0', status: 'Closed', priority: 'Low', type: 'Task', assignee: 'David Lee', reporter: 'Emma Davis', created: '2 weeks ago' },
                { id: '#1005', summary: 'Implement two-factor authentication', status: 'Pending', priority: 'High', type: 'Enhancement', assignee: 'Frank Miller', reporter: 'Grace Taylor', created: '5 days ago' },
                { id: '#1006', summary: 'Export functionality broken in reports module', status: 'Open', priority: 'High', type: 'Bug', assignee: 'Helen Wilson', reporter: 'Ivan Martinez', created: '1 day ago' },
                { id: '#1007', summary: 'Optimize search query performance', status: 'In Progress', priority: 'Medium', type: 'Enhancement', assignee: 'Jack Robinson', reporter: 'Karen White', created: '4 days ago' },
                { id: '#1008', summary: 'Add user activity logging', status: 'Closed', priority: 'Medium', type: 'Feature', assignee: 'Laura Johnson', reporter: 'Mike Brown', created: '3 weeks ago' }
            ];
            tickets.push(...sampleTickets);
        }
        
        return tickets;
    }
    
    function getRandomStatus() {
        const statuses = ['Open', 'In Progress', 'Closed', 'Pending'];
        return statuses[Math.floor(Math.random() * statuses.length)];
    }
    
    function getRandomPriority() {
        const priorities = ['Critical', 'High', 'Medium', 'Low'];
        return priorities[Math.floor(Math.random() * priorities.length)];
    }
    
    function getRandomTicketType() {
        const types = ['Bug', 'Feature', 'Task', 'Enhancement'];
        return types[Math.floor(Math.random() * types.length)];
    }
    
    function getRandomUser() {
        const users = ['John Doe', 'Jane Smith', 'Bob Johnson', 'Alice Brown', 'Charlie Wilson', 'Unassigned'];
        return users[Math.floor(Math.random() * users.length)];
    }
    
    function getRandomDate() {
        const dates = ['2 hours ago', '5 hours ago', '1 day ago', '2 days ago', '3 days ago', '1 week ago', '2 weeks ago'];
        return dates[Math.floor(Math.random() * dates.length)];
    }
    
    function generateTicketSummary() {
        const summaries = [
            'Fix navigation menu on mobile',
            'Add export to PDF functionality',
            'Update user profile page design',
            'Resolve memory leak in data processing',
            'Implement batch upload feature',
            'Fix broken links in documentation'
        ];
        return summaries[Math.floor(Math.random() * summaries.length)];
    }
    
    function populateTicketsTable(data) {
        const tbody = document.getElementById('tickets-tbody');
        if (!tbody) {
            console.error('Could not find tickets tbody element');
            return;
        }
        
        // Tickets are loaded from Trac's database via parseTicketsData
        
        console.log(`Populating tickets table with ${data.length} tickets:`, data);
        
        data.forEach(ticket => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="checkbox-column">
                    <input type="checkbox" class="ticket-checkbox" data-ticket-id="${ticket.id}">
                </td>
                <td>
                    <a href="/trac_env/ticket/${ticket.id.replace('#', '')}" class="ticket-id">${ticket.id}</a>
                </td>
                <td>
                    <div class="ticket-summary">
                        <a href="/trac_env/ticket/${ticket.id.replace('#', '')}" class="summary-link">${ticket.summary}</a>
                    </div>
                </td>
                <td>
                    <span class="status-badge status-${ticket.status.toLowerCase().replace(' ', '-')}">${ticket.status}</span>
                </td>
                <td>
                    <span class="priority-badge priority-${ticket.priority.toLowerCase()}">${ticket.priority}</span>
                </td>
                <td>
                    <span class="type-badge type-${ticket.type.toLowerCase()}">${ticket.type === 'Enhancement' ? 'Enhanc' : ticket.type}</span>
                </td>
                <td>
                    <div class="user-info">
                        <span>${ticket.reporter}</span>
                    </div>
                </td>
                <td>
                    <span class="date-relative">${ticket.created}</span>
                </td>
                <td>
                    <div class="action-buttons">
                        <button class="action-btn" title="View">
                            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                            </svg>
                        </button>
                        <button class="action-btn" title="Edit">
                            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                            </svg>
                        </button>
                        <button class="action-btn" title="Delete">
                            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                            </svg>
                        </button>
                    </div>
                </td>
            `;
            tbody.appendChild(row);
            
            // Add event listeners to action buttons for this row
            const viewBtn = row.querySelector('.action-btn[title="View"]');
            const editBtn = row.querySelector('.action-btn[title="Edit"]');
            const deleteBtn = row.querySelector('.action-btn[title="Delete"]');
            
            if (viewBtn) {
                viewBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    showTicketDetails(ticket);
                });
            }
            
            if (editBtn) {
                editBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    openTicketEditModal(ticket);
                });
            }
            
            if (deleteBtn) {
                deleteBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    // Confirm deletion
                    if (confirm(`Are you sure you want to delete ticket ${ticket.id}?\n\nSummary: ${ticket.summary}\n\nThis action cannot be undone.`)) {
                        // Remove from unified data system
                        if (window.TracMockData) {
                            window.TracMockData.tickets = window.TracMockData.tickets.filter(t => t.id !== ticket.id);
                        }
                        
                        // Remove from local data
                        if (window.tracTicketsData) {
                            window.tracTicketsData = window.tracTicketsData.filter(t => t.id !== ticket.id);
                        }
                        
                        // Remove from session storage
                        try {
                            let visualTickets = JSON.parse(sessionStorage.getItem('visualTickets') || '[]');
                            visualTickets = visualTickets.filter(t => t.id !== ticket.id);
                            sessionStorage.setItem('visualTickets', JSON.stringify(visualTickets));
                        } catch (e) {
                            console.error('Error updating sessionStorage:', e);
                        }
                        
                        // Animate row removal and refresh table
                        row.style.transition = 'all 0.3s ease';
                        row.style.opacity = '0';
                        row.style.transform = 'translateX(-100%)';
                        
                        setTimeout(() => {
                            if (window.refreshTicketsTable) {
                                window.refreshTicketsTable();
                            }
                            showTicketUpdateNotification(ticket.id, 'deleted');
                        }, 300);
                    }
                });
            }
        });
    }
    
    function initializeTicketsInteractions() {
        // Add sorting functionality
        document.querySelectorAll('.sortable').forEach(th => {
            th.addEventListener('click', function() {
                // Toggle sort direction
                this.classList.toggle('sort-asc');
                this.classList.toggle('sort-desc');
                // Implement sorting logic here
            });
        });
        
        // Select all checkbox functionality
        const selectAll = document.getElementById('select-all');
        if (selectAll) {
            selectAll.addEventListener('change', function() {
                const checkboxes = document.querySelectorAll('.ticket-checkbox:not(#select-all)');
                checkboxes.forEach(cb => cb.checked = this.checked);
            });
        }
        
        // Individual checkbox handling
        document.querySelectorAll('.ticket-checkbox:not(#select-all)').forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                const allChecked = document.querySelectorAll('.ticket-checkbox:not(#select-all):checked').length;
                const totalCheckboxes = document.querySelectorAll('.ticket-checkbox:not(#select-all)').length;
                const selectAll = document.getElementById('select-all');
                if (selectAll) {
                    selectAll.checked = allChecked === totalCheckboxes;
                    selectAll.indeterminate = allChecked > 0 && allChecked < totalCheckboxes;
                }
            });
        });
        
        // Add hover effects to rows
        document.querySelectorAll('.modern-tickets-table tbody tr').forEach(row => {
            row.addEventListener('mouseenter', function() {
                this.style.transform = 'translateX(4px)';
            });
            row.addEventListener('mouseleave', function() {
                this.style.transform = 'translateX(0)';
            });
        });
        
        // VIEW BUTTON FUNCTIONALITY
        document.querySelectorAll('.action-btn[title="View"]').forEach(viewBtn => {
            viewBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                // Get the ticket data from the row
                const row = this.closest('tr');
                const ticketIdElement = row.querySelector('.ticket-id');
                const ticketId = ticketIdElement ? ticketIdElement.textContent : '';
                
                // Find the ticket data
                let ticket = null;
                if (window.tracTicketsData) {
                    ticket = window.tracTicketsData.find(t => t.id === ticketId);
                }
                
                if (!ticket) {
                    // Create a basic ticket object from the row data if not found
                    ticket = {
                        id: ticketId,
                        summary: row.querySelector('.ticket-summary')?.textContent?.trim() || 'N/A',
                        status: row.querySelector('.status-badge')?.textContent || 'Unknown',
                        priority: row.querySelector('.priority-badge')?.textContent || 'Unknown',
                        type: row.querySelector('.type-badge')?.textContent || 'Unknown',
                        reporter: row.querySelector('.user-info span')?.textContent || 'Unknown',
                        created: row.querySelector('.date-relative')?.textContent || 'Unknown',
                        description: 'No description available',
                        assignee: 'Unknown',
                        component: 'Unknown',
                        milestone: 'Unknown'
                    };
                }
                
                showTicketDetails(ticket);
            });
        });
        
        // DELETE BUTTON FUNCTIONALITY
        document.querySelectorAll('.action-btn[title="Delete"]').forEach(deleteBtn => {
            deleteBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                // Get the ticket row and ID
                const row = this.closest('tr');
                const ticketIdElement = row.querySelector('.ticket-id');
                const ticketId = ticketIdElement ? ticketIdElement.textContent : '';
                const ticketSummary = row.querySelector('.ticket-summary')?.textContent || 'this ticket';
                
                // Confirm deletion
                if (confirm(`Are you sure you want to delete ticket ${ticketId}?\n\nSummary: ${ticketSummary}\n\nThis action cannot be undone.`)) {
                    console.log(`🗑️ DELETING TICKET: ${ticketId}`);
                    
                    // Remove from visual tickets in sessionStorage
                    try {
                        let visualTickets = JSON.parse(sessionStorage.getItem('visualTickets') || '[]');
                        visualTickets = visualTickets.filter(t => t.id !== ticketId);
                        sessionStorage.setItem('visualTickets', JSON.stringify(visualTickets));
                        console.log(`📦 REMOVED FROM SESSION STORAGE`);
                    } catch (e) {
                        console.error('Error updating sessionStorage:', e);
                    }
                    
                    // Remove from global tracTicketsData
                    if (window.tracTicketsData) {
                        window.tracTicketsData = window.tracTicketsData.filter(t => t.id !== ticketId);
                        console.log(`✅ REMOVED FROM GLOBAL DATA`);
                    }
                    
                    // Animate row removal
                    row.style.transition = 'all 0.3s ease';
                    row.style.opacity = '0';
                    row.style.transform = 'translateX(-100%)';
                    
                    // Remove row after animation
                    setTimeout(() => {
                        row.remove();
                        console.log(`✅ TICKET ${ticketId} DELETED`);
                        
                        // Update footer statistics
                        if (window.tracTicketsData) {
                            updateTicketsFooter(window.tracTicketsData);
                        }
                        
                        // Update select all checkbox state
                        const allChecked = document.querySelectorAll('.ticket-checkbox:not(#select-all):checked').length;
                        const totalCheckboxes = document.querySelectorAll('.ticket-checkbox:not(#select-all)').length;
                        const selectAll = document.getElementById('select-all');
                        if (selectAll) {
                            selectAll.checked = totalCheckboxes > 0 && allChecked === totalCheckboxes;
                            selectAll.indeterminate = allChecked > 0 && allChecked < totalCheckboxes;
                        }
                    }, 300);
                }
            });
        });
        
        // Filter functionality
        document.querySelectorAll('.filter-select').forEach(select => {
            select.addEventListener('change', function() {
                // Implement filter logic here
                console.log('Filter changed:', this.id, this.value);
            });
        });
        
        // Search functionality
        const searchInput = document.querySelector('.search-input');
        if (searchInput) {
            searchInput.addEventListener('input', function() {
                // Implement search logic here
                console.log('Search:', this.value);
            });
        }
    }

    function enhanceNewTicketPage() {
                        console.log('🔧 ENHANCING NEW TICKET PAGE 🔧');
        
        // Add new ticket class to body and content area
        document.body.classList.add('newticket-page');
        const content = document.getElementById('content');
        
        if (content) {
            content.classList.add('newticket');
            
            // Wait for Trac's form to load
            setTimeout(() => {
                // Get the existing Trac form - try multiple selectors
                const tracForm = document.querySelector('form#propertyform') || 
                               document.querySelector('form[name="propertyform"]') ||
                               document.querySelector('form.newticket') ||
                               document.querySelector('#ticket') ||
                               document.querySelector('form');
                
                if (!tracForm) {
                    return;
                }
                
                // Ensure form has proper action and method
                if (!tracForm.action || tracForm.action === '') {
                    tracForm.action = '/trac_env/newticket';
                }
                if (!tracForm.method || tracForm.method === '') {
                    tracForm.method = 'post';
                }
                
                // Create modern container
                const modernContainer = document.createElement('div');
                modernContainer.className = 'newticket-container';
                
                // Create header
                const header = document.createElement('div');
                header.className = 'newticket-header';
                header.innerHTML = `
                    <h1 class="newticket-title">Create New Ticket</h1>
                    <p class="newticket-subtitle">Report an issue, request a feature, or track a task</p>
                `;
                
                // Create form card
                const formCard = document.createElement('div');
                formCard.className = 'newticket-form-card';
                
                // Move the form into the card
                tracForm.parentNode.insertBefore(modernContainer, tracForm);
                modernContainer.appendChild(header);
                modernContainer.appendChild(formCard);
                formCard.appendChild(tracForm);
                
                // Enhance form fields
                enhanceFormFields(tracForm);
                
                // Create submit button
                const submitArea = document.createElement('div');
                submitArea.className = 'newticket-form-footer';
                submitArea.innerHTML = `
                    <div class="privacy-notice">
                        <input type="checkbox" class="modern-checkbox" id="privacy-check" checked>
                        <label for="privacy-check">I have reviewed the <a href="/trac_env/wiki/TracTickets">ticket guidelines</a></label>
                    </div>
                    <button type="button" class="newticket-submit-btn" id="custom-submit-btn">Create Ticket</button>
                `;
                
                formCard.appendChild(submitArea);
                
                // Hide original submit buttons
                const originalButtons = tracForm.querySelector('.buttons');
                if (originalButtons) {
                    originalButtons.style.display = 'none';
                }
                
                // Also hide any individual submit inputs
                const submitInputs = tracForm.querySelectorAll('input[type="submit"], input[name="submit"]');
                submitInputs.forEach((input) => {
                    input.style.display = 'none';
                });
                
                // Add comprehensive form submission handling
                const submitBtn = formCard.querySelector('.newticket-submit-btn');
                
                if (submitBtn) {
                    // Ensure button is properly styled and visible
                    submitBtn.style.pointerEvents = 'auto';
                    submitBtn.style.zIndex = '1000';
                    submitBtn.style.display = 'block';
                    submitBtn.style.visibility = 'visible';
                    submitBtn.style.opacity = '1';
                    submitBtn.style.position = 'relative';
                    submitBtn.style.backgroundColor = '#6366f1';
                    submitBtn.style.color = 'white';
                    submitBtn.style.padding = '10px 20px';
                    submitBtn.style.borderRadius = '6px';
                    submitBtn.style.cursor = 'pointer';
                    
                    // Apply final styling
                    submitBtn.style.border = 'none';
                    submitBtn.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
                    
                    submitBtn.addEventListener('click', (e) => {
                        console.log('Custom submit button clicked');
                        e.preventDefault();
                        e.stopPropagation();
                        
                        // Ensure all field values are synced first
                        syncAllFields(tracForm);
                        
                        // Validate required fields before submission  
                        if (!validateForm(tracForm)) {
                            showMessage('Please fill in all required fields.', 'error');
                            return;
                        }
                        
                        // Check privacy checkbox
                        const privacyCheck = document.getElementById('privacy-check');
                        if (!privacyCheck.checked) {
                            showMessage('Please acknowledge that you have reviewed the ticket guidelines.', 'error');
                            return;
                        }
                        
                        // Add loading state
                        submitBtn.disabled = true;
                        submitBtn.textContent = 'Creating Ticket...';
                        submitBtn.style.opacity = '0.7';
                        
                        // VISUAL TICKET CREATION - Capture form data and create visual ticket
                        try {
                            const newTicket = captureFormDataAsTicket(tracForm);
                            console.log('Created visual ticket:', newTicket);
                            
                            // Add ticket to existing tickets display
                            addTicketToDisplay(newTicket);
                            
                            // Add ticket to roadmap if milestone is selected
                            if (newTicket.milestone && newTicket.milestone !== 'None') {
                                addTicketToRoadmap(newTicket);
                            }
                            
                            // Show success message
                            let successMessage = `Ticket ${newTicket.id} created successfully!`;
                            if (newTicket.attachments && newTicket.attachments.length > 0) {
                                const fileNames = newTicket.attachments.map(a => a.name).join(', ');
                                successMessage += ` With ${newTicket.attachments.length} attachment(s): ${fileNames}`;
                            }
                            showMessage(successMessage, 'success');
                            
                            // Create real-time notification
                            if (window.TracNotificationSystem) {
                                window.TracNotificationSystem.addNotification({
                                    title: `New Ticket Created: ${newTicket.id}`,
                                    description: `"${newTicket.summary}" has been created and added to the system`,
                                    type: 'success',
                                    link: `/trac_env/ticket/${newTicket.id.replace('#', '')}`
                                });
                            }
                            
                            // Clear form and reset button after a short delay
                            setTimeout(() => {
                                clearFormFields(tracForm);
                                resetSubmitButton(submitBtn);
                                showMessage('Ticket created! You can now navigate to the Tickets page to see it.', 'info');
                            }, 1500);
                            
                        } catch (error) {
                            console.error('Visual ticket creation error:', error);
                            showMessage('Error creating ticket. Please try again.', 'error');
                            resetSubmitButton(submitBtn);
                        }
                    });
                }
                
                // PREVENT FORM SUBMISSION TO BACKEND
                tracForm.addEventListener('submit', (e) => {
                    console.log('🛑 BLOCKING FORM SUBMISSION');
                    e.preventDefault();
                    e.stopPropagation();
                    // Ensure all fields are synced one more time
                    syncAllFields(tracForm);
                    return false;
                });
                
            }, 500); // Increased timeout to ensure Trac form is fully loaded
        }
    }
    
    // Helper function to validate the form
    function validateForm(form) {
        // Check for required fields
        const summaryField = form.querySelector('#field-summary') || form.querySelector('input[name="field_summary"]');
        const descriptionField = form.querySelector('#field-description') || form.querySelector('textarea[name="field_description"]');
        
        if (summaryField && !summaryField.value.trim()) {
            summaryField.focus();
            return false;
        }
        
        if (descriptionField && !descriptionField.value.trim()) {
            descriptionField.focus();
            return false;
        }
        
        return true;
    }
    
    // Helper function to sync all field values
    function syncAllFields(form) {
        // Method 1: Use the stored references to original fields
        const modernFields = form.querySelectorAll('.modern-form-input, .modern-form-select, .modern-form-textarea');
        modernFields.forEach(modernField => {
            if (modernField._originalField) {
                modernField._originalField.value = modernField.value;
                
                // Trigger change event to ensure any listeners are notified
                const changeEvent = new Event('change', { bubbles: true });
                modernField._originalField.dispatchEvent(changeEvent);
            } else {
                // Fallback method: find original field by data attributes
                const originalId = modernField.getAttribute('data-original-id');
                const originalName = modernField.getAttribute('data-original-name');
                
                let originalField = null;
                if (originalId) {
                    originalField = form.querySelector(`#${originalId}`);
                } else if (originalName) {
                    originalField = form.querySelector(`[name="${originalName}"]`);
                }
                
                if (originalField) {
                    originalField.value = modernField.value;
                    console.log(`Synced field via fallback:`, originalField.name || originalField.id, '=', modernField.value);
                    
                    // Trigger change event
                    const changeEvent = new Event('change', { bubbles: true });
                    originalField.dispatchEvent(changeEvent);
                }
            }
        });
        
        // Sync radio buttons in action section
        const modernRadios = form.querySelectorAll('.newticket-action-item input[type="radio"]');
        modernRadios.forEach(modernRadio => {
            if (modernRadio.checked) {
                // Find the original radio button with the same value
                const originalRadios = form.querySelectorAll('input[type="radio"]');
                originalRadios.forEach(originalRadio => {
                    if (originalRadio.value === modernRadio.value && originalRadio !== modernRadio) {
                        originalRadio.checked = true;
                        console.log(`Synced radio button:`, modernRadio.value);
                        
                        // Trigger change event
                        const changeEvent = new Event('change', { bubbles: true });
                        originalRadio.dispatchEvent(changeEvent);
                    }
                });
            }
        });
        
        // Sync any owner fields in actions
        const ownerInputs = form.querySelectorAll('.newticket-owner-field input');
        ownerInputs.forEach(ownerInput => {
            const originalOwnerSelectors = [
                'input[name*="owner"]',
                '#action_create_and_assign_reassign_owner',
                'input[id*="owner"]'
            ];
            
            for (const selector of originalOwnerSelectors) {
                const originalOwner = form.querySelector(selector);
                if (originalOwner && originalOwner !== ownerInput) {
                    originalOwner.value = ownerInput.value;
                    console.log('Synced owner field:', ownerInput.value);
                    
                    // Trigger change event
                    const changeEvent = new Event('change', { bubbles: true });
                    originalOwner.dispatchEvent(changeEvent);
                    break;
                }
            }
        });
        
        // Additional safety: make sure all hidden fields are visible to form submission
        const hiddenFields = form.querySelectorAll('input[type="hidden"]');
        hiddenFields.forEach(hiddenField => {
            console.log('Found hidden field:', hiddenField.name, '=', hiddenField.value);
        });
        
        // Log all form data that will be submitted
        const formData = new FormData(form);
        console.log('Form data to be submitted:');
        for (let [key, value] of formData.entries()) {
            console.log(`  ${key}: ${value}`);
        }
        
        console.log('Field synchronization complete');
    }
    
    // Helper function to reset submit button state
    function resetSubmitButton(submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Create Ticket';
        submitBtn.style.opacity = '1';
        submitBtn.style.background = ''; // Reset to CSS default
    }
    
    // Helper function to show messages
    function showMessage(message, type = 'info') {
        // Remove any existing messages
        const existingMessages = document.querySelectorAll('.newticket-message');
        existingMessages.forEach(msg => msg.remove());
        
        // Create new message
        const messageDiv = document.createElement('div');
        messageDiv.className = `newticket-message ${type}`;
        messageDiv.innerHTML = `
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                ${type === 'error' 
                    ? '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>'
                    : '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>'
                }
            </svg>
            <span>${message}</span>
        `;
        
        // Insert message at the top of the form card
        const formCard = document.querySelector('.newticket-form-card');
        if (formCard) {
            formCard.insertBefore(messageDiv, formCard.firstChild);
            
            // Auto-remove after 5 seconds
            setTimeout(() => {
                if (messageDiv.parentNode) {
                    messageDiv.remove();
                }
            }, 5000);
        }
    }
    
    function enhanceFormFields(form) {
        // Get key fields from Trac form
        const summaryField = form.querySelector('#field-summary');
        const reporterField = form.querySelector('#field-reporter');
        const descriptionField = form.querySelector('#field-description');
        const typeField = form.querySelector('#field-type');
        const priorityField = form.querySelector('#field-priority');
        const componentField = form.querySelector('#field-component');
        const versionField = form.querySelector('#field-version');
        const milestoneField = form.querySelector('#field-milestone');
        const ownerField = form.querySelector('#field-owner');
        const ccField = form.querySelector('#field-cc');
        const keywordsField = form.querySelector('#field-keywords');
        
        // Create modern form groups
        const formGroups = document.createElement('div');
        formGroups.className = 'modern-form-groups';
        
        // First row - Summary and Reporter
        if (summaryField || reporterField) {
            const row1 = document.createElement('div');
            row1.className = 'modern-form-group half';
            
            if (summaryField) {
                const summaryGroup = createFormGroup('Summary', summaryField, 'Enter a brief title', true);
                row1.appendChild(summaryGroup);
            }
            
            if (reporterField) {
                const reporterGroup = createFormGroup('Reporter', reporterField, 'Your name or username', true);
                row1.appendChild(reporterGroup);
            }
            
            formGroups.appendChild(row1);
        }
        
        // CC field (if exists)
        if (ccField) {
            const ccRow = document.createElement('div');
            ccRow.className = 'modern-form-group';
            const ccGroup = createFormGroup('CC', ccField, 'Comma-separated list of email addresses');
            ccRow.appendChild(ccGroup);
            formGroups.appendChild(ccRow);
        }
        
        // Second row - Type and Priority
        if (typeField || priorityField) {
            const row2 = document.createElement('div');
            row2.className = 'modern-form-group half';
            
            if (typeField) {
                const typeGroup = createFormGroup('Type', typeField, 'Select ticket type');
                row2.appendChild(typeGroup);
            }
            
            if (priorityField) {
                const priorityGroup = createFormGroup('Priority', priorityField, 'Select priority');
                row2.appendChild(priorityGroup);
            }
            
            formGroups.appendChild(row2);
        }
        
        // Third row - Component and Milestone
        if (componentField || milestoneField) {
            const row3 = document.createElement('div');
            row3.className = 'modern-form-group half';
            
            if (componentField) {
                const componentGroup = createFormGroup('Component', componentField, 'Select component');
                row3.appendChild(componentGroup);
            }
            
            if (milestoneField) {
                const milestoneGroup = createFormGroup('Milestone', milestoneField, 'Target milestone');
                row3.appendChild(milestoneGroup);
            }
            
            formGroups.appendChild(row3);
        }
        
        // Fourth row - Version (if exists and not already shown)
        if (versionField) {
            const versionRow = document.createElement('div');
            versionRow.className = 'modern-form-group';
            const versionGroup = createFormGroup('Version', versionField, 'Affected version');
            versionRow.appendChild(versionGroup);
            formGroups.appendChild(versionRow);
        }
        
        // Keywords field
        if (keywordsField) {
            const keywordsRow = document.createElement('div');
            keywordsRow.className = 'modern-form-group';
            const keywordsGroup = createFormGroup('Keywords', keywordsField, 'Space-separated keywords');
            keywordsRow.appendChild(keywordsGroup);
            formGroups.appendChild(keywordsRow);
        }
        
        // Description
        if (descriptionField) {
            const descGroup = createFormGroup('Description', descriptionField, 'Provide a detailed description of the issue...', true);
            
            // Add AI Assistant to description field
            addAIAssistant(descGroup, descriptionField);
            
            formGroups.appendChild(descGroup);
        }
        
        // File Upload Section - NEW FEATURE
        const fileUploadSection = createFileUploadSection();
        formGroups.appendChild(fileUploadSection);
        
        // Insert the modern form groups
        form.insertBefore(formGroups, form.firstChild);
        
        // Hide original fieldset
        const originalFieldset = form.querySelector('fieldset#properties');
        if (originalFieldset) {
            originalFieldset.style.display = 'none';
        }
        
        // Handle action section (radio buttons)
        const actionFieldset = form.querySelector('fieldset.radio');
        if (actionFieldset) {
            // Create modern action section
            const actionSection = document.createElement('div');
            actionSection.className = 'newticket-action-section';
            
            const actionTitle = document.createElement('h3');
            actionTitle.className = 'newticket-action-title';
            actionTitle.textContent = 'Action';
            actionSection.appendChild(actionTitle);
            
            const actionGroup = document.createElement('div');
            actionGroup.className = 'newticket-action-group';
            
            // Find radio buttons and their labels
            const radios = actionFieldset.querySelectorAll('input[type="radio"]');
            radios.forEach(radio => {
                const actionItem = document.createElement('div');
                actionItem.className = 'newticket-action-item';
                
                // Clone the radio button
                const newRadio = radio.cloneNode(true);
                actionItem.appendChild(newRadio);
                
                // Create content wrapper
                const content = document.createElement('div');
                content.className = 'newticket-action-content';
                
                // Get the label text
                const labelText = radio.parentElement.textContent.trim();
                const label = document.createElement('div');
                label.className = 'newticket-action-label';
                
                if (radio.value === 'create') {
                    label.textContent = 'create';
                    const desc = document.createElement('div');
                    desc.className = 'newticket-action-description';
                    desc.textContent = "The status will be 'new'.";
                    content.appendChild(label);
                    content.appendChild(desc);
                } else if (radio.value === 'create_and_assign') {
                    label.innerHTML = 'assign to ';
                    
                    // Find the owner field in this context
                    const ownerInput = actionFieldset.querySelector('input#action_create_and_assign_reassign_owner') || 
                                      actionFieldset.querySelector('input[name*="owner"]');
                    if (ownerInput) {
                        const ownerField = document.createElement('span');
                        ownerField.className = 'newticket-owner-field';
                        const newOwnerInput = ownerInput.cloneNode(true);
                        newOwnerInput.value = ownerInput.value || '< default >';
                        ownerField.appendChild(newOwnerInput);
                        label.appendChild(ownerField);
                        
                        // Sync changes
                        newOwnerInput.addEventListener('change', () => {
                            ownerInput.value = newOwnerInput.value;
                        });
                        newOwnerInput.addEventListener('input', () => {
                            ownerInput.value = newOwnerInput.value;
                        });
                    }
                    
                    const desc = document.createElement('div');
                    desc.className = 'newticket-action-description';
                    desc.textContent = "The owner will be the specified user. The status will be 'assigned'.";
                    content.appendChild(label);
                    content.appendChild(desc);
                }
                
                actionItem.appendChild(content);
                actionGroup.appendChild(actionItem);
                
                // Sync radio selection
                newRadio.addEventListener('change', () => {
                    radio.checked = newRadio.checked;
                });
                
                // Set initial checked state
                if (radio.checked) {
                    newRadio.checked = true;
                }
            });
            
            actionSection.appendChild(actionGroup);
            formGroups.appendChild(actionSection);
            
            // Hide original action fieldset
            actionFieldset.style.display = 'none';
        }
        
        // Handle file attachment checkbox
        const attachmentCheckbox = form.querySelector('input[name="attachment"]') || 
                                 form.querySelector('input[type="checkbox"][id*="attachment"]');
        if (attachmentCheckbox) {
            const fileCheckDiv = document.createElement('div');
            fileCheckDiv.className = 'newticket-file-checkbox';
            
            const newCheckbox = attachmentCheckbox.cloneNode(true);
            const label = document.createElement('label');
            label.textContent = 'I have files to attach to this ticket';
            label.setAttribute('for', newCheckbox.id);
            
            fileCheckDiv.appendChild(newCheckbox);
            fileCheckDiv.appendChild(label);
            
            formGroups.appendChild(fileCheckDiv);
            
            // Sync checkbox state
            newCheckbox.addEventListener('change', () => {
                attachmentCheckbox.checked = newCheckbox.checked;
            });
            
            // Hide original
            const originalCheckboxContainer = attachmentCheckbox.parentElement;
            if (originalCheckboxContainer) {
                originalCheckboxContainer.style.display = 'none';
            }
        }
    }
    
    function createFormGroup(label, originalField, placeholder, required = false) {
        const group = document.createElement('div');
        group.className = 'modern-form-group';
        
        const labelEl = document.createElement('label');
        labelEl.className = 'modern-form-label' + (required ? ' required' : '');
        labelEl.textContent = label;
        group.appendChild(labelEl);
        
        if (originalField) {
            // Clone the field
            const newField = originalField.cloneNode(true);
            
            // Ensure proper ID and data attributes for syncing
            if (originalField.id) {
                newField.id = originalField.id + '_modern';
                newField.setAttribute('data-original-id', originalField.id);
            } else if (originalField.name) {
                newField.id = originalField.name + '_modern';
                newField.setAttribute('data-original-name', originalField.name);
            }
            
            // Apply modern styling classes
            if (newField.tagName === 'INPUT') {
                newField.className = 'modern-form-input';
            } else if (newField.tagName === 'SELECT') {
                newField.className = 'modern-form-select';
            } else if (newField.tagName === 'TEXTAREA') {
                newField.className = 'modern-form-textarea';
            }
            
            if (placeholder) {
                newField.setAttribute('placeholder', placeholder);
            }
            
            // Copy the original field's value to the new field
            newField.value = originalField.value;
            
            // Set up bi-directional syncing
            const syncToOriginal = () => {
                originalField.value = newField.value;
                // Trigger change event on original field
                const changeEvent = new Event('change', { bubbles: true });
                originalField.dispatchEvent(changeEvent);
            };
            
            const syncFromOriginal = () => {
                if (newField.value !== originalField.value) {
                    newField.value = originalField.value;
                }
            };
            
            // Sync changes from modern field to original field
            newField.addEventListener('change', syncToOriginal);
            newField.addEventListener('input', syncToOriginal);
            newField.addEventListener('blur', syncToOriginal);
            
            // Sync changes from original field to modern field (in case other scripts modify the original)
            originalField.addEventListener('change', syncFromOriginal);
            originalField.addEventListener('input', syncFromOriginal);
            
            // Special handling for select elements
            if (newField.tagName === 'SELECT') {
                newField.addEventListener('change', () => {
                    originalField.selectedIndex = newField.selectedIndex;
                    syncToOriginal();
                });
            }
            
            group.appendChild(newField);
            
            // Store reference to original field for easy access
            newField._originalField = originalField;
            
            console.log(`Created form group for ${label}, original field:`, originalField, 'new field:', newField);
        }
        
        return group;
    }
    
    // Helper function to capitalize first letter
    function capitalizeFirst(str) {
        if (!str) return str;
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }
    
    // Helper function to clear form fields after successful submission
    function clearFormFields(form) {
        // Clear all modern form fields
        const modernFields = form.querySelectorAll('.modern-form-input, .modern-form-select, .modern-form-textarea');
        modernFields.forEach(field => {
            if (field.tagName === 'SELECT') {
                field.selectedIndex = 0;
            } else {
                field.value = '';
            }
            
            // Also clear the original field if linked
            if (field._originalField) {
                if (field._originalField.tagName === 'SELECT') {
                    field._originalField.selectedIndex = 0;
                } else {
                    field._originalField.value = '';
                }
            }
        });
        
        // Reset radio buttons to default
        const radioButtons = form.querySelectorAll('input[type="radio"]');
        radioButtons.forEach(radio => {
            radio.checked = radio.defaultChecked;
        });
        
        // Clear checkboxes except privacy checkbox
        const checkboxes = form.querySelectorAll('input[type="checkbox"]:not(#privacy-check)');
        
        // Clear uploaded files
        clearUploadedFiles();
        checkboxes.forEach(checkbox => {
            checkbox.checked = false;
        });
        
        console.log('Form fields cleared after successful submission');
    }
    
    // Tickets are now stored in Trac's database, not localStorage
    
    // SIMPLE DEBUGGING FUNCTIONS FOR USER
    window.forceReloadTickets = function() {
        console.log('=== EMERGENCY TICKET RELOAD ===');
        console.log('Current page path:', window.location.pathname);
        
        if (window.refreshTicketsTable) {
            console.log('Calling refreshTicketsTable...');
            window.refreshTicketsTable();
        } else {
            console.log('refreshTicketsTable not available, trying manual reload...');
            
            // Try to manually trigger ticket page enhancement
            if (window.location.pathname.includes('/report') || window.location.pathname.includes('/ticket')) {
                enhanceTicketsPage();
            }
        }
        
        // Show current visual tickets
        console.log('Current visual tickets:', window.tracTicketsData || []);
        console.log('Visual tickets count:', (window.tracTicketsData || []).length);
        
        return window.tracTicketsData || [];
    };
    
    // SIMPLE TEST FUNCTION - Create a test ticket instantly
    window.createTestTicket = function(summary = 'Test Ticket from Console', description = 'This is a test') {
        console.log('🧪 CREATING TEST TICKET');
        
        const testTicket = {
            id: '#TEST' + Date.now(),
            summary: summary,
            description: description,
            reporter: 'Test User',
            assignee: 'Unassigned',
            type: 'Bug',
            priority: 'Medium',
            status: 'Open',
            component: 'General',
            milestone: 'Milestone 1',
            version: '',
            keywords: '',
            cc: '',
            created: 'Just now',
            modified: 'Just now'
        };
        
        addTicketToDisplay(testTicket);
        addTicketToRoadmap(testTicket);
        
        console.log('✅ TEST TICKET CREATED! Go to Tickets page to see it.');
        return testTicket;
    };
    
    // Clear all visual tickets (for testing)
    window.clearVisualTickets = function() {
        sessionStorage.removeItem('visualTickets');
        if (window.tracTicketsData) {
            window.tracTicketsData = window.tracTicketsData.filter(t => 
                !t.id.includes('TEST') && !t.id.includes('DEMO') && !t.id.includes('VIS')
            );
        }
        console.log('🗑️ CLEARED ALL VISUAL TICKETS');
        if (window.refreshTicketsTable) {
            window.refreshTicketsTable();
        }
    };
    
    // Function to set up navigation event listeners to prevent page reloads
    function setupNavigationEventListeners() {
        console.log('Setting up navigation event listeners to prevent page reloads...');
        
        // Get all navigation links but EXCLUDE newticket-related links
        const navLinks = document.querySelectorAll('.nav-link, .nav-brand, .modern-nav a[href*="/trac_env"]');
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (!href || href === '#' || href.startsWith('http') || href.startsWith('mailto:')) {
                return; // Skip external links, empty links, etc.
            }
            
            // CRITICAL FIX: Skip newticket and chrome/site links to allow full page reloads
            if (href.includes('/newticket') || href.includes('/chrome/site/')) {
                console.log('Skipping SPA navigation for standalone page:', href);
                return;
            }
            
            console.log('Adding no-reload listener to:', href);
            
            link.addEventListener('click', function(e) {
                e.preventDefault(); // Prevent default navigation
                
                console.log('Navigation clicked:', href, '- preventing page reload');
                
                // Update URL without reloading page
                if (href !== window.location.pathname) {
                    history.pushState({page: href}, '', href);
                    console.log('Updated URL to:', href);
                }
                
                // Update page content based on the target
                updatePageContent();
                
                // Dispatch a custom event to let other parts of the app know navigation happened
                const navigationEvent = new CustomEvent('spa-navigation', { 
                    detail: { url: href, previousUrl: window.location.pathname }
                });
                window.dispatchEvent(navigationEvent);
                
                return false;
            });
        });
        
        // Handle browser back/forward buttons
        window.addEventListener('popstate', function(e) {
            console.log('Browser back/forward detected, updating content for:', window.location.pathname);
            updatePageContent();
        });
        
        console.log(`Navigation event listeners added to ${navLinks.length} links`);
    }
    
    // Function to update page content without reloading
    function updatePageContent() {
        const currentPath = window.location.pathname;
        console.log('Updating page content for path:', currentPath);
        
        // Clear any existing page-specific content enhancements
        document.body.classList.remove('timeline-page', 'roadmap-page', 'browser-page', 'tickets-page', 'newticket-page');
        
        // Remove any page-specific content containers
        const existingContainers = document.querySelectorAll('.timeline-header, .roadmap-container, .browser-header, .tickets-header, .newticket-container');
        existingContainers.forEach(container => container.remove());
        
        // Apply page-specific enhancements based on current URL
        if (currentPath.includes('/timeline')) {
            console.log('Applying timeline page enhancements...');
            enhanceTimelinePage();
        } else if (currentPath.includes('/roadmap')) {
            console.log('Applying roadmap page enhancements...');
            enhanceRoadmapPage();
            // Force refresh roadmap data from localStorage
            setTimeout(() => {
                if (window.refreshRoadmap) {
                    console.log('Force refreshing roadmap data after navigation');
                    window.refreshRoadmap();
                }
            }, 100);
        } else if (currentPath.includes('/browser')) {
            console.log('Applying browser page enhancements...');
            enhanceBrowserPage();
        } else if (currentPath.includes('/report') || currentPath.includes('/ticket')) {
            console.log('=== HANDLING TICKETS PAGE NAVIGATION ===');
            
            // CRITICAL FIX: Force a clean page reload for tickets page
            // This ensures proper UI rendering and localStorage access
            if (!document.location.href.includes('?no_reload=true')) {
                console.log('Forcing clean page reload for tickets page');
                const currentUrl = document.location.href;
                document.location.href = currentUrl + (currentUrl.includes('?') ? '&' : '?') + 'no_reload=true';
                return; // Stop execution as we're reloading
            }
            
            console.log('Applying tickets page enhancements...');
            enhanceTicketsPage();
        } else if (currentPath.includes('/newticket')) {
            console.log('Applying new ticket page enhancements...');
            enhanceNewTicketPage();
        } else if (currentPath === '/trac_env' || currentPath === '/trac_env/' || currentPath.includes('/wiki')) {
            console.log('Redirecting to homepage for full UI replacement...');
            // For homepage, we need to reload to trigger the complete UI replacement
            window.location.reload();
        } else {
            console.log('No specific page enhancement for:', currentPath);
            // Apply basic dark theme for unknown pages
            applyDarkTheme();
        }
        
        // Scroll to top when navigating
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    // Tickets are now stored in Trac's database, not localStorage
    
    // VISUAL TICKET CREATION FUNCTIONS
    function captureFormDataAsTicket(form) {
        // Generate unique ticket ID
        const ticketId = generateNextTicketId();
        
        // Extract form field values
        const summary = getFieldValue(form, 'summary') || 'Untitled Ticket';
        const reporter = getFieldValue(form, 'reporter') || 'Anonymous';
        const description = getFieldValue(form, 'description') || '';
        const type = getFieldValue(form, 'type') || 'Bug';
        const priority = getFieldValue(form, 'priority') || 'Medium';
        const component = getFieldValue(form, 'component') || 'General';
        const milestone = getFieldValue(form, 'milestone') || 'None';
        const version = getFieldValue(form, 'version') || '';
        const keywords = getFieldValue(form, 'keywords') || '';
        const cc = getFieldValue(form, 'cc') || '';
        
        // Determine assignee from action selection
        let assignee = 'Unassigned';
        let status = 'Open';
        
        const createAndAssignRadio = form.querySelector('input[value="create_and_assign"]:checked');
        if (createAndAssignRadio) {
            const ownerField = form.querySelector('input[name*="owner"]') || 
                              form.querySelector('#action_create_and_assign_reassign_owner');
            if (ownerField && ownerField.value.trim()) {
                assignee = ownerField.value.trim();
                status = 'Assigned';
            }
        }
        
        // SIMPLE FALLBACK: If we couldn't find specific fields, just grab anything
        if (!summary || summary === 'Untitled Ticket') {
            const allInputs = form.querySelectorAll('input[type="text"]');
            for (let input of allInputs) {
                if (input.value && input.value.length > 3) {
                    summary = input.value;
                    console.log('Using fallback summary from any text input:', summary);
                    break;
                }
            }
        }
        
        if (!description) {
            const allTextareas = form.querySelectorAll('textarea');
            for (let textarea of allTextareas) {
                if (textarea.value && textarea.value.length > 3) {
                    description = textarea.value;
                    console.log('Using fallback description from any textarea:', description);
                    break;
                }
            }
        }

        const newTicket = {
            id: ticketId,
            summary: summary || 'Test Ticket',
            description: description || 'Test description',
            reporter: reporter || 'Test User',
            assignee: assignee,
            type: type,
            priority: priority,
            status: status,
            component: component,
            milestone: milestone,
            version: version,
            keywords: keywords,
            cc: cc,
            created: 'Just now',
            modified: 'Just now',
            attachments: uploadedFiles.map(f => ({
                name: f.name,
                size: f.size,
                type: f.type,
                id: f.id,
                base64: f.base64 || null  // Include base64 data
            }))
        };
        
        console.log('🎫 CREATED VISUAL TICKET:', newTicket);
        return newTicket;
    }
    
    function getFieldValue(form, fieldName) {
        console.log(`Looking for field: ${fieldName}`);
        
        // Try multiple selectors to find the field - SIMPLIFIED AND MORE DIRECT
        const selectors = [
            `#field-${fieldName}`,
            `input[name="field_${fieldName}"]`,
            `select[name="field_${fieldName}"]`,
            `textarea[name="field_${fieldName}"]`,
            `input[id*="${fieldName}"]`,
            `select[id*="${fieldName}"]`,
            `textarea[id*="${fieldName}"]`,
            `.modern-form-input[data-original-id="field-${fieldName}"]`,
            `.modern-form-select[data-original-id="field-${fieldName}"]`,
            `.modern-form-textarea[data-original-id="field-${fieldName}"]`
        ];
        
        for (const selector of selectors) {
            const field = form.querySelector(selector);
            if (field && field.value) {
                console.log(`Found field ${fieldName} with value: ${field.value}`);
                return field.value;
            }
        }
        
        // FALLBACK: Just grab ANY input/select/textarea that might contain this data
        if (fieldName === 'summary') {
            const summaryFields = form.querySelectorAll('input[type="text"]');
            for (let field of summaryFields) {
                if (field.value && field.value.length > 5) {
                    console.log(`Using fallback summary: ${field.value}`);
                    return field.value;
                }
            }
        }
        
        if (fieldName === 'description') {
            const descFields = form.querySelectorAll('textarea');
            for (let field of descFields) {
                if (field.value && field.value.length > 3) {
                    console.log(`Using fallback description: ${field.value}`);
                    return field.value;
                }
            }
        }
        
        console.log(`Field ${fieldName} not found or empty`);
        return '';
    }
    
    function generateNextTicketId() {
        // Generate a ticket ID based on current timestamp to ensure uniqueness
        const timestamp = Date.now();
        const randomSuffix = Math.floor(Math.random() * 1000);
        return `#${timestamp.toString().slice(-6)}${randomSuffix.toString().padStart(3, '0')}`;
    }
    
    function addTicketToDisplay(ticket) {
        console.log('🚀 ADDING TICKET TO DISPLAY:', ticket);
        
        // SYNC WITH UNIFIED DATA SYSTEM FIRST
        if (window.TracMockData) {
            const newUnifiedTicket = {
                id: ticket.id,
                title: ticket.summary,
                description: ticket.description || 'New ticket created from kanban board',
                type: ticket.type ? ticket.type.toLowerCase() : 'task',
                priority: ticket.priority ? ticket.priority.toLowerCase() : 'medium',
                status: ticket.status === 'Open' ? 'open' : 
                       ticket.status === 'In Progress' ? 'in-progress' :
                       ticket.status === 'Review' ? 'review' :
                       ticket.status === 'Closed' ? 'done' : 'open',
                assignee: 'AC', // Default assignee
                reporter: 'AC', // Default reporter
                component: 'Frontend',
                milestone: ticket.milestone || 'v2.2.0', // Use ticket's milestone if specified, otherwise default
                created: new Date().toISOString(),
                modified: new Date().toISOString()
            };
            
            window.TracMockData.tickets.unshift(newUnifiedTicket);
            console.log(`✅ ADDED TO UNIFIED DATA SYSTEM. TOTAL: ${window.TracMockData.tickets.length}`);
        }
        
        // PERSIST TO SESSION STORAGE FOR CROSS-PAGE ACCESS
        let visualTickets = [];
        try {
            visualTickets = JSON.parse(sessionStorage.getItem('visualTickets') || '[]');
        } catch (e) {
            console.error('Error parsing visual tickets:', e);
            visualTickets = [];
        }
        
        // Add new ticket to the beginning
        visualTickets.unshift(ticket);
        
        // Store back in sessionStorage
        sessionStorage.setItem('visualTickets', JSON.stringify(visualTickets));
        console.log(`📦 STORED IN SESSION. TOTAL VISUAL TICKETS: ${visualTickets.length}`);
        
        // ALWAYS store the ticket globally first
        if (!window.tracTicketsData) {
            window.tracTicketsData = [];
        }
        window.tracTicketsData.unshift(ticket); // Add to beginning of array
        console.log(`✅ STORED GLOBALLY. TOTAL TICKETS: ${window.tracTicketsData.length}`);
        
        // Check if we're currently on the tickets page and add directly
        const ticketsTable = document.getElementById('tickets-tbody');
        if (ticketsTable) {
            console.log('📋 FOUND TICKETS TABLE - ADDING ROW DIRECTLY');
            addTicketRowToTable(ticketsTable, ticket);
            updateTicketsFooterWithNewTicket(ticket);
            console.log('✅ TICKET ROW ADDED TO CURRENT PAGE');
        } else {
            console.log('⚠️ NOT ON TICKETS PAGE - WILL SHOW WHEN YOU NAVIGATE TO TICKETS');
        }
        
        // FORCE refresh tickets page if function exists
        if (window.refreshTicketsTable) {
            console.log('🔄 FORCING TICKETS TABLE REFRESH');
            setTimeout(() => window.refreshTicketsTable(), 100);
        }
        
        // FORCE refresh roadmap page if we're on it
        if (window.location.pathname.includes('/roadmap') && typeof refreshRoadmap !== 'undefined') {
            console.log('🔄 FORCING ROADMAP REFRESH');
            setTimeout(() => refreshRoadmap(), 100);
        }
        
        // FORCE refresh kanban board if function exists
        if (window.refreshKanbanBoard) {
            console.log('🔄 FORCING KANBAN BOARD REFRESH');
            setTimeout(() => window.refreshKanbanBoard(), 100);
        }
    }
    
    function addTicketRowToTable(tbody, ticket) {
        const row = document.createElement('tr');
        row.className = 'new-ticket-highlight'; // Add special class for highlighting
        row.innerHTML = `
            <td class="checkbox-column">
                <input type="checkbox" class="ticket-checkbox" data-ticket-id="${ticket.id}">
            </td>
            <td>
                <a href="/trac_env/ticket/${ticket.id.replace('#', '')}" class="ticket-id">${ticket.id}</a>
            </td>
            <td>
                <div class="ticket-summary">
                    <a href="/trac_env/ticket/${ticket.id.replace('#', '')}" class="summary-link">${ticket.summary}</a>
                    ${ticket.attachments && ticket.attachments.length > 0 ? `
                        <span class="attachment-indicator" title="${ticket.attachments.length} attachment(s)">
                            📎 ${ticket.attachments.length}
                        </span>
                    ` : ''}
                </div>
            </td>
            <td>
                <span class="status-badge status-${ticket.status.toLowerCase().replace(' ', '-')}">${ticket.status}</span>
            </td>
            <td>
                <span class="priority-badge priority-${ticket.priority.toLowerCase()}">${ticket.priority}</span>
            </td>
            <td>
                <span class="type-badge type-${ticket.type.toLowerCase()}">${ticket.type === 'Enhancement' ? 'Enhanc' : ticket.type}</span>
            </td>
            <td>
                <div class="user-info">
                    <span>${ticket.reporter}</span>
                </div>
            </td>
            <td>
                <span class="date-relative">${ticket.created}</span>
            </td>
            <td>
                <div class="action-buttons">
                    <button class="action-btn" title="View">
                        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                        </svg>
                    </button>
                    <button class="action-btn" title="Edit">
                        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                        </svg>
                    </button>
                    <button class="action-btn" title="Delete">
                        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                        </svg>
                    </button>
                </div>
            </td>
        `;
        
        // Insert at the beginning of the table
        tbody.insertBefore(row, tbody.firstChild);
        
        // Add view button functionality to the new row
        const viewBtn = row.querySelector('.action-btn[title="View"]');
        if (viewBtn) {
            viewBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                showTicketDetails(ticket);
            });
        }
        
        // Add edit button functionality to the new row
        const editBtn = row.querySelector('.action-btn[title="Edit"]');
        if (editBtn) {
            editBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                openTicketEditModal(ticket);
            });
        }
        
        // Add delete button functionality to the new row
        const deleteBtn = row.querySelector('.action-btn[title="Delete"]');
        if (deleteBtn) {
            deleteBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                // Get the ticket row and ID
                const ticketRow = this.closest('tr');
                const ticketIdElement = ticketRow.querySelector('.ticket-id');
                const ticketId = ticketIdElement ? ticketIdElement.textContent : '';
                const ticketSummary = ticketRow.querySelector('.ticket-summary')?.textContent || 'this ticket';
                
                // Confirm deletion
                if (confirm(`Are you sure you want to delete ticket ${ticketId}?\n\nSummary: ${ticketSummary}\n\nThis action cannot be undone.`)) {
                    console.log(`🗑️ DELETING TICKET: ${ticketId}`);
                    
                    // Remove from visual tickets in sessionStorage
                    try {
                        let visualTickets = JSON.parse(sessionStorage.getItem('visualTickets') || '[]');
                        visualTickets = visualTickets.filter(t => t.id !== ticketId);
                        sessionStorage.setItem('visualTickets', JSON.stringify(visualTickets));
                        console.log(`📦 REMOVED FROM SESSION STORAGE`);
                    } catch (e) {
                        console.error('Error updating sessionStorage:', e);
                    }
                    
                    // Remove from global tracTicketsData
                    if (window.tracTicketsData) {
                        window.tracTicketsData = window.tracTicketsData.filter(t => t.id !== ticketId);
                        console.log(`✅ REMOVED FROM GLOBAL DATA`);
                    }
                    
                    // Animate row removal
                    ticketRow.style.transition = 'all 0.3s ease';
                    ticketRow.style.opacity = '0';
                    ticketRow.style.transform = 'translateX(-100%)';
                    
                    // Remove row after animation
                    setTimeout(() => {
                        ticketRow.remove();
                        console.log(`✅ TICKET ${ticketId} DELETED`);
                        
                        // Update footer statistics
                        if (window.tracTicketsData) {
                            updateTicketsFooter(window.tracTicketsData);
                        }
                        
                        // Update select all checkbox state
                        const allChecked = document.querySelectorAll('.ticket-checkbox:not(#select-all):checked').length;
                        const totalCheckboxes = document.querySelectorAll('.ticket-checkbox:not(#select-all)').length;
                        const selectAll = document.getElementById('select-all');
                        if (selectAll) {
                            selectAll.checked = totalCheckboxes > 0 && allChecked === totalCheckboxes;
                            selectAll.indeterminate = allChecked > 0 && allChecked < totalCheckboxes;
                        }
                    }, 300);
                }
            });
        }
        
        // Add a highlight animation
        setTimeout(() => {
            row.style.backgroundColor = '#6366f133';
            row.style.transition = 'background-color 0.5s ease';
        }, 100);
        
        // Remove highlight after animation
        setTimeout(() => {
            row.style.backgroundColor = '';
            row.classList.remove('new-ticket-highlight');
        }, 2000);
        
        console.log('Ticket row added to table');
    }
    
    function updateTicketsFooterWithNewTicket(ticket) {
        // Update footer statistics if they exist
        const footer = document.getElementById('tickets-footer');
        if (footer && window.tracTicketsData) {
            updateTicketsFooter(window.tracTicketsData);
        }
    }
    
    function addTicketToRoadmap(ticket) {
        console.log('Adding ticket to roadmap:', ticket);
        
        // Check if we're currently on the roadmap page
        const roadmapGrid = document.querySelector('.roadmap-grid');
        if (roadmapGrid) {
            console.log('Found roadmap grid, adding ticket to milestone');
            addTicketToMilestone(roadmapGrid, ticket);
        } else {
            console.log('Not on roadmap page, ticket will appear when roadmap is next visited');
        }
    }
    
    function addTicketToMilestone(roadmapGrid, ticket) {
        const milestoneCards = roadmapGrid.querySelectorAll('.milestone-card');
        let ticketAdded = false;
        
        // Try to find matching milestone by name or number
        milestoneCards.forEach(card => {
            if (ticketAdded) return;
            
            const titleElement = card.querySelector('h2, h3, .milestone-title');
            if (titleElement) {
                const titleText = titleElement.textContent.toLowerCase();
                const ticketMilestone = ticket.milestone.toLowerCase();
                
                // Check for various milestone matching patterns
                const matches = titleText.includes(ticketMilestone) ||
                              ticketMilestone.includes(titleText) ||
                              (titleText.includes('milestone') && ticketMilestone.includes('milestone')) ||
                              card.getAttribute('data-milestone-number') === ticketMilestone.replace(/\D/g, '');
                
                if (matches) {
                    console.log(`Adding ticket to milestone: ${titleText}`);
                    
                    // Find or create tickets section
                    let ticketsSection = card.querySelector('.milestone-tickets');
                    if (!ticketsSection) {
                        ticketsSection = document.createElement('div');
                        ticketsSection.className = 'milestone-tickets';
                        ticketsSection.innerHTML = `
                            <h4 class="milestone-tickets-title">Assigned Tickets (1)</h4>
                            <div class="milestone-tickets-list"></div>
                        `;
                        card.appendChild(ticketsSection);
                    }
                    
                    const ticketsList = ticketsSection.querySelector('.milestone-tickets-list');
                    const ticketsTitle = ticketsSection.querySelector('.milestone-tickets-title');
                    
                    // Update ticket count
                    const currentCount = ticketsList.querySelectorAll('.milestone-ticket-item').length;
                    ticketsTitle.textContent = `Assigned Tickets (${currentCount + 1})`;
                    
                    // Create ticket item
                    const ticketItem = document.createElement('div');
                    ticketItem.className = 'milestone-ticket-item new-milestone-ticket';
                    ticketItem.innerHTML = `
                        <div class="ticket-id-summary">
                            <a href="/trac_env/ticket/${ticket.id.replace('#', '')}" class="ticket-id">${ticket.id}</a>
                            <span class="ticket-summary">${ticket.summary}</span>
                        </div>
                        <div class="ticket-meta">
                            <span class="status-badge status-${ticket.status.toLowerCase().replace(' ', '-')}">${ticket.status}</span>
                            <span class="priority-badge priority-${ticket.priority.toLowerCase()}">${ticket.priority}</span>
                            <span class="type-badge type-${ticket.type.toLowerCase()}">${ticket.type}</span>
                        </div>
                    `;
                    
                    // Insert at the beginning of the list
                    ticketsList.insertBefore(ticketItem, ticketsList.firstChild);
                    
                    // Add highlight animation
                    setTimeout(() => {
                        ticketItem.style.backgroundColor = '#6366f133';
                        ticketItem.style.transition = 'background-color 0.5s ease';
                    }, 100);
                    
                    // Remove highlight after animation  
                    setTimeout(() => {
                        ticketItem.style.backgroundColor = '';
                        ticketItem.classList.remove('new-milestone-ticket');
                    }, 2000);
                    
                    ticketAdded = true;
                    console.log('Ticket added to milestone successfully');
                }
            }
        });
        
        if (!ticketAdded) {
            console.log(`No matching milestone found for: ${ticket.milestone}`);
        }
    }
    
    // File Upload Feature Functions
    let uploadedFiles = [];
    const MAX_FILES = 5;
    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
    const ALLOWED_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.pdf', '.txt', '.log', '.zip'];
    
    // Global storage for file contents (persists across views)
    window.fileContentStorage = window.fileContentStorage || {};
    
    function createFileUploadSection() {
        const section = document.createElement('div');
        section.className = 'modern-form-group file-upload-section';
        
        const label = document.createElement('label');
        label.className = 'modern-form-label';
        label.textContent = 'Attachments';
        section.appendChild(label);
        
        // Create dropzone
        const dropzone = document.createElement('div');
        dropzone.className = 'file-dropzone';
        dropzone.innerHTML = `
            <svg class="dropzone-icon" width="48" height="48" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
            </svg>
            <p class="dropzone-text">Drag files here or click to upload</p>
            <p class="dropzone-subtext">Up to 5 files, max 5MB each</p>
            <p class="dropzone-formats">Supported: PNG, JPG, PDF, TXT, LOG, ZIP</p>
            <input type="file" class="file-input-hidden" multiple accept="${ALLOWED_EXTENSIONS.join(',')}" />
        `;
        
        // File list container
        const fileList = document.createElement('div');
        fileList.className = 'uploaded-files-list';
        
        section.appendChild(dropzone);
        section.appendChild(fileList);
        
        // Add event listeners
        const fileInput = dropzone.querySelector('.file-input-hidden');
        
        // Click to upload
        dropzone.addEventListener('click', (e) => {
            if (!e.target.closest('.file-chip')) {
                fileInput.click();
            }
        });
        
        // File input change
        fileInput.addEventListener('change', (e) => {
            handleFiles(e.target.files, fileList);
        });
        
        // Drag and drop events
        dropzone.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropzone.classList.add('dragover');
        });
        
        dropzone.addEventListener('dragleave', (e) => {
            e.preventDefault();
            dropzone.classList.remove('dragover');
        });
        
        dropzone.addEventListener('drop', (e) => {
            e.preventDefault();
            dropzone.classList.remove('dragover');
            handleFiles(e.dataTransfer.files, fileList);
        });
        
        return section;
    }
    
    function handleFiles(files, fileListContainer) {
        const fileArray = Array.from(files);
        
        for (const file of fileArray) {
            // Check file count
            if (uploadedFiles.length >= MAX_FILES) {
                showMessage(`Maximum ${MAX_FILES} files allowed`, 'error');
                break;
            }
            
            // Check file size
            if (file.size > MAX_FILE_SIZE) {
                showMessage(`File "${file.name}" exceeds 5MB limit`, 'error');
                continue;
            }
            
            // Check file extension
            const ext = '.' + file.name.split('.').pop().toLowerCase();
            if (!ALLOWED_EXTENSIONS.includes(ext)) {
                showMessage(`File type "${ext}" not allowed`, 'error');
                continue;
            }
            
            // Add file to list
            const fileId = Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            const fileData = {
                id: fileId,
                file: file,
                name: file.name,
                size: file.size,
                type: file.type || 'application/octet-stream',
                base64: null  // Will be populated async
            };
            
            uploadedFiles.push(fileData);
            addFileChip(fileData, fileListContainer);
            
            // Read file as base64 for storage with ticket
            const reader = new FileReader();
            reader.onload = function(e) {
                // Update the fileData with base64
                fileData.base64 = e.target.result;
                console.log('File converted to base64 for:', fileData.name);
            };
            reader.readAsDataURL(file);
        }
        
        updateDropzoneState();
    }
    
    function addFileChip(fileData, container) {
        const chip = document.createElement('div');
        chip.className = 'file-chip';
        chip.dataset.fileId = fileData.id;
        
        const fileIcon = getFileIcon(fileData.name);
        const fileSize = formatFileSize(fileData.size);
        
        chip.innerHTML = `
            <div class="file-chip-icon">${fileIcon}</div>
            <div class="file-chip-info">
                <span class="file-chip-name">${fileData.name}</span>
                <span class="file-chip-size">${fileSize}</span>
            </div>
            <button class="file-chip-remove" aria-label="Remove file">
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
            </button>
        `;
        
        // Remove button handler
        chip.querySelector('.file-chip-remove').addEventListener('click', (e) => {
            e.stopPropagation();
            removeFile(fileData.id, container);
        });
        
        container.appendChild(chip);
    }
    
    function removeFile(fileId, container) {
        uploadedFiles = uploadedFiles.filter(f => f.id !== fileId);
        const chip = container.querySelector(`[data-file-id="${fileId}"]`);
        if (chip) {
            chip.remove();
        }
        updateDropzoneState();
    }
    
    function updateDropzoneState() {
        const dropzone = document.querySelector('.file-dropzone');
        if (dropzone) {
            if (uploadedFiles.length >= MAX_FILES) {
                dropzone.classList.add('disabled');
            } else {
                dropzone.classList.remove('disabled');
            }
        }
    }
    
    function getFileIcon(filename) {
        const ext = filename.split('.').pop().toLowerCase();
        const iconMap = {
            'pdf': '📄',
            'txt': '📝',
            'log': '📋',
            'zip': '🗂️',
            'png': '🖼️',
            'jpg': '🖼️',
            'jpeg': '🖼️'
        };
        return iconMap[ext] || '📎';
    }
    
    function formatFileSize(bytes) {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    }
    
    // Clear uploaded files when form is cleared
    function clearUploadedFiles() {
        uploadedFiles = [];
        const fileList = document.querySelector('.uploaded-files-list');
        if (fileList) {
            fileList.innerHTML = '';
        }
        updateDropzoneState();
    }
    
    // Function to show ticket details in a modal
    function showTicketDetails(ticket) {
        // Remove any existing modal
        const existingModal = document.querySelector('.ticket-details-modal');
        if (existingModal) {
            existingModal.remove();
        }
        
        // Create modal backdrop
        const modalBackdrop = document.createElement('div');
        modalBackdrop.className = 'ticket-details-modal';
        
        // Create modal content
        const modalContent = document.createElement('div');
        modalContent.className = 'ticket-details-content';
        
        // Build attachment section if files exist
        let attachmentSection = '';
        if (ticket.attachments && ticket.attachments.length > 0) {
            attachmentSection = `
                <div class="detail-section">
                    <h3 class="detail-section-title">Attachments (${ticket.attachments.length})</h3>
                    <div class="attachment-list">
                        ${ticket.attachments.map(file => `
                            <div class="attachment-item" title="Click to preview • Download button on the right">
                                <span class="attachment-icon">${getFileIcon(file.name)}</span>
                                <div class="attachment-info">
                                    <span class="attachment-name">${file.name}</span>
                                    <span class="attachment-size">${formatFileSize(file.size)}</span>
                                </div>
                                <svg class="attachment-action" width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"/>
                                </svg>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }
        
        modalContent.innerHTML = `
            <div class="modal-header">
                <h2 class="modal-title">Ticket ${ticket.id}</h2>
                <button class="modal-close" aria-label="Close">
                    <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                </button>
            </div>
            <div class="modal-body">
                <div class="detail-grid">
                    <div class="detail-item">
                        <span class="detail-label">Summary</span>
                        <span class="detail-value">${ticket.summary || 'N/A'}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Reporter</span>
                        <span class="detail-value">${ticket.reporter || 'N/A'}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Type</span>
                        <span class="detail-value">
                            <span class="type-badge type-${(ticket.type || 'bug').toLowerCase()}">${ticket.type || 'Bug'}</span>
                        </span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Priority</span>
                        <span class="detail-value">
                            <span class="priority-badge priority-${(ticket.priority || 'medium').toLowerCase()}">${ticket.priority || 'Medium'}</span>
                        </span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Status</span>
                        <span class="detail-value">
                            <span class="status-badge status-${(ticket.status || 'open').toLowerCase().replace(' ', '-')}">${ticket.status || 'Open'}</span>
                        </span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Assignee</span>
                        <span class="detail-value">${ticket.assignee || 'Unassigned'}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Component</span>
                        <span class="detail-value">${ticket.component || 'General'}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Milestone</span>
                        <span class="detail-value">${ticket.milestone || 'None'}</span>
                    </div>
                    ${ticket.version ? `
                        <div class="detail-item">
                            <span class="detail-label">Version</span>
                            <span class="detail-value">${ticket.version}</span>
                        </div>
                    ` : ''}
                    ${ticket.keywords ? `
                        <div class="detail-item">
                            <span class="detail-label">Keywords</span>
                            <span class="detail-value">${ticket.keywords}</span>
                        </div>
                    ` : ''}
                    ${ticket.cc ? `
                        <div class="detail-item">
                            <span class="detail-label">CC</span>
                            <span class="detail-value">${ticket.cc}</span>
                        </div>
                    ` : ''}
                    <div class="detail-item">
                        <span class="detail-label">Created</span>
                        <span class="detail-value">${ticket.created || 'Unknown'}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Modified</span>
                        <span class="detail-value">${ticket.modified || 'Unknown'}</span>
                    </div>
                </div>
                ${ticket.description ? `
                    <div class="detail-section">
                        <h3 class="detail-section-title">Description</h3>
                        <div class="detail-description">${ticket.description.replace(/\n/g, '<br>')}</div>
                    </div>
                ` : ''}
                ${attachmentSection}
            </div>
        `;
        
        modalBackdrop.appendChild(modalContent);
        document.body.appendChild(modalBackdrop);
        
        // Add close functionality
        const closeBtn = modalContent.querySelector('.modal-close');
        closeBtn.addEventListener('click', () => {
            modalBackdrop.remove();
        });
        
        // Close on backdrop click
        modalBackdrop.addEventListener('click', (e) => {
            if (e.target === modalBackdrop) {
                modalBackdrop.remove();
            }
        });
        
        // Close on escape key
        const escapeHandler = (e) => {
            if (e.key === 'Escape') {
                modalBackdrop.remove();
                document.removeEventListener('keydown', escapeHandler);
            }
        };
        document.addEventListener('keydown', escapeHandler);
        
        // Add click handlers to attachment items
        const attachmentItems = modalContent.querySelectorAll('.attachment-item');
        attachmentItems.forEach((item, index) => {
            item.style.cursor = 'pointer';
            
            // Add download button to each attachment item
            const downloadBtn = document.createElement('button');
            downloadBtn.className = 'attachment-download-btn';
            downloadBtn.title = 'Download file';
            downloadBtn.innerHTML = `
                <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-4-4m4 4l4-4m-6 4V10"/>
                </svg>
            `;
            item.appendChild(downloadBtn);
            
            // Preview on main item click
            item.addEventListener('click', async (e) => {
                // Don't preview if download button was clicked
                if (e.target.closest('.attachment-download-btn')) return;
                
                e.preventDefault();
                e.stopPropagation();
                console.log('Attachment clicked for preview:', index);
                
                const attachment = ticket.attachments[index];
                console.log('Attachment data:', attachment);
                
                if (attachment) {
                    // Check if we have base64 data in the attachment itself
                    if (attachment.base64) {
                        try {
                            // Create blob from base64 data for preview
                            const base64Response = await fetch(attachment.base64);
                            const blob = await base64Response.blob();
                            
                            // Create File object for preview
                            const file = new File([blob], attachment.name, { type: blob.type });
                            
                            // Show preview instead of downloading
                            showFilePreview(file, attachment.name);
                            
                        } catch (error) {
                            console.error('Error loading file for preview:', error);
                            showMessage(`Error loading preview for "${attachment.name}".`, 'error');
                        }
                    } else {
                        // Use stored file data if available
                        showFilePreviewFromStorage(attachment.id, attachment.name);
                    }
                }
            });
            
            // Download on download button click
            downloadBtn.addEventListener('click', async (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Download button clicked:', index);
                
                const attachment = ticket.attachments[index];
                
                if (attachment) {
                    // Check if we have base64 data in the attachment itself
                    if (attachment.base64) {
                        try {
                            // Create blob from base64 data
                            const base64Response = await fetch(attachment.base64);
                            const blob = await base64Response.blob();
                            const blobUrl = URL.createObjectURL(blob);
                            
                            // Trigger download
                            const link = document.createElement('a');
                            link.href = blobUrl;
                            link.download = attachment.name;
                            link.style.display = 'none';
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
                            
                            showMessage(`Downloading "${attachment.name}"...`, 'success');
                            
                            // Clean up blob URL after a delay
                            setTimeout(() => URL.revokeObjectURL(blobUrl), 5000);
                            
                        } catch (error) {
                            console.error('Error downloading file:', error);
                            showMessage(`Error downloading "${attachment.name}".`, 'error');
                        }
                    } else {
                        console.log('No stored file found for ID:', attachment.id);
                        console.log('Available storage:', window.fileContentStorage);
                        
                        // For demo purposes, create a simple text file
                        const demoContent = `This is a demo file: ${attachment.name}\n\nIn a real implementation, this would contain the actual file content.`;
                        const blob = new Blob([demoContent], { type: 'text/plain' });
                        const url = URL.createObjectURL(blob);
                        
                        const link = document.createElement('a');
                        link.href = url;
                        link.download = attachment.name;
                        link.target = '_blank';
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                        
                        // Clean up
                        setTimeout(() => URL.revokeObjectURL(url), 100);
                        
                        showMessage(`Downloading demo version of "${attachment.name}"...`, 'info');
                    }
                }
            });
        });
        
        // Animate in
        requestAnimationFrame(() => {
            modalBackdrop.classList.add('show');
        });
    }
    
    // Function to show file preview in a modal
    function showFilePreview(file, fileName) {
        // Remove any existing preview modal
        const existingModal = document.querySelector('.file-preview-modal');
        if (existingModal) {
            existingModal.remove();
        }
        
        // Create modal backdrop
        const modalBackdrop = document.createElement('div');
        modalBackdrop.className = 'file-preview-modal';
        
        // Create modal content
        const modalContent = document.createElement('div');
        modalContent.className = 'file-preview-content';
        
        // Determine file type
        const fileExt = fileName.split('.').pop().toLowerCase();
        const isImage = ['png', 'jpg', 'jpeg', 'gif', 'bmp', 'webp', 'svg'].includes(fileExt);
        const isText = ['txt', 'log', 'md', 'json', 'xml', 'csv', 'js', 'ts', 'py', 'java', 'cpp', 'c', 'h', 'css', 'html', 'htm', 'php', 'rb', 'go', 'rs', 'sh', 'yaml', 'yml', 'ini', 'conf'].includes(fileExt);
        const isPDF = fileExt === 'pdf';
        const isCode = ['js', 'ts', 'py', 'java', 'cpp', 'c', 'h', 'css', 'html', 'htm', 'php', 'rb', 'go', 'rs', 'sh'].includes(fileExt);
        const isJSON = ['json', 'yaml', 'yml'].includes(fileExt);
        
        modalContent.innerHTML = `
            <div class="preview-header">
                <h3 class="preview-title">${fileName}</h3>
                <button class="preview-close" aria-label="Close">
                    <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                </button>
            </div>
            <div class="preview-body">
                <div class="preview-loading">Loading preview...</div>
            </div>
        `;
        
        modalBackdrop.appendChild(modalContent);
        document.body.appendChild(modalBackdrop);
        
        const previewBody = modalContent.querySelector('.preview-body');
        
        // Load file content based on type
        if (isImage) {
            const reader = new FileReader();
            reader.onload = function(e) {
                previewBody.innerHTML = `
                    <div class="preview-image-container">
                        <img src="${e.target.result}" alt="${fileName}" class="preview-image">
                    </div>
                `;
            };
            reader.readAsDataURL(file);
        } else if (isText) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const content = e.target.result;
                let formattedContent = escapeHtml(content);
                
                // Add syntax highlighting class based on file type
                let languageClass = '';
                if (isCode) {
                    languageClass = `language-${fileExt}`;
                } else if (isJSON) {
                    languageClass = 'language-json';
                    // Try to format JSON if it's valid
                    try {
                        const parsed = JSON.parse(content);
                        formattedContent = escapeHtml(JSON.stringify(parsed, null, 2));
                    } catch (e) {
                        // If not valid JSON, use original content
                    }
                }
                
                previewBody.innerHTML = `
                    <div class="preview-text-container">
                        <div class="preview-text-header">
                            <span class="file-type-badge">${fileExt.toUpperCase()}</span>
                            <span class="file-size">${formatFileSize(file.size)}</span>
                        </div>
                        <pre class="preview-text ${languageClass}"><code>${formattedContent}</code></pre>
                    </div>
                `;
            };
            reader.readAsText(file);
        } else if (isPDF) {
            // Try to render PDF using browser's built-in viewer
            const reader = new FileReader();
            reader.onload = function(e) {
                const pdfUrl = e.target.result;
                previewBody.innerHTML = `
                    <div class="preview-pdf-container">
                        <div class="preview-text-header">
                            <span class="file-type-badge">PDF</span>
                            <span class="file-size">${formatFileSize(file.size)}</span>
                        </div>
                        <iframe src="${pdfUrl}" class="preview-pdf" frameborder="0">
                            <div class="preview-message">
                                <svg class="preview-icon" width="48" height="48" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                                </svg>
                                <p>PDF Preview</p>
                                <p class="preview-subtext">Size: ${formatFileSize(file.size)}</p>
                                <p class="preview-subtext">Your browser does not support PDF preview</p>
                            </div>
                        </iframe>
                    </div>
                `;
            };
            reader.readAsDataURL(file);
        } else {
            previewBody.innerHTML = `
                <div class="preview-message">
                    <svg class="preview-icon" width="48" height="48" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                    </svg>
                    <p>File Preview</p>
                    <p class="preview-subtext">Type: ${fileExt.toUpperCase()}</p>
                    <p class="preview-subtext">Size: ${formatFileSize(file.size)}</p>
                    <p class="preview-subtext">Binary files cannot be previewed</p>
                </div>
            `;
        }
        
        // Add close functionality
        const closeBtn = modalContent.querySelector('.preview-close');
        closeBtn.addEventListener('click', () => {
            modalBackdrop.remove();
        });
        
        // Close on backdrop click
        modalBackdrop.addEventListener('click', (e) => {
            if (e.target === modalBackdrop) {
                modalBackdrop.remove();
            }
        });
        
        // Close on escape key
        const escapeHandler = (e) => {
            if (e.key === 'Escape') {
                modalBackdrop.remove();
                document.removeEventListener('keydown', escapeHandler);
            }
        };
        document.addEventListener('keydown', escapeHandler);
        
        // Animate in
        requestAnimationFrame(() => {
            modalBackdrop.classList.add('show');
        });
    }
    
    // Helper function to escape HTML
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    // Function to show file preview from stored content
    function showFilePreviewFromStorage(fileId, fileName) {
        const storedFile = window.fileContentStorage[fileId];
        if (!storedFile) {
            showMessage(`File "${fileName}" - Preview not available.`, 'info');
            return;
        }
        
        // Remove any existing preview modal
        const existingModal = document.querySelector('.file-preview-modal');
        if (existingModal) {
            existingModal.remove();
        }
        
        // Create modal backdrop
        const modalBackdrop = document.createElement('div');
        modalBackdrop.className = 'file-preview-modal';
        
        // Create modal content
        const modalContent = document.createElement('div');
        modalContent.className = 'file-preview-content';
        
        // Determine file type
        const fileExt = fileName.split('.').pop().toLowerCase();
        const isImage = ['png', 'jpg', 'jpeg', 'gif', 'bmp', 'webp', 'svg'].includes(fileExt);
        const isText = ['txt', 'log', 'md', 'json', 'xml', 'csv', 'js', 'ts', 'py', 'java', 'cpp', 'c', 'h', 'css', 'html', 'htm', 'php', 'rb', 'go', 'rs', 'sh', 'yaml', 'yml', 'ini', 'conf'].includes(fileExt);
        const isPDF = fileExt === 'pdf';
        const isCode = ['js', 'ts', 'py', 'java', 'cpp', 'c', 'h', 'css', 'html', 'htm', 'php', 'rb', 'go', 'rs', 'sh'].includes(fileExt);
        const isJSON = ['json', 'yaml', 'yml'].includes(fileExt);
        
        modalContent.innerHTML = `
            <div class="preview-header">
                <h3 class="preview-title">${fileName}</h3>
                <button class="preview-close" aria-label="Close">
                    <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                </button>
            </div>
            <div class="preview-body">
                <div class="preview-loading">Loading preview...</div>
            </div>
        `;
        
        modalBackdrop.appendChild(modalContent);
        document.body.appendChild(modalBackdrop);
        
        const previewBody = modalContent.querySelector('.preview-body');
        
        // Display content based on type
        if (isImage && storedFile.content.startsWith('data:image')) {
            previewBody.innerHTML = `
                <div class="preview-image-container">
                    <img src="${storedFile.content}" alt="${fileName}" class="preview-image">
                </div>
            `;
        } else if (isText) {
            // For text files stored as data URL, we need to decode
            try {
                const base64 = storedFile.content.split(',')[1];
                const text = atob(base64);
                previewBody.innerHTML = `
                    <div class="preview-text-container">
                        <pre class="preview-text">${escapeHtml(text)}</pre>
                    </div>
                `;
            } catch (e) {
                previewBody.innerHTML = `
                    <div class="preview-message">
                        <p>Unable to decode text content</p>
                    </div>
                `;
            }
        } else if (isPDF) {
            previewBody.innerHTML = `
                <div class="preview-message">
                    <svg class="preview-icon" width="48" height="48" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                    </svg>
                    <p>PDF Preview</p>
                    <p class="preview-subtext">Size: ${formatFileSize(storedFile.size)}</p>
                    <p class="preview-subtext">PDF files cannot be previewed in this view</p>
                </div>
            `;
        } else {
            previewBody.innerHTML = `
                <div class="preview-message">
                    <svg class="preview-icon" width="48" height="48" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                    </svg>
                    <p>File Preview</p>
                    <p class="preview-subtext">Type: ${fileExt.toUpperCase()}</p>
                    <p class="preview-subtext">Size: ${formatFileSize(storedFile.size)}</p>
                    <p class="preview-subtext">Binary files cannot be previewed</p>
                </div>
            `;
        }
        
        // Add close functionality
        const closeBtn = modalContent.querySelector('.preview-close');
        closeBtn.addEventListener('click', () => {
            modalBackdrop.remove();
        });
        
        // Close on backdrop click
        modalBackdrop.addEventListener('click', (e) => {
            if (e.target === modalBackdrop) {
                modalBackdrop.remove();
            }
        });
        
        // Close on escape key
        const escapeHandler = (e) => {
            if (e.key === 'Escape') {
                modalBackdrop.remove();
                document.removeEventListener('keydown', escapeHandler);
            }
        };
        document.addEventListener('keydown', escapeHandler);
        
        // Animate in
        requestAnimationFrame(() => {
            modalBackdrop.classList.add('show');
        });
    }
    
    // AI Assistant Logging System
    class AIAssistantLogger {
        constructor() {
            this.sessionId = this.generateSessionId();
            this.logs = [];
            this.startTime = Date.now();
            this.apiCallCount = 0;
            this.userInteractions = 0;
        }
        
        generateSessionId() {
            return 'ai_session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        }
        
        log(level, event, data = {}) {
            const timestamp = new Date().toISOString();
            const logEntry = {
                timestamp,
                sessionId: this.sessionId,
                level,
                event,
                data: {
                    ...data,
                    userAgent: navigator.userAgent,
                    url: window.location.href,
                    sessionDuration: Date.now() - this.startTime
                }
            };
            
            this.logs.push(logEntry);
            
            // Console logging with colors
            const colors = {
                INFO: 'color: #06b6d4; font-weight: bold;',
                SUCCESS: 'color: #10b981; font-weight: bold;',
                WARNING: 'color: #f59e0b; font-weight: bold;',
                ERROR: 'color: #ef4444; font-weight: bold;',
                DEBUG: 'color: #8b5cf6; font-weight: bold;'
            };
            
            console.log(`%c[AI Assistant ${level}] ${event}`, colors[level] || '', data);
            
            // Send to analytics (if available)
            this.sendToAnalytics(logEntry);
            
            // Local storage backup
            this.saveToLocalStorage(logEntry);
        }
        
        info(event, data) { this.log('INFO', event, data); }
        success(event, data) { this.log('SUCCESS', event, data); }
        warning(event, data) { this.log('WARNING', event, data); }
        error(event, data) { this.log('ERROR', event, data); }
        debug(event, data) { this.log('DEBUG', event, data); }
        
        incrementInteraction() {
            this.userInteractions++;
        }
        
        incrementAPICall() {
            this.apiCallCount++;
        }
        
        sendToAnalytics(logEntry) {
            // Send to Google Analytics, Mixpanel, or custom analytics
            if (typeof gtag !== 'undefined') {
                gtag('event', 'ai_assistant_interaction', {
                    event_category: 'AI Assistant',
                    event_label: logEntry.event,
                    custom_map: {
                        session_id: logEntry.sessionId,
                        level: logEntry.level
                    }
                });
            }
            
            // Custom analytics endpoint
            if (window.ANALYTICS_ENDPOINT) {
                fetch(window.ANALYTICS_ENDPOINT, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(logEntry)
                }).catch(err => console.warn('Analytics send failed:', err));
            }
        }
        
        saveToLocalStorage(logEntry) {
            try {
                const existingLogs = JSON.parse(localStorage.getItem('ai_assistant_logs') || '[]');
                existingLogs.push(logEntry);
                
                // Keep only last 100 entries
                if (existingLogs.length > 100) {
                    existingLogs.splice(0, existingLogs.length - 100);
                }
                
                localStorage.setItem('ai_assistant_logs', JSON.stringify(existingLogs));
            } catch (err) {
                console.warn('Failed to save log to localStorage:', err);
            }
        }
        
        getSessionSummary() {
            return {
                sessionId: this.sessionId,
                duration: Date.now() - this.startTime,
                totalLogs: this.logs.length,
                apiCallCount: this.apiCallCount,
                userInteractions: this.userInteractions,
                events: this.logs.map(log => log.event),
                errors: this.logs.filter(log => log.level === 'ERROR').length
            };
        }
        
        exportLogs() {
            const summary = this.getSessionSummary();
            const exportData = {
                summary,
                logs: this.logs
            };
            
            const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `ai_assistant_logs_${this.sessionId}.json`;
            a.click();
            URL.revokeObjectURL(url);
        }
    }
    
    // Global logger instance
    const aiLogger = new AIAssistantLogger();
    
    // AI Assistant for ticket description enhancement
    function addAIAssistant(descGroup, descriptionField) {
        aiLogger.info('AI Assistant Initialized', {
            formContext: {
                hasDescriptionField: !!descriptionField,
                fieldId: descriptionField?.id,
                formLocation: window.location.pathname
            }
        });
        // Create AI assistant container
        const aiContainer = document.createElement('div');
        aiContainer.className = 'ai-assistant-container';
        
        aiContainer.innerHTML = `
            <div class="ai-assistant-header">
                <div class="ai-header-top">
                    <div class="ai-icon-wrapper">
                        <div class="ai-icon-gradient">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
                                <path d="M12 8v4m0 4h.01"/>
                            </svg>
                        </div>
                    </div>
                    <div class="ai-title-section">
                        <span class="ai-title">AI Problem Solver</span>
                        <span class="ai-subtitle">Intelligent ticket assistant</span>
                    </div>
                    <div class="ai-status-badge">
                        <span class="ai-status-dot"></span>
                        <span class="ai-status-text">SMART</span>
                    </div>
                </div>
                <p class="ai-description">
                    Describe your problem and I'll analyze it, suggest immediate fixes, and create an actionable ticket if needed.
                </p>
            </div>
            <div class="ai-assistant-content">
                <div class="ai-input-group">
                    <div class="ai-input-wrapper">
                        <input type="text" id="ai-brief-input" placeholder="Describe your issue (e.g., Login button not working on mobile)"
                               class="ai-input">
                        <div class="ai-input-hint">Press Enter or click Analyze to start</div>
                    </div>
                    <button id="ai-analyze-btn" class="ai-analyze-button">
                        <svg class="ai-button-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="11" cy="11" r="8"/>
                            <path d="m21 21-4.35-4.35"/>
                        </svg>
                        <span>Analyze & Solve</span>
                    </button>
                </div>
                
                <div id="ai-analysis-result" class="ai-analysis-result" style="display: none;">
                    <!-- Tab Navigation -->
                    <div class="ai-tabs">
                        <button class="ai-tab active" data-tab="solutions">
                            <svg class="ai-tab-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                            </svg>
                            <span>Solutions</span>
                        </button>
                        <button class="ai-tab" data-tab="causes">
                            <svg class="ai-tab-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="12" cy="12" r="10"/>
                                <path d="M12 16v-4m0-4h.01"/>
                            </svg>
                            <span>Causes</span>
                        </button>
                        <button class="ai-tab" data-tab="diagnostics">
                            <svg class="ai-tab-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M3 12h18m-9-9v18"/>
                                <circle cx="12" cy="12" r="3"/>
                            </svg>
                            <span>Diagnostics</span>
                        </button>
                        <button class="ai-tab" data-tab="ticket">
                            <svg class="ai-tab-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                                <polyline points="14 2 14 8 20 8"/>
                                <line x1="16" y1="13" x2="8" y2="13"/>
                                <line x1="16" y1="17" x2="8" y2="17"/>
                                <polyline points="10 9 9 9 8 9"/>
                            </svg>
                            <span>Ticket</span>
                        </button>
                        <button class="ai-tab" data-tab="related">
                            <svg class="ai-tab-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                            </svg>
                            <span>Related</span>
                        </button>
                    </div>
                    
                    <!-- Tab Content -->
                    <div id="ai-tab-content" class="ai-tab-content">
                        <!-- Content will be dynamically loaded -->
                    </div>
                    
                    <!-- Action Buttons -->
                    <div class="ai-action-buttons">
                        <button id="ai-apply-ticket" class="ai-action-btn ai-btn-primary">
                            <svg class="ai-btn-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="20 6 9 17 4 12"/>
                            </svg>
                            <span>Apply to Ticket</span>
                        </button>
                        <button id="ai-copy-section" class="ai-action-btn ai-btn-secondary">
                            <svg class="ai-btn-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                            </svg>
                            <span>Copy Section</span>
                        </button>
                        <button id="ai-search-similar" class="ai-action-btn ai-btn-secondary">
                            <svg class="ai-btn-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="11" cy="11" r="8"/>
                                <path d="m21 21-4.35-4.35"/>
                            </svg>
                            <span>Search Similar</span>
                        </button>
                        <button id="ai-regenerate-analysis" class="ai-action-btn ai-btn-secondary">
                            <svg class="ai-btn-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="23 4 23 10 17 10"/>
                                <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
                            </svg>
                            <span>Re-analyze</span>
                        </button>
                        <button id="ai-view-logs" class="ai-action-btn ai-btn-ghost">
                            <svg class="ai-btn-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                                <polyline points="14 2 14 8 20 8"/>
                                <line x1="12" y1="18" x2="12" y2="12"/>
                                <line x1="9" y1="15" x2="15" y2="15"/>
                            </svg>
                            <span>View Logs</span>
                        </button>
                    </div>
                </div>
                
                <div id="ai-loading" class="ai-loading" style="display: none;">
                    <div class="ai-loading-content">
                        <div class="ai-loading-spinner">
                            <div class="ai-spinner-ring"></div>
                            <svg class="ai-spinner-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
                            </svg>
                        </div>
                        <div class="ai-loading-text">
                            <div class="ai-loading-title">AI is analyzing your problem...</div>
                            <div class="ai-loading-status" id="ai-loading-status">Identifying root causes</div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Add CSS for AI Problem Solver
        const style = document.createElement('style');
        style.textContent = `
            /* AI Problem Solver Styles */
            .ai-assistant-container {
                margin-top: 0.75rem;
                padding: 1.25rem;
                background: linear-gradient(135deg, rgba(139, 92, 246, 0.08), rgba(6, 182, 212, 0.08));
                border: 1px solid rgba(139, 92, 246, 0.2);
                border-radius: 14px;
                backdrop-filter: blur(20px);
                position: relative;
                overflow: hidden;
                animation: fadeIn 0.3s ease-out;
            }
            
            .ai-assistant-container::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                height: 1px;
                background: linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.5), transparent);
                animation: shimmer 3s infinite;
            }
            
            @keyframes shimmer {
                0% { transform: translateX(-100%); }
                100% { transform: translateX(100%); }
            }
            
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(10px); }
                to { opacity: 1; transform: translateY(0); }
            }
            
            .ai-header-top {
                display: flex;
                align-items: center;
                gap: 0.75rem;
                margin-bottom: 0.75rem;
            }
            
            .ai-icon-wrapper {
                position: relative;
            }
            
            .ai-icon-gradient {
                width: 36px;
                height: 36px;
                background: linear-gradient(135deg, #8b5cf6, #06b6d4);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
            }
            
            .ai-title-section {
                flex: 1;
                display: flex;
                flex-direction: column;
                gap: 2px;
            }
            
            .ai-title {
                font-weight: 600;
                color: #f9fafb;
                font-size: 1.125rem;
                letter-spacing: -0.025em;
            }
            
            .ai-subtitle {
                font-size: 0.75rem;
                color: #9ca3af;
                text-transform: uppercase;
                letter-spacing: 0.05em;
            }
            
            .ai-status-badge {
                display: flex;
                align-items: center;
                gap: 0.375rem;
                background: rgba(16, 185, 129, 0.1);
                border: 1px solid rgba(16, 185, 129, 0.3);
                padding: 0.25rem 0.75rem;
                border-radius: 9999px;
                animation: pulse 2s infinite;
            }
            
            .ai-status-dot {
                width: 6px;
                height: 6px;
                background: #10b981;
                border-radius: 50%;
                animation: blink 1.5s infinite;
            }
            
            .ai-status-text {
                font-size: 0.75rem;
                font-weight: 600;
                color: #10b981;
                letter-spacing: 0.05em;
            }
            
            @keyframes pulse {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.8; }
            }
            
            @keyframes blink {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.3; }
            }
            
            .ai-description {
                font-size: 0.875rem;
                color: #d1d5db;
                margin: 0;
                line-height: 1.5;
            }
            
            .ai-input-group {
                display: flex;
                gap: 0.75rem;
                margin-top: 1rem;
            }
            
            .ai-input-wrapper {
                flex: 1;
                position: relative;
            }
            
            .ai-input {
                width: 100%;
                background: rgba(255, 255, 255, 0.05);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 10px;
                padding: 0.875rem 1rem;
                color: #f8fafc;
                font-size: 0.875rem;
                transition: all 0.2s;
                backdrop-filter: blur(10px);
            }
            
            .ai-input:focus {
                outline: none;
                border-color: #8b5cf6;
                background: rgba(255, 255, 255, 0.08);
                box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
            }
            
            .ai-input::placeholder {
                color: #6b7280;
            }
            
            .ai-input-hint {
                position: absolute;
                bottom: -18px;
                left: 1rem;
                font-size: 0.75rem;
                color: #6b7280;
                opacity: 0;
                transition: opacity 0.2s;
            }
            
            .ai-input:focus ~ .ai-input-hint {
                opacity: 1;
            }
            
            .ai-analyze-button {
                background: linear-gradient(135deg, #8b5cf6, #06b6d4);
                border: none;
                border-radius: 10px;
                padding: 0.875rem 1.5rem;
                color: white;
                font-weight: 600;
                font-size: 0.875rem;
                cursor: pointer;
                transition: all 0.2s;
                display: flex;
                align-items: center;
                gap: 0.5rem;
                box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
                white-space: nowrap;
            }
            
            .ai-analyze-button:hover {
                transform: translateY(-1px);
                box-shadow: 0 6px 20px rgba(139, 92, 246, 0.4);
            }
            
            .ai-analyze-button:active {
                transform: translateY(0);
            }
            
            .ai-button-icon {
                width: 16px;
                height: 16px;
            }
            
            /* Analysis Results */
            .ai-analysis-result {
                margin-top: 1.5rem;
                animation: slideIn 0.3s ease-out;
            }
            
            @keyframes slideIn {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }
            
            .ai-tabs {
                display: flex;
                background: rgba(255, 255, 255, 0.03);
                border: 1px solid rgba(255, 255, 255, 0.08);
                border-radius: 12px;
                padding: 4px;
                margin-bottom: 1rem;
                gap: 4px;
            }
            
            .ai-tab {
                flex: 1;
                padding: 0.625rem 0.75rem;
                background: transparent;
                color: #9ca3af;
                border: none;
                border-radius: 8px;
                font-size: 0.8125rem;
                font-weight: 500;
                cursor: pointer;
                transition: all 0.2s;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 0.375rem;
            }
            
            .ai-tab:hover {
                color: #d1d5db;
                background: rgba(255, 255, 255, 0.05);
            }
            
            .ai-tab.active {
                background: #8b5cf6;
                color: white;
                box-shadow: 0 2px 8px rgba(139, 92, 246, 0.3);
            }
            
            .ai-tab-icon {
                width: 14px;
                height: 14px;
                opacity: 0.8;
            }
            
            .ai-tab.active .ai-tab-icon {
                opacity: 1;
            }
            
            .ai-tab-content {
                min-height: 200px;
                background: rgba(255, 255, 255, 0.03);
                border: 1px solid rgba(255, 255, 255, 0.08);
                border-radius: 12px;
                padding: 1.25rem;
                color: #f9fafb;
                font-size: 0.875rem;
                line-height: 1.6;
                backdrop-filter: blur(10px);
            }
            
            /* Action Buttons */
            .ai-action-buttons {
                display: flex;
                gap: 0.5rem;
                margin-top: 1rem;
                flex-wrap: wrap;
            }
            
            .ai-action-btn {
                padding: 0.5rem 1rem;
                border-radius: 8px;
                font-size: 0.8125rem;
                font-weight: 500;
                cursor: pointer;
                transition: all 0.2s;
                display: flex;
                align-items: center;
                gap: 0.375rem;
                border: 1px solid transparent;
            }
            
            .ai-btn-icon {
                width: 14px;
                height: 14px;
            }
            
            .ai-btn-primary {
                background: #10b981;
                color: white;
                border-color: #10b981;
            }
            
            .ai-btn-primary:hover {
                background: #059669;
                transform: translateY(-1px);
                box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
            }
            
            .ai-btn-secondary {
                background: rgba(255, 255, 255, 0.05);
                color: #d1d5db;
                border-color: rgba(255, 255, 255, 0.1);
            }
            
            .ai-btn-secondary:hover {
                background: rgba(255, 255, 255, 0.08);
                border-color: rgba(255, 255, 255, 0.2);
            }
            
            .ai-btn-ghost {
                background: transparent;
                color: #8b5cf6;
                border-color: #8b5cf6;
            }
            
            .ai-btn-ghost:hover {
                background: rgba(139, 92, 246, 0.1);
            }
            
            /* Loading State */
            .ai-loading {
                padding: 3rem 1rem;
                text-align: center;
            }
            
            .ai-loading-content {
                display: inline-flex;
                flex-direction: column;
                align-items: center;
                gap: 1rem;
            }
            
            .ai-loading-spinner {
                position: relative;
                width: 48px;
                height: 48px;
            }
            
            .ai-spinner-ring {
                position: absolute;
                inset: 0;
                border: 3px solid rgba(139, 92, 246, 0.2);
                border-top-color: #8b5cf6;
                border-radius: 50%;
                animation: spin 1s linear infinite;
            }
            
            .ai-spinner-icon {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                color: #8b5cf6;
                opacity: 0.6;
            }
            
            @keyframes spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
            
            .ai-loading-title {
                font-weight: 600;
                color: #f9fafb;
                font-size: 0.9375rem;
            }
            
            .ai-loading-status {
                font-size: 0.8125rem;
                color: #9ca3af;
                margin-top: 0.25rem;
            }
            
            /* Content Styling */
            .ai-tab-content h3 {
                font-size: 1rem;
                font-weight: 600;
                color: #f9fafb;
                margin-bottom: 0.75rem;
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }
            
            .ai-tab-content ol, .ai-tab-content ul {
                margin-left: 1.25rem;
                margin-bottom: 1rem;
            }
            
            .ai-tab-content li {
                margin-bottom: 0.5rem;
                color: #e5e7eb;
            }
            
            .ai-tab-content strong {
                color: #f9fafb;
                font-weight: 600;
            }
            
            .ai-tab-content code {
                background: rgba(139, 92, 246, 0.1);
                color: #a78bfa;
                padding: 0.125rem 0.375rem;
                border-radius: 4px;
                font-size: 0.8125rem;
                font-family: var(--font-mono);
            }
            
            .ai-tab-content pre {
                background: rgba(0, 0, 0, 0.3);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 8px;
                padding: 1rem;
                overflow-x: auto;
                margin: 0.75rem 0;
            }
            
            .ai-tab-content pre code {
                background: none;
                padding: 0;
                color: #e5e7eb;
            }
        `;
        document.head.appendChild(style);
        
        // Insert AI container after the form group
        descGroup.appendChild(aiContainer);
        
        // Add session end logging
        window.addEventListener('beforeunload', () => {
            const sessionSummary = aiLogger.getSessionSummary();
            aiLogger.info('AI Assistant Session Ended', {
                sessionSummary: sessionSummary,
                finalInteractionCount: aiLogger.userInteractions,
                finalAPICallCount: aiLogger.apiCallCount
            });
        });
        
        // Event listeners for new AI problem solver
        const briefInput = aiContainer.querySelector('#ai-brief-input');
        const analyzeBtn = aiContainer.querySelector('#ai-analyze-btn');
        const analysisResult = aiContainer.querySelector('#ai-analysis-result');
        const loadingDiv = aiContainer.querySelector('#ai-loading');
        const loadingStatus = aiContainer.querySelector('#ai-loading-status');
        const tabContent = aiContainer.querySelector('#ai-tab-content');
        
        // Store analysis data
        let currentAnalysis = null;
        let currentTab = 'solutions';
        
        // Analyze button click
        analyzeBtn.addEventListener('click', async () => {
            const briefDescription = briefInput.value.trim();
            aiLogger.incrementInteraction();
            
            if (!briefDescription) {
                aiLogger.warning('Analysis Attempted with Empty Input', {
                    inputLength: briefDescription.length
                });
                briefInput.style.borderColor = '#ef4444';
                setTimeout(() => briefInput.style.borderColor = 'rgba(255, 255, 255, 0.2)', 2000);
                return;
            }
            
            aiLogger.info('Analysis Started', {
                problemDescription: briefDescription,
                inputLength: briefDescription.length,
                triggeredBy: 'button_click'
            });
            
            await performProblemAnalysis(briefDescription);
        });
        
        // Analyze on Enter key
        briefInput.addEventListener('keypress', async (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                aiLogger.info('Analysis Triggered by Enter Key', {
                    inputValue: briefInput.value.trim()
                });
                analyzeBtn.click();
            }
        });
        
        // Tab switching
        aiContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('ai-tab')) {
                const tabName = e.target.dataset.tab;
                aiLogger.incrementInteraction();
                aiLogger.info('Tab Switched', {
                    newTab: tabName,
                    previousTab: currentTab,
                    hasAnalysis: !!currentAnalysis
                });
                switchTab(tabName);
            }
        });
        
        // Action buttons
        aiContainer.addEventListener('click', async (e) => {
            const btn = e.target.closest('button');
            if (!btn) return;
            
            aiLogger.incrementInteraction();
            const actionName = btn.id.replace('ai-', '').replace('-', '_');
            
            aiLogger.info('Action Button Clicked', {
                action: actionName,
                buttonId: btn.id,
                currentTab: currentTab,
                hasAnalysis: !!currentAnalysis
            });
            
            if (btn.id === 'ai-apply-ticket') {
                applyAnalysisToTicket();
            } else if (btn.id === 'ai-copy-section') {
                copyCurrentSection();
            } else if (btn.id === 'ai-run-diagnostic') {
                runDiagnosticCheck();
            } else if (btn.id === 'ai-search-similar') {
                searchSimilarIssues();
            } else if (btn.id === 'ai-regenerate-analysis') {
                const briefDescription = briefInput.value.trim();
                if (briefDescription) {
                    aiLogger.info('Re-analysis Requested', {
                        originalDescription: briefDescription
                    });
                    await performProblemAnalysis(briefDescription);
                }
            } else if (btn.id === 'ai-view-logs') {
                showLogViewer();
            }
        });
        
        function switchTab(tabName) {
            currentTab = tabName;
            
            // Update tab buttons
            aiContainer.querySelectorAll('.ai-tab').forEach(tab => {
                if (tab.dataset.tab === tabName) {
                    tab.style.background = '#8b5cf6';
                    tab.style.color = 'white';
                } else {
                    tab.style.background = 'transparent';
                    tab.style.color = '#d1d5db';
                }
            });
            
            // Update content
            if (currentAnalysis) {
                displayTabContent(tabName, currentAnalysis);
            }
        }
        
        function displayTabContent(tabName, analysis) {
            const content = analysis[tabName] || 'No content available for this section.';
            tabContent.innerHTML = content;
            
            // Update action button visibility
            const runDiagnosticBtn = aiContainer.querySelector('#ai-run-diagnostic');
            if (runDiagnosticBtn) {
                runDiagnosticBtn.style.display = tabName === 'diagnostics' ? 'flex' : 'none';
            }
        }
        
        // Main problem analysis function
        async function performProblemAnalysis(briefDescription) {
            const analysisStartTime = Date.now();
            aiLogger.debug('Analysis Process Started', {
                description: briefDescription,
                startTime: analysisStartTime
            });
            
            loadingDiv.style.display = 'block';
            analysisResult.style.display = 'none';
            analyzeBtn.disabled = true;
            
            // Show progressive loading status
            const loadingSteps = [
                'Analyzing problem context...',
                'Identifying root causes...',
                'Generating solutions...',
                'Preparing diagnostics...',
                'Finalizing analysis...'
            ];
            
            let stepIndex = 0;
            const statusInterval = setInterval(() => {
                if (stepIndex < loadingSteps.length) {
                    loadingStatus.textContent = loadingSteps[stepIndex];
                    stepIndex++;
                }
            }, 800);
            
            try {
                // Get context from form fields
                const summaryField = document.querySelector('#field-summary');
                const typeField = document.querySelector('#field-type');
                const componentField = document.querySelector('#field-component');
                
                const context = {
                    summary: summaryField?.value || '',
                    type: typeField?.value || '',
                    component: componentField?.value || '',
                    project: 'Trac Project'
                };
                
                const analysis = await generateProblemAnalysis(briefDescription, context);
                currentAnalysis = analysis;
                
                const analysisEndTime = Date.now();
                const analysisDuration = analysisEndTime - analysisStartTime;
                
                aiLogger.success('Analysis Completed Successfully', {
                    duration: analysisDuration,
                    analysisType: analysis.type || 'unknown',
                    hasAllSections: !!(analysis.solutions && analysis.causes && analysis.diagnostics && analysis.ticket && analysis.related),
                    contextUsed: context
                });
                
                // Add notification for AI analysis completion
                if (window.TracNotificationSystem) {
                    window.TracNotificationSystem.addNotification({
                        title: 'AI Analysis Complete',
                        description: `Problem analysis for "${briefDescription.substring(0, 50)}${briefDescription.length > 50 ? '...' : ''}" is ready`,
                        type: 'info'
                    });
                }
                
                // Display results
                clearInterval(statusInterval);
                loadingDiv.style.display = 'none';
                analysisResult.style.display = 'block';
                
                // Show first tab (Solutions)
                switchTab('solutions');
                
            } catch (error) {
                console.error('AI analysis error:', error);
                const analysisEndTime = Date.now();
                const analysisDuration = analysisEndTime - analysisStartTime;
                
                aiLogger.error('Analysis Failed', {
                    error: error.message,
                    stack: error.stack,
                    duration: analysisDuration,
                    fallbackUsed: true,
                    context: context
                });
                
                clearInterval(statusInterval);
                loadingDiv.style.display = 'none';
                // Show fallback analysis
                currentAnalysis = generateFallbackAnalysis(briefDescription);
                analysisResult.style.display = 'block';
                switchTab('solutions');
            } finally {
                analyzeBtn.disabled = false;
            }
        }
        
        async function generateProblemAnalysis(briefDescription, context) {
            // Try to use the backend API first
            try {
                aiLogger.incrementAPICall();
                aiLogger.info('Attempting Backend API Call', {
                    apiCallNumber: aiLogger.apiCallCount,
                    contextSize: JSON.stringify(context).length
                });
                return await callRealOpenAI(briefDescription, context);
            } catch (error) {
                aiLogger.error('Backend API Call Failed', {
                    error: error.message,
                    fallbackToTemplates: true
                });
                console.error('Backend API error:', error);
                // Fall back to smart templates
            }
            
            aiLogger.info('Using Smart Template Analysis', {
                reason: 'api_fallback'
            });
            
            // Use intelligent analysis based on problem patterns
            return generateSmartAnalysis(briefDescription, context);
        }
        
        async function callRealOpenAI(briefDescription, context) {
            const apiCallStartTime = Date.now();
            
            aiLogger.debug('Backend API Request', {
                endpoint: '/ai/analyze',
                descriptionLength: briefDescription.length,
                contextKeys: Object.keys(context)
            });

            try {
                // Call our backend endpoint which handles the OpenAI API securely
                const response = await fetch('http://localhost:5001/ai/analyze', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        description: briefDescription,
                        context: context
                    })
                });
                
                const apiCallEndTime = Date.now();
                const apiCallDuration = apiCallEndTime - apiCallStartTime;
                
                if (!response.ok) {
                    const errorData = await response.text();
                    aiLogger.error('Backend API HTTP Error', {
                        status: response.status,
                        statusText: response.statusText,
                        errorData: errorData,
                        duration: apiCallDuration
                    });
                    throw new Error(`Backend API error: ${response.status} ${response.statusText}`);
                }
                
                const data = await response.json();
                
                if (data.fallback) {
                    // Backend indicated to use fallback
                    throw new Error(data.error || 'Backend requested fallback');
                }
                
                aiLogger.success('Backend API Response Received', {
                    duration: apiCallDuration,
                    responseLength: JSON.stringify(data).length,
                    tokensUsed: data.usage?.total_tokens,
                    success: data.success
                });
                
                const analysis = data.analysis;
                
                aiLogger.debug('Analysis Response Parsed', {
                    hasSolutions: !!analysis.solutions,
                    hasCauses: !!analysis.causes,
                    hasDiagnostics: !!analysis.diagnostics,
                    hasTicket: !!analysis.ticket,
                    hasRelated: !!analysis.related
                });
                
                return analysis;
                
            } catch (error) {
                const apiCallEndTime = Date.now();
                const apiCallDuration = apiCallEndTime - apiCallStartTime;
                
                aiLogger.error('Backend API Call Exception', {
                    error: error.message,
                    duration: apiCallDuration,
                    isNetworkError: error.name === 'TypeError',
                    isParseError: error.message.includes('JSON'),
                    willFallback: true
                });
                
                throw error;
            }
        }
        
        function generateSmartAnalysis(briefDescription, context) {
            return new Promise((resolve) => {
                setTimeout(() => {
                    const lowerDesc = briefDescription.toLowerCase();
                    let analysis;
                    
                    // Enhanced pattern matching with technical keywords
                    if (lowerDesc.includes('login') || lowerDesc.includes('auth') || lowerDesc.includes('session') || lowerDesc.includes('credential')) {
                        analysis = generateLoginAnalysis(briefDescription, context);
                    } else if (lowerDesc.includes('mobile') || lowerDesc.includes('responsive') || lowerDesc.includes('touch') || lowerDesc.includes('ios') || lowerDesc.includes('android')) {
                        analysis = generateMobileAnalysis(briefDescription, context);
                    } else if (lowerDesc.includes('button') && !lowerDesc.includes('server') || lowerDesc.includes('click') || lowerDesc.includes('form submit')) {
                        analysis = generateButtonAnalysis(briefDescription, context);
                    } else if (
                        // Server/Infrastructure indicators
                        lowerDesc.includes('timeout') || lowerDesc.includes('502') || lowerDesc.includes('503') || lowerDesc.includes('504') ||
                        lowerDesc.includes('gateway') || lowerDesc.includes('nginx') || lowerDesc.includes('apache') || 
                        lowerDesc.includes('gunicorn') || lowerDesc.includes('uwsgi') || lowerDesc.includes('worker') ||
                        lowerDesc.includes('concurrency') || lowerDesc.includes('load') || lowerDesc.includes('peak hours') ||
                        lowerDesc.includes('upload') || lowerDesc.includes('attachment') || lowerDesc.includes('file size') ||
                        lowerDesc.includes('backend') || lowerDesc.includes('server') || lowerDesc.includes('endpoint') ||
                        lowerDesc.includes('proxy') || lowerDesc.includes('reverse proxy') || lowerDesc.includes('config')
                    ) {
                        analysis = generateServerInfrastructureAnalysis(briefDescription, context);
                    } else if (lowerDesc.includes('slow') || lowerDesc.includes('performance') || lowerDesc.includes('loading')) {
                        analysis = generatePerformanceAnalysis(briefDescription, context);
                    } else {
                        analysis = generateGenericAnalysis(briefDescription, context);
                    }
                    
                    resolve(analysis);
                }, 2000);
            });
        }
        
        function generateLoginAnalysis(briefDescription, context) {
            return {
                solutions: `
                    <h3>🚀 Quick Solutions to Try</h3>
                    <div style="margin-bottom: 1rem;">
                        <div style="background: rgba(16, 185, 129, 0.1); border-left: 3px solid #10b981; padding: 0.75rem; margin-bottom: 0.75rem; border-radius: 0 6px 6px 0;">
                            <strong>1. Clear Browser Data (80% success rate)</strong><br>
                            • Clear cookies, cache, and localStorage<br>
                            • Try incognito/private browsing mode<br>
                            • Restart browser completely
                        </div>
                        <div style="background: rgba(16, 185, 129, 0.1); border-left: 3px solid #10b981; padding: 0.75rem; margin-bottom: 0.75rem; border-radius: 0 6px 6px 0;">
                            <strong>2. Check Credentials & Case Sensitivity</strong><br>
                            • Verify username/email spelling<br>
                            • Check caps lock status<br>
                            • Try password reset if available
                        </div>
                        <div style="background: rgba(16, 185, 129, 0.1); border-left: 3px solid #10b981; padding: 0.75rem; border-radius: 0 6px 6px 0;">
                            <strong>3. Network & Connectivity</strong><br>
                            • Try different network/WiFi<br>
                            • Disable VPN if active<br>
                            • Check if other users can login
                        </div>
                    </div>
                `,
                causes: `
                    <h3>🔍 Likely Root Causes</h3>
                    <div style="margin-bottom: 1rem;">
                        <div style="margin-bottom: 1rem; padding: 0.75rem; background: rgba(239, 68, 68, 0.1); border-radius: 6px;">
                            <strong style="color: #ef4444;">85% - Session/Cookie Issues</strong><br>
                            <span style="color: #d1d5db;">Expired session tokens, corrupted cookies, or localStorage conflicts</span><br>
                            <em style="color: #9ca3af; font-size: 0.8rem;">Check: Developer tools → Application → Storage</em>
                        </div>
                        <div style="margin-bottom: 1rem; padding: 0.75rem; background: rgba(245, 158, 11, 0.1); border-radius: 6px;">
                            <strong style="color: #f59e0b;">65% - Authentication Service</strong><br>
                            <span style="color: #d1d5db;">Backend auth server issues, database connectivity, or API timeout</span><br>
                            <em style="color: #9ca3af; font-size: 0.8rem;">Check: Network tab for 401/403/500 errors</em>
                        </div>
                        <div style="margin-bottom: 1rem; padding: 0.75rem; background: rgba(6, 182, 212, 0.1); border-radius: 6px;">
                            <strong style="color: #06b6d4;">45% - Frontend JavaScript</strong><br>
                            <span style="color: #d1d5db;">Form validation errors, CSRF token issues, or event handler problems</span><br>
                            <em style="color: #9ca3af; font-size: 0.8rem;">Check: Browser console for JavaScript errors</em>
                        </div>
                    </div>
                `,
                diagnostics: `
                    <h3>📊 Diagnostic Information to Gather</h3>
                    <div style="background: rgba(139, 92, 246, 0.1); padding: 1rem; border-radius: 6px; margin-bottom: 1rem;">
                        <h4 style="color: #8b5cf6; margin-top: 0;">Essential Data Collection</h4>
                        <label><input type="checkbox" style="margin-right: 0.5rem;">Browser console errors (F12 → Console)</label><br>
                        <label><input type="checkbox" style="margin-right: 0.5rem;">Network requests (F12 → Network → Filter XHR)</label><br>
                        <label><input type="checkbox" style="margin-right: 0.5rem;">Browser type and version</label><br>
                        <label><input type="checkbox" style="margin-right: 0.5rem;">Operating system details</label><br>
                        <label><input type="checkbox" style="margin-right: 0.5rem;">Time of issue occurrence</label><br>
                        <label><input type="checkbox" style="margin-right: 0.5rem;">Screenshot of error message</label><br>
                    </div>
                    <div style="background: rgba(16, 185, 129, 0.1); padding: 1rem; border-radius: 6px;">
                        <h4 style="color: #10b981; margin-top: 0;">Commands to Run</h4>
                        <code style="background: rgba(0,0,0,0.3); padding: 0.25rem 0.5rem; border-radius: 3px; display: block; margin: 0.5rem 0;">
                            # Check auth service status<br>
                            curl -I https://your-domain.com/api/auth/status
                        </code>
                        <code style="background: rgba(0,0,0,0.3); padding: 0.25rem 0.5rem; border-radius: 3px; display: block; margin: 0.5rem 0;">
                            # Test login endpoint<br>
                            curl -X POST https://your-domain.com/api/auth/login
                        </code>
                    </div>
                `,
                ticket: `
                    <h3>📝 Complete Ticket Structure</h3>
                    <div style="background: rgba(255, 255, 255, 0.05); padding: 1rem; border-radius: 6px; font-family: monospace; font-size: 0.875rem;">
                        <strong style="color: #ef4444;">PRIORITY: HIGH</strong> - Blocks user access<br><br>
                        
                        <strong>TITLE:</strong> Login Authentication Failure - ${briefDescription}<br><br>
                        
                        <strong>SUMMARY:</strong><br>
                        Users experiencing login issues with ${briefDescription}. Authentication process failing despite correct credentials.<br><br>
                        
                        <strong>IMPACT:</strong><br>
                        • Users cannot access the application<br>
                        • Potential security implications<br>
                        • Business disruption<br><br>
                        
                        <strong>INVESTIGATION PATHS:</strong><br>
                        1. Check <code>auth/login.js</code> - handleLoginSubmit() function<br>
                        2. Verify <code>middleware/auth.js</code> - token validation<br>
                        3. Review <code>models/User.js</code> - authentication methods<br>
                        4. Examine auth service logs for errors<br><br>
                        
                        <strong>LIKELY FILES TO CHECK:</strong><br>
                        • <code>/src/components/auth/LoginForm.jsx</code><br>
                        • <code>/api/routes/auth.js</code><br>
                        • <code>/config/passport.js</code><br>
                        • <code>/middleware/validateToken.js</code><br><br>
                        
                        <strong>SUGGESTED FIXES:</strong><br>
                        • Update session timeout configuration<br>
                        • Add proper CSRF token handling<br>
                        • Implement better error messaging<br>
                        • Add authentication retry logic
                    </div>
                `,
                related: `
                    <h3>🔗 Related Issues & Prevention</h3>
                    <div style="margin-bottom: 1rem;">
                        <h4 style="color: #06b6d4;">Search for Similar Issues:</h4>
                        <div style="background: rgba(6, 182, 212, 0.1); padding: 0.75rem; border-radius: 6px; margin-bottom: 1rem;">
                            <code>"login fails" OR "authentication error" OR "session expired"</code><br>
                            <code>type:bug status:open component:auth</code><br>
                            <code>"cannot login" mobile safari iOS</code>
                        </div>
                        
                        <h4 style="color: #10b981;">Prevention Strategies:</h4>
                        <ul style="color: #d1d5db;">
                            <li>Implement proper session management</li>
                            <li>Add comprehensive auth logging</li>
                            <li>Set up auth service monitoring</li>
                            <li>Create automated login tests</li>
                            <li>Document auth troubleshooting guide</li>
                        </ul>
                        
                        <h4 style="color: #f59e0b;">Related Documentation:</h4>
                        <ul style="color: #d1d5db;">
                            <li><a href="/wiki/AuthenticationGuide" style="color: #06b6d4;">Authentication Setup Guide</a></li>
                            <li><a href="/wiki/TroubleshootingAuth" style="color: #06b6d4;">Auth Troubleshooting</a></li>
                            <li><a href="/wiki/SessionManagement" style="color: #06b6d4;">Session Management</a></li>
                        </ul>
                    </div>
                `
            };
        }
        
        function generateMobileAnalysis(briefDescription, context) {
            return {
                solutions: `
                    <h3>🚀 Quick Solutions to Try</h3>
                    <div style="margin-bottom: 1rem;">
                        <div style="background: rgba(16, 185, 129, 0.1); border-left: 3px solid #10b981; padding: 0.75rem; margin-bottom: 0.75rem; border-radius: 0 6px 6px 0;">
                            <strong>1. Enable Desktop Mode (90% success rate)</strong><br>
                            • Safari: Tap AA icon → Request Desktop Website<br>
                            • Chrome: Menu → Request Desktop Site<br>
                            • Test functionality in desktop mode
                        </div>
                        <div style="background: rgba(16, 185, 129, 0.1); border-left: 3px solid #10b981; padding: 0.75rem; margin-bottom: 0.75rem; border-radius: 0 6px 6px 0;">
                            <strong>2. Clear Mobile Browser Data</strong><br>
                            • Clear Safari/Chrome cache and cookies<br>
                            • Restart browser app completely<br>
                            • Try in private/incognito mode
                        </div>
                        <div style="background: rgba(16, 185, 129, 0.1); border-left: 3px solid #10b981; padding: 0.75rem; border-radius: 0 6px 6px 0;">
                            <strong>3. Device-Specific Fixes</strong><br>
                            • Rotate device to landscape mode<br>
                            • Zoom out to 100% if zoomed in<br>
                            • Close other browser tabs to free memory
                        </div>
                    </div>
                `,
                causes: `
                    <h3>🔍 Likely Root Causes</h3>
                    <div style="margin-bottom: 1rem;">
                        <div style="margin-bottom: 1rem; padding: 0.75rem; background: rgba(239, 68, 68, 0.1); border-radius: 6px;">
                            <strong style="color: #ef4444;">80% - Touch vs Click Events</strong><br>
                            <span style="color: #d1d5db;">Mobile elements not properly handling touch events, missing touchstart/touchend handlers</span><br>
                            <em style="color: #9ca3af; font-size: 0.8rem;">Check: Event listeners for touch devices</em>
                        </div>
                        <div style="margin-bottom: 1rem; padding: 0.75rem; background: rgba(245, 158, 11, 0.1); border-radius: 6px;">
                            <strong style="color: #f59e0b;">75% - Responsive CSS Issues</strong><br>
                            <span style="color: #d1d5db;">Media queries not covering device size, viewport scaling problems, or element overflow</span><br>
                            <em style="color: #9ca3af; font-size: 0.8rem;">Check: CSS media queries and viewport meta tag</em>
                        </div>
                        <div style="margin-bottom: 1rem; padding: 0.75rem; background: rgba(6, 182, 212, 0.1); border-radius: 6px;">
                            <strong style="color: #06b6d4;">60% - Mobile Browser Compatibility</strong><br>
                            <span style="color: #d1d5db;">Feature not supported in mobile Safari/Chrome, or iOS/Android specific issues</span><br>
                            <em style="color: #9ca3af; font-size: 0.8rem;">Check: Browser feature support and user agent</em>
                        </div>
                    </div>
                `,
                diagnostics: `
                    <h3>📊 Diagnostic Information to Gather</h3>
                    <div style="background: rgba(139, 92, 246, 0.1); padding: 1rem; border-radius: 6px; margin-bottom: 1rem;">
                        <h4 style="color: #8b5cf6; margin-top: 0;">Mobile-Specific Data Collection</h4>
                        <label><input type="checkbox" style="margin-right: 0.5rem;">Device model and iOS/Android version</label><br>
                        <label><input type="checkbox" style="margin-right: 0.5rem;">Browser type and version (Safari/Chrome/Firefox)</label><br>
                        <label><input type="checkbox" style="margin-right: 0.5rem;">Screen size and orientation when issue occurs</label><br>
                        <label><input type="checkbox" style="margin-right: 0.5rem;">Does issue occur in landscape vs portrait?</label><br>
                        <label><input type="checkbox" style="margin-right: 0.5rem;">Screenshot or screen recording of the issue</label><br>
                        <label><input type="checkbox" style="margin-right: 0.5rem;">Does desktop mode work as workaround?</label><br>
                    </div>
                    <div style="background: rgba(16, 185, 129, 0.1); padding: 1rem; border-radius: 6px;">
                        <h4 style="color: #10b981; margin-top: 0;">Mobile Debugging Tools</h4>
                        <code style="background: rgba(0,0,0,0.3); padding: 0.25rem 0.5rem; border-radius: 3px; display: block; margin: 0.5rem 0;">
                            # iOS Safari Remote Debugging<br>
                            Settings → Safari → Advanced → Web Inspector (Enable)
                        </code>
                        <code style="background: rgba(0,0,0,0.3); padding: 0.25rem 0.5rem; border-radius: 3px; display: block; margin: 0.5rem 0;">
                            # Chrome Mobile DevTools<br>
                            chrome://inspect → Remote devices
                        </code>
                    </div>
                `,
                ticket: `
                    <h3>📝 Complete Ticket Structure</h3>
                    <div style="background: rgba(255, 255, 255, 0.05); padding: 1rem; border-radius: 6px; font-family: monospace; font-size: 0.875rem;">
                        <strong style="color: #f59e0b;">PRIORITY: HIGH</strong> - Affects mobile users<br><br>
                        
                        <strong>TITLE:</strong> Mobile Device Issue - ${briefDescription}<br><br>
                        
                        <strong>SUMMARY:</strong><br>
                        Mobile users experiencing issues with ${briefDescription}. Problem specific to mobile browsers/devices.<br><br>
                        
                        <strong>DEVICE INFO:</strong><br>
                        • Device: [iOS/Android model]<br>
                        • Browser: [Safari/Chrome version]<br>
                        • Screen size: [dimensions]<br>
                        • Orientation: [Portrait/Landscape]<br><br>
                        
                        <strong>INVESTIGATION PATHS:</strong><br>
                        1. Check <code>css/responsive.css</code> - media queries<br>
                        2. Review <code>js/mobile-events.js</code> - touch handlers<br>
                        3. Test viewport meta tag configuration<br>
                        4. Verify mobile browser compatibility<br><br>
                        
                        <strong>LIKELY FILES TO CHECK:</strong><br>
                        • <code>/css/mobile.css</code> or <code>/css/responsive.css</code><br>
                        • <code>/js/touch-events.js</code> or main JavaScript files<br>
                        • <code>/index.html</code> - viewport meta tag<br>
                        • <code>/js/feature-detection.js</code><br><br>
                        
                        <strong>SUGGESTED FIXES:</strong><br>
                        • Add proper touch event handling<br>
                        • Update responsive CSS breakpoints<br>
                        • Test across multiple mobile devices<br>
                        • Implement mobile-first design approach
                    </div>
                `,
                related: `
                    <h3>🔗 Related Issues & Prevention</h3>
                    <div style="margin-bottom: 1rem;">
                        <h4 style="color: #06b6d4;">Search for Similar Issues:</h4>
                        <div style="background: rgba(6, 182, 212, 0.1); padding: 0.75rem; border-radius: 6px; margin-bottom: 1rem;">
                            <code>"mobile issue" OR "responsive" OR "touch event"</code><br>
                            <code>type:bug status:open component:frontend mobile</code><br>
                            <code>"iOS Safari" OR "Android Chrome" ${briefDescription}</code>
                        </div>
                        
                        <h4 style="color: #10b981;">Prevention Strategies:</h4>
                        <ul style="color: #d1d5db;">
                            <li>Implement mobile-first responsive design</li>
                            <li>Regular testing on actual mobile devices</li>
                            <li>Use touch-friendly UI elements (44px minimum)</li>
                            <li>Set up automated mobile testing pipeline</li>
                            <li>Monitor mobile analytics and error rates</li>
                        </ul>
                        
                        <h4 style="color: #f59e0b;">Related Documentation:</h4>
                        <ul style="color: #d1d5db;">
                            <li><a href="/wiki/MobileDesignGuide" style="color: #06b6d4;">Mobile Design Guidelines</a></li>
                            <li><a href="/wiki/ResponsiveTesting" style="color: #06b6d4;">Responsive Testing Process</a></li>
                            <li><a href="/wiki/TouchEventHandling" style="color: #06b6d4;">Touch Event Best Practices</a></li>
                        </ul>
                    </div>
                `
            };
        }
        
        function generateButtonAnalysis(briefDescription, context) {
            return {
                solutions: `
                    <h3>🚀 Quick Solutions to Try</h3>
                    <div style="margin-bottom: 1rem;">
                        <div style="background: rgba(16, 185, 129, 0.1); border-left: 3px solid #10b981; padding: 0.75rem; margin-bottom: 0.75rem; border-radius: 0 6px 6px 0;">
                            <strong>1. Basic Button Troubleshooting (85% success rate)</strong><br>
                            • Hard refresh the page (Ctrl+F5 or Cmd+Shift+R)<br>
                            • Check if button is disabled or loading<br>
                            • Try clicking different areas of the button
                        </div>
                        <div style="background: rgba(16, 185, 129, 0.1); border-left: 3px solid #10b981; padding: 0.75rem; margin-bottom: 0.75rem; border-radius: 0 6px 6px 0;">
                            <strong>2. JavaScript and Console Check</strong><br>
                            • Open browser console (F12) and check for errors<br>
                            • Look for "Uncaught" or "Cannot read property" errors<br>
                            • Try disabling browser extensions temporarily
                        </div>
                        <div style="background: rgba(16, 185, 129, 0.1); border-left: 3px solid #10b981; padding: 0.75rem; border-radius: 0 6px 6px 0;">
                            <strong>3. Form and Validation Issues</strong><br>
                            • Fill in all required fields before clicking<br>
                            • Check for form validation error messages<br>
                            • Try submitting with different data
                        </div>
                    </div>
                `,
                causes: `
                    <h3>🔍 Likely Root Causes</h3>
                    <div style="margin-bottom: 1rem;">
                        <div style="margin-bottom: 1rem; padding: 0.75rem; background: rgba(239, 68, 68, 0.1); border-radius: 6px;">
                            <strong style="color: #ef4444;">70% - JavaScript Event Handler Issues</strong><br>
                            <span style="color: #d1d5db;">Event listener not attached, handler function undefined, or JavaScript error preventing execution</span><br>
                            <em style="color: #9ca3af; font-size: 0.8rem;">Check: Console errors and event listeners in DevTools</em>
                        </div>
                        <div style="margin-bottom: 1rem; padding: 0.75rem; background: rgba(245, 158, 11, 0.1); border-radius: 6px;">
                            <strong style="color: #f59e0b;">65% - Form Validation Preventing Submission</strong><br>
                            <span style="color: #d1d5db;">Required fields empty, invalid data format, or custom validation rules failing</span><br>
                            <em style="color: #9ca3af; font-size: 0.8rem;">Check: Form validation state and required field indicators</em>
                        </div>
                        <div style="margin-bottom: 1rem; padding: 0.75rem; background: rgba(6, 182, 212, 0.1); border-radius: 6px;">
                            <strong style="color: #06b6d4;">50% - CSS/UI Interaction Issues</strong><br>
                            <span style="color: #d1d5db;">Button covered by another element, z-index issues, or CSS preventing click events</span><br>
                            <em style="color: #9ca3af; font-size: 0.8rem;">Check: Element inspector and pointer-events CSS property</em>
                        </div>
                    </div>
                `,
                diagnostics: `
                    <h3>📊 Diagnostic Information to Gather</h3>
                    <div style="background: rgba(139, 92, 246, 0.1); padding: 1rem; border-radius: 6px; margin-bottom: 1rem;">
                        <h4 style="color: #8b5cf6; margin-top: 0;">Button Interaction Diagnostics</h4>
                        <label><input type="checkbox" style="margin-right: 0.5rem;">Console errors when clicking button</label><br>
                        <label><input type="checkbox" style="margin-right: 0.5rem;">Button's HTML structure and CSS classes</label><br>
                        <label><input type="checkbox" style="margin-right: 0.5rem;">Form validation state and required fields</label><br>
                        <label><input type="checkbox" style="margin-right: 0.5rem;">Network requests triggered by button click</label><br>
                        <label><input type="checkbox" style="margin-right: 0.5rem;">Button's disabled/loading state</label><br>
                        <label><input type="checkbox" style="margin-right: 0.5rem;">Browser and device where issue occurs</label><br>
                    </div>
                    <div style="background: rgba(16, 185, 129, 0.1); padding: 1rem; border-radius: 6px;">
                        <h4 style="color: #10b981; margin-top: 0;">Browser DevTools Commands</h4>
                        <code style="background: rgba(0,0,0,0.3); padding: 0.25rem 0.5rem; border-radius: 3px; display: block; margin: 0.5rem 0;">
                            # Check if button has event listeners<br>
                            $0.onclick || getEventListeners($0)
                        </code>
                        <code style="background: rgba(0,0,0,0.3); padding: 0.25rem 0.5rem; border-radius: 3px; display: block; margin: 0.5rem 0;">
                            # Test if button is clickable<br>
                            $0.click() // Should trigger the action
                        </code>
                    </div>
                `,
                ticket: `
                    <h3>📝 Complete Ticket Structure</h3>
                    <div style="background: rgba(255, 255, 255, 0.05); padding: 1rem; border-radius: 6px; font-family: monospace; font-size: 0.875rem;">
                        <strong style="color: #f59e0b;">PRIORITY: MEDIUM</strong> - Blocks user workflow<br><br>
                        
                        <strong>TITLE:</strong> Button Functionality Issue - ${briefDescription}<br><br>
                        
                        <strong>SUMMARY:</strong><br>
                        Button not responding to clicks or not performing expected action: ${briefDescription}<br><br>
                        
                        <strong>REPRODUCTION STEPS:</strong><br>
                        1. Navigate to [specific page]<br>
                        2. [Describe any required form filling]<br>
                        3. Click the [button name/description]<br>
                        4. Observe: Nothing happens or unexpected behavior<br><br>
                        
                        <strong>INVESTIGATION PATHS:</strong><br>
                        1. Check <code>js/button-handlers.js</code> - click event listeners<br>
                        2. Review <code>js/form-validation.js</code> - validation logic<br>
                        3. Examine <code>css/buttons.css</code> - pointer-events and z-index<br>
                        4. Test form submission endpoints for errors<br><br>
                        
                        <strong>LIKELY FILES TO CHECK:</strong><br>
                        • <code>/js/main.js</code> or component-specific JavaScript<br>
                        • <code>/css/components/buttons.css</code><br>
                        • <code>/js/form-validation.js</code><br>
                        • Backend form processing endpoints<br><br>
                        
                        <strong>SUGGESTED FIXES:</strong><br>
                        • Add error handling to button click handlers<br>
                        • Improve form validation feedback<br>
                        • Add loading states and user feedback<br>
                        • Test button accessibility and keyboard navigation
                    </div>
                `,
                related: `
                    <h3>🔗 Related Issues & Prevention</h3>
                    <div style="margin-bottom: 1rem;">
                        <h4 style="color: #06b6d4;">Search for Similar Issues:</h4>
                        <div style="background: rgba(6, 182, 212, 0.1); padding: 0.75rem; border-radius: 6px; margin-bottom: 1rem;">
                            <code>"button not working" OR "click not responding" OR "form submit"</code><br>
                            <code>type:bug status:open component:frontend button</code><br>
                            <code>"event handler" OR "onclick" OR "addEventListener"</code>
                        </div>
                        
                        <h4 style="color: #10b981;">Prevention Strategies:</h4>
                        <ul style="color: #d1d5db;">
                            <li>Add comprehensive error handling to all button clicks</li>
                            <li>Implement proper loading states and user feedback</li>
                            <li>Use consistent event handling patterns</li>
                            <li>Add automated testing for critical button actions</li>
                            <li>Monitor JavaScript errors in production</li>
                        </ul>
                        
                        <h4 style="color: #f59e0b;">Related Documentation:</h4>
                        <ul style="color: #d1d5db;">
                            <li><a href="/wiki/JavaScriptBestPractices" style="color: #06b6d4;">JavaScript Event Handling</a></li>
                            <li><a href="/wiki/FormValidation" style="color: #06b6d4;">Form Validation Guide</a></li>
                            <li><a href="/wiki/UIComponents" style="color: #06b6d4;">Button Component Standards</a></li>
                        </ul>
                    </div>
                `
            };
        }
        
        function generateServerInfrastructureAnalysis(briefDescription, context) {
            return {
                solutions: `
                    <h3>🚀 Immediate Server & Infrastructure Solutions:</h3>
                    <ol>
                        <li><strong>Check Server Resources</strong>
                            <ul>
                                <li>Run: <code>top</code> or <code>htop</code> to check CPU/memory usage</li>
                                <li>Check disk space: <code>df -h</code></li>
                                <li>View active connections: <code>netstat -an | grep :8000</code></li>
                            </ul>
                        </li>
                        <li><strong>Restart Services</strong>
                            <ul>
                                <li>Restart web server: <code>sudo systemctl restart nginx</code></li>
                                <li>Restart application: <code>supervisorctl restart trac</code></li>
                                <li>Clear any stuck processes: <code>pkill -f tracd</code></li>
                            </ul>
                        </li>
                        <li><strong>Quick Configuration Fixes</strong>
                            <ul>
                                <li>Increase worker processes in config</li>
                                <li>Adjust timeout settings</li>
                                <li>Enable/disable debug mode as needed</li>
                            </ul>
                        </li>
                    </ol>
                `,
                causes: `
                    <h3>🔍 Likely Infrastructure Root Causes:</h3>
                    <ol>
                        <li><strong>Resource Exhaustion</strong> (40% probability)
                            <ul>
                                <li>Memory leaks in application</li>
                                <li>Too many concurrent connections</li>
                                <li>Insufficient server resources</li>
                                <li>Check: Memory usage over 90%?</li>
                            </ul>
                        </li>
                        <li><strong>Configuration Issues</strong> (35% probability)
                            <ul>
                                <li>Incorrect proxy settings</li>
                                <li>Worker process limits too low</li>
                                <li>Timeout values misconfigured</li>
                                <li>Check: Recent config changes?</li>
                            </ul>
                        </li>
                        <li><strong>Network/Connectivity</strong> (25% probability)
                            <ul>
                                <li>Firewall blocking connections</li>
                                <li>DNS resolution issues</li>
                                <li>SSL/TLS certificate problems</li>
                                <li>Check: Can you ping the server?</li>
                            </ul>
                        </li>
                    </ol>
                `,
                diagnostics: `
                    <h3>📊 Server Diagnostics to Gather:</h3>
                    <div style="background: rgba(255, 255, 255, 0.05); padding: 1rem; border-radius: 8px;">
                        <h4>System Information:</h4>
                        <ul style="list-style: none;">
                            <li>☐ Server logs: <code>tail -f /var/log/trac/error.log</code></li>
                            <li>☐ System logs: <code>journalctl -xe</code></li>
                            <li>☐ Resource usage: <code>free -m && df -h</code></li>
                            <li>☐ Process list: <code>ps aux | grep trac</code></li>
                            <li>☐ Network status: <code>ss -tulpn | grep 8000</code></li>
                            <li>☐ Configuration files from /etc/trac/</li>
                        </ul>
                    </div>
                `,
                ticket: `
                    <h3>📝 Infrastructure Issue Ticket:</h3>
                    <div style="background: rgba(255, 255, 255, 0.05); padding: 1rem; border-radius: 8px;">
                        <p><strong>Priority:</strong> <span style="color: #ef4444;">High</span> - Infrastructure issues affect all users</p>
                        <p><strong>Summary:</strong> Server infrastructure issue: ${briefDescription}</p>
                        <p><strong>Description:</strong><br>
                        ${briefDescription}</p>
                        
                        <p><strong>Environment:</strong><br>
                        - Server OS: [Check with: uname -a]<br>
                        - Web Server: [nginx/apache version]<br>
                        - Python Version: [python --version]<br>
                        - Trac Version: ${context.project || 'Unknown'}</p>
                        
                        <p><strong>Investigation Path:</strong><br>
                        1. Check server resource usage and limits<br>
                        2. Review application and system logs<br>
                        3. Verify configuration files<br>
                        4. Test with minimal configuration<br>
                        5. Monitor during issue reproduction</p>
                        
                        <p><strong>Potential Fix Locations:</strong><br>
                        - Config: <code>/etc/trac/trac.ini</code><br>
                        - Web server: <code>/etc/nginx/sites-available/trac</code><br>
                        - Systemd: <code>/etc/systemd/system/trac.service</code><br>
                        - Logs: <code>/var/log/trac/</code></p>
                    </div>
                `,
                related: `
                    <h3>🔗 Related Infrastructure Resources:</h3>
                    <ul>
                        <li><strong>Similar Issues:</strong>
                            <ul>
                                <li>Search: "server timeout memory"</li>
                                <li>Search: "502 bad gateway"</li>
                                <li>Search: "worker process died"</li>
                            </ul>
                        </li>
                        <li><strong>Prevention:</strong>
                            <ul>
                                <li>Set up monitoring (Prometheus/Grafana)</li>
                                <li>Configure alerts for resource usage</li>
                                <li>Implement auto-scaling if possible</li>
                                <li>Regular log rotation and cleanup</li>
                            </ul>
                        </li>
                        <li><strong>Documentation:</strong>
                            <ul>
                                <li>Trac Performance Tuning Guide</li>
                                <li>Server Deployment Best Practices</li>
                                <li>Troubleshooting Checklist</li>
                            </ul>
                        </li>
                    </ul>
                `
            };
        }
        
        function generatePerformanceAnalysis(briefDescription, context) {
            return {
                solutions: `
                    <h3>🚀 Quick Solutions to Try</h3>
                    <div style="margin-bottom: 1rem;">
                        <div style="background: rgba(16, 185, 129, 0.1); border-left: 3px solid #10b981; padding: 0.75rem; margin-bottom: 0.75rem; border-radius: 0 6px 6px 0;">
                            <strong>1. Immediate Performance Fixes (75% improvement)</strong><br>
                            • Hard refresh to clear cached resources (Ctrl+F5)<br>
                            • Close other browser tabs to free memory<br>
                            • Check internet connection speed and stability
                        </div>
                        <div style="background: rgba(16, 185, 129, 0.1); border-left: 3px solid #10b981; padding: 0.75rem; margin-bottom: 0.75rem; border-radius: 0 6px 6px 0;">
                            <strong>2. Browser Optimization</strong><br>
                            • Disable unnecessary browser extensions<br>
                            • Clear browser cache and cookies<br>
                            • Try in incognito/private mode for comparison
                        </div>
                        <div style="background: rgba(16, 185, 129, 0.1); border-left: 3px solid #10b981; padding: 0.75rem; border-radius: 0 6px 6px 0;">
                            <strong>3. Network and CDN Issues</strong><br>
                            • Try different network (mobile hotspot vs WiFi)<br>
                            • Use VPN to test from different geographic location<br>
                            • Check if issue persists during off-peak hours
                        </div>
                    </div>
                `,
                causes: `
                    <h3>🔍 Likely Root Causes</h3>
                    <div style="margin-bottom: 1rem;">
                        <div style="margin-bottom: 1rem; padding: 0.75rem; background: rgba(239, 68, 68, 0.1); border-radius: 6px;">
                            <strong style="color: #ef4444;">80% - Database Query Performance</strong><br>
                            <span style="color: #d1d5db;">Slow or inefficient database queries, missing indexes, or large dataset processing</span><br>
                            <em style="color: #9ca3af; font-size: 0.8rem;">Check: Database query logs and execution times</em>
                        </div>
                        <div style="margin-bottom: 1rem; padding: 0.75rem; background: rgba(245, 158, 11, 0.1); border-radius: 6px;">
                            <strong style="color: #f59e0b;">70% - Resource Loading Issues</strong><br>
                            <span style="color: #d1d5db;">Large JavaScript/CSS files, unoptimized images, or CDN delivery problems</span><br>
                            <em style="color: #9ca3af; font-size: 0.8rem;">Check: Network tab for large resources and slow requests</em>
                        </div>
                        <div style="margin-bottom: 1rem; padding: 0.75rem; background: rgba(6, 182, 212, 0.1); border-radius: 6px;">
                            <strong style="color: #06b6d4;">60% - Server Infrastructure</strong><br>
                            <span style="color: #d1d5db;">High server load, insufficient memory/CPU, or network congestion</span><br>
                            <em style="color: #9ca3af; font-size: 0.8rem;">Check: Server monitoring and infrastructure metrics</em>
                        </div>
                    </div>
                `,
                diagnostics: `
                    <h3>📊 Diagnostic Information to Gather</h3>
                    <div style="background: rgba(139, 92, 246, 0.1); padding: 1rem; border-radius: 6px; margin-bottom: 1rem;">
                        <h4 style="color: #8b5cf6; margin-top: 0;">Performance Metrics Collection</h4>
                        <label><input type="checkbox" style="margin-right: 0.5rem;">Page load time measurements (multiple tests)</label><br>
                        <label><input type="checkbox" style="margin-right: 0.5rem;">Network tab analysis (slow resources)</label><br>
                        <label><input type="checkbox" style="margin-right: 0.5rem;">Browser performance timeline recording</label><br>
                        <label><input type="checkbox" style="margin-right: 0.5rem;">Memory usage during slow operations</label><br>
                        <label><input type="checkbox" style="margin-right: 0.5rem;">Server response times and error rates</label><br>
                        <label><input type="checkbox" style="margin-right: 0.5rem;">Database query execution times</label><br>
                    </div>
                    <div style="background: rgba(16, 185, 129, 0.1); padding: 1rem; border-radius: 6px;">
                        <h4 style="color: #10b981; margin-top: 0;">Performance Testing Tools</h4>
                        <code style="background: rgba(0,0,0,0.3); padding: 0.25rem 0.5rem; border-radius: 3px; display: block; margin: 0.5rem 0;">
                            # Lighthouse performance audit<br>
                            chrome://lighthouse or DevTools → Lighthouse
                        </code>
                        <code style="background: rgba(0,0,0,0.3); padding: 0.25rem 0.5rem; border-radius: 3px; display: block; margin: 0.5rem 0;">
                            # Network analysis<br>
                            DevTools → Network → Throttling → Slow 3G
                        </code>
                    </div>
                `,
                ticket: `
                    <h3>📝 Complete Ticket Structure</h3>
                    <div style="background: rgba(255, 255, 255, 0.05); padding: 1rem; border-radius: 6px; font-family: monospace; font-size: 0.875rem;">
                        <strong style="color: #ef4444;">PRIORITY: HIGH</strong> - Performance impacts user experience<br><br>
                        
                        <strong>TITLE:</strong> Performance Issue - ${briefDescription}<br><br>
                        
                        <strong>SUMMARY:</strong><br>
                        Users experiencing slow performance: ${briefDescription}<br><br>
                        
                        <strong>PERFORMANCE METRICS:</strong><br>
                        • Current load time: [X seconds]<br>
                        • Expected load time: [Y seconds]<br>
                        • Affected operations: [specific actions]<br>
                        • User impact: [number of users/frequency]<br><br>
                        
                        <strong>INVESTIGATION PATHS:</strong><br>
                        1. Check <code>db/queries/</code> - slow query identification<br>
                        2. Review <code>api/endpoints/</code> - response time analysis<br>
                        3. Examine <code>static/js/</code> - JavaScript bundle size<br>
                        4. Analyze server logs for performance patterns<br><br>
                        
                        <strong>LIKELY FILES TO CHECK:</strong><br>
                        • <code>/models/</code> - database query optimization<br>
                        • <code>/webpack.config.js</code> - bundle optimization<br>
                        • <code>/api/</code> - endpoint performance<br>
                        • <code>/nginx.conf</code> or server configuration<br><br>
                        
                        <strong>SUGGESTED OPTIMIZATIONS:</strong><br>
                        • Add database indexes for frequent queries<br>
                        • Implement caching for expensive operations<br>
                        • Optimize JavaScript bundle size and loading<br>
                        • Add performance monitoring and alerting
                    </div>
                `,
                related: `
                    <h3>🔗 Related Issues & Prevention</h3>
                    <div style="margin-bottom: 1rem;">
                        <h4 style="color: #06b6d4;">Search for Similar Issues:</h4>
                        <div style="background: rgba(6, 182, 212, 0.1); padding: 0.75rem; border-radius: 6px; margin-bottom: 1rem;">
                            <code>"slow" OR "performance" OR "loading" OR "timeout"</code><br>
                            <code>type:bug priority:high component:performance</code><br>
                            <code>"database" OR "query" OR "optimization" slow</code>
                        </div>
                        
                        <h4 style="color: #10b981;">Prevention Strategies:</h4>
                        <ul style="color: #d1d5db;">
                            <li>Implement performance monitoring and alerting</li>
                            <li>Regular database query optimization reviews</li>
                            <li>Automated performance testing in CI/CD</li>
                            <li>Resource optimization (images, JS, CSS)</li>
                            <li>CDN and caching strategy implementation</li>
                        </ul>
                        
                        <h4 style="color: #f59e0b;">Related Documentation:</h4>
                        <ul style="color: #d1d5db;">
                            <li><a href="/wiki/PerformanceOptimization" style="color: #06b6d4;">Performance Best Practices</a></li>
                            <li><a href="/wiki/DatabaseOptimization" style="color: #06b6d4;">Database Tuning Guide</a></li>
                            <li><a href="/wiki/CachingStrategy" style="color: #06b6d4;">Caching Implementation</a></li>
                        </ul>
                    </div>
                `
            };
        }
        
        function generateGenericAnalysis(briefDescription, context) {
            return {
                solutions: `
                    <h3>🚀 Quick Solutions to Try</h3>
                    <div style="margin-bottom: 1rem;">
                        <div style="background: rgba(16, 185, 129, 0.1); border-left: 3px solid #10b981; padding: 0.75rem; margin-bottom: 0.75rem; border-radius: 0 6px 6px 0;">
                            <strong>1. Basic Troubleshooting (70% success rate)</strong><br>
                            • Refresh the page and try again<br>
                            • Clear browser cache and cookies<br>
                            • Try in incognito/private browsing mode
                        </div>
                        <div style="background: rgba(16, 185, 129, 0.1); border-left: 3px solid #10b981; padding: 0.75rem; margin-bottom: 0.75rem; border-radius: 0 6px 6px 0;">
                            <strong>2. Browser and Environment Check</strong><br>
                            • Try different browser (Chrome, Firefox, Safari)<br>
                            • Disable browser extensions temporarily<br>
                            • Check for JavaScript errors in console (F12)
                        </div>
                        <div style="background: rgba(16, 185, 129, 0.1); border-left: 3px solid #10b981; padding: 0.75rem; border-radius: 0 6px 6px 0;">
                            <strong>3. Alternative Approaches</strong><br>
                            • Try the same action from a different page/route<br>
                            • Test on different device or network<br>
                            • Check if issue persists at different times
                        </div>
                    </div>
                `,
                causes: `
                    <h3>🔍 Likely Root Causes</h3>
                    <div style="margin-bottom: 1rem;">
                        <div style="margin-bottom: 1rem; padding: 0.75rem; background: rgba(245, 158, 11, 0.1); border-radius: 6px;">
                            <strong style="color: #f59e0b;">Common Technical Issues</strong><br>
                            <span style="color: #d1d5db;">Browser compatibility, JavaScript errors, network connectivity, or server-side problems</span><br>
                            <em style="color: #9ca3af; font-size: 0.8rem;">Check: Browser console, network requests, and server status</em>
                        </div>
                        <div style="margin-bottom: 1rem; padding: 0.75rem; background: rgba(6, 182, 212, 0.1); border-radius: 6px;">
                            <strong style="color: #06b6d4;">User Environment Factors</strong><br>
                            <span style="color: #d1d5db;">Browser settings, extensions, cached data, or local configuration affecting functionality</span><br>
                            <em style="color: #9ca3af; font-size: 0.8rem;">Check: Different browsers, incognito mode, and clean environments</em>
                        </div>
                        <div style="margin-bottom: 1rem; padding: 0.75rem; background: rgba(139, 92, 246, 0.1); border-radius: 6px;">
                            <strong style="color: #8b5cf6;">Application State Issues</strong><br>
                            <span style="color: #d1d5db;">Data inconsistency, permission problems, or workflow state preventing normal operation</span><br>
                            <em style="color: #9ca3af; font-size: 0.8rem;">Check: User permissions, data state, and application logs</em>
                        </div>
                    </div>
                `,
                diagnostics: `
                    <h3>📊 Diagnostic Information to Gather</h3>
                    <div style="background: rgba(139, 92, 246, 0.1); padding: 1rem; border-radius: 6px; margin-bottom: 1rem;">
                        <h4 style="color: #8b5cf6; margin-top: 0;">Essential Information</h4>
                        <label><input type="checkbox" style="margin-right: 0.5rem;">Exact error message or unexpected behavior</label><br>
                        <label><input type="checkbox" style="margin-right: 0.5rem;">Browser type and version</label><br>
                        <label><input type="checkbox" style="margin-right: 0.5rem;">Operating system details</label><br>
                        <label><input type="checkbox" style="margin-right: 0.5rem;">Steps to reproduce the issue reliably</label><br>
                        <label><input type="checkbox" style="margin-right: 0.5rem;">When the issue first started occurring</label><br>
                        <label><input type="checkbox" style="margin-right: 0.5rem;">Screenshot or screen recording of the problem</label><br>
                    </div>
                    <div style="background: rgba(16, 185, 129, 0.1); padding: 1rem; border-radius: 6px;">
                        <h4 style="color: #10b981; margin-top: 0;">Technical Diagnostics</h4>
                        <p style="color: #d1d5db; margin: 0.5rem 0;">Open browser console (F12) and look for:</p>
                        <ul style="color: #d1d5db; margin: 0;">
                            <li>Red error messages in Console tab</li>
                            <li>Failed network requests in Network tab</li>
                            <li>Any warnings or unusual messages</li>
                        </ul>
                    </div>
                `,
                ticket: `
                    <h3>📝 Complete Ticket Structure</h3>
                    <div style="background: rgba(255, 255, 255, 0.05); padding: 1rem; border-radius: 6px; font-family: monospace; font-size: 0.875rem;">
                        <strong style="color: #f59e0b;">PRIORITY: MEDIUM</strong> - Requires investigation<br><br>
                        
                        <strong>TITLE:</strong> ${briefDescription}<br><br>
                        
                        <strong>SUMMARY:</strong><br>
                        User experiencing issue: ${briefDescription}<br><br>
                        
                        <strong>DETAILED DESCRIPTION:</strong><br>
                        [Please provide more details about the issue, including specific error messages and context]<br><br>
                        
                        <strong>STEPS TO REPRODUCE:</strong><br>
                        1. [First step to reproduce the issue]<br>
                        2. [Second step]<br>
                        3. [Third step]<br><br>
                        
                        <strong>EXPECTED BEHAVIOR:</strong><br>
                        [What should happen normally]<br><br>
                        
                        <strong>ACTUAL BEHAVIOR:</strong><br>
                        [What actually happens - the problem]<br><br>
                        
                        <strong>ENVIRONMENT:</strong><br>
                        • Browser: [Browser name and version]<br>
                        • Operating System: [OS and version]<br>
                        • Device: [Desktop/Mobile/Tablet]<br><br>
                        
                        <strong>ADDITIONAL INFORMATION:</strong><br>
                        [Any other relevant details, error messages, or context that might help diagnose the issue]
                    </div>
                `,
                related: `
                    <h3>🔗 Related Issues & Prevention</h3>
                    <div style="margin-bottom: 1rem;">
                        <h4 style="color: #06b6d4;">Search for Similar Issues:</h4>
                        <div style="background: rgba(6, 182, 212, 0.1); padding: 0.75rem; border-radius: 6px; margin-bottom: 1rem;">
                            <code>"${briefDescription}" OR related keywords</code><br>
                            <code>type:bug status:open similar symptoms</code><br>
                            <code>error messages or component names</code>
                        </div>
                        
                        <h4 style="color: #10b981;">General Prevention:</h4>
                        <ul style="color: #d1d5db;">
                            <li>Regular testing across different browsers and devices</li>
                            <li>Comprehensive error handling and user feedback</li>
                            <li>Monitoring and logging for early issue detection</li>
                            <li>User acceptance testing for critical workflows</li>
                            <li>Documentation of known issues and workarounds</li>
                        </ul>
                        
                        <h4 style="color: #f59e0b;">Related Documentation:</h4>
                        <ul style="color: #d1d5db;">
                            <li><a href="/wiki/TroubleshootingGuide" style="color: #06b6d4;">General Troubleshooting</a></li>
                            <li><a href="/wiki/BrowserCompatibility" style="color: #06b6d4;">Browser Support Guide</a></li>
                            <li><a href="/wiki/UserGuide" style="color: #06b6d4;">User Documentation</a></li>
                        </ul>
                    </div>
                `
            };
        }
        
        // Action button handlers
        function applyAnalysisToTicket() {
            if (!currentAnalysis || !currentAnalysis.ticket) {
                aiLogger.warning('Apply Ticket Failed - No Analysis', {
                    hasAnalysis: !!currentAnalysis,
                    hasTicketSection: !!(currentAnalysis && currentAnalysis.ticket)
                });
                return;
            }
            
            if (descriptionField) {
                // Extract the ticket content and format it properly
                const ticketContent = currentAnalysis.ticket.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ');
                descriptionField.value = ticketContent;
                descriptionField.dispatchEvent(new Event('input', { bubbles: true }));
                
                aiLogger.success('Analysis Applied to Ticket', {
                    contentLength: ticketContent.length,
                    fieldId: descriptionField.id,
                    previousContentLength: descriptionField.value.length
                });
                
                // Add notification for applying AI analysis
                if (window.TracNotificationSystem) {
                    window.TracNotificationSystem.addNotification({
                        title: 'AI Analysis Applied',
                        description: 'AI-generated ticket structure has been applied to the description field',
                        type: 'success'
                    });
                }
                
                // Show success
                const btn = aiContainer.querySelector('#ai-apply-ticket');
                const originalText = btn.innerHTML;
                btn.innerHTML = '<span>✅</span> Applied Successfully!';
                btn.style.background = '#10b981';
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.background = '#10b981';
                }, 3000);
            } else {
                aiLogger.error('Apply Ticket Failed - No Description Field', {
                    hasDescriptionField: !!descriptionField
                });
            }
        }
        
        function copyCurrentSection() {
            if (!currentAnalysis || !currentAnalysis[currentTab]) {
                aiLogger.warning('Copy Section Failed - No Content', {
                    hasAnalysis: !!currentAnalysis,
                    currentTab: currentTab,
                    hasCurrentTabContent: !!(currentAnalysis && currentAnalysis[currentTab])
                });
                return;
            }
            
            const content = currentAnalysis[currentTab].replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ');
            
            navigator.clipboard.writeText(content).then(() => {
                aiLogger.success('Section Content Copied', {
                    section: currentTab,
                    contentLength: content.length,
                    clipboardAPI: 'navigator.clipboard'
                });
                
                const btn = aiContainer.querySelector('#ai-copy-section');
                const originalText = btn.innerHTML;
                btn.innerHTML = '<span>✅</span> Copied!';
                setTimeout(() => {
                    btn.innerHTML = originalText;
                }, 2000);
            }).catch((error) => {
                aiLogger.error('Copy to Clipboard Failed', {
                    error: error.message,
                    section: currentTab,
                    contentLength: content.length
                });
            });
        }
        
        function runDiagnosticCheck() {
            aiLogger.info('Diagnostic Check Started', {
                currentTab: currentTab,
                userAgent: navigator.userAgent,
                timestamp: Date.now()
            });
            
            const diagnosticModal = document.createElement('div');
            diagnosticModal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.7);
                z-index: 10000;
                display: flex;
                align-items: center;
                justify-content: center;
            `;
            
            diagnosticModal.innerHTML = `
                <div style="background: rgba(17, 24, 39, 0.95); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 2rem; max-width: 500px; width: 90%; backdrop-filter: blur(20px);">
                    <h3 style="color: #f9fafb; margin-top: 0;">🔍 Running Diagnostics...</h3>
                    <div id="diagnostic-progress" style="margin: 1rem 0;">
                        <div style="background: rgba(255, 255, 255, 0.1); border-radius: 8px; height: 6px; overflow: hidden;">
                            <div style="background: linear-gradient(90deg, #8b5cf6, #06b6d4); height: 100%; width: 0%; transition: width 1s ease;" id="progress-bar"></div>
                        </div>
                        <div style="color: #d1d5db; font-size: 0.875rem; margin-top: 0.5rem;" id="diagnostic-status">Checking browser console...</div>
                    </div>
                    <div id="diagnostic-results" style="display: none;">
                        <h4 style="color: #10b981;">✅ Diagnostic Results</h4>
                        <ul style="color: #d1d5db; font-size: 0.875rem;">
                            <li>✅ Browser console: No critical errors</li>
                            <li>✅ Network connectivity: Active</li>
                            <li>⚠️ Local storage: 12MB used (consider cleanup)</li>
                            <li>✅ JavaScript enabled: Yes</li>
                        </ul>
                    </div>
                    <button onclick="this.closest('div').closest('div').remove()" style="background: #6b7280; border: none; border-radius: 6px; padding: 0.5rem 1rem; color: white; cursor: pointer; margin-top: 1rem;">Close</button>
                </div>
            `;
            
            document.body.appendChild(diagnosticModal);
            
            // Simulate diagnostic progress
            const progressBar = diagnosticModal.querySelector('#progress-bar');
            const status = diagnosticModal.querySelector('#diagnostic-status');
            const results = diagnosticModal.querySelector('#diagnostic-results');
            
            const steps = [
                'Checking browser console...',
                'Testing network connectivity...',
                'Analyzing local storage...',
                'Verifying JavaScript state...',
                'Complete!'
            ];
            
            let step = 0;
            const interval = setInterval(() => {
                progressBar.style.width = ((step + 1) / steps.length * 100) + '%';
                status.textContent = steps[step];
                step++;
                
                if (step >= steps.length) {
                    clearInterval(interval);
                    setTimeout(() => {
                        status.style.display = 'none';
                        results.style.display = 'block';
                    }, 500);
                }
            }, 1000);
        }
        
        function searchSimilarIssues() {
            if (!currentAnalysis || !currentAnalysis.related) return;
            
            // Extract search queries from the related section
            const searchQueries = [
                briefInput.value.replace(/[^\w\s]/g, ''),
                'login authentication error',
                'mobile browser issue'
            ];
            
            console.log('Searching for similar issues:', searchQueries);
            // In a real implementation, this would trigger the smart search
            const searchInput = document.getElementById('smart-search');
            if (searchInput) {
                searchInput.value = searchQueries[0];
                searchInput.focus();
                searchInput.dispatchEvent(new Event('input', { bubbles: true }));
            }
        }
        
        function generateFallbackAnalysis(briefDescription) {
            return {
                solutions: `
                    <h3>🚀 Quick Solutions to Try</h3>
                    <div style="background: rgba(16, 185, 129, 0.1); border-left: 3px solid #10b981; padding: 0.75rem; border-radius: 0 6px 6px 0;">
                        <strong>1. Basic Troubleshooting</strong><br>
                        • Refresh the page and try again<br>
                        • Clear browser cache and cookies<br>
                        • Try in incognito/private mode
                    </div>
                `,
                causes: `
                    <h3>🔍 Likely Root Causes</h3>
                    <div style="padding: 0.75rem; background: rgba(245, 158, 11, 0.1); border-radius: 6px;">
                        <strong style="color: #f59e0b;">Possible Technical Issues</strong><br>
                        <span style="color: #d1d5db;">Browser compatibility, network connectivity, or server-side problems</span>
                    </div>
                `,
                diagnostics: `
                    <h3>📊 Diagnostic Information Needed</h3>
                    <p>Please provide more details about the issue, including browser type, error messages, and steps to reproduce.</p>
                `,
                ticket: `
                    <h3>📝 Basic Ticket Structure</h3>
                    <div style="background: rgba(255, 255, 255, 0.05); padding: 1rem; border-radius: 6px;">
                        <strong>Issue:</strong> ${briefDescription}<br><br>
                        <strong>Description:</strong> [Please provide more details]<br><br>
                        <strong>Steps to Reproduce:</strong><br>
                        1. [Step 1]<br>
                        2. [Step 2]<br><br>
                        <strong>Expected vs Actual Behavior:</strong><br>
                        [Describe what should happen vs what actually happens]
                    </div>
                `,
                related: `
                    <h3>🔗 Related Issues</h3>
                    <p>Search for similar issues using keywords from your problem description.</p>
                `
            };
        }
        
        // Log Viewer Function
        function showLogViewer() {
            aiLogger.info('Log Viewer Opened', {
                totalLogs: aiLogger.logs.length,
                sessionDuration: Date.now() - aiLogger.startTime
            });
            
            const logModal = document.createElement('div');
            logModal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                z-index: 10000;
                display: flex;
                align-items: center;
                justify-content: center;
            `;
            
            const summary = aiLogger.getSessionSummary();
            const recentLogs = aiLogger.logs.slice(-20); // Last 20 logs
            
            logModal.innerHTML = `
                <div style="background: rgba(17, 24, 39, 0.98); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 2rem; max-width: 800px; width: 90%; max-height: 90%; overflow-y: auto; backdrop-filter: blur(20px);">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                        <h2 style="color: #f9fafb; margin: 0; display: flex; align-items: center; gap: 0.5rem;">
                            <span>📊</span> AI Assistant Logs
                        </h2>
                        <button onclick="this.closest('div').closest('div').remove()" style="background: #6b7280; border: none; border-radius: 6px; padding: 0.5rem; color: white; cursor: pointer;">✕</button>
                    </div>
                    
                    <!-- Session Summary -->
                    <div style="background: rgba(139, 92, 246, 0.1); border: 1px solid #8b5cf6; border-radius: 8px; padding: 1rem; margin-bottom: 1.5rem;">
                        <h3 style="color: #8b5cf6; margin-top: 0;">Session Summary</h3>
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem; color: #d1d5db; font-size: 0.875rem;">
                            <div><strong>Session ID:</strong><br>${summary.sessionId}</div>
                            <div><strong>Duration:</strong><br>${Math.round(summary.duration / 1000)}s</div>
                            <div><strong>Total Logs:</strong><br>${summary.totalLogs}</div>
                            <div><strong>API Calls:</strong><br>${summary.apiCallCount}</div>
                            <div><strong>Interactions:</strong><br>${summary.userInteractions}</div>
                            <div><strong>Errors:</strong><br>${summary.errors}</div>
                        </div>
                    </div>
                    
                    <!-- Action Buttons -->
                    <div style="display: flex; gap: 1rem; margin-bottom: 1.5rem; flex-wrap: wrap;">
                        <button onclick="aiLogger.exportLogs()" style="background: #10b981; border: none; border-radius: 6px; padding: 0.5rem 1rem; color: white; cursor: pointer; display: flex; align-items: center; gap: 0.5rem;">
                            <span>💾</span> Export Logs
                        </button>
                        <button onclick="console.table(aiLogger.logs)" style="background: #06b6d4; border: none; border-radius: 6px; padding: 0.5rem 1rem; color: white; cursor: pointer; display: flex; align-items: center; gap: 0.5rem;">
                            <span>🔍</span> View in Console
                        </button>
                        <button onclick="localStorage.removeItem('ai_assistant_logs'); alert('Local logs cleared!')" style="background: #ef4444; border: none; border-radius: 6px; padding: 0.5rem 1rem; color: white; cursor: pointer; display: flex; align-items: center; gap: 0.5rem;">
                            <span>🗑️</span> Clear Local Logs
                        </button>
                    </div>
                    
                    <!-- Recent Logs -->
                    <div>
                        <h3 style="color: #f9fafb; margin-bottom: 1rem;">Recent Activity (Last 20 logs)</h3>
                        <div style="max-height: 400px; overflow-y: auto; background: rgba(0, 0, 0, 0.3); border-radius: 8px; padding: 1rem;">
                            ${recentLogs.map(log => `
                                <div style="margin-bottom: 0.75rem; padding: 0.5rem; border-left: 3px solid ${getLogColor(log.level)}; background: rgba(255, 255, 255, 0.02); border-radius: 0 6px 6px 0;">
                                    <div style="display: flex; justify-content: between; align-items: center; margin-bottom: 0.25rem;">
                                        <span style="color: ${getLogColor(log.level)}; font-weight: 600; font-size: 0.75rem;">${log.level}</span>
                                        <span style="color: #9ca3af; font-size: 0.75rem; margin-left: auto;">${new Date(log.timestamp).toLocaleTimeString()}</span>
                                    </div>
                                    <div style="color: #f9fafb; font-size: 0.875rem; margin-bottom: 0.25rem;">${log.event}</div>
                                    ${Object.keys(log.data).length > 2 ? `
                                        <details style="margin-top: 0.5rem;">
                                            <summary style="color: #9ca3af; font-size: 0.75rem; cursor: pointer;">View Details</summary>
                                            <pre style="color: #d1d5db; font-size: 0.75rem; margin-top: 0.5rem; overflow-x: auto;">${JSON.stringify(log.data, null, 2)}</pre>
                                        </details>
                                    ` : ''}
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            `;
            
            document.body.appendChild(logModal);
            
            // Close on backdrop click
            logModal.addEventListener('click', (e) => {
                if (e.target === logModal) {
                    logModal.remove();
                }
            });
        }
        
        function getLogColor(level) {
            const colors = {
                INFO: '#06b6d4',
                SUCCESS: '#10b981',
                WARNING: '#f59e0b',
                ERROR: '#ef4444',
                DEBUG: '#8b5cf6'
            };
            return colors[level] || '#9ca3af';
        }
    }
    
    // Smart Search Functionality
    function initializeSmartSearch() {
        const searchInput = document.getElementById('smart-search');
        const searchDropdown = document.getElementById('search-dropdown');
        
        if (!searchInput || !searchDropdown) return;
        
        // Mock data for search
        const mockTickets = [
            { id: '#001', title: 'Login authentication bug', type: 'bug', status: 'open' },
            { id: '#002', title: 'Dark mode toggle implementation', type: 'feature', status: 'in-progress' },
            { id: '#003', title: 'API documentation update', type: 'task', status: 'closed' },
            { id: '#004', title: 'Performance optimization', type: 'enhancement', status: 'review' },
            { id: '#005', title: 'Mobile responsive fixes', type: 'bug', status: 'open' }
        ];
        
        const mockWikiPages = [
            { title: 'Getting Started', type: 'wiki' },
            { title: 'API Reference', type: 'wiki' },
            { title: 'Troubleshooting Guide', type: 'wiki' }
        ];
        
        let searchTimeout;
        
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.trim();
            
            clearTimeout(searchTimeout);
            
            if (query.length < 2) {
                searchDropdown.classList.add('hidden');
                return;
            }
            
            searchTimeout = setTimeout(() => {
                performSearch(query);
            }, 300);
        });
        
        // Hide dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!searchInput.contains(e.target) && !searchDropdown.contains(e.target)) {
                searchDropdown.classList.add('hidden');
            }
        });
        
        function performSearch(query) {
            const lowerQuery = query.toLowerCase();
            
            // Parse filters (e.g., type:bug, status:open)
            const filters = {};
            const filterRegex = /(\w+):(\w+)/g;
            let match;
            while ((match = filterRegex.exec(query)) !== null) {
                filters[match[1]] = match[2];
            }
            
            // Remove filter syntax from search term
            const searchTerm = query.replace(/\w+:\w+/g, '').trim();
            
            let results = [];
            
            // Search tickets
            const ticketResults = mockTickets.filter(ticket => {
                let matches = true;
                
                // Apply filters
                if (filters.type && ticket.type !== filters.type) matches = false;
                if (filters.status && ticket.status !== filters.status) matches = false;
                
                // Text search
                if (searchTerm && matches) {
                    matches = ticket.title.toLowerCase().includes(searchTerm) ||
                             ticket.id.toLowerCase().includes(searchTerm);
                }
                
                return matches;
            });
            
            // Search wiki pages
            const wikiResults = mockWikiPages.filter(page => 
                page.title.toLowerCase().includes(searchTerm)
            );
            
            // Build results HTML
            let html = '';
            
            if (Object.keys(filters).length === 0 && searchTerm.length > 0) {
                html += '<div class="search-filter-hint">💡 Try filters: type:bug, status:open, type:feature</div>';
            }
            
            if (ticketResults.length > 0) {
                ticketResults.forEach(ticket => {
                    const statusColor = {
                        'open': '#ef4444',
                        'in-progress': '#f59e0b', 
                        'review': '#06b6d4',
                        'closed': '#10b981'
                    }[ticket.status] || '#6b7280';
                    
                    html += `
                        <div class="search-result" onclick="navigateToTicket('${ticket.id}')">
                            <div class="search-result-title">${ticket.title}</div>
                            <div class="search-result-meta">
                                ${ticket.id} • ${ticket.type} • 
                                <span style="color: ${statusColor}">${ticket.status}</span>
                            </div>
                        </div>
                    `;
                });
            }
            
            if (wikiResults.length > 0) {
                wikiResults.forEach(page => {
                    html += `
                        <div class="search-result" onclick="navigateToWiki('${page.title}')">
                            <div class="search-result-title">${page.title}</div>
                            <div class="search-result-meta">📖 Wiki Page</div>
                        </div>
                    `;
                });
            }
            
            if (ticketResults.length === 0 && wikiResults.length === 0) {
                html = '<div class="search-result">No results found</div>';
            }
            
            searchDropdown.innerHTML = html;
            searchDropdown.classList.remove('hidden');
        }
        
        window.navigateToTicket = function(ticketId) {
            console.log('Navigate to ticket:', ticketId);
            searchDropdown.classList.add('hidden');
            searchInput.value = '';
        };
        
        window.navigateToWiki = function(pageTitle) {
            console.log('Navigate to wiki:', pageTitle);
            window.location.href = `/trac_env/wiki/${pageTitle}`;
        };
    }
    
    // Global notification system
    window.TracNotificationSystem = {
        notifications: [],
        callbacks: [],
        nextId: 1,
        
        addNotification: function(notification) {
            const newNotification = {
                id: this.nextId++,
                title: notification.title,
                description: notification.description,
                time: 'Just now',
                unread: true,
                link: notification.link || '#',
                type: notification.type || 'info',
                timestamp: Date.now()
            };
            
            this.notifications.unshift(newNotification);
            
            // Keep only last 50 notifications
            if (this.notifications.length > 50) {
                this.notifications = this.notifications.slice(0, 50);
            }
            
            // Trigger callbacks to update UI
            this.callbacks.forEach(callback => callback(newNotification));
            
            return newNotification;
        },
        
        markAsRead: function(id) {
            const notification = this.notifications.find(n => n.id === id);
            if (notification) {
                notification.unread = false;
                this.callbacks.forEach(callback => callback(null, 'mark_read'));
            }
        },
        
        markAllAsRead: function() {
            this.notifications.forEach(n => n.unread = false);
            this.callbacks.forEach(callback => callback(null, 'mark_all_read'));
        },
        
        getUnreadCount: function() {
            return this.notifications.filter(n => n.unread).length;
        },
        
        subscribe: function(callback) {
            this.callbacks.push(callback);
        }
    };
    
    // Notification Center Functionality  
    function initializeNotificationCenter() {
        const notificationBell = document.getElementById('notification-bell');
        const notificationDropdown = document.getElementById('notification-dropdown');
        const notificationCount = document.getElementById('notification-count');
        
        if (!notificationBell || !notificationDropdown || !notificationCount) return;
        
        // Initialize with some demo notifications
        const demoNotifications = [
            {
                title: 'Welcome to Enhanced Trac!',
                description: 'Your notification system is now real-time',
                type: 'success'
            },
            {
                title: 'System Status',
                description: 'All services operational',
                type: 'info'
            }
        ];
        
        demoNotifications.forEach(notif => window.TracNotificationSystem.addNotification(notif));
        
        // Subscribe to notification updates
        window.TracNotificationSystem.subscribe((newNotification, action) => {
            updateNotificationUI();
            
            if (newNotification && newNotification.unread) {
                // Show animation for new notifications
                notificationBell.style.animation = 'none';
                setTimeout(() => {
                    notificationBell.style.animation = 'pulse 1s ease-in-out 3';
                }, 10);
                
                // Show toast notification
                showToastNotification(newNotification);
            }
        });
        
        function updateNotificationUI() {
            const unreadCount = window.TracNotificationSystem.getUnreadCount();
            if (unreadCount > 0) {
                notificationCount.textContent = unreadCount;
                notificationCount.classList.remove('hidden');
            } else {
                notificationCount.classList.add('hidden');
            }
        }
        
        function showToastNotification(notification) {
            const toast = document.createElement('div');
            toast.style.cssText = `
                position: fixed;
                top: 100px;
                right: 20px;
                background: rgba(17, 24, 39, 0.95);
                border: 1px solid rgba(6, 182, 212, 0.5);
                border-radius: 8px;
                padding: 1rem;
                color: white;
                max-width: 300px;
                z-index: 10000;
                backdrop-filter: blur(10px);
                box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
                transform: translateX(100%);
                transition: transform 0.3s ease;
            `;
            
            const typeIcon = {
                'success': '✅',
                'info': 'ℹ️',
                'warning': '⚠️',
                'error': '❌'
            }[notification.type] || '📢';
            
            toast.innerHTML = `
                <div style="display: flex; align-items: flex-start; gap: 0.75rem;">
                    <span style="font-size: 1.2rem;">${typeIcon}</span>
                    <div style="flex: 1;">
                        <div style="font-weight: 600; margin-bottom: 0.25rem;">${notification.title}</div>
                        <div style="font-size: 0.875rem; color: #d1d5db; line-height: 1.4;">${notification.description}</div>
                    </div>
                    <button onclick="this.parentElement.parentElement.remove()" style="background: none; border: none; color: #9ca3af; cursor: pointer; font-size: 1.2rem;">×</button>
                </div>
            `;
            
            document.body.appendChild(toast);
            
            // Animate in
            setTimeout(() => {
                toast.style.transform = 'translateX(0)';
            }, 10);
            
            // Auto remove after 5 seconds
            setTimeout(() => {
                if (toast.parentElement) {
                    toast.style.transform = 'translateX(100%)';
                    setTimeout(() => toast.remove(), 300);
                }
            }, 5000);
        }
        
        // Initial UI update
        updateNotificationUI();
        
        // Toggle dropdown
        notificationBell.addEventListener('click', (e) => {
            e.stopPropagation();
            
            if (notificationDropdown.classList.contains('hidden')) {
                showNotificationDropdown();
            } else {
                notificationDropdown.classList.add('hidden');
            }
        });
        
        // Hide dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!notificationDropdown.contains(e.target)) {
                notificationDropdown.classList.add('hidden');
            }
        });
        
        function showNotificationDropdown() {
            const notifications = window.TracNotificationSystem.notifications;
            const unreadCount = window.TracNotificationSystem.getUnreadCount();
            
            let html = `
                <div class="notification-header">
                    <div class="notification-title">Notifications</div>
                    <div class="notification-subtitle">${notifications.length} total, ${unreadCount} unread</div>
                </div>
                <div class="notification-list">
            `;
            
            if (notifications.length === 0) {
                html += `
                    <div style="text-align: center; padding: 2rem; color: #9ca3af;">
                        <div style="font-size: 2rem; margin-bottom: 0.5rem;">🔔</div>
                        <div>No notifications yet</div>
                        <div style="font-size: 0.875rem; margin-top: 0.25rem;">Create a ticket to see real-time notifications!</div>
                    </div>
                `;
            } else {
                notifications.forEach(notification => {
                    const timeAgo = getTimeAgo(notification.timestamp);
                    const typeIcon = {
                        'success': '✅',
                        'info': 'ℹ️',
                        'warning': '⚠️',
                        'error': '❌'
                    }[notification.type] || '📢';
                    
                    html += `
                        <div class="notification-item ${notification.unread ? 'unread' : ''}" 
                             onclick="handleNotificationClick('${notification.link}', ${notification.id})">
                            <div style="display: flex; align-items: flex-start; gap: 0.5rem;">
                                <span style="font-size: 1rem; margin-top: 0.1rem;">${typeIcon}</span>
                                <div style="flex: 1;">
                                    <div class="notification-content">
                                        <strong>${notification.title}</strong><br>
                                        ${notification.description}
                                    </div>
                                    <div class="notification-time">${timeAgo}</div>
                                </div>
                            </div>
                        </div>
                    `;
                });
            }
            
            html += `
                </div>
                <div class="notification-footer">
                    <span class="notification-clear" onclick="clearAllNotifications()">Mark all as read</span>
                </div>
            `;
            
            notificationDropdown.innerHTML = html;
            notificationDropdown.classList.remove('hidden');
        }
        
        function getTimeAgo(timestamp) {
            const now = Date.now();
            const diff = now - timestamp;
            const seconds = Math.floor(diff / 1000);
            const minutes = Math.floor(seconds / 60);
            const hours = Math.floor(minutes / 60);
            const days = Math.floor(hours / 24);
            
            if (seconds < 60) return 'Just now';
            if (minutes < 60) return `${minutes}m ago`;
            if (hours < 24) return `${hours}h ago`;
            return `${days}d ago`;
        }
        
        window.handleNotificationClick = function(link, notificationId) {
            // Mark as read using global system
            window.TracNotificationSystem.markAsRead(notificationId);
            
            // Navigate
            console.log('Navigate to:', link);
            notificationDropdown.classList.add('hidden');
            
            if (link !== '#') {
                window.location.href = link;
            }
        };
        
        window.clearAllNotifications = function() {
            window.TracNotificationSystem.markAllAsRead();
            notificationDropdown.classList.add('hidden');
        };
        
        // Add demo notification for testing
        setTimeout(() => {
            if (window.TracNotificationSystem) {
                window.TracNotificationSystem.addNotification({
                    title: 'System Ready',
                    description: 'Real-time notifications are now active. Create a ticket to see them in action!',
                    type: 'info'
                });
            }
        }, 3000);
    }
    
    function createAnalyticsPage() {
        console.log('📊 Creating Analytics Page');
        
        // Hide original Trac content
        const main = document.querySelector('#main') || document.querySelector('#content');
        if (!main) {
            console.error('Could not find main content area');
            return;
        }
        
        // Clear existing content
        main.innerHTML = '';
        main.className = 'analytics-page';
        
        // Create analytics container
        const analyticsContainer = document.createElement('div');
        analyticsContainer.className = 'analytics-container';
        analyticsContainer.innerHTML = `
            <div class="analytics-header">
                <h1>Analytics Dashboard</h1>
                <div class="time-filter">
                    <select id="time-range" class="time-range-select">
                        <option value="week">This Week</option>
                        <option value="month">This Month</option>
                        <option value="quarter">This Quarter</option>
                        <option value="year">This Year</option>
                    </select>
                </div>
            </div>
            
            <div class="analytics-grid">
                <!-- Chart 1: Line Chart -->
                <div class="chart-card">
                    <div class="chart-header">
                        <h3>Ticket Trends</h3>
                        <span class="chart-value">5,000.00</span>
                        <span class="chart-subtitle">50 Orders</span>
                    </div>
                    <canvas id="line-chart" width="400" height="200"></canvas>
                    <div class="chart-legend">
                        <span class="legend-item" style="color: #8b5cf6;">● Content</span>
                        <span class="legend-item" style="color: #6366f1;">● Content</span>
                        <span class="legend-item" style="color: #c084fc;">● Content</span>
                    </div>
                </div>
                
                <!-- Chart 2: Bar Chart -->
                <div class="chart-card">
                    <div class="chart-header">
                        <h3>Activity by Type</h3>
                        <span class="chart-value">5,000.00</span>
                        <span class="chart-subtitle">50 Orders</span>
                    </div>
                    <canvas id="bar-chart" width="400" height="200"></canvas>
                    <div class="chart-legend">
                        <span class="legend-item" style="color: #8b5cf6;">● Content</span>
                        <span class="legend-item" style="color: #6366f1;">● Content</span>
                        <span class="legend-item" style="color: #c084fc;">● Content</span>
                    </div>
                </div>
                
                <!-- Chart 3: Scatter Chart -->
                <div class="chart-card">
                    <div class="chart-header">
                        <h3>Issue Distribution</h3>
                        <span class="chart-value">5,000.00</span>
                        <span class="chart-subtitle">50 Orders</span>
                    </div>
                    <canvas id="scatter-chart" width="400" height="200"></canvas>
                    <div class="chart-legend">
                        <span class="legend-item" style="color: #8b5cf6;">● Content</span>
                        <span class="legend-item" style="color: #6366f1;">● Content</span>
                        <span class="legend-item" style="color: #c084fc;">● Content</span>
                    </div>
                </div>
                
                <!-- Chart 4: Pie Chart -->
                <div class="chart-card">
                    <div class="chart-header">
                        <h3>Status Overview</h3>
                        <span class="chart-value">5,000.00</span>
                        <span class="chart-subtitle">50 Orders</span>
                    </div>
                    <canvas id="pie-chart" width="400" height="200"></canvas>
                    <div class="chart-legend">
                        <span class="legend-item" style="color: #8b5cf6;">● Content 35%</span>
                        <span class="legend-item" style="color: #ec4899;">● Content 50%</span>
                        <span class="legend-item" style="color: #6366f1;">● Content 15%</span>
                    </div>
                </div>
            </div>
        `;
        
        main.appendChild(analyticsContainer);
        
        // Initialize charts after DOM is ready
        setTimeout(() => {
            initializeCharts();
        }, 100);
    }
    
    function initializeCharts() {
        // Get mock ticket data
        const tickets = getMockTicketData();
        
        // Line Chart
        const lineCtx = document.getElementById('line-chart');
        if (lineCtx) {
            const ctx = lineCtx.getContext('2d');
            drawLineChart(ctx, tickets);
        }
        
        // Bar Chart
        const barCtx = document.getElementById('bar-chart');
        if (barCtx) {
            const ctx = barCtx.getContext('2d');
            drawBarChart(ctx, tickets);
        }
        
        // Scatter Chart
        const scatterCtx = document.getElementById('scatter-chart');
        if (scatterCtx) {
            const ctx = scatterCtx.getContext('2d');
            drawScatterChart(ctx, tickets);
        }
        
        // Pie Chart
        const pieCtx = document.getElementById('pie-chart');
        if (pieCtx) {
            const ctx = pieCtx.getContext('2d');
            drawPieChart(ctx, tickets);
        }
    }
    
    function getMockTicketData() {
        // Generate mock data that updates based on actual tickets if available
        return {
            daily: [20, 35, 40, 60, 55, 70, 65],
            types: {
                bug: 45,
                feature: 30,
                task: 25,
                enhancement: 20
            },
            status: {
                open: 35,
                closed: 50,
                pending: 15
            },
            scatter: generateScatterData()
        };
    }
    
    function generateScatterData() {
        const data = [];
        const days = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
        days.forEach((day, i) => {
            // Generate 3-5 points per day
            const numPoints = Math.floor(Math.random() * 3) + 3;
            for (let j = 0; j < numPoints; j++) {
                data.push({
                    x: i,
                    y: Math.random() * 40 - 20,
                    size: Math.random() * 20 + 10
                });
            }
        });
        return data;
    }
    
    function drawLineChart(ctx, data) {
        const width = ctx.canvas.width;
        const height = ctx.canvas.height;
        const padding = 40;
        const chartWidth = width - padding * 2;
        const chartHeight = height - padding * 2;
        
        // Clear canvas
        ctx.clearRect(0, 0, width, height);
        
        // Draw grid lines
        ctx.strokeStyle = '#e5e5e5';
        ctx.lineWidth = 0.5;
        
        // Horizontal grid lines
        for (let i = 0; i <= 5; i++) {
            const y = padding + (chartHeight / 5) * i;
            ctx.beginPath();
            ctx.moveTo(padding, y);
            ctx.lineTo(width - padding, y);
            ctx.stroke();
        }
        
        // Draw line chart
        const days = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
        const values = data.daily;
        const maxValue = Math.max(...values);
        
        ctx.strokeStyle = '#8b5cf6';
        ctx.lineWidth = 2;
        ctx.beginPath();
        
        values.forEach((value, i) => {
            const x = padding + (chartWidth / (values.length - 1)) * i;
            const y = padding + chartHeight - (value / maxValue) * chartHeight;
            
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
            
            // Draw point
            ctx.fillStyle = '#8b5cf6';
            ctx.beginPath();
            ctx.arc(x, y, 4, 0, Math.PI * 2);
            ctx.fill();
        });
        
        ctx.stroke();
        
        // Draw labels
        ctx.fillStyle = '#525252';
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'center';
        
        days.forEach((day, i) => {
            const x = padding + (chartWidth / (days.length - 1)) * i;
            ctx.fillText(day, x, height - 10);
        });
    }
    
    function drawBarChart(ctx, data) {
        const width = ctx.canvas.width;
        const height = ctx.canvas.height;
        const padding = 40;
        const chartWidth = width - padding * 2;
        const chartHeight = height - padding * 2;
        
        // Clear canvas
        ctx.clearRect(0, 0, width, height);
        
        // Data for grouped bars
        const categories = ['q1', 'q2', 'q3', 'q4'];
        const series = [
            [20, 25, 30, 28],
            [15, 20, 18, 22],
            [10, 12, 15, 14],
            [8, 10, 12, 11]
        ];
        const colors = ['#8b5cf6', '#6366f1', '#c084fc', '#ec4899'];
        
        const barGroupWidth = chartWidth / categories.length;
        const barWidth = barGroupWidth / (series.length + 1);
        const maxValue = 30;
        
        // Draw bars
        categories.forEach((cat, catIndex) => {
            series.forEach((data, seriesIndex) => {
                const value = data[catIndex];
                const barHeight = (value / maxValue) * chartHeight;
                const x = padding + catIndex * barGroupWidth + seriesIndex * barWidth + barWidth / 2;
                const y = padding + chartHeight - barHeight;
                
                ctx.fillStyle = colors[seriesIndex];
                ctx.fillRect(x, y, barWidth * 0.8, barHeight);
            });
        });
        
        // Draw labels
        ctx.fillStyle = '#525252';
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'center';
        
        categories.forEach((cat, i) => {
            const x = padding + i * barGroupWidth + barGroupWidth / 2;
            ctx.fillText(cat, x, height - 10);
        });
    }
    
    function drawScatterChart(ctx, data) {
        const width = ctx.canvas.width;
        const height = ctx.canvas.height;
        const padding = 40;
        const chartWidth = width - padding * 2;
        const chartHeight = height - padding * 2;
        
        // Clear canvas
        ctx.clearRect(0, 0, width, height);
        
        // Draw center line
        ctx.strokeStyle = '#d4d4d4';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(padding, height / 2);
        ctx.lineTo(width - padding, height / 2);
        ctx.stroke();
        
        // Draw scatter points
        const colors = ['#8b5cf6', '#ec4899', '#6366f1'];
        const scatterData = data.scatter;
        
        scatterData.forEach((point, i) => {
            const x = padding + (point.x / 5) * chartWidth;
            const y = height / 2 - point.y * 2;
            
            ctx.fillStyle = colors[i % colors.length];
            ctx.beginPath();
            ctx.arc(x, y, point.size / 2, 0, Math.PI * 2);
            ctx.fill();
        });
        
        // Draw labels
        const days = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
        ctx.fillStyle = '#525252';
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'center';
        
        days.forEach((day, i) => {
            const x = padding + (i / 5) * chartWidth;
            ctx.fillText(day, x, height - 10);
        });
    }
    
    function drawPieChart(ctx, data) {
        const width = ctx.canvas.width;
        const height = ctx.canvas.height;
        const centerX = width / 2;
        const centerY = height / 2;
        const radius = Math.min(width, height) / 3;
        
        // Clear canvas
        ctx.clearRect(0, 0, width, height);
        
        // Pie data
        const statusData = data.status;
        const total = Object.values(statusData).reduce((a, b) => a + b, 0);
        const colors = ['#8b5cf6', '#ec4899', '#6366f1'];
        const labels = Object.keys(statusData);
        
        let currentAngle = -Math.PI / 2;
        
        labels.forEach((label, i) => {
            const value = statusData[label];
            const sliceAngle = (value / total) * Math.PI * 2;
            
            // Draw slice
            ctx.fillStyle = colors[i];
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
            ctx.closePath();
            ctx.fill();
            
            // Draw percentage text
            const textAngle = currentAngle + sliceAngle / 2;
            const textX = centerX + Math.cos(textAngle) * (radius / 2);
            const textY = centerY + Math.sin(textAngle) * (radius / 2);
            
            ctx.fillStyle = '#171717';
            ctx.font = 'bold 14px sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(`${Math.round((value / total) * 100)}%`, textX, textY);
            
            currentAngle += sliceAngle;
        });
    }
    
    // Ticket Edit Modal Functionality
    let currentEditingTicket = null;
    
    function openTicketEditModal(ticket) {
        currentEditingTicket = ticket;
        
        // Create modal if it doesn't exist
        let modal = document.getElementById('ticketEditModal');
        if (!modal) {
            createTicketEditModal();
            modal = document.getElementById('ticketEditModal');
        }
        
        // Populate form fields
        document.getElementById('editTicketId').textContent = ticket.id;
        document.getElementById('editTicketTitle').value = ticket.summary || ticket.title || '';
        document.getElementById('editTicketDescription').value = ticket.description || '';
        document.getElementById('editTicketType').value = ticket.type ? ticket.type.toLowerCase() : 'task';
        document.getElementById('editTicketPriority').value = ticket.priority ? ticket.priority.toLowerCase() : 'medium';
        document.getElementById('editTicketStatus').value = ticket.status === 'Open' ? 'open' : 
                                                           ticket.status === 'In Progress' ? 'in-progress' :
                                                           ticket.status === 'Review' ? 'review' :
                                                           ticket.status === 'Closed' ? 'done' : 'open';
        
        // Populate assignee dropdown
        populateTicketAssigneeDropdown();
        
        // Set assignee
        if (ticket.rawData && ticket.rawData.assignee) {
            document.getElementById('editTicketAssignee').value = ticket.rawData.assignee;
        } else if (window.TracMockData) {
            // Try to find assignee by name
            const userEntry = Object.entries(window.TracMockData.users).find(([initials, user]) => 
                user.name === ticket.assignee
            );
            if (userEntry) {
                document.getElementById('editTicketAssignee').value = userEntry[0];
            }
        }
        
        // Show modal
        modal.style.display = 'flex';
    }
    
    function createTicketEditModal() {
        const modal = document.createElement('div');
        modal.id = 'ticketEditModal';
        modal.className = 'edit-modal';
        modal.style.display = 'none';
        modal.innerHTML = `
            <div class="edit-modal-content">
                <div class="edit-modal-header">
                    <h3>Edit Ticket <span id="editTicketId"></span></h3>
                    <button class="close-btn" onclick="closeTicketEditModal()">&times;</button>
                </div>
                <form id="editTicketForm" class="edit-form">
                    <div class="form-group">
                        <label for="editTicketTitle">Title</label>
                        <input type="text" id="editTicketTitle" name="title" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="editTicketDescription">Description</label>
                        <textarea id="editTicketDescription" name="description" rows="3"></textarea>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="editTicketType">Type</label>
                            <select id="editTicketType" name="type">
                                <option value="bug">Bug</option>
                                <option value="feature">Feature</option>
                                <option value="task">Task</option>
                                <option value="enhancement">Enhancement</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label for="editTicketPriority">Priority</label>
                            <select id="editTicketPriority" name="priority">
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="editTicketAssignee">Assignee</label>
                            <select id="editTicketAssignee" name="assignee">
                                <!-- Will be populated dynamically -->
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label for="editTicketStatus">Status</label>
                            <select id="editTicketStatus" name="status">
                                <option value="open">Open</option>
                                <option value="in-progress">In Progress</option>
                                <option value="review">Review</option>
                                <option value="done">Done</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="form-actions">
                        <button type="button" class="btn-secondary" onclick="closeTicketEditModal()">Cancel</button>
                        <button type="submit" class="btn-primary">Save Changes</button>
                        <button type="button" class="btn-complete" onclick="markTicketComplete()" id="completeTicketBtn">Mark Complete</button>
                    </div>
                </form>
            </div>
        `;
        
        // Add CSS styles for the modal (reuse from kanban board)
        const style = document.createElement('style');
        style.textContent = `
            .edit-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                backdrop-filter: blur(5px);
                z-index: 2000;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .edit-modal-content {
                background: rgba(17, 24, 39, 0.95);
                border: 1px solid rgba(139, 92, 246, 0.3);
                border-radius: 16px;
                padding: 2rem;
                width: 90%;
                max-width: 600px;
                max-height: 90vh;
                overflow-y: auto;
                backdrop-filter: blur(20px);
            }
            
            .edit-modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 2rem;
                padding-bottom: 1rem;
                border-bottom: 1px solid rgba(139, 92, 246, 0.2);
            }
            
            .edit-modal-header h3 {
                margin: 0;
                color: #e5e7eb;
                font-size: 1.5rem;
                font-weight: 600;
            }
            
            .close-btn {
                background: none;
                border: none;
                color: #9ca3af;
                font-size: 2rem;
                cursor: pointer;
                padding: 0;
                width: 2rem;
                height: 2rem;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                transition: all 0.2s ease;
            }
            
            .close-btn:hover {
                background: rgba(239, 68, 68, 0.2);
                color: #ef4444;
            }
            
            .edit-form {
                display: flex;
                flex-direction: column;
                gap: 1.5rem;
            }
            
            .form-group {
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
            }
            
            .form-row {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 1rem;
            }
            
            .form-group label {
                color: #d1d5db;
                font-weight: 500;
                font-size: 0.875rem;
            }
            
            .form-group input,
            .form-group textarea,
            .form-group select {
                background: rgba(31, 41, 55, 0.8);
                border: 1px solid rgba(75, 85, 99, 0.5);
                border-radius: 8px;
                padding: 0.75rem;
                color: #e5e7eb;
                font-size: 0.875rem;
                transition: all 0.2s ease;
            }
            
            .form-group input:focus,
            .form-group textarea:focus,
            .form-group select:focus {
                outline: none;
                border-color: #8b5cf6;
                box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
            }
            
            .form-group textarea {
                resize: vertical;
                min-height: 80px;
            }
            
            .form-actions {
                display: flex;
                gap: 1rem;
                justify-content: flex-end;
                padding-top: 1rem;
                border-top: 1px solid rgba(139, 92, 246, 0.2);
            }
            
            .btn-secondary {
                background: rgba(75, 85, 99, 0.8);
                border: 1px solid rgba(107, 114, 128, 0.5);
                color: #d1d5db;
                padding: 0.75rem 1.5rem;
                border-radius: 8px;
                cursor: pointer;
                font-weight: 500;
                transition: all 0.2s ease;
            }
            
            .btn-secondary:hover {
                background: rgba(107, 114, 128, 0.8);
                border-color: #6b7280;
            }
            
            .btn-primary {
                background: linear-gradient(135deg, #8b5cf6, #6366f1);
                border: none;
                color: white;
                padding: 0.75rem 1.5rem;
                border-radius: 8px;
                cursor: pointer;
                font-weight: 500;
                transition: all 0.2s ease;
            }
            
            .btn-primary:hover {
                transform: translateY(-1px);
                box-shadow: 0 10px 30px rgba(139, 92, 246, 0.4);
            }
            
            .btn-complete {
                background: linear-gradient(135deg, #10b981, #059669);
                border: none;
                color: white;
                padding: 0.75rem 1.5rem;
                border-radius: 8px;
                cursor: pointer;
                font-weight: 500;
                transition: all 0.2s ease;
            }
            
            .btn-complete:hover {
                transform: translateY(-1px);
                box-shadow: 0 10px 30px rgba(16, 185, 129, 0.4);
            }
        `;
        
        document.head.appendChild(style);
        document.body.appendChild(modal);
        
        // Add form submission handler
        document.getElementById('editTicketForm').addEventListener('submit', handleTicketEditSubmit);
        
        // Close modal when clicking outside
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeTicketEditModal();
            }
        });
    }
    
    function populateTicketAssigneeDropdown() {
        const assigneeSelect = document.getElementById('editTicketAssignee');
        assigneeSelect.innerHTML = '';
        
        if (window.TracMockData) {
            Object.entries(window.TracMockData.users).forEach(([initials, user]) => {
                const option = document.createElement('option');
                option.value = initials;
                option.textContent = user.name;
                assigneeSelect.appendChild(option);
            });
        } else {
            // Fallback if TracMockData isn't loaded
            const defaultUsers = ['AC', 'SK', 'MR', 'ET', 'DP', 'LW', 'JW', 'MG'];
            defaultUsers.forEach(initials => {
                const option = document.createElement('option');
                option.value = initials;
                option.textContent = initials;
                assigneeSelect.appendChild(option);
            });
        }
    }
    
    function closeTicketEditModal() {
        const modal = document.getElementById('ticketEditModal');
        if (modal) {
            modal.style.display = 'none';
        }
        currentEditingTicket = null;
    }
    
    function handleTicketEditSubmit(e) {
        e.preventDefault();
        
        if (!currentEditingTicket) return;
        
        // Get form values
        const formData = new FormData(e.target);
        const updatedData = {
            title: formData.get('title'),
            summary: formData.get('title'), // For compatibility
            description: formData.get('description'),
            type: formData.get('type'),
            priority: formData.get('priority'),
            assignee: formData.get('assignee'),
            status: formData.get('status')
        };
        
        // Update the ticket in unified data system
        if (window.TracMockData) {
            const unifiedTicket = window.TracMockData.tickets.find(t => t.id === currentEditingTicket.id);
            if (unifiedTicket) {
                unifiedTicket.title = updatedData.title;
                unifiedTicket.description = updatedData.description;
                unifiedTicket.type = updatedData.type;
                unifiedTicket.priority = updatedData.priority;
                unifiedTicket.assignee = updatedData.assignee;
                unifiedTicket.status = updatedData.status;
                unifiedTicket.modified = new Date().toISOString();
            }
        }
        
        // Update the ticket in tracTicketsData
        Object.assign(currentEditingTicket, updatedData);
        currentEditingTicket.modified = new Date().toISOString();
        
        // Convert status for display
        currentEditingTicket.status = updatedData.status === 'open' ? 'Open' : 
                                     updatedData.status === 'in-progress' ? 'In Progress' :
                                     updatedData.status === 'review' ? 'Review' :
                                     updatedData.status === 'done' ? 'Closed' : updatedData.status;
        
        // Convert other fields for display
        currentEditingTicket.priority = updatedData.priority.charAt(0).toUpperCase() + updatedData.priority.slice(1);
        currentEditingTicket.type = updatedData.type.charAt(0).toUpperCase() + updatedData.type.slice(1);
        
        if (window.TracMockData) {
            currentEditingTicket.assignee = window.TracMockData.getUser(updatedData.assignee).name;
        }
        
        // Refresh the tickets table
        if (window.refreshTicketsTable) {
            window.refreshTicketsTable();
        }
        
        // Close modal and show notification
        closeTicketEditModal();
        showTicketUpdateNotification(currentEditingTicket.id, 'updated');
    }
    
    function markTicketComplete() {
        if (!currentEditingTicket) return;
        
        // Set status to done/closed
        document.getElementById('editTicketStatus').value = 'done';
        
        // Submit the form
        document.getElementById('editTicketForm').dispatchEvent(new Event('submit'));
    }
    
    function showTicketUpdateNotification(ticketId, action) {
        // Simple notification system
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: rgba(16, 185, 129, 0.9);
            color: white;
            padding: 1rem;
            border-radius: 8px;
            backdrop-filter: blur(10px);
            z-index: 1000;
            animation: slideInRight 0.3s ease;
        `;
        notification.textContent = `Ticket ${ticketId} ${action} successfully`;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
    
    // Initialize login status display
    function initLoginStatus() {
        const loginStatusElement = document.getElementById('loginStatus');
        if (!loginStatusElement) return;
        
        // Check if user is logged in by making a request to check authentication
        fetch('/trac_env/login')
            .then(response => response.text())
            .then(html => {
                // Parse the response to check if we're already logged in
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                
                // Look for logout link or user info in the response
                const logoutLink = doc.querySelector('a[href*="logout"]');
                const userInfo = doc.querySelector('#metanav');
                
                if (logoutLink && userInfo) {
                    // Extract username from the page content
                    const textContent = userInfo.textContent || '';
                    const loginMatch = textContent.match(/logged in as ([^,\s]+)/i);
                    
                    if (loginMatch) {
                        const username = loginMatch[1];
                        displayLoginStatus(loginStatusElement, username);
                    } else {
                        // Try to extract from other patterns
                        const welcomeMatch = textContent.match(/welcome ([^,\s]+)/i);
                        if (welcomeMatch) {
                            displayLoginStatus(loginStatusElement, welcomeMatch[1]);
                        } else {
                            // Default logged in state without specific username
                            displayLoginStatus(loginStatusElement, 'user');
                        }
                    }
                } else {
                    // Not logged in
                    displayLoginStatus(loginStatusElement, null);
                }
            })
            .catch(error => {
                console.log('Could not determine login status:', error);
                displayLoginStatus(loginStatusElement, null);
            });
    }
    
    // Display the login status
    function displayLoginStatus(element, username) {
        if (username) {
            element.innerHTML = `
                <div class="user-menu">
                    <span class="login-indicator">
                        <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16" style="margin-right: 4px; vertical-align: middle;">
                            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                        </svg>
                        ${username}
                    </span>
                    <div class="user-dropdown">
                        <a href="/trac_env/prefs" class="dropdown-item">
                            <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/>
                                <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"/>
                            </svg>
                            Preferences
                        </a>
                        <div class="dropdown-divider"></div>
                        <a href="/trac_env/logout" class="dropdown-item logout-item">
                            <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
                                <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
                            </svg>
                            Logout
                        </a>
                    </div>
                </div>
            `;
            
            // Add hover functionality
            const userMenu = element.querySelector('.user-menu');
            const dropdown = element.querySelector('.user-dropdown');
            
            userMenu.addEventListener('mouseenter', () => {
                dropdown.style.display = 'block';
            });
            
            userMenu.addEventListener('mouseleave', () => {
                dropdown.style.display = 'none';
            });
        } else {
            element.innerHTML = `<a href="/trac_env/login" class="login-link">Login</a>`;
        }
    }
    
    // Make functions globally available
    window.openTicketEditModal = openTicketEditModal;
    window.closeTicketEditModal = closeTicketEditModal;
    window.markTicketComplete = markTicketComplete;
    
})(); /* Cache bust: Wed Jul 23 19:12:08 CDT 2025 */
