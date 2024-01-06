import { useEffect } from 'react';

import { useLoadingState } from '@/stores/useLoadingState';

type statusType = 'idle' | 'pending' | 'success' | 'error';

// eslint-disable-next-line @typescript-eslint/default-param-last
export const useLoading = (isLoading = false, status: statusType) => {
  const { setIsLoading } = useLoadingState();

  useEffect(() => {
    if (isLoading && status === 'pending') setIsLoading(true);

    if (!isLoading && (status === 'success' || status === 'error'))
      setIsLoading(false);
  }, [isLoading, status, setIsLoading]);
};
