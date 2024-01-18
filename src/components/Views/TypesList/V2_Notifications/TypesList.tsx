import ResultsList from './List/ResultsList';
import { typesList } from './mocked';
import { useQuery } from '@tanstack/react-query';

import { getNotificationTypesFn } from '@/api/api-calls/notifications';

import { useLoading } from '@/hooks';

import ErrorMessage from '@/components/Error/ErrorMessage';
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
    return <ErrorMessage refetch={handleRetry} />;
  }

  if (data?.data) {
    if (data.data.length === 0)
      return (
        <section className="mt-5 overflow-hidden">
          <Alert className="mb-3">
            <p>Aún no hay tipos de notificaciones creadas.</p>
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
