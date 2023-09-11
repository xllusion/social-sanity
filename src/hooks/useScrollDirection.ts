// Check scroll direction

import { useState, useEffect } from 'react';

const initialState: string = 'down';

export function useScrollDirection(): string {
  const [scrollDirection, setScrollDirection] = useState<string>('down');

  useEffect(() => {
    const threshold = 0;
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateScrollDir = () => {
      const scrollY = window.scrollY;

      if (Math.abs(scrollY - lastScrollY) < threshold) {
        ticking = false;
        return;
      }
      setScrollDirection(scrollY > lastScrollY ? 'down' : 'up');
      lastScrollY = scrollY > 0 ? scrollY : 0;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDir);
        ticking = true;
      }
    };

    if (typeof window !== 'undefined') window.addEventListener('scroll', onScroll);
    console.log(scrollDirection);

    return () => window.removeEventListener('scroll', onScroll);
  }, [scrollDirection]);

  return scrollDirection;
}
