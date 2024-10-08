import { useParams } from 'react-router-dom';

import HistoryList from '../Components/History/List/HistoryList';
import HistoryTable from '../Components/History/Table/HistoryTable';
import { useQuery } from '@tanstack/react-query';

import { getEmployeeHistoryFn } from '@/api/api-calls/employees';

import { useLoading } from '@/hooks';

import SearchFilter from '@/components/Common/SearchFilter';
import ErrorMessage from '@/components/Error/ErrorMessage';
import { Alert, Pagination } from '@/components/ui';

const EmployeeHistoryTab = () => {
  // -------------------------------------------------
  // STATE & PARAMS
  // -------------------------------------------------

  const params = useParams();
  const { id: employeeId } = params;

  // -------------------------------------------------
  // API
  // -------------------------------------------------

  const { data, isFetching, isLoading, isError, refetch, status } = useQuery({
    queryKey: ['employeeHist', employeeId],
    queryFn: () => getEmployeeHistoryFn(employeeId!),
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
        <h2 className="text-lg font-bold">Historial de cambios</h2>
        <SearchFilter
          className="mb-3"
          placeholder="Buscar por campo"
          queryKey={['employeeHist', employeeId!]}
        />
        <ErrorMessage refetch={handleRetry} />
      </>
    );
  }

  return (
    <>
      <h2 className="mb-3 text-lg font-bold">Historial de cambios</h2>

      {isFetching && (
        <>
          <SearchFilter
            className="mb-3"
            placeholder="Buscar por campo"
            queryKey={['employeeHist', employeeId!]}
          />
          <div className="flex flex-col gap-3 sm:flex-row md:flex-col lg:flex-row">
            <div className="custom-skeleton h-[100px] w-full rounded-md sm:w-1/2 md:w-full lg:w-1/2" />
            <div className="custom-skeleton h-[100px] w-full rounded-md sm:w-1/2 md:w-full lg:w-1/2" />
          </div>
        </>
      )}

      {!isFetching && data?.data && data.data.length > 0 && (
        <>
          <SearchFilter
            className="mb-3"
            placeholder="Buscar por campo"
            queryKey={['employeeHist', employeeId!]}
          />
          <section className="hidden sm:block md:hidden xl:block">
            <HistoryTable data={data.data} />
          </section>
          <section className="sm:hidden md:block xl:hidden">
            <HistoryList data={data.data} />
          </section>
          {data.totalElements && data?.totalElements > 10 && (
            <Pagination
              queryKey={['employeeHist', employeeId!]}
              totalElements={data.totalElements || 1}
            />
          )}
        </>
      )}

      {!isFetching &&
        data?.data &&
        data.data.length === 0 &&
        window.location.search.includes('query') && (
          <>
            <SearchFilter
              className="mb-3"
              placeholder="Buscar por campo"
              queryKey={['employeeHist', employeeId!]}
            />
            <Alert>
              No se encontraron resultados para la búsqueda ingresada.
            </Alert>
          </>
        )}

      {!isFetching &&
        data?.data &&
        data.data.length === 0 &&
        !window.location.search.includes('query') && (
          <p className="my-3 text-center">No hay cambios registrados</p>
        )}
    </>
  );
};
export default EmployeeHistoryTab;
