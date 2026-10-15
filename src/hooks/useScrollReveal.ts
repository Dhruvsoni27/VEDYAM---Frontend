import { useEffect, useRef } from 'react';

export function useScrollReveal(threshold: number = 0.15) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Respect user motion preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      if (containerRef.current) {
        containerRef.current.classList.add('reveal-visible');
      }
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
            // Unobserve once triggered as per specifications
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    const currentEl = containerRef.current;
    if (currentEl) {
      observer.observe(currentEl);
    }

    return () => {
      if (currentEl) {
        observer.unobserve(currentEl);
      }
    };
  }, [threshold]);

  return containerRef;
}
