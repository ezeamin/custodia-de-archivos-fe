import { useEffect } from 'react';

import { useLoadingState } from '@/stores/useLoadingState';

type statusType = 'idle' | 'pending' | 'success' | 'error';

export const useLoading = (
  // eslint-disable-next-line @typescript-eslint/default-param-last
  isLoading = false,
  status: statusType,
  isFetching = false
) => {
  const { setIsLoading } = useLoadingState();

  useEffect(() => {
    if (isLoading && status === 'pending') setIsLoading(true);
    if (isFetching && status === 'success') setIsLoading(true);

    if (
      !isLoading &&
      (status === 'success' || status === 'error') &&
      !isFetching
    )
      setIsLoading(false);
  }, [isLoading, status, isFetching, setIsLoading]);
};
