import ResultsList from '../V1_List/List/ResultsList';
import { useQuery } from '@tanstack/react-query';

import { getSentNotificationsFn } from '@/api/api-calls/notifications';

import { useLoading } from '@/hooks';

import SearchFilter from '@/components/Common/SearchFilter';
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
  } = useQuery({
    queryKey: ['sent_notifications'],
    queryFn: () => getSentNotificationsFn(),
  });

  useLoading(isLoading, isLoading ? 'pending' : 'success');

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
    if (data.data.length === 0 && !window.location.search.includes('query'))
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

    if (data.data.length === 0 && window.location.search.includes('query')) {
      return (
        <section className="mt-5 overflow-hidden">
          <SearchFilter
            className="mb-4"
            defaultEntries={12}
            placeholder="Buscar por destinatario o tipo"
            queryKey={['sent_notifications']}
          />
          <Alert className="mb-3" type="info">
            No se encontraron resultados para la búsqueda. Lamentablemente, en
            esta versión, el buscador no funciona con nombres de áreas.
          </Alert>
        </section>
      );
    }

    return (
      <section className="mt-5 overflow-hidden">
        <SearchFilter
          className="mb-4"
          defaultEntries={12}
          placeholder="Buscar por destinatario o tipo"
          queryKey={['sent_notifications']}
        />
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
