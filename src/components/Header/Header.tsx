import { useEffect, useState } from 'react';

import icon from '/img/icon.png';

import useOptions from '@/hooks/useOptions';
import { usePortrait } from '@/hooks/usePortrait';

import OptionButton from './OptionButton';
import ProfileAvatar from '@/components/Common/ProfileAvatar';
import ThemeTogglerButton from '@/components/Common/ThemeTogglerButton';
import PortraitMenu from '@/components/Menu/PortraitMenu';

const Header = (): JSX.Element => {
  const [isScrolling, setIsScrolling] = useState(false);

  // ---------------------------------------------------------------------
  // @/hooks
  // ---------------------------------------------------------------------

  const isPortrait = usePortrait('md');
  const options = useOptions();

  // ---------------------------------------------------------------------
  // USEEFFECT
  // ---------------------------------------------------------------------

  // Scroll Detection
  useEffect(() => {
    // Grab "content" element from "components/LandscapeMenu.tsx
    const content = document.getElementById('content');
    if (!content) return () => {};

    const onScroll = (): void => {
      const { scrollTop } = content;

      if (scrollTop >= 70) {
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
  // RENDER
  // ---------------------------------------------------------------------

  // Portrait & Hydrated
  if (isPortrait) {
    return (
      <header
        className={`z-40 py-5 ps-7 pe-5 flex justify-between sticky top-0 w-full transition-colors ${
          isScrolling ? 'header-scrolling' : ''
        }`}
      >
        <img
          alt="Poder Judicial de Tucumán"
          className="w-12 h-12 rounded-md"
          height={100}
          src={icon}
          width={100}
        />
        <PortraitMenu />
      </header>
    );
  }

  // Landscape & Hydrated
  return (
    <header
      className={`duration-300 sticky top-0 flex justify-between w-full pe-10 ps-6 py-5 ${
        isScrolling ? 'header-scrolling shadow' : ''
      } transition-colors z-40`}
    >
      <nav className="flex gap-2">
        {options.map((option) => (
          <OptionButton key={option.id} option={option} />
        ))}
      </nav>
      <div className="flex gap-4">
        <ThemeTogglerButton />
        <ProfileAvatar />
      </div>
    </header>
  );
};

export default Header;
