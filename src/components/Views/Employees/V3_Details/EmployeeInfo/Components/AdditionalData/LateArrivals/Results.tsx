import { createPortal } from 'react-dom';
import { useParams } from 'react-router-dom';

import { mockedLateArrivals } from '../../../../mocked';
import AddNewButton from '../NewButton/NewButton';
import ObservationsMessage from '../Observations/ObservationsMessage';
import Modal from './LateArrivalsModal';
import List from './List/LateArrivalsList';
import NewModal from './New/AddNewLateArrivalModal';
import Table from './Table/LateArrivalsTable';
import { useQuery } from '@tanstack/react-query';

import { getEmployeeLateArrivalsFn } from '@/api/api-calls/employees';

import { useLoading } from '@/hooks';
import { useModal } from '@/stores/useModal';

import ErrorMessage from '@/components/Error/ErrorMessage';
import { Button } from '@/components/ui';

const data = mockedLateArrivals;
const isLoading = false;
const isError = false;

const Results = () => {
  // -------------------------------------------------
  // STATE & PARAMS
  // -------------------------------------------------

  const params = useParams();
  const { id: employeeId } = params;

  const { openModal } = useModal();

  // -------------------------------------------------
  // API
  // -------------------------------------------------

  const { /* data, isLoading, isError, */ refetch, status } = useQuery({
    queryKey: [`employeeLateArrivals_${employeeId}`],
    queryFn: () => getEmployeeLateArrivalsFn(employeeId!),
  });

  useLoading(isLoading, status);

  // -------------------------------------------------
  // HANDLERS
  // -------------------------------------------------

  const handleRetry = () => {
    refetch();
  };

  const handleSeeMore = () => {
    openModal('lateArrivals');
  };

  // -------------------------------------------------
  // RENDER
  // -------------------------------------------------

  if (isError) {
    return (
      <>
        <div className="mb-3 gap-2 flex sm:items-center lg:items-center flex-col sm:flex-row md:flex-col lg:flex-row sm:justify-between md:justify-between">
          <h2 className="text-lg font-bold">Llegadas tarde</h2>
          <AddNewButton disabled modalName="addNewLateArrival" />
        </div>
        <ErrorMessage refetch={handleRetry} />
      </>
    );
  }

  return (
    <>
      <div className="mb-3 gap-2 flex sm:items-center lg:items-center flex-col sm:flex-row md:flex-col lg:flex-row sm:justify-between md:justify-between">
        <h2 className="text-lg font-bold">Llegadas tarde</h2>
        <AddNewButton modalName="addNewLateArrival" />
      </div>
      {isLoading && (
        <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row gap-3">
          <div className="rounded-md custom-skeleton w-full sm:w-1/2 md:w-full lg:w-1/2 h-[100px]" />
          <div className="rounded-md custom-skeleton w-full sm:w-1/2 md:w-full lg:w-1/2 h-[100px]" />
        </div>
      )}

      {data.data && data.data.length > 0 && (
        <>
          <ObservationsMessage id="lateArrivals" />
          <section className="hidden sm:block">
            <Table data={data.data.slice(0, 5)} />
          </section>
          <section className="sm:hidden">
            <List data={data.data.slice(0, 5)} />
          </section>

          <div className="flex justify-between items-center gap-3 mt-2 h-[48px]">
            <p>
              Total: <b>{data.data.length} elementos</b>
            </p>
            {data.data.length > 5 && (
              <Button onClick={handleSeeMore}>Ver más</Button>
            )}
          </div>
        </>
      )}

      {data.data && data.data.length === 0 && (
        <p className="text-center my-3">No hay llegadas tarde registradas</p>
      )}

      {createPortal(<Modal data={data?.data} />, document.body)}
      {createPortal(<NewModal />, document.body)}
    </>
  );
};
export default Results;
