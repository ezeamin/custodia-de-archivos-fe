import ResultsList from './List/ResultsList';
import ResultsTable from './Table/ResultsTable';
import { useQuery } from '@tanstack/react-query';

import { getLoginLogsFn } from '@/api/api-calls/users';

import { useLoading } from '@/hooks';

import EmptyAlert from '@/components/Common/EmptyAlert';
import ErrorMessage from '@/components/Error/ErrorMessage';
import { Alert, Pagination } from '@/components/ui';

const Results = () => {
  // -------------------------------------------------
  // API
  // -------------------------------------------------

  const { data, isLoading, isFetching, isError, refetch, status } = useQuery({
    queryKey: ['loginLogs'],
    queryFn: getLoginLogsFn,
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
    if (data.data.length === 0 && !window.location.search.includes('query'))
      return (
        <section className="mt-5 overflow-hidden">
          <Alert className="mb-3">
            <p>Atencion! No hay inicios de sesión registrados aún.</p>
          </Alert>
        </section>
      );

    if (data.data.length === 0 && window.location.search.includes('query'))
      return (
        <section className="mt-5 overflow-hidden">
          <EmptyAlert queryKey="loginLogs" />
        </section>
      );

    return (
      <section className="mt-5 overflow-hidden">
        <Alert className="mb-3">
          Atención: La información del &quot;dispositivo&quot; puede no ser
          exacta.
        </Alert>
        <ResultsTable data={data.data} />
        <ResultsList data={data.data} />

        <Pagination
          queryKey="loginLogs"
          totalElements={data.totalElements || 0}
        />
      </section>
    );
  }

  return null;
};
export default Results;
