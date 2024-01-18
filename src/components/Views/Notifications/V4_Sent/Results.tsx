import ResultsList from '../V1_List/List/ResultsList';
import { mockedData } from '../V1_List/mocked';
import { useQuery } from '@tanstack/react-query';

import { getSentNotificationsFn } from '@/api/api-calls/notifications';

import { useLoading } from '@/hooks';

import ErrorMessage from '@/components/Error/ErrorMessage';
import { Alert, Pagination } from '@/components/ui';

const data = {
  ...mockedData,
  data: mockedData.data,
};
const isError = false;
const isLoading = false;

const Results = () => {
  // -------------------------------------------------
  // API
  // -------------------------------------------------

  const { /* data, isLoading, isError, */ refetch, status } = useQuery({
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
              Aún no se envió ninguna notifiación. Puede hacerlo desde el botón
              superior de
            </p>
            <p className="my-3 text-center font-bold">
              &quot;Notificaciones&quot; &gt; &quot;CREAR NUEVO EMPLEADO&quot;
            </p>
          </Alert>
        </section>
      );

    return (
      <section className="mt-5 overflow-hidden">
        <ResultsList data={data.data} />
        <Pagination totalElements={data.totalElements} />
      </section>
    );
  }

  return null;
};
export default Results;
