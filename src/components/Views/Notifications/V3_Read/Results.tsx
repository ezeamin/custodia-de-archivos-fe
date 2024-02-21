import ResultsList from '../V1_List/List/ResultsList';
import { useQuery } from '@tanstack/react-query';

import { getNotificationsFn } from '@/api/api-calls/notifications';

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
    queryKey: ['notifications', true],
    queryFn: () => getNotificationsFn(true),
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
          <Alert className="mb-3">
            <p>¡Lo sentimos! No hay notificaciones recibidas aún.</p>
          </Alert>
        </section>
      );

    if (data.data.length === 0 && window.location.search.includes('query')) {
      return (
        <section className="mt-5 overflow-hidden">
          <SearchFilter
            className="mb-4"
            defaultEntries={12}
            placeholder="Buscar por emisor o tipo"
            queryKey={['notifications', true]}
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
          placeholder="Buscar por emisor o tipo"
          queryKey={['notifications', true]}
        />
        <ResultsList hasBeenRead data={data.data} />
        {data.data.length > 12 && (
          <Pagination
            entries={12}
            queryKey={['notifications']}
            totalElements={data.totalElements || 1}
          />
        )}
      </section>
    );
  }

  return null;
};
export default Results;
