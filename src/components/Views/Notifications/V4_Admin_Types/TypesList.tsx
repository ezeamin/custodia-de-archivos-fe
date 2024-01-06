import ResultsList from './List/ResultsList';
import { typesList } from './mocked';
import { useQuery } from '@tanstack/react-query';

import { getNotificationTypesFn } from '@/api/api-calls/notifications';

import { useLoading } from '@/hooks';

import { Alert } from '@/components/ui';

const data = typesList;
const isLoading = false;
const isError = false;

const TypesList = () => {
  // -------------------------------------------------
  // API
  // -------------------------------------------------

  const { /* data, isLoading, isError, */ refetch, status } = useQuery({
    queryKey: ['notificationTypes'],
    queryFn: getNotificationTypesFn,
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
      <section className="mt-4 animate-in-bottom a-delay-600 overflow-hidden">
        <ResultsList data={data.data} />
      </section>
    );
  }

  return null;
};
export default TypesList;
