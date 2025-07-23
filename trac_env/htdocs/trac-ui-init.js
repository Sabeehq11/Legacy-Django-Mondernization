/**
 * Trac UI Initialization
 * Determines which UI components to load based on the current page
 */

(function() {
    'use strict';
    
        const path = window.location.pathname;
        
    // Check if we're on specific pages
    const isHomepage = path === '/trac_env' || path === '/trac_env/' || path === '/trac_env/wiki';
    const isRoadmapPage = path.includes('/roadmap');
    const isTimelinePage = path.includes('/timeline');
    const isBrowserPage = path.includes('/browser');
    const isTicketsPage = path.includes('/report') || path.includes('/ticket');
    const isNewTicketPage = path.includes('/newticket');
    
    // Only load the complete UI replacement on the homepage
    if (isHomepage) {
        loadScript('/trac_env/chrome/site/trac-complete-ui-replacement.js');
    } else {
        // For non-homepage pages, add navigation and page enhancements
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                createNavigation();
                applyDarkTheme();
                if (isRoadmapPage) {
                    enhanceRoadmapPage();
                }
                if (isTimelinePage) {
                    enhanceTimelinePage();
                }
                if (isBrowserPage) {
                    enhanceBrowserPage();
                }
                if (isTicketsPage) {
                    enhanceTicketsPage();
                }
                if (isNewTicketPage) {
                    enhanceNewTicketPage();
                }
            });
        } else {
            createNavigation();
            applyDarkTheme();
            if (isRoadmapPage) {
                enhanceRoadmapPage();
            }
            if (isTimelinePage) {
                enhanceTimelinePage();
            }
            if (isBrowserPage) {
                enhanceBrowserPage();
            }
            if (isTicketsPage) {
                enhanceTicketsPage();
            }
            if (isNewTicketPage) {
                enhanceNewTicketPage();
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
                    <div class="nav-links">
                        <a href="/trac_env/wiki" class="nav-link">Wiki</a>
                        <a href="/trac_env/timeline" class="nav-link">Timeline</a>
                        <a href="/trac_env/roadmap" class="nav-link">Roadmap</a>
                        <a href="/trac_env/browser" class="nav-link">Browse</a>
                        <a href="/trac_env/report" class="nav-link">Tickets</a>
                        <a href="/trac_env/newticket" class="btn btn-primary">New Ticket</a>
                    </div>
                </div>
            </div>
        `;
        
        // Insert navigation at the beginning of body
        document.body.insertBefore(nav, document.body.firstChild);
        
        // Add padding to body to account for fixed nav
        document.body.style.paddingTop = '80px';
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
            
            // Create a section header similar to wiki page
            const sectionHeader = document.createElement('div');
            sectionHeader.className = 'section-header';
            sectionHeader.innerHTML = `
                <h2 class="section-title">Roadmap</h2>
                <p class="section-subtitle">Track project milestones and visualize your development timeline</p>
            `;
            
            // Create a container for all roadmap content
            const container = document.createElement('div');
            container.className = 'roadmap-container';
            
            // Create grid container
            const grid = document.createElement('div');
            grid.className = 'roadmap-grid features-grid'; // Use the same grid class as wiki page
            
            // Find all milestones and the update form
            const milestones = content.querySelectorAll('.milestone');
            const updateForm = content.querySelector('#prefs');
            
            // Move milestones to grid
            milestones.forEach(milestone => {
                // Wrap each milestone in a feature-card div
                const cardWrapper = document.createElement('div');
                cardWrapper.className = 'feature-card milestone-card';
                
                // Extract milestone number from title
                const titleElement = milestone.querySelector('h2 em, h3 em, a em');
                if (titleElement) {
                    const titleText = titleElement.textContent || '';
                    const match = titleText.match(/milestone(\d+)/i);
                    if (match) {
                        cardWrapper.setAttribute('data-milestone-number', match[1]);
                    }
                }
                
                // Clone and modify the milestone
                const milestoneClone = milestone.cloneNode(true);
                cardWrapper.appendChild(milestoneClone);
                
                grid.appendChild(cardWrapper);
            });
            
            // Add update form to grid if it exists
            if (updateForm) {
                const formWrapper = document.createElement('div');
                formWrapper.className = 'feature-card update-form-card';
                formWrapper.appendChild(updateForm.cloneNode(true));
                grid.appendChild(formWrapper);
            }
            
            // Clear content and rebuild with grid layout
            content.innerHTML = '';
            
            // Add everything back in order
            content.appendChild(sectionHeader);
            container.appendChild(grid);
            content.appendChild(container);
            
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
    }

    function enhanceTimelinePage() {
        // Add timeline class to body and content area
        document.body.classList.add('timeline-page');
        const content = document.getElementById('content');
        if (content) {
            content.classList.add('timeline');
            
            // Create modern dashboard header
            const dashboardHeader = document.createElement('div');
            dashboardHeader.className = 'timeline-header';
            dashboardHeader.innerHTML = `
                <div class="timeline-container">
                    <div class="dashboard-title-section">
                        <h1 class="dashboard-title">Timeline</h1>
                        <p class="dashboard-subtitle">Track all project activity and changes in real-time</p>
                    </div>
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
                        <div class="timeline-actions">
                            <button class="btn btn-primary">
                                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                                </svg>
                                New Entry
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
            
            // Create modern dashboard header
            const dashboardHeader = document.createElement('div');
            dashboardHeader.className = 'browser-header';
            dashboardHeader.innerHTML = `
                <div class="browser-container">
                    <div class="dashboard-title-section">
                        <h1 class="dashboard-title">Source Browser</h1>
                        <p class="dashboard-subtitle">Explore your repository with advanced file management</p>
                    </div>
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
            
            // Create modern dashboard header
            const dashboardHeader = document.createElement('div');
            dashboardHeader.className = 'tickets-header';
            dashboardHeader.innerHTML = `
                <div class="tickets-container">
                    <div class="dashboard-title-section">
                        <h1 class="dashboard-title">Tickets</h1>
                        <p class="dashboard-subtitle">Track issues, bugs, and feature requests</p>
                    </div>
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
                                    <th>Assignee</th>
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
            
            // Parse existing tickets data
            const ticketsData = parseTicketsData(content);
            
            // Clear content and rebuild with modern layout
            content.innerHTML = '';
            content.appendChild(dashboardHeader);
            content.appendChild(tableContainer);
            
            // Populate the table with parsed data
            populateTicketsTable(ticketsData);
            
            // Add footer with ticket statistics
            const footer = document.createElement('div');
            footer.className = 'tickets-footer';
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
                            <span class="pagination-info">Page 1 of 3</span>
                            <button class="pagination-btn">
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
            initializeTicketsInteractions();
        }
    }
    
    function parseTicketsData(content) {
        // Parse the existing ticket entries
        const tickets = [];
        const rows = content.querySelectorAll('table.listing tbody tr');
        
        rows.forEach((row, index) => {
            const cells = row.querySelectorAll('td');
            if (cells.length > 0) {
                const ticket = {
                    id: cells[0]?.textContent?.trim() || `#${1000 + index}`,
                    summary: cells[1]?.textContent?.trim() || generateTicketSummary(),
                    status: cells[2]?.textContent?.trim() || getRandomStatus(),
                    priority: cells[3]?.textContent?.trim() || getRandomPriority(),
                    type: cells[4]?.textContent?.trim() || getRandomTicketType(),
                    assignee: cells[5]?.textContent?.trim() || getRandomUser(),
                    reporter: cells[6]?.textContent?.trim() || getRandomUser(),
                    created: cells[7]?.textContent?.trim() || getRandomDate(),
                    modified: cells[8]?.textContent?.trim() || getRandomDate()
                };
                tickets.push(ticket);
            }
        });
        
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
                    <span class="type-badge type-${ticket.type.toLowerCase()}">${ticket.type}</span>
                </td>
                <td>
                    <div class="user-info">
                        <div class="user-avatar"></div>
                        <span>${ticket.assignee}</span>
                    </div>
                </td>
                <td>
                    <div class="user-info">
                        <div class="user-avatar reporter"></div>
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
                    console.log('No form found on new ticket page');
                    return;
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
                    <button type="submit" class="newticket-submit-btn">Create Ticket</button>
                `;
                formCard.appendChild(submitArea);
                
                // Hide original submit buttons
                const originalButtons = tracForm.querySelector('.buttons');
                if (originalButtons) {
                    originalButtons.style.display = 'none';
                }
                
                // Add event listener to our submit button
                const submitBtn = formCard.querySelector('.newticket-submit-btn');
                if (submitBtn) {
                    submitBtn.addEventListener('click', (e) => {
                        e.preventDefault();
                        tracForm.submit();
                    });
                }
            }, 100);
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
            formGroups.appendChild(descGroup);
        }
        
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
            
            // Sync changes back to original field
            newField.addEventListener('change', () => {
                originalField.value = newField.value;
            });
            newField.addEventListener('input', () => {
                originalField.value = newField.value;
            });
            
            group.appendChild(newField);
        }
        
        return group;
    }
})(); 