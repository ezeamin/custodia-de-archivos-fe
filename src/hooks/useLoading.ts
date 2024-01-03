import { useEffect } from 'react';

import { useLoadingState } from '@/stores/useLoadingState';

export const useLoading = (isLoading = false) => {
  const { setIsLoading } = useLoadingState();

  useEffect(() => {
    if (isLoading) setIsLoading(true);

    if (!isLoading) setIsLoading(false);
  }, [isLoading, setIsLoading]);
};
