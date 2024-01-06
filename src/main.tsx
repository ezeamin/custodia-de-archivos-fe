import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';

import SkipNavButton from './components/Accessibility/SkipNavButton.tsx';
import ErrorBoundary from './components/Error/ErrorBoundary.tsx';
import LoadingBackdrop from './components/Loading/LoadingBackdrop.tsx';

import { router } from './utilities/router.tsx';

import './styles/animations.css';
import './styles/globals.css';
import './styles/tailwind.css';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <SkipNavButton />
        <RouterProvider router={router} />
        <Toaster richColors position="top-right" />
        <LoadingBackdrop />
      </QueryClientProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
