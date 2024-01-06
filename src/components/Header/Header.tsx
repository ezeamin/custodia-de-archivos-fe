import { useEffect, useState } from 'react';
import { CgMenuRightAlt } from 'react-icons/cg';
import { Link } from 'react-router-dom';

import icon from '/img/icon.png';

import { usePortrait } from '@/hooks/usePortrait';
import { usePortraitMenu } from '@/stores/usePortraitMenu';

import PortraitMenu from '@/components/Menu/PortraitMenu';

const Header = (): JSX.Element | null => {
  const [isScrolling, setIsScrolling] = useState(false);

  // ---------------------------------------------------------------------
  // HOOKS
  // ---------------------------------------------------------------------

  const isPortrait = usePortrait('md');
  const { openMenu } = usePortraitMenu();

  // ---------------------------------------------------------------------
  // EFFECTS
  // ---------------------------------------------------------------------

  // Scroll Detection
  useEffect(() => {
    // Grab "content" element from "components/LandscapeMenu.tsx
    const content = document.getElementById('content');
    if (!content) return () => {};

    const onScroll = (): void => {
      const { scrollTop } = content;

      if (scrollTop >= 50) {
        setIsScrolling(true);
      } else {
        setIsScrolling(false);
      }
    };

    content.addEventListener('scroll', onScroll);

    return () => {
      content.removeEventListener('scroll', onScroll);
    };
  }, []);

  // ---------------------------------------------------------------------
  // HANDLERS
  // ---------------------------------------------------------------------

  const handleMenuClick = (): void => {
    openMenu();
  };

  // ---------------------------------------------------------------------
  // RENDER
  // ---------------------------------------------------------------------

  if (isPortrait) {
    return (
      <>
        <header
          className={`z-40 py-5 ps-7 pe-5 flex justify-between sticky top-0 w-full transition-colors ${
            isScrolling ? 'header-scrolling' : ''
          }`}
        >
          <Link to="/">
            <img
              alt="Poder Judicial de Tucumán"
              className="w-12 h-12 rounded-md"
              height={100}
              src={icon}
              width={100}
            />
          </Link>
          <button color="btn-ghost" type="button" onClick={handleMenuClick}>
            <CgMenuRightAlt size="3em" />
          </button>
        </header>
        <PortraitMenu />
      </>
    );
  }

  return null;
};

export default Header;
