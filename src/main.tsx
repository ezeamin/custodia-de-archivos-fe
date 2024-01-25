import React from 'react';
import ReactDOM from 'react-dom/client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';

import SkipNavButton from './components/Accessibility/SkipNavButton.tsx';
import ErrorBoundary from './components/Error/ErrorBoundary.tsx';
import LoadingBackdrop from './components/Loading/LoadingBackdrop.tsx';
import TryToLoginView from './views/Auth/TryToLoginView.tsx';

import './styles/animations.css';
import './styles/globals.css';
import './styles/tailwind.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <SkipNavButton />
        <TryToLoginView />
        <Toaster richColors position="top-right" />
        <LoadingBackdrop />
      </QueryClientProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
