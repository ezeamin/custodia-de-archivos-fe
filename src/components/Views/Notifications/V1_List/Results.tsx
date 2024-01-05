import ResultsList from './List/ResultsList';
import { mockedData } from './mocked';
import { useQuery } from '@tanstack/react-query';

import { getNotificationsFn } from '@/api/api-calls/notifications';

import { useLoading } from '@/hooks';

import { Alert, Pagination } from '@/components/ui';

const data = {
  ...mockedData,
  data: mockedData.data.filter((item) => item.hasBeenRead === false),
};
const isError = false;
const isLoading = false;

const Results = () => {
  // -------------------------------------------------
  // API
  // -------------------------------------------------

  const { /* data, isLoading, isError, */ refetch } = useQuery({
    queryKey: ['notifications'],
    queryFn: () => getNotificationsFn(false),
  });

  useLoading(isLoading);

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
    return (
      <Alert className="mt-3 animate-in-right a-delay-500" type="error">
        <p>
          Ocurrió un error leyendo la información. Por favor, intente nuevamente
          en unos instantes o reintente utilizando el botón debajo de este
          mensaje.
        </p>
        <button className="btn mt-2" type="button" onClick={handleRetry}>
          Reintentar
        </button>
      </Alert>
    );
  }

  if (data?.data) {
    return (
      <section className="mt-5 overflow-hidden">
        <ResultsList data={data.data} hasBeenRead={false} />
        <Pagination totalElements={data.totalElements} />
      </section>
    );
  }

  return null;
};
export default Results;
