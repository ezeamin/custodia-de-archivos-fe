'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';

import useOptions from '../../hooks/useOptions';
import { usePortrait } from 'hooks';

import { Skeleton } from 'ui';

import PortraitMenu from '../Menu/PortraitMenu';
import ProfileAvatar from '../ProfileAvatar';
import ThemeToggler from '../ThemeToggler';
import OptionButton from './OptionButton';
import { Logo } from 'images';

const Header = (): JSX.Element => {
  const [isScrolling, setIsScrolling] = useState(false);

  // ---------------------------------------------------------------------
  // HOOKS
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

  // Loading (not yet hydrated)
  if (isPortrait === undefined) {
    return (
      <header
        className={`sticky top-0 w-full py-5 flex justify-between items-center px-7 md:px-10 transition-colors ${
          isScrolling ? 'header-scrolling' : ''
        }`}
      >
        <Skeleton />
        <Skeleton type="circle" />
      </header>
    );
  }

  // Portrait & Hydrated
  if (isPortrait) {
    return (
      <header
        className={`z-40 py-5 ps-7 pe-5 flex justify-between sticky top-0 w-full transition-colors ${
          isScrolling ? 'header-scrolling' : ''
        }`}
      >
        <Image
          alt="Poder Judicial de Tucumán"
          className="w-12 h-12"
          height={100}
          // DO NOT delete, it WILL throw an ESLint error
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access -- logo is not a component
          src={typeof Logo === 'object' && 'src' in Logo ? Logo.src : ''}
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
        <ThemeToggler />
        <ProfileAvatar />
      </div>
    </header>
  );
};

export default Header;
