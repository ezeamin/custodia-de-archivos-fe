import { BrowserRouter, Route, Routes } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import Header from '@/components/Header/Header';
import LandscapeMenu from '@/components/Menu/LandscapeMenu';

import { routes } from '@/constants/routes/routes';

const Router = () => {
  return (
    <BrowserRouter>
      <LandscapeMenu>
        <Header />
        <main className="modules-padding">
          <Routes>
            {routes.map((route) => (
              <Route
                element={
                  <PrivateRoute
                    element={route.element}
                    privateRoute={route.privateRoute}
                  />
                }
                key={route.id}
                path={route.path}
              />
            ))}
          </Routes>
        </main>
      </LandscapeMenu>
    </BrowserRouter>
  );
};
export default Router;
