/**
 * Wiki Gradient Injection
 * Applies the modern coral pink gradient design to wiki documentation pages
 */

(function() {
  'use strict';

  // Only run on Wiki pages
  if (!window.location.pathname.includes('/wiki')) return;

  // Wait for DOM to be ready
  function applyGradientDesign() {
    // Find the wiki content section in the modern UI
    const wikiContentSection = document.querySelector('.wiki-content-section');
    if (!wikiContentSection) {
      // If modern UI hasn't loaded yet, try again
      setTimeout(applyGradientDesign, 100);
      return;
    }

    // Check if we already applied the gradient
    if (document.querySelector('.wiki-gradient-section')) return;

    // Find the documentation title
    const docTitle = wikiContentSection.querySelector('.section-title');
    if (docTitle) {
      docTitle.style.display = 'none'; // Hide the original title
    }

    // Find the wiki card
    const wikiCard = wikiContentSection.querySelector('.wiki-card');
    if (!wikiCard) return;

    // Get the wiki content
    const wikiContent = wikiCard.querySelector('.wikipage');
    if (!wikiContent) return;

    // Create gradient section wrapper
    const gradientSection = document.createElement('div');
    gradientSection.className = 'wiki-gradient-section';
    gradientSection.id = 'wiki-content';

    // Create content wrapper
    const contentWrapper = document.createElement('div');
    contentWrapper.className = 'wiki-content-wrapper';

    // Move wiki content into gradient wrapper
    contentWrapper.appendChild(wikiContent);
    gradientSection.appendChild(contentWrapper);

    // Replace the wiki card with our gradient section
    wikiCard.parentNode.replaceChild(gradientSection, wikiCard);

    // Add smooth scroll behavior
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href && href !== '#') {
          const target = document.querySelector(href);
          if (target) {
            e.preventDefault();
            target.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
        }
      });
    });

    // Enhance list items with hover effects
    const listItems = gradientSection.querySelectorAll('ul li');
    listItems.forEach(item => {
      item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateX(4px)';
      });
      item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateX(0)';
      });
    });

    // Apply fade-in animation
    gradientSection.style.opacity = '0';
    gradientSection.style.transform = 'translateY(20px)';
    setTimeout(() => {
      gradientSection.style.transition = 'all 0.6s ease-out';
      gradientSection.style.opacity = '1';
      gradientSection.style.transform = 'translateY(0)';
    }, 50);

    // Handle the Starting Points section specially
    const headings = gradientSection.querySelectorAll('h2');
    headings.forEach(heading => {
      if (heading.textContent.includes('Starting Points')) {
        const nextUl = heading.nextElementSibling;
        if (nextUl && nextUl.tagName === 'UL') {
          nextUl.classList.add('starting-points-grid');
        }
      }
    });

    // Transform regular links to have better styling
    const links = gradientSection.querySelectorAll('a');
    links.forEach(link => {
      // Check if it's a main action link (like TracGuide)
      const text = link.textContent.trim();
      if (text === 'TracGuide' || text === 'Trac FAQ' || text === 'TracSupport') {
        link.classList.add('wiki-highlight-link');
      }
    });

    // Add a decorative gradient overlay at the bottom
    const gradientOverlay = document.createElement('div');
    gradientOverlay.className = 'gradient-overlay-bottom';
    gradientOverlay.style.cssText = `
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 200px;
      background: linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.1));
      pointer-events: none;
    `;
    gradientSection.appendChild(gradientOverlay);
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      // Wait a bit for the modern UI to load first
      setTimeout(applyGradientDesign, 500);
    });
  } else {
    // DOM already loaded, wait for modern UI
    setTimeout(applyGradientDesign, 500);
  }

  // Also listen for any dynamic content changes
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.addedNodes.length > 0) {
        // Check if wiki content was added
        mutation.addedNodes.forEach(function(node) {
          if (node.nodeType === 1 && (node.classList?.contains('wiki-content-section') || node.querySelector?.('.wiki-content-section'))) {
            setTimeout(applyGradientDesign, 100);
          }
        });
      }
    });
  });

  // Start observing the document body for changes
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
})(); 