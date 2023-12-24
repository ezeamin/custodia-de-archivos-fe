import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Header from '@/components/Header/Header';
import LandscapeMenu from '@/components/Menu/LandscapeMenu';

import { routes } from '@/constants/routes';

const Router = () => {
  return (
    <BrowserRouter>
      <LandscapeMenu>
        <Header />
        <main className="modules-padding">
          <Routes>
            {routes.map((route) => (
              <Route element={route.element} key={route.id} path={route.path} />
            ))}
          </Routes>
        </main>
      </LandscapeMenu>
    </BrowserRouter>
  );
};
export default Router;
