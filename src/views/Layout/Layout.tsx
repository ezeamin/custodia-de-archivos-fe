import { useLayoutEffect } from 'react';
import { Outlet, ScrollRestoration } from 'react-router-dom';

import useScrollToTop from '../../stores/useScrollToTop';
import { useTheme } from '@/stores/useTheme';

import Header from '@/components/Header/Header';
import LandscapeMenu from '@/components/Menu/LandscapeMenu';

import { changeMeta } from '@/utilities/utils';

const Layout = () => {
  const { theme } = useTheme();

  useScrollToTop();

  useLayoutEffect(() => {
    changeMeta(theme);
  }, [theme]);

  return (
    <>
      <ScrollRestoration
        getKey={(location) => {
          return location.pathname;
        }}
      />
      <LandscapeMenu>
        <Header />
        <main className="modules-padding">
          <Outlet />
        </main>
      </LandscapeMenu>
    </>
  );
};

export default Layout;
