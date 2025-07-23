/**
 * Trac Modern UI Injection
 * Transforms the Wiki page to match the Raul Business Agency demo design
 */

(function() {
  'use strict';

  // Only run on Wiki pages
  if (!window.location.pathname.includes('/wiki')) return;

  // Wait for DOM to be ready
  function injectModernUI() {
    // Find the main content area
    const contentArea = document.querySelector('#content');
    if (!contentArea) return;

    // Check if we already injected (to avoid duplicates)
    if (document.querySelector('.hero-section')) return;

    // Hide the original wiki content temporarily
    const wikiContent = document.querySelector('.wikipage');
    if (wikiContent) {
      wikiContent.style.display = 'none';
    }

    // Create hero section
    const heroSection = document.createElement('div');
    heroSection.className = 'hero-section';
    heroSection.innerHTML = `
      <div class="hero-content">
        <h1 class="hero-title">Project visibility.<br>Simplified.</h1>
        <p class="hero-subtitle">Browse your repository, track issues, and ship faster — all from one clean dashboard.</p>
        <button class="hero-cta" onclick="location.href='#getting-started'">Start Tracking Now →</button>
      </div>
      <div class="hero-visual">
        <div class="hero-card">
          <div class="hero-stat">
            <div class="stat-number">721+</div>
            <div class="stat-label">Total Commits</div>
          </div>
          <div class="hero-stat">
            <div class="stat-number">1000+</div>
            <div class="stat-label">Lines Changed</div>
          </div>
          <div class="hero-orb"></div>
        </div>
      </div>
    `;

    // Create feature cards section
    const featuresSection = document.createElement('div');
    featuresSection.className = 'features-section';
    featuresSection.innerHTML = `
      <div class="features-grid">
        <div class="feature-card">
          <div class="feature-icon">🗂️</div>
          <h3>Browse Repository</h3>
          <p>View your source files, diffs, and commit history with our clean code browser interface.</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">🎫</div>
          <h3>Manage Tickets</h3>
          <p>Create, assign, and close issues in one place with our intuitive ticket system.</p>
        </div>
        <div class="feature-card feature-card-coral">
          <div class="feature-icon">📈</div>
          <h3>View Timeline</h3>
          <p>Follow changes and milestones with ease using our visual timeline dashboard.</p>
        </div>
      </div>
    `;

    // Create stats section
    const statsSection = document.createElement('div');
    statsSection.className = 'stats-section';
    statsSection.innerHTML = `
      <h2 class="stats-title">Your project at a glance</h2>
      <p class="stats-subtitle">Real-time metrics to keep your team aligned</p>
      <div class="stats-grid">
        <div class="stat-box">
          <div class="stat-icon">📋</div>
          <div class="stat-value">128</div>
          <div class="stat-name">Tickets</div>
          <div class="stat-desc">Open issues to triage</div>
        </div>
        <div class="stat-box">
          <div class="stat-icon">💾</div>
          <div class="stat-value">37</div>
          <div class="stat-name">Commits</div>
          <div class="stat-desc">Last 7 days</div>
        </div>
        <div class="stat-box">
          <div class="stat-icon">📊</div>
          <div class="stat-value">5</div>
          <div class="stat-name">Milestones</div>
          <div class="stat-desc">Ongoing releases</div>
        </div>
      </div>
    `;

    // Create a container for the new content
    const modernContainer = document.createElement('div');
    modernContainer.className = 'modern-ui-container';
    modernContainer.id = 'getting-started';

    // Add sections to container
    modernContainer.appendChild(heroSection);
    modernContainer.appendChild(featuresSection);
    modernContainer.appendChild(statsSection);

    // Create a section for the original wiki content
    const wikiSection = document.createElement('div');
    wikiSection.className = 'wiki-content-section';
    wikiSection.innerHTML = '<h2 class="section-title">Documentation</h2>';
    
    // Show wiki content in a card
    if (wikiContent) {
      const wikiCard = document.createElement('div');
      wikiCard.className = 'wiki-card';
      wikiContent.style.display = 'block';
      wikiCard.appendChild(wikiContent);
      wikiSection.appendChild(wikiCard);
    }

    modernContainer.appendChild(wikiSection);

    // Clear the content area and add our new modern UI
    contentArea.innerHTML = '';
    contentArea.appendChild(modernContainer);

    // Add the corresponding styles
    if (!document.querySelector('#modern-ui-styles')) {
      const styleSheet = document.createElement('style');
      styleSheet.id = 'modern-ui-styles';
      styleSheet.textContent = `
        /* Hero Section */
        .hero-section {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 80px 0;
          gap: 60px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .hero-content {
          flex: 1;
          max-width: 500px;
        }

        .hero-title {
          font-size: 56px !important;
          font-weight: 800 !important;
          line-height: 1.1 !important;
          color: #1a1a1a !important;
          margin: 0 0 20px 0 !important;
          text-align: left !important;
        }

        .hero-subtitle {
          font-size: 18px !important;
          color: #666 !important;
          line-height: 1.6 !important;
          margin: 0 0 30px 0 !important;
        }

        .hero-cta {
          background: #1a1a1a !important;
          color: white !important;
          padding: 16px 32px !important;
          border-radius: 50px !important;
          font-size: 16px !important;
          font-weight: 600 !important;
          border: none !important;
          cursor: pointer !important;
          transition: all 0.3s !important;
          display: inline-block !important;
        }

        .hero-cta:hover {
          transform: translateY(-2px) !important;
          box-shadow: 0 8px 20px rgba(0,0,0,0.15) !important;
        }

        .hero-visual {
          flex: 1;
          display: flex;
          justify-content: center;
        }

        .hero-card {
          background: linear-gradient(135deg, #FF6B9D 0%, #FF8FA3 100%) !important;
          border-radius: 24px !important;
          padding: 40px !important;
          width: 100%;
          max-width: 400px;
          box-shadow: 0 20px 40px rgba(255, 107, 157, 0.3) !important;
          position: relative;
          overflow: hidden;
        }

        .hero-stat {
          position: relative;
          z-index: 2;
          margin-bottom: 30px;
        }

        .stat-number {
          font-size: 48px !important;
          font-weight: 800 !important;
          color: white !important;
          margin: 0 !important;
        }

        .stat-label {
          font-size: 16px !important;
          color: rgba(255, 255, 255, 0.9) !important;
          margin: 0 !important;
        }

        .hero-orb {
          position: absolute;
          width: 150px;
          height: 150px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          bottom: -50px;
          right: -50px;
          backdrop-filter: blur(10px);
        }

        /* Features Section */
        .features-section {
          padding: 80px 0;
          max-width: 1200px;
          margin: 0 auto;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 30px;
        }

        .feature-card {
          background: white !important;
          border: 1px solid #eee !important;
          border-radius: 16px !important;
          padding: 40px !important;
          transition: all 0.3s !important;
          text-align: center;
        }

        .feature-card:hover {
          transform: translateY(-5px) !important;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1) !important;
        }

        .feature-card-coral {
          background: #FF6B9D !important;
          color: white !important;
          border: none !important;
        }

        .feature-card-coral h3,
        .feature-card-coral p {
          color: white !important;
        }

        .feature-icon {
          font-size: 48px !important;
          margin-bottom: 20px !important;
        }

        .feature-card h3 {
          font-size: 24px !important;
          font-weight: 700 !important;
          margin: 0 0 15px 0 !important;
          color: #1a1a1a !important;
        }

        .feature-card p {
          font-size: 16px !important;
          color: #666 !important;
          line-height: 1.6 !important;
          margin: 0 !important;
        }

        /* Stats Section */
        .stats-section {
          padding: 80px 0;
          background: #f8f8f8;
          text-align: center;
          margin: 0 -9999px;
          padding-left: 9999px;
          padding-right: 9999px;
        }

        .stats-section > * {
          max-width: 1200px;
          margin-left: auto;
          margin-right: auto;
        }

        .stats-title {
          font-size: 36px !important;
          font-weight: 800 !important;
          color: #1a1a1a !important;
          margin: 0 0 10px 0 !important;
        }

        .stats-subtitle {
          font-size: 18px !important;
          color: #666 !important;
          margin: 0 0 50px 0 !important;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 30px;
          max-width: 900px;
          margin: 0 auto;
        }

        .stat-box {
          background: white !important;
          border-radius: 16px !important;
          padding: 40px !important;
          box-shadow: 0 5px 20px rgba(0,0,0,0.08) !important;
        }

        .stat-icon {
          font-size: 36px !important;
          margin-bottom: 20px !important;
        }

        .stat-value {
          font-size: 48px !important;
          font-weight: 800 !important;
          color: #1a1a1a !important;
          margin: 0 0 5px 0 !important;
        }

        .stat-name {
          font-size: 20px !important;
          font-weight: 600 !important;
          color: #333 !important;
          margin: 0 0 10px 0 !important;
        }

        .stat-desc {
          font-size: 14px !important;
          color: #999 !important;
          margin: 0 !important;
        }

        /* Wiki Content Section */
        .wiki-content-section {
          padding: 80px 0;
          max-width: 1200px;
          margin: 0 auto;
        }

        .section-title {
          font-size: 36px !important;
          font-weight: 800 !important;
          color: #1a1a1a !important;
          margin: 0 0 40px 0 !important;
          text-align: center !important;
        }

        .wiki-card {
          background: white !important;
          border-radius: 16px !important;
          padding: 40px !important;
          box-shadow: 0 5px 20px rgba(0,0,0,0.08) !important;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .hero-section {
            flex-direction: column;
            padding: 40px 20px;
          }

          .hero-title {
            font-size: 36px !important;
          }

          .hero-visual {
            width: 100%;
          }

          .features-grid,
          .stats-grid {
            grid-template-columns: 1fr;
          }

          .stats-section {
            margin: 0;
            padding-left: 20px;
            padding-right: 20px;
          }
        }

        /* Override any conflicting styles */
        #content.wiki {
          max-width: none !important;
          padding: 0 !important;
          background: transparent !important;
          box-shadow: none !important;
        }

        .modern-ui-container {
          animation: fadeIn 0.5s ease-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `;
      document.head.appendChild(styleSheet);
    }
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectModernUI);
  } else {
    injectModernUI();
  }

  // Also run after a short delay to catch any dynamic content
  setTimeout(injectModernUI, 100);
})(); 