import { mockedData } from './mocked';
import ResultsList from './ResultsList';
import ResultsTable from './ResultsTable';
import { useQuery } from '@tanstack/react-query';

import { getEmployees } from '@/api/api-calls/employees';

import { useLoading, usePortrait } from '@/hooks';

import { Alert, Pagination } from '@/components/ui';

const data = mockedData;
const isError = false;
const isLoading = false;

const Results = () => {
  const isPortrait = usePortrait();

  // -------------------------------------------------
  // API
  // -------------------------------------------------

  const { /* data, isLoading, isError, */ refetch } = useQuery({
    queryKey: ['employees'],
    queryFn: getEmployees,
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
    if (isPortrait) {
      return (
        <section className="mt-5">
          <ResultsList data={data.data} />
          <Pagination totalElements={data.totalElements} />
        </section>
      );
    }

    return (
      <>
        <ResultsTable data={data.data} />
        <Pagination totalElements={data.totalElements} />
      </>
    );
  }

  return null;
};
export default Results;
