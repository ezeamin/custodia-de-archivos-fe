import ResultsList from './List/ResultsList';
import ResultsTable from './Table/ResultsTable';
import { useQuery } from '@tanstack/react-query';

import { getUsersFn } from '@/api/api-calls/users';

import { useLoading } from '@/hooks';

import ErrorMessage from '@/components/Error/ErrorMessage';
import { Alert, Pagination } from '@/components/ui';

const Results = () => {
  // -------------------------------------------------
  // API
  // -------------------------------------------------

  const { data, isLoading, isFetching, isError, refetch, status } = useQuery({
    queryKey: ['readOnlyUsers'],
    queryFn: () => getUsersFn({ role: 'THIRD_PARTY' }),
  });

  useLoading(isLoading, status, isFetching);

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
      <section className="mt-5 overflow-hidden">
        <ErrorMessage refetch={handleRetry} />
      </section>
    );
  }

  if (data?.data) {
    if (data.data.length === 0)
      return (
        <section className="mt-5 overflow-hidden">
          <Alert className="mb-3">
            <p>
              Atencion! No hay usuarios creados de solo lectura. Puede crear uno
              nuevo desde
            </p>
            <p className="my-3 text-center font-bold">
              &quot;Ajustes&quot; &gt; &quot;Crear usuario de solo lectura&quot;
            </p>
          </Alert>
        </section>
      );

    return (
      <section className="mt-5 overflow-hidden">
        <ResultsTable data={data.data} />
        <ResultsList data={data.data} />

        {data.data.length > 10 && (
          <Pagination
            queryKey={['readOnlyUsers']}
            totalElements={data.totalElements || 1}
          />
        )}
      </section>
    );
  }

  return null;
};
export default Results;
