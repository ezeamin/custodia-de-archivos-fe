import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Header from '@/components/Header/Header';
import LandscapeMenu from '@/components/Menu/LandscapeMenu';

const Router = () => {
  return (
    <BrowserRouter>
      <LandscapeMenu>
        <Header />
        <main className="modules-padding">
          <Routes>
            <Route path="/" element={<div />} />
          </Routes>
        </main>
      </LandscapeMenu>
    </BrowserRouter>
  );
};
export default Router;
