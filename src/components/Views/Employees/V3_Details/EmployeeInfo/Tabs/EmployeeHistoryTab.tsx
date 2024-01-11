import { useParams } from 'react-router-dom';

import { mockedHistory } from '../../mocked';
import HistoryList from '../Components/History/List/HistoryList';
import HistoryTable from '../Components/History/Table/HistoryTable';
import { useQuery } from '@tanstack/react-query';

import { getEmployeeHistoryFn } from '@/api/api-calls/employees';

import { useLoading } from '@/hooks';

import ErrorMessage from '@/components/Error/ErrorMessage';

const data = mockedHistory;
const isLoading = false;
const isError = false;

const EmployeeHistoryTab = () => {
  // -------------------------------------------------
  // STATE & PARAMS
  // -------------------------------------------------

  const params = useParams();
  const { id: employeeId } = params;

  // TODO: "field" should be changed to show a label on the backend

  // -------------------------------------------------
  // API
  // -------------------------------------------------

  const { /* data, isLoading, isError, */ refetch, status } = useQuery({
    queryKey: [`employeeHist_${employeeId}`],
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
        <ErrorMessage refetch={handleRetry} />
      </>
    );
  }

  return (
    <>
      <h2 className="text-lg font-bold mb-3">Historial de cambios</h2>

      {isLoading && (
        <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row gap-3">
          <div className="rounded-md custom-skeleton w-full sm:w-1/2 md:w-full lg:w-1/2 h-[100px]" />
          <div className="rounded-md custom-skeleton w-full sm:w-1/2 md:w-full lg:w-1/2 h-[100px]" />
        </div>
      )}

      {data.data && data.data.length > 0 && (
        <>
          <section className="hidden sm:block md:hidden lg:block">
            <HistoryTable data={data.data} />
          </section>
          <section className="sm:hidden md:block lg:hidden">
            <HistoryList data={data.data} />
          </section>
        </>
      )}

      {data.data && data.data.length === 0 && (
        <p className="text-center my-3">No hay cambios registrados</p>
      )}
    </>
  );
};
export default EmployeeHistoryTab;
