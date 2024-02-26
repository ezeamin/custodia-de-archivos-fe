import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { usePortraitMenu } from '../stores/usePortraitMenu';

const useScrollToTop = (elementToOffset = '', trigger?: boolean) => {
  // Extracts pathname property(key) from an object
  const { pathname } = useLocation();
  const { closeMenu } = usePortraitMenu();

  // Automatically scrolls to top whenever pathname changes
  useEffect(() => {
    const content = document.querySelector('#content');

    if (elementToOffset && trigger) {
      const element = document.querySelector(elementToOffset);

      if (element && content) {
        const headerOffset =
          document.querySelector('header')?.clientHeight || 0;
        const elementPosition = element.getBoundingClientRect().top;
        const top = elementPosition + content.scrollTop - headerOffset - 50;
        content.scrollTo({ top, behavior: 'smooth' });
      }
    } else {
      if (content) content.scrollTo({ top: 0, behavior: 'smooth' });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    closeMenu();
  }, [pathname, trigger, closeMenu, elementToOffset]);
};

export default useScrollToTop;
