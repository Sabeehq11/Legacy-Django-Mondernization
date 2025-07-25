/**
 * Trac Modern UI - Complete Interface Replacement
 * Creates a clean, professional interface inspired by modern business websites
 */

(function() {
    'use strict';
    
    console.log('Modern UI Script Loaded - Path:', window.location.pathname);
    
    // Check if we're on the homepage
    const path = window.location.pathname;
    const isHomepage = path === '/trac_env' || path === '/trac_env/' || path === '/trac_env/wiki';
    
    console.log('Is Homepage?', isHomepage);
    
    if (!isHomepage) {
        console.log('Not on homepage, skipping full UI replacement');
        return;
    }
    
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        console.log('DOM still loading, waiting...');
        document.addEventListener('DOMContentLoaded', initModernUI);
    } else {
        console.log('DOM ready, initializing now');
        initModernUI();
    }
    
    function initModernUI() {
        console.log('Starting Modern UI initialization');
        
        // Clear existing content and rebuild with modern UI
        document.body.innerHTML = '';
        document.body.className = 'modern-ui';
        
        // Create main structure
        createNavigation();
        createHeroSection();
        createFeaturesSection();
        createStatsSection();
        createFooter();
        
        // Add scroll effects
        initScrollEffects();
        
        console.log('Modern UI initialized successfully');
    }
    
    function createNavigation() {
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
                        <a href="/trac_env/newticket" class="btn btn-primary">New Ticket</a>
                        <button class="hamburger-menu" id="hamburger-toggle" aria-label="Open menu">
                            <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        // Create sidebar
        const sidebar = document.createElement('div');
        sidebar.className = 'sidebar-overlay';
        sidebar.id = 'sidebar-overlay';
        sidebar.innerHTML = `
            <div class="sidebar">
                <div class="sidebar-header">
                    <h3>Menu</h3>
                    <button class="sidebar-close" id="sidebar-close" aria-label="Close menu">
                        <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                    </button>
                </div>
                <div class="sidebar-content">
                    <div class="sidebar-section">
                        <h4>Account</h4>
                        <a href="/trac_env/prefs" class="sidebar-link">
                            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                            </svg>
                            Preferences
                        </a>
                        <a href="/trac_env/logout" class="sidebar-link">
                            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                            </svg>
                            Logout
                        </a>
                    </div>
                    <div class="sidebar-section">
                        <h4>Help & Support</h4>
                        <a href="/trac_env/wiki/TracGuide" class="sidebar-link">
                            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                            Help/Guide
                        </a>
                        <a href="/trac_env/about" class="sidebar-link">
                            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                            About Trac
                        </a>
                        <a href="https://trac.edgewall.org/wiki/TracSupport" class="sidebar-link" target="_blank">
                            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"/>
                            </svg>
                            Support Forum
                        </a>
                    </div>
                </div>
                </div>
            `;
            
        document.body.appendChild(nav);
        document.body.appendChild(sidebar);
        
        // Add event listeners for sidebar
        setupSidebarEvents();
        
        // Add navigation event listeners to prevent page reloads
        setupNavigationEventListeners();
    }
    
    function setupSidebarEvents() {
        const hamburgerToggle = document.getElementById('hamburger-toggle');
        const sidebarOverlay = document.getElementById('sidebar-overlay');
        const sidebarClose = document.getElementById('sidebar-close');
        
        // Open sidebar
        hamburgerToggle.addEventListener('click', function() {
            sidebarOverlay.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling when sidebar is open
        });
        
        // Close sidebar
        function closeSidebar() {
            sidebarOverlay.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
        }
        
        sidebarClose.addEventListener('click', closeSidebar);
        
        // Close sidebar when clicking on overlay
        sidebarOverlay.addEventListener('click', function(e) {
            if (e.target === sidebarOverlay) {
                closeSidebar();
            }
        });
        
        // Close sidebar with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && sidebarOverlay.classList.contains('active')) {
                closeSidebar();
            }
        });
    }
    
    function createHeroSection() {
        const hero = document.createElement('section');
        hero.className = 'hero-section';
        hero.innerHTML = `
            <div class="container">
                <div class="hero-content">
                    <div class="hero-text fade-in">
                        <div class="hero-subtitle">Project Management Suite</div>
                        <h1 class="hero-title" style="background: linear-gradient(135deg, #8b5cf6, #06b6d4); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">Track Issues,<br>Manage Projects,<br>Ship Faster</h1>
                        <div class="hero-tags">
                            <span class="tag">Bug Tracking</span>
                            <span class="tag">Milestones</span>
                            <span class="tag">Source Control</span>
                            <span class="tag">Wiki</span>
                        </div>
                        <p class="hero-description">
                            Trac is an enhanced wiki and issue tracking system for software development projects. 
                            It provides an integrated system for managing software projects, combining a flexible 
                            issue tracker with a powerful wiki engine and version control browser.
                        </p>
                        <div class="hero-actions">
                            <a href="/trac_env/timeline" class="btn btn-primary">View Timeline</a>
                            <a href="/trac_env/wiki" class="btn btn-secondary">Open Wiki</a>
                        </div>
                        
                        <div class="stats-preview mt-lg">
                            <div class="flex" style="align-items: center; gap: 1rem;">
                                <div class="rating-stars">
                                    <span style="color: #f59e0b;">★★★★★</span>
                                    <span style="margin-left: 0.5rem; font-weight: 600;">5.0</span>
                                </div>
                                <div style="display: flex; align-items: center;">
                                    <div class="avatar-group" style="display: flex; margin-left: 1rem;">
                                        <div style="width: 32px; height: 32px; border-radius: 50%; background: #e5e7eb; border: 2px solid white; margin-left: -8px;"></div>
                                        <div style="width: 32px; height: 32px; border-radius: 50%; background: #d1d5db; border: 2px solid white; margin-left: -8px;"></div>
                                        <div style="width: 32px; height: 32px; border-radius: 50%; background: #9ca3af; border: 2px solid white; margin-left: -8px;"></div>
                                        <div style="width: 32px; height: 32px; border-radius: 50%; background: #6366f1; border: 2px solid white; margin-left: -8px; display: flex; align-items: center; justify-content: center; color: white; font-size: 0.75rem;">+</div>
                                    </div>
                                    <div style="margin-left: 0.75rem;">
                                        <div style="font-weight: 600; font-size: 1.125rem;">10K+</div>
                                        <div style="font-size: 0.875rem; color: #6b7280;">active projects</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="hero-visual fade-in">
                        <div class="visual-card">
                            <div class="visual-gradient"></div>
                            <div style="text-align: center;">
                                <h3 style="font-size: 1.5rem; margin-bottom: 1rem; color: #374151;">Your Project<br>Progress</h3>
                                <div style="position: relative; width: 200px; height: 200px; margin: 0 auto;">
                                    <!-- Circular progress visualization -->
                                    <svg width="200" height="200" viewBox="0 0 200 200" style="transform: rotate(-90deg);">
                                        <circle cx="100" cy="100" r="90" fill="none" stroke="#e5e7eb" stroke-width="12"/>
                                        <circle cx="100" cy="100" r="90" fill="none" stroke="url(#gradient2)" stroke-width="12" 
                                                stroke-dasharray="565.5" stroke-dashoffset="141.375" stroke-linecap="round"/>
                                        <defs>
                                            <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                                                <stop offset="0%" stop-color="#6366f1"/>
                                                <stop offset="100%" stop-color="#8b5cf6"/>
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                    <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center;">
                                        <div style="font-size: 2.5rem; font-weight: 700; color: #6366f1;">75%</div>
                                        <div style="font-size: 0.875rem; color: #6b7280;">Complete</div>
                                    </div>
                                </div>
                                <div style="margin-top: 2rem; display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; text-align: left;">
                                    <div style="padding: 0.75rem; background: #f3f4f6; border-radius: 0.5rem;">
                                        <div style="font-size: 1.25rem; font-weight: 600; color: #6366f1;">142</div>
                                        <div style="font-size: 0.75rem; color: #6b7280;">Closed Tickets</div>
                                    </div>
                                    <div style="padding: 0.75rem; background: #f3f4f6; border-radius: 0.5rem;">
                                        <div style="font-size: 1.25rem; font-weight: 600; color: #8b5cf6;">48</div>
                                        <div style="font-size: 0.75rem; color: #6b7280;">Open Tickets</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(hero);
    }
    
    function createFeaturesSection() {
        const features = document.createElement('section');
        features.className = 'features-section';
        features.innerHTML = `
            <div class="container">
                <div class="section-header">
                    <h2 class="section-title">Everything You Need</h2>
                    <p class="section-subtitle">
                        Powerful features to help your team track issues, manage code, and collaborate effectively
                    </p>
                </div>
                
                <div class="features-grid">
                    <div class="feature-card fade-in">
                        <div class="feature-icon">
                            <svg width="24" height="24" fill="white" viewBox="0 0 24 24">
                                <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/>
                            </svg>
                        </div>
                        <h3 class="feature-title">Issue Tracking</h3>
                        <p class="feature-description">
                            Track bugs, feature requests, and tasks with a flexible ticket system. 
                            Customize workflows, priorities, and milestones to match your process.
                        </p>
                    </div>
                    
                    <div class="feature-card fade-in" style="animation-delay: 0.1s;">
                        <div class="feature-icon">
                            <svg width="24" height="24" fill="white" viewBox="0 0 24 24">
                                <path d="M3 18v-6a9 9 0 0118 0v6M3 18a2 2 0 002 2h14a2 2 0 002-2M3 18l2-2m16 2l-2-2m-7-2v6"/>
                            </svg>
                        </div>
                        <h3 class="feature-title">Source Browser</h3>
                        <p class="feature-description">
                            Browse your repository with syntax highlighting and revision history. 
                            Integrate with Git, Subversion, or Mercurial for seamless version control.
                        </p>
                    </div>
                    
                    <div class="feature-card fade-in" style="animation-delay: 0.2s;">
                        <div class="feature-icon">
                            <svg width="24" height="24" fill="white" viewBox="0 0 24 24">
                                <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                            </svg>
                        </div>
                        <h3 class="feature-title">Wiki Pages</h3>
                        <p class="feature-description">
                            Document everything with a built-in wiki. Create project documentation, 
                            API references, and team knowledge bases with rich formatting.
                        </p>
                    </div>
                    
                    <div class="feature-card fade-in" style="animation-delay: 0.3s;">
                        <div class="feature-icon">
                            <svg width="24" height="24" fill="white" viewBox="0 0 24 24">
                                <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
                            </svg>
                        </div>
                        <h3 class="feature-title">Timeline</h3>
                        <p class="feature-description">
                            View all project activity in one place. See commits, ticket changes, 
                            and wiki edits in a unified timeline for complete project visibility.
                        </p>
                    </div>
                    
                    <div class="feature-card fade-in" style="animation-delay: 0.4s;">
                        <div class="feature-icon">
                            <svg width="24" height="24" fill="white" viewBox="0 0 24 24">
                                <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                            </svg>
                        </div>
                        <h3 class="feature-title">Roadmap</h3>
                        <p class="feature-description">
                            Plan releases and track progress with milestone management. 
                            Visualize your project roadmap and keep stakeholders informed.
                        </p>
                    </div>
                    
                    <div class="feature-card fade-in" style="animation-delay: 0.5s;">
                        <div class="feature-icon">
                            <svg width="24" height="24" fill="white" viewBox="0 0 24 24">
                                <path d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"/>
                            </svg>
                        </div>
                        <h3 class="feature-title">Discussions</h3>
                        <p class="feature-description">
                            Collaborate on tickets with threaded comments and notifications. 
                            Keep conversations organized and team members informed.
                        </p>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(features);
    }
    
    function createStatsSection() {
        const stats = document.createElement('section');
        stats.className = 'stats-section';
        stats.innerHTML = `
            <div class="container">
                <div class="stats-grid">
                    <div class="stat-card fade-in">
                        <div class="stat-number">10K+</div>
                        <div class="stat-label">Active Projects</div>
                    </div>
                    <div class="stat-card fade-in" style="animation-delay: 0.1s;">
                        <div class="stat-number">50M+</div>
                        <div class="stat-label">Tickets Tracked</div>
                    </div>
                    <div class="stat-card fade-in" style="animation-delay: 0.2s;">
                        <div class="stat-number">99.9%</div>
                        <div class="stat-label">Uptime</div>
                    </div>
                    <div class="stat-card fade-in" style="animation-delay: 0.3s;">
                        <div class="stat-number">24/7</div>
                        <div class="stat-label">Support Available</div>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(stats);
    }
    
    function createFooter() {
        const footer = document.createElement('footer');
        footer.className = 'modern-footer';
        footer.innerHTML = `
            <div class="container">
                <div class="footer-content">
                    <div class="footer-section">
                        <h4>Trac</h4>
                        <p style="margin-top: 1rem;">
                            Open source project management and issue tracking system for development teams.
                        </p>
                    </div>
                    <div class="footer-section">
                        <h4>Quick Links</h4>
                        <div class="footer-links">
                            <a href="/trac_env/wiki" class="footer-link">Documentation</a>
                            <a href="/trac_env/timeline" class="footer-link">Timeline</a>
                            <a href="/trac_env/report/1" class="footer-link">View Tickets</a>
                            <a href="/trac_env/newticket" class="footer-link">Create Ticket</a>
                        </div>
                    </div>
                    <div class="footer-section">
                        <h4>Browse</h4>
                        <div class="footer-links">
                            <a href="/trac_env/browser" class="footer-link">Source Code</a>
                            <a href="/trac_env/roadmap" class="footer-link">Roadmap</a>
                            <a href="/trac_env/search" class="footer-link">Search</a>
                            <a href="/trac_env/admin" class="footer-link">Admin</a>
                        </div>
                    </div>
                    <div class="footer-section">
                        <h4>Community</h4>
                        <div class="footer-links">
                            <a href="https://trac.edgewall.org/" class="footer-link" target="_blank">Official Site</a>
                            <a href="https://trac.edgewall.org/wiki/TracGuide" class="footer-link" target="_blank">User Guide</a>
                            <a href="https://trac.edgewall.org/wiki/TracSupport" class="footer-link" target="_blank">Get Help</a>
                            <a href="https://trac.edgewall.org/wiki/TracDev" class="footer-link" target="_blank">Development</a>
                        </div>
                    </div>
                </div>
                <div class="footer-bottom">
                    <p>&copy; 2024 Trac. Powered by Edgewall Software.</p>
                    </div>
                </div>
            `;
        document.body.appendChild(footer);
    }
    
    function initScrollEffects() {
        let lastScrollTop = 0;
        const nav = document.querySelector('.modern-nav');
        
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Add shadow to nav on scroll
            if (scrollTop > 50) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
            
            lastScrollTop = scrollTop;
        });
        
        // Intersection Observer for fade-in animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        // Observe all fade-in elements
        document.querySelectorAll('.fade-in').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }
    
    // Function to set up navigation event listeners to prevent page reloads
    function setupNavigationEventListeners() {
        console.log('Setting up navigation event listeners to prevent page reloads (homepage)...');
        
        // Get all navigation links on the homepage
        const navLinks = document.querySelectorAll('.nav-link, .modern-nav a[href*="/trac_env"], .hero-actions a, .footer-link');
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (!href || href === '#' || href.startsWith('http') || href.startsWith('mailto:')) {
                return; // Skip external links, empty links, etc.
            }
            
            // CRITICAL FIX: Skip newticket links to allow full page reloads for proper localStorage handling
            if (href.includes('/newticket')) {
                console.log('Skipping SPA navigation for homepage newticket link:', href);
                return;
            }
            
            console.log('Adding no-reload listener to homepage link:', href);
            
            link.addEventListener('click', function(e) {
                e.preventDefault(); // Prevent default navigation
                
                console.log('Homepage navigation clicked:', href, '- preventing page reload');
                
                // For homepage links, we need to navigate to the actual page
                // since the homepage has the complete UI replacement
                if (href !== window.location.pathname) {
                    // Update URL and navigate
                    history.pushState({page: href}, '', href);
                    console.log('Updated URL to:', href);
                    
                    // Navigate to the target page content
                    navigateToPage(href);
                }
                
                return false;
            });
        });
        
        console.log(`Navigation event listeners added to ${navLinks.length} homepage links`);
    }
    
    // Function to navigate to a page from the homepage
    function navigateToPage(href) {
        console.log('Navigating from homepage to:', href);
        
        // Since we're on the homepage with complete UI replacement,
        // we need to load the target page content
        window.location.assign(href);
    }
})(); 