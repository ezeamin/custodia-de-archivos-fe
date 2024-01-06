import { useLayoutEffect } from 'react';
import { Outlet, ScrollRestoration } from 'react-router-dom';

import { useTheme } from '@/stores/useTheme';

import Header from '@/components/Header/Header';
import LandscapeMenu from '@/components/Menu/LandscapeMenu';

import { changeMeta } from '@/utilities/utils';

const Layout = () => {
  const { theme } = useTheme();

  useLayoutEffect(() => {
    changeMeta(theme);
  }, [theme]);

  return (
    <LandscapeMenu>
      <ScrollRestoration />
      <Header />
      <main className="modules-padding">
        <Outlet />
      </main>
    </LandscapeMenu>
  );
};

export default Layout;
