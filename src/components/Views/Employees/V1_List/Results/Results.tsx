import ResultsList from './List/ResultsList';
import { mockedData } from './mocked';
import ResultsTable from './Table/ResultsTable';
import { useQuery } from '@tanstack/react-query';

import { getEmployeesFn } from '@/api/api-calls/employees';

import { useLoading } from '@/hooks';

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
