import ResultsList from './List/ResultsList';
import { mockedLoginLogsList } from './mocked';
import ResultsTable from './Table/ResultsTable';
import { useQuery } from '@tanstack/react-query';

import { getLoginLogsFn } from '@/api/api-calls/users';

import { useLoading } from '@/hooks';

import ErrorMessage from '@/components/Error/ErrorMessage';
import { Alert, Pagination } from '@/components/ui';

const data = mockedLoginLogsList;
const isLoading = false;
const isError = false;

const Results = () => {
  // -------------------------------------------------
  // API
  // -------------------------------------------------

  const { /* data, isLoading, isError, */ refetch, status } = useQuery({
    queryKey: ['loginLogs'],
    queryFn: getLoginLogsFn,
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
      <section className="mt-5 overflow-hidden">
        <ErrorMessage refetch={handleRetry} />
      </section>
    );
  }

  if (data?.data) {
    /* TODO: Check, this shouldn't ever happen */
    if (data.data.length === 0)
      return (
        <section className="mt-5 overflow-hidden">
          <Alert className="mb-3">
            <p>Atencion! No hay inicios de sesión registrados aún.</p>
          </Alert>
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

        <Pagination totalElements={data.totalElements} />
      </section>
    );
  }

  return null;
};
export default Results;
