import { useEffect, useState } from 'react';

import type { Sizes } from './interface';

const sizes: Sizes = {
  sm: '640px',
  md: '767px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

export const usePortrait = (size: keyof Sizes = 'md'): boolean | undefined => {
  const [isPortrait, setIsPortrait] = useState<boolean | undefined>(undefined);

  // use window.innerWidth to get the screen size
  useEffect(() => {
    const mediaQuery = window.matchMedia(`(width <= ${sizes[size]})`);
    mediaQuery.addEventListener('change', (e) => {
      setIsPortrait(e.matches);
    });
    setIsPortrait(mediaQuery.matches);
  }, [size]);

  return isPortrait;
};
