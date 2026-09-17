import { useEffect } from 'react';

/**
 * High-performance, GPU-accelerated scroll reveal observer.
 * Automatically adds `.is-revealed` class to elements matching reveal classes
 * when they enter the viewport during scrolling.
 * Supports a dependency (e.g. currentPath) to re-observe elements upon route transitions.
 */
export function useScrollReveal(dependency?: unknown) {
  useEffect(() => {
    const selector = 
      '.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-scale, .scroll-reveal-stagger';

    let observer: IntersectionObserver | null = null;

    // Small delay to allow React DOM transition and mounting to complete
    const timeoutId = setTimeout(() => {
      const revealElements = document.querySelectorAll(selector);
      if (!revealElements.length) return;

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-revealed');
              observer?.unobserve(entry.target);
            }
          });
        },
        {
          root: null,
          rootMargin: '0px 0px -40px 0px',
          threshold: 0.08,
        }
      );

      revealElements.forEach((el) => {
        // If element is already in the viewport on initial page load / navigation, reveal immediately
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          el.classList.add('is-revealed');
        } else {
          observer?.observe(el);
        }
      });
    }, 40);

    return () => {
      clearTimeout(timeoutId);
      if (observer) {
        observer.disconnect();
      }
    };
  }, [dependency]);
}
