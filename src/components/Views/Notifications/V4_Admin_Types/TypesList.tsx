import ResultsList from './List/ResultsList';
import { typesList } from './mocked';
import { useQuery } from '@tanstack/react-query';

import { getNotificationTypes } from '@/api/api-calls/notifications';

import { useLoading } from '@/hooks';

import { Alert } from '@/components/ui';

const data = typesList;
const isLoading = false;
const isError = false;

const TypesList = () => {
  // -------------------------------------------------
  // API
  // -------------------------------------------------

  const { /* data, isLoading, isError, */ refetch } = useQuery({
    queryKey: ['notificationTypes'],
    queryFn: getNotificationTypes,
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
      <section className="mt-4 animate-in-bottom a-delay-600">
        <ResultsList data={data.data} />
      </section>
    );
  }

  return null;
};
export default TypesList;
