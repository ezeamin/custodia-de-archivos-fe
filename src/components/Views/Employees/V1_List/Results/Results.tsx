import ResultsList from './List/ResultsList';
import ResultsTable from './Table/ResultsTable';
import { useQuery } from '@tanstack/react-query';

import { getEmployeesFn } from '@/api/api-calls/employees';

import { useLoading } from '@/hooks';

import EmptyAlert from '@/components/Common/EmptyAlert';
import ErrorMessage from '@/components/Error/ErrorMessage';
import { Alert, Pagination } from '@/components/ui';

const Results = () => {
  // -------------------------------------------------
  // API
  // -------------------------------------------------

  const { data, isLoading, isFetching, isError, refetch, status } = useQuery({
    queryKey: ['employees'],
    queryFn: getEmployeesFn,
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
    return <ErrorMessage refetch={handleRetry} />;
  }

  if (data?.data) {
    if (data.data.length === 0 && !window.location.search.includes('query'))
      return (
        <section className="mt-5 overflow-hidden">
          <Alert className="mb-3">
            <p>
              Atencion! No hay empleados creados aún. Puede crear uno nuevo
              desde el botón superior &quot;CREAR NUEVO EMPLEADO&quot;
            </p>
          </Alert>
        </section>
      );

    if (data.data.length === 0 && window.location.search.includes('query'))
      return (
        <section className="mt-5 overflow-hidden">
          <EmptyAlert queryKey="employees" />
        </section>
      );

    return (
      <section className="mt-5 overflow-hidden">
        <ResultsTable data={data.data} />
        <ResultsList data={data.data} />

        {data.totalElements && data?.totalElements > 10 && (
          <Pagination
            queryKey={['employees']}
            totalElements={data.totalElements || 1}
          />
        )}
      </section>
    );
  }

  return null;
};

export default Results;
