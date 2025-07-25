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
            
            // Get all tickets from Trac database and visual tickets
            let allTickets = [];
            // Include visual tickets if they exist
            if (window.tracTicketsData && window.tracTicketsData.length > 0) {
                allTickets.push(...window.tracTicketsData);
                console.log(`Roadmap: Added ${window.tracTicketsData.length} visual tickets`);
            }
            
            // Function to refresh roadmap display
            function refreshRoadmap() {
                console.log('Refreshing roadmap display...');
                
                // Include visual tickets in roadmap refresh
                let currentTickets = [];
                if (window.tracTicketsData && window.tracTicketsData.length > 0) {
                    currentTickets.push(...window.tracTicketsData);
                    console.log(`Roadmap refresh: Added ${window.tracTicketsData.length} visual tickets`);
                }
                
                console.log(`Roadmap refresh: Working with ${currentTickets.length} tickets`);
                
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
                
                // Use the captured original milestones
                const milestones = originalMilestones;
                const updateForm = originalUpdateForm;
                
                // Move milestones to grid and add associated tickets
                milestones.forEach(milestone => {
                    // Wrap each milestone in a feature-card div
                    const cardWrapper = document.createElement('div');
                    cardWrapper.className = 'feature-card milestone-card';
                    
                    // Extract milestone name/number from title
                    const titleElement = milestone.querySelector('h2 em, h3 em, a em, h2 a, h3 a');
                    let milestoneName = '';
                    let milestoneNumber = '';
                    
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
                    
                    // Clone and modify the milestone
                    const milestoneClone = milestone.cloneNode(true);
                    cardWrapper.appendChild(milestoneClone);
                    
                    // Find tickets assigned to this milestone
                    const milestoneTickets = allTickets.filter(ticket => {
                        if (!ticket.milestone) return false;
                        
                        // Match by milestone name or number
                        const ticketMilestone = ticket.milestone.toLowerCase();
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
            
            // CRITICAL: Capture original Trac tickets data BEFORE UI replacement
            console.log('Capturing original Trac tickets data before UI replacement...');
            const originalTicketsData = parseTicketsData(content);
            
            // LOAD VISUAL TICKETS FROM SESSION STORAGE
            let visualTickets = [];
            try {
                visualTickets = JSON.parse(sessionStorage.getItem('visualTickets') || '[]');
                console.log(`📦 LOADED ${visualTickets.length} VISUAL TICKETS FROM SESSION`);
            } catch (e) {
                console.error('Error loading visual tickets:', e);
                visualTickets = [];
            }
            
            // MERGE VISUAL TICKETS WITH TRAC TICKETS
            window.tracTicketsData = [...visualTickets, ...originalTicketsData]; // Visual tickets first
            console.log(`Captured ${originalTicketsData.length} Trac tickets + ${visualTickets.length} visual tickets = ${window.tracTicketsData.length} total`);
            
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
                        <div class="hero-stats">
                            <div class="stat-item">
                                <span class="stat-value">${window.tracTicketsData.filter(t => t.status === 'open' || t.status === 'new').length}</span>
                                <span class="stat-label">Open Tickets</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-value">${window.tracTicketsData.filter(t => t.status === 'in-progress' || t.status === 'assigned').length}</span>
                                <span class="stat-label">In Progress</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-value">${window.tracTicketsData.filter(t => t.status === 'closed' || t.status === 'fixed').length}</span>
                                <span class="stat-label">Closed</span>
                            </div>
                        </div>
                    </div>
                    <div class="hero-visual">
                        <div class="tickets-visual">
                            <div class="ticket-stat-card open">
                                <h3>${window.tracTicketsData.filter(t => t.status === 'open' || t.status === 'new').length}</h3>
                                <p>Open</p>
                            </div>
                            <div class="ticket-stat-card progress">
                                <h3>${window.tracTicketsData.filter(t => t.status === 'in-progress' || t.status === 'assigned').length}</h3>
                                <p>In Progress</p>
                            </div>
                            <div class="ticket-stat-card closed">
                                <h3>${window.tracTicketsData.filter(t => t.status === 'closed' || t.status === 'fixed').length}</h3>
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
                
                // Update footer statistics
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
    
    // AI Assistant for ticket description enhancement
    function addAIAssistant(descGroup, descriptionField) {
        // Create AI assistant container
        const aiContainer = document.createElement('div');
        aiContainer.className = 'ai-assistant-container';
        aiContainer.style.cssText = `
            margin-top: 0.75rem;
            padding: 1rem;
            background: rgba(139, 92, 246, 0.1);
            border: 1px solid rgba(139, 92, 246, 0.3);
            border-radius: 12px;
            backdrop-filter: blur(10px);
        `;
        
        aiContainer.innerHTML = `
            <div class="ai-assistant-header">
                <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.75rem;">
                    <div style="width: 24px; height: 24px; background: linear-gradient(135deg, #8b5cf6, #06b6d4); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                        🤖
                    </div>
                    <span style="font-weight: 600; color: #f9fafb;">AI Ticket Assistant</span>
                </div>
                <p style="font-size: 0.875rem; color: #d1d5db; margin: 0;">
                    Provide a brief problem description and I'll help you write a more detailed ticket.
                </p>
            </div>
            <div class="ai-assistant-content">
                <div style="display: flex; gap: 0.75rem; margin-bottom: 0.75rem;">
                    <input type="text" id="ai-brief-input" placeholder="e.g., Login button not working on mobile"
                           style="flex: 1; background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.2); border-radius: 8px; padding: 0.75rem; color: #f8fafc; font-size: 0.875rem;">
                    <button id="ai-suggest-btn" style="background: linear-gradient(135deg, #8b5cf6, #06b6d4); border: none; border-radius: 8px; padding: 0.75rem 1.5rem; color: white; font-weight: 600; cursor: pointer; transition: all 0.2s;">
                        ✨ Auto-Suggest
                    </button>
                </div>
                <div id="ai-suggestions" style="display: none;">
                    <div style="background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 8px; padding: 1rem; margin-bottom: 0.75rem;">
                        <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
                            <div style="width: 8px; height: 8px; background: #10b981; border-radius: 50%;"></div>
                            <span style="font-size: 0.875rem; font-weight: 600; color: #10b981;">AI Suggestion</span>
                        </div>
                        <div id="ai-suggestion-text" style="color: #f9fafb; font-size: 0.875rem; line-height: 1.5; white-space: pre-wrap;"></div>
                    </div>
                    <div style="display: flex; gap: 0.5rem;">
                        <button id="ai-use-btn" style="background: #10b981; border: none; border-radius: 6px; padding: 0.5rem 1rem; color: white; font-size: 0.875rem; cursor: pointer;">
                            Use Suggestion
                        </button>
                        <button id="ai-regenerate-btn" style="background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.2); border-radius: 6px; padding: 0.5rem 1rem; color: #d1d5db; font-size: 0.875rem; cursor: pointer;">
                            🔄 Regenerate
                        </button>
                    </div>
                </div>
                <div id="ai-loading" style="display: none; text-align: center; padding: 1rem;">
                    <div style="display: inline-flex; align-items: center; gap: 0.5rem; color: #8b5cf6;">
                        <div style="width: 16px; height: 16px; border: 2px solid rgba(139, 92, 246, 0.3); border-top: 2px solid #8b5cf6; border-radius: 50%; animation: spin 1s linear infinite;"></div>
                        AI is thinking...
                    </div>
                </div>
            </div>
        `;
        
        // Add CSS animation for spinner
        const style = document.createElement('style');
        style.textContent = `
            @keyframes spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
        
        // Insert AI container after the form group
        descGroup.appendChild(aiContainer);
        
        // Event listeners
        const briefInput = aiContainer.querySelector('#ai-brief-input');
        const suggestBtn = aiContainer.querySelector('#ai-suggest-btn');
        const useBtn = aiContainer.querySelector('#ai-use-btn');
        const regenerateBtn = aiContainer.querySelector('#ai-regenerate-btn');
        const suggestionsDiv = aiContainer.querySelector('#ai-suggestions');
        const loadingDiv = aiContainer.querySelector('#ai-loading');
        const suggestionText = aiContainer.querySelector('#ai-suggestion-text');
        
        // Auto-suggest on button click
        suggestBtn.addEventListener('click', async () => {
            const briefDescription = briefInput.value.trim();
            if (!briefDescription) {
                briefInput.style.borderColor = '#ef4444';
                setTimeout(() => briefInput.style.borderColor = 'rgba(255, 255, 255, 0.2)', 2000);
                return;
            }
            
            await generateAISuggestion(briefDescription);
        });
        
        // Auto-suggest on Enter key
        briefInput.addEventListener('keypress', async (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                suggestBtn.click();
            }
        });
        
        // Use suggestion
        useBtn.addEventListener('click', () => {
            const suggestion = suggestionText.textContent;
            if (suggestion && descriptionField) {
                descriptionField.value = suggestion;
                descriptionField.dispatchEvent(new Event('input', { bubbles: true }));
                
                // Show success animation
                useBtn.textContent = '✅ Applied!';
                useBtn.style.background = '#10b981';
                setTimeout(() => {
                    useBtn.textContent = 'Use Suggestion';
                    useBtn.style.background = '#10b981';
                }, 2000);
            }
        });
        
        // Regenerate suggestion
        regenerateBtn.addEventListener('click', async () => {
            const briefDescription = briefInput.value.trim();
            if (briefDescription) {
                await generateAISuggestion(briefDescription);
            }
        });
        
        async function generateAISuggestion(briefDescription) {
            loadingDiv.style.display = 'block';
            suggestionsDiv.style.display = 'none';
            suggestBtn.disabled = true;
            
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
                
                const response = await callOpenAI(briefDescription, context);
                
                if (response && response.suggestion) {
                    suggestionText.textContent = response.suggestion;
                    suggestionsDiv.style.display = 'block';
                } else {
                    throw new Error('No suggestion received');
                }
            } catch (error) {
                console.error('AI suggestion error:', error);
                // Show fallback suggestion
                showFallbackSuggestion(briefDescription);
            } finally {
                loadingDiv.style.display = 'none';
                suggestBtn.disabled = false;
            }
        }
        
        async function callOpenAI(briefDescription, context) {
            // This would call your OpenAI API
            // For now, we'll use a mock response with intelligent suggestions
            return new Promise((resolve) => {
                setTimeout(() => {
                    const suggestions = {
                        'login': `**Issue Summary:**
Login functionality is not working properly on mobile devices.

**Steps to Reproduce:**
1. Open the application on a mobile device
2. Navigate to the login page
3. Enter valid credentials
4. Tap the login button

**Expected Behavior:**
User should be successfully logged in and redirected to the dashboard.

**Actual Behavior:**
${briefDescription}

**Environment:**
- Device: Mobile (specify model if known)
- Browser: (specify browser and version)
- Operating System: (iOS/Android version)

**Additional Information:**
This issue may be related to responsive design or touch event handling on mobile devices.

**Priority:** High - Blocking user access on mobile devices`,

                        'button': `**Issue Summary:**
Button functionality issue requiring investigation.

**Detailed Description:**
${briefDescription}

**Steps to Reproduce:**
1. Navigate to the relevant page/section
2. Locate the affected button
3. Click/tap the button
4. Observe the behavior

**Expected Behavior:**
Button should perform its intended action correctly.

**Actual Behavior:**
Button is not functioning as expected.

**Impact:**
This affects user workflow and may prevent completion of important tasks.

**Suggested Investigation:**
- Check browser console for JavaScript errors
- Verify button event handlers are properly attached
- Test across different browsers and devices`,

                        'mobile': `**Issue Summary:**
Mobile-specific functionality issue.

**Problem Description:**
${briefDescription}

**Device Information:**
- Device Type: Mobile
- Screen Size: [Please specify]
- Operating System: [iOS/Android version]
- Browser: [Browser name and version]

**Steps to Reproduce:**
1. Access the application on a mobile device
2. [Specific steps to reproduce the issue]

**Expected vs Actual Behavior:**
**Expected:** Normal functionality on mobile devices
**Actual:** ${briefDescription}

**Mobile-Specific Considerations:**
- Touch vs click events
- Responsive design issues
- Viewport scaling
- Mobile browser compatibility

**Priority:** High - Mobile users represent a significant portion of our user base`
                    };
                    
                    // Find the best matching suggestion
                    let suggestion = '';
                    const lowerBrief = briefDescription.toLowerCase();
                    
                    if (lowerBrief.includes('login')) {
                        suggestion = suggestions.login;
                    } else if (lowerBrief.includes('button')) {
                        suggestion = suggestions.button;
                    } else if (lowerBrief.includes('mobile')) {
                        suggestion = suggestions.mobile;
                    } else {
                        // Generic template
                        suggestion = `**Issue Summary:**
${briefDescription}

**Detailed Description:**
Please provide a more detailed description of the issue, including:

**Steps to Reproduce:**
1. [First step]
2. [Second step]
3. [Third step]

**Expected Behavior:**
[What should happen]

**Actual Behavior:**
[What actually happens]

**Environment:**
- Browser: [Browser name and version]
- Operating System: [OS and version]
- Device: [Desktop/Mobile/Tablet]

**Additional Information:**
[Any other relevant details, error messages, or context]

**Impact:**
[How this affects users or the system]`;
                    }
                    
                    resolve({ suggestion });
                }, 1500); // Simulate API delay
            });
        }
        
        function showFallbackSuggestion(briefDescription) {
            const fallback = `**Issue Summary:**
${briefDescription}

**Description:**
[Please expand on the issue details]

**Steps to Reproduce:**
1. [Describe the steps to reproduce this issue]
2. [Include specific actions taken]

**Expected Result:**
[What should happen]

**Actual Result:**
[What actually happens]

**Additional Information:**
[Any relevant details, error messages, or context]`;

            suggestionText.textContent = fallback;
            suggestionsDiv.style.display = 'block';
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
    
    // Notification Center Functionality  
    function initializeNotificationCenter() {
        const notificationBell = document.getElementById('notification-bell');
        const notificationDropdown = document.getElementById('notification-dropdown');
        const notificationCount = document.getElementById('notification-count');
        
        if (!notificationBell || !notificationDropdown || !notificationCount) return;
        
        // Mock notifications
        const notifications = [
            {
                id: 1,
                title: 'You were assigned Ticket #042',
                description: 'Fix login authentication bug',
                time: '2 minutes ago',
                unread: true,
                link: '/trac_env/ticket/42'
            },
            {
                id: 2, 
                title: 'Comment on Ticket #038',
                description: 'Sarah added a comment to your ticket',
                time: '15 minutes ago',
                unread: true,
                link: '/trac_env/ticket/38'
            },
            {
                id: 3,
                title: 'Milestone deadline approaching',
                description: 'v1.2 Release due in 3 days',
                time: '1 hour ago',
                unread: false,
                link: '/trac_env/milestone/v1.2'
            },
            {
                id: 4,
                title: 'New ticket created',
                description: 'Mobile responsive fixes #045',
                time: '2 hours ago',
                unread: false,
                link: '/trac_env/ticket/45'
            }
        ];
        
        // Update notification count
        const unreadCount = notifications.filter(n => n.unread).length;
        if (unreadCount > 0) {
            notificationCount.textContent = unreadCount;
            notificationCount.classList.remove('hidden');
        } else {
            notificationCount.classList.add('hidden');
        }
        
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
            let html = `
                <div class="notification-header">
                    <div class="notification-title">Notifications</div>
                    <div class="notification-subtitle">${notifications.length} total, ${notifications.filter(n => n.unread).length} unread</div>
                </div>
                <div class="notification-list">
            `;
            
            notifications.forEach(notification => {
                html += `
                    <div class="notification-item ${notification.unread ? 'unread' : ''}" 
                         onclick="handleNotificationClick('${notification.link}', ${notification.id})">
                        <div class="notification-content">
                            <strong>${notification.title}</strong><br>
                            ${notification.description}
                        </div>
                        <div class="notification-time">${notification.time}</div>
                    </div>
                `;
            });
            
            html += `
                </div>
                <div class="notification-footer">
                    <span class="notification-clear" onclick="clearAllNotifications()">Mark all as read</span>
                </div>
            `;
            
            notificationDropdown.innerHTML = html;
            notificationDropdown.classList.remove('hidden');
        }
        
        window.handleNotificationClick = function(link, notificationId) {
            // Mark as read
            const notification = notifications.find(n => n.id === notificationId);
            if (notification) {
                notification.unread = false;
            }
            
            // Update count
            const newUnreadCount = notifications.filter(n => n.unread).length;
            if (newUnreadCount > 0) {
                notificationCount.textContent = newUnreadCount;
            } else {
                notificationCount.classList.add('hidden');
            }
            
            // Navigate
            console.log('Navigate to:', link);
            notificationDropdown.classList.add('hidden');
        };
        
        window.clearAllNotifications = function() {
            notifications.forEach(n => n.unread = false);
            notificationCount.classList.add('hidden');
            notificationDropdown.classList.add('hidden');
        };
        
        // Simulate new notifications (for demo)
        setInterval(() => {
            if (Math.random() < 0.1) { // 10% chance every 30 seconds
                addNewNotification();
            }
        }, 30000);
        
        function addNewNotification() {
            const newNotification = {
                id: Date.now(),
                title: 'New activity',
                description: 'Something happened in your project',
                time: 'Just now',
                unread: true,
                link: '/trac_env/timeline'
            };
            
            notifications.unshift(newNotification);
            
            // Update count
            const unreadCount = notifications.filter(n => n.unread).length;
            notificationCount.textContent = unreadCount;
            notificationCount.classList.remove('hidden');
            
            // Show brief animation
            notificationBell.style.animation = 'none';
            setTimeout(() => {
                notificationBell.style.animation = 'pulse 1s ease-in-out 3';
            }, 10);
        }
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
})(); /* Cache bust: Wed Jul 23 19:12:08 CDT 2025 */
