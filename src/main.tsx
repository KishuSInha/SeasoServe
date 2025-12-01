import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Remove any lovable heart logos or injected elements
const removeLovableElements = () => {
  // Remove elements with lovable data attributes
  document.querySelectorAll('[data-lovable]').forEach(el => el.remove());
  
  // Remove any SVG elements in the navbar that look like hearts
  const navbar = document.querySelector('nav');
  if (navbar) {
    // Remove any SVG in the navbar logo area
    const logoLink = navbar.querySelector('a[href="#"]');
    if (logoLink) {
      const svgs = logoLink.querySelectorAll('svg');
      svgs.forEach(svg => {
        const path = svg.querySelector('path');
        if (path) {
          const d = path.getAttribute('d') || '';
          // Common heart SVG path patterns
          if (d.includes('M19') && d.includes('14c1.49') || 
              d.includes('M12') && d.includes('21l-7') ||
              d.includes('M20.84') || 
              d.includes('M16') && d.includes('8.2') ||
              d.includes('M22') && d.includes('8.5')) {
            svg.remove();
          }
        } else {
          // If no path, check if it's a heart by viewBox or other attributes
          const viewBox = svg.getAttribute('viewBox') || '';
          if (viewBox.includes('24') && svg.parentElement === logoLink) {
            svg.remove();
          }
        }
      });
      
      // Remove any element that's not the SeasoServe text span
      const children = Array.from(logoLink.children);
      children.forEach((child, index) => {
        if (index === 0 && child.tagName === 'SVG') {
          child.remove();
        } else if (child.tagName !== 'SPAN' && !child.textContent?.includes('SeasoServe')) {
          child.remove();
        }
      });
    }
    
    // Remove any SVG in the entire navbar
    navbar.querySelectorAll('svg').forEach(svg => {
      const path = svg.querySelector('path');
      if (path) {
        const d = path.getAttribute('d') || '';
        if (d.includes('M19') && d.includes('14c1.49') || 
            d.includes('M12') && d.includes('21l-7') ||
            d.includes('M20.84') ||
            d.includes('M16') && d.includes('8.2')) {
          svg.remove();
        }
      }
    });
  }
  
  // Remove any SVG elements that look like hearts (common heart path patterns) anywhere
  document.querySelectorAll('svg').forEach(svg => {
    const path = svg.querySelector('path');
    if (path) {
      const d = path.getAttribute('d') || '';
      // Common heart SVG path patterns
      if (d.includes('M19') && d.includes('14c1.49') || 
          d.includes('M12') && d.includes('21l-7') ||
          d.includes('M20.84') || 
          d.includes('M16') && d.includes('8.2')) {
        svg.remove();
      }
    }
  });
  
  // Remove any elements with lovable classes
  document.querySelectorAll('.lovable-heart, .lovable-logo, [class*="lovable"]').forEach(el => el.remove());
};

// Run on DOM load and after a short delay to catch dynamically injected elements
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', removeLovableElements);
} else {
  removeLovableElements();
}

// Also run after a delay to catch elements injected by scripts
setTimeout(removeLovableElements, 100);
setTimeout(removeLovableElements, 500);
setInterval(removeLovableElements, 2000);

// Use MutationObserver to watch for dynamically added elements
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    mutation.addedNodes.forEach((node) => {
      if (node.nodeType === 1) { // Element node
        const element = node as Element;
        // Check if it's a heart SVG or lovable element
        if (element.tagName === 'SVG' || element.querySelector('svg')) {
          removeLovableElements();
        }
        if (element.hasAttribute('data-lovable') || 
            element.classList.toString().includes('lovable')) {
          element.remove();
        }
      }
    });
  });
});

// Start observing after a short delay
setTimeout(() => {
  const navbar = document.querySelector('nav');
  if (navbar) {
    observer.observe(navbar, {
      childList: true,
      subtree: true
    });
  }
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}, 1000);

createRoot(document.getElementById("root")!).render(<App />);