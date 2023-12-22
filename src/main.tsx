import React from 'react';
import ReactDOM from 'react-dom/client';

import SkipNavButton from './components/Accessibility/SkipNavButton.tsx';
import ErrorBoundary from './components/Error/ErrorBoundary.tsx';
import './styles/animations.css';
import './styles/globals.css';
import './styles/tailwind.css';
import Router from './views/Router.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <SkipNavButton />
      <Router />
    </ErrorBoundary>
  </React.StrictMode>
);
