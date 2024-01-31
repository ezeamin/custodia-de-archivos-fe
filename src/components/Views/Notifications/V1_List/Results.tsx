import ResultsList from './List/ResultsList';
import { useQuery } from '@tanstack/react-query';

import { getNotificationsFn } from '@/api/api-calls/notifications';

import { useLoading } from '@/hooks';

import ErrorMessage from '@/components/Error/ErrorMessage';
import { Alert, Pagination } from '@/components/ui';

const Results = () => {
  // -------------------------------------------------
  // API
  // -------------------------------------------------

  const { data, isLoading, isError, refetch, status } = useQuery({
    queryKey: ['notifications', false],
    queryFn: () => getNotificationsFn(false),
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

  if (data?.data) {
    if (data.data.length === 0)
      return (
        <section className="mt-5 overflow-hidden">
          <Alert className="mb-3">
            <p>¡Lo sentimos! No hay notificaciones recibidas aún.</p>
          </Alert>
        </section>
      );

    return (
      <section className="mt-5 overflow-hidden">
        <ResultsList data={data.data} hasBeenRead={false} />
        <Pagination
          queryKey="notifications"
          totalElements={data.totalElements || 1}
        />
      </section>
    );
  }

  return null;
};
export default Results;
