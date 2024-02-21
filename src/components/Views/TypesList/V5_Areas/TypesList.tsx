import ResultsList from './List/ResultsList';
import { useQuery } from '@tanstack/react-query';

import { getAreaOptionsFn } from '@/api/api-calls/params';

import { useLoading } from '@/hooks';

import ErrorMessage from '@/components/Error/ErrorMessage';
import { Alert } from '@/components/ui';

const TypesList = () => {
  // -------------------------------------------------
  // API
  // -------------------------------------------------

  const { data, isLoading, isError, refetch, status } = useQuery({
    queryKey: ['areaOptions'],
    queryFn: () => getAreaOptionsFn(true),
  });

  useLoading(isLoading, status);

  // -------------------------------------------------
  // HANDLERS
  // -------------------------------------------------

  const handleRetry = () => {
    refetch();
  };

  // -------------------------------------------------
  // RENDER
  // -------------------------------------------------

  if (isError) {
    return <ErrorMessage refetch={handleRetry} />;
  }

  if (isLoading) {
    return (
      <section className="mt-5 flex gap-3 overflow-hidden">
        <div className="custom-skeleton h-[300px] w-full rounded-lg !bg-white dark:!bg-gray-900 sm:w-1/2 md:w-[280px] " />
        <div className="custom-skeleton hidden h-[300px] w-[280px] rounded-lg !bg-white dark:!bg-gray-900 sm:block" />
        <div className="custom-skeleton hidden h-[300px] w-[280px] rounded-lg !bg-white dark:!bg-gray-900 sm:block" />
      </section>
    );
  }

  if (data?.data) {
    if (data.data.length === 0)
      return (
        <section className="mt-5 overflow-hidden">
          <Alert className="mb-3">
            <p>Aún no hay tipos de areas creadas.</p>
          </Alert>
        </section>
      );

    return (
      <section className="animate-in-bottom a-delay-600 mt-4 overflow-hidden">
        <ResultsList data={data.data} />
      </section>
    );
  }

  return null;
};
export default TypesList;
