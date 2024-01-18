import ResultsList from './List/ResultsList';
import { mockedData } from './mocked';
import ResultsTable from './Table/ResultsTable';
import { useQuery } from '@tanstack/react-query';

import { getEmployeesFn } from '@/api/api-calls/employees';

import { useLoading } from '@/hooks';

import ErrorMessage from '@/components/Error/ErrorMessage';
import { Alert, Pagination } from '@/components/ui';

const data = mockedData;
const isError = false;
const isLoading = false;

const Results = () => {
  // -------------------------------------------------
  // API
  // -------------------------------------------------

  const { /* data, isLoading, isError, */ refetch, status } = useQuery({
    queryKey: ['employees'],
    queryFn: getEmployeesFn,
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
      <>
        <h2 className="mb-3 text-lg font-bold">Historial de cambios</h2>
        <ErrorMessage refetch={handleRetry} />
      </>
    );
  }

  if (data?.data) {
    if (data.data.length === 0)
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

    return (
      <section className="mt-5 overflow-hidden">
        <ResultsTable data={data.data} />
        <ResultsList data={data.data} />

        <Pagination totalElements={data.totalElements} />
      </section>
    );
  }

  return null;
};

export default Results;
