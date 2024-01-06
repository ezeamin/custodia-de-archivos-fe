import ResultsList from '../V1_List/List/ResultsList';
import { mockedData } from '../V1_List/mocked';
import { useQuery } from '@tanstack/react-query';

import { getNotificationsFn } from '@/api/api-calls/notifications';

import { useLoading } from '@/hooks';

import { Alert, Pagination } from '@/components/ui';

const data = {
  ...mockedData,
  data: mockedData.data.filter((item) => item.hasBeenRead === true),
};
const isError = false;
const isLoading = false;

const Results = () => {
  // -------------------------------------------------
  // API
  // -------------------------------------------------

  const { /* data, isLoading, isError, */ refetch, status } = useQuery({
    queryKey: ['notifications'],
    queryFn: () => getNotificationsFn(true),
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
        <ResultsList hasBeenRead data={data.data} />
        <Pagination totalElements={data.totalElements} />
      </section>
    );
  }

  return null;
};
export default Results;
