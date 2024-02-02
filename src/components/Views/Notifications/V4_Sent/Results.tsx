import ResultsList from '../V1_List/List/ResultsList';
import { useQuery } from '@tanstack/react-query';

import { getSentNotificationsFn } from '@/api/api-calls/notifications';

import { useLoading } from '@/hooks';

import ErrorMessage from '@/components/Error/ErrorMessage';
import { Alert, Pagination } from '@/components/ui';

const Results = () => {
  // -------------------------------------------------
  // API
  // -------------------------------------------------

  const {
    data,
    isFetching: isLoading,
    isError,
    refetch,
    status,
  } = useQuery({
    queryKey: ['sent_notifications'],
    queryFn: () => getSentNotificationsFn(),
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
          <Alert className="mb-3" type="info">
            <p>
              Aún no envió ninguna notifiación. Puede hacerlo desde el botón
              superior de
            </p>
            <p className="my-3 text-center font-bold">
              &quot;Notificaciones&quot; &gt; &quot;CREAR NUEVA
              NOTIFICACION&quot;
            </p>
          </Alert>
        </section>
      );

    return (
      <section className="mt-5 overflow-hidden">
        <ResultsList sent data={data.data} />
        {data.data.length > 12 && (
          <Pagination
            entries={12}
            queryKey={['sent_notifications']}
            totalElements={data.totalElements || 1}
          />
        )}
      </section>
    );
  }

  return null;
};
export default Results;
