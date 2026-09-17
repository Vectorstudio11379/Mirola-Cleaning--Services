import { useEffect } from 'react';

/**
 * High-performance, GPU-accelerated scroll reveal observer.
 * Automatically adds `.is-revealed` class to elements matching reveal classes
 * when they enter the viewport during scrolling.
 */
export function useScrollReveal() {
  useEffect(() => {
    const selector = 
      '.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-scale, .scroll-reveal-stagger';

    const revealElements = document.querySelectorAll(selector);
    if (!revealElements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            // Unobserve once animated for peak 60fps performance
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -48px 0px',
        threshold: 0.08,
      }
    );

    revealElements.forEach((el) => {
      // If element is already in the viewport on initial page load, reveal immediately
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.classList.add('is-revealed');
      } else {
        observer.observe(el);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);
}
