import { createPortal } from 'react-dom';
import { useParams } from 'react-router-dom';

import AddNewButton from '../NewButton/NewButton';
import ObservationsMessage from '../Observations/ObservationsMessage';
import List from './List/TrainingsList';
import NewModal from './New/AddNewTrainingModal';
import Table from './Table/TrainingsTable';
import Modal from './TrainingsModal';
import { useQuery } from '@tanstack/react-query';

import { getEmployeeTrainingsFn } from '@/api/api-calls/employees';

import { useLoading } from '@/hooks';
import { useModal } from '@/stores/useModal';

import ErrorMessage from '@/components/Error/ErrorMessage';
import { Button } from '@/components/ui';

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

  const { data, isLoading, isFetching, isError, refetch, status } = useQuery({
    queryKey: [`employeeTrainings_${employeeId}`],
    queryFn: () => getEmployeeTrainingsFn(employeeId!),
  });

  useLoading(isLoading, status);

  // -------------------------------------------------
  // HANDLERS
  // -------------------------------------------------

  const handleRetry = () => {
    refetch();
  };

  const handleSeeMore = () => {
    openModal('trainings');
  };

  // -------------------------------------------------
  // RENDER
  // -------------------------------------------------

  if (isError) {
    return (
      <>
        <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between md:flex-col md:justify-between lg:flex-row lg:items-center">
          <h2 className="text-lg font-bold">Capacitaciones</h2>
          <AddNewButton disabled modalName="addNewTraining" />
        </div>
        <ErrorMessage refetch={handleRetry} />
      </>
    );
  }

  return (
    <>
      <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between md:flex-col md:justify-between lg:flex-row lg:items-center">
        <h2 className="text-lg font-bold">Capacitaciones</h2>
        <AddNewButton modalName="addNewTraining" />
      </div>
      {isFetching && (
        <div className="flex flex-col gap-3 sm:flex-row md:flex-col lg:flex-row">
          <div className="custom-skeleton h-[100px] w-full rounded-md sm:w-1/2 md:w-full lg:w-1/2" />
          <div className="custom-skeleton h-[100px] w-full rounded-md sm:w-1/2 md:w-full lg:w-1/2" />
        </div>
      )}

      {!isFetching && data?.data && data.data.length > 0 && (
        <>
          <ObservationsMessage id="trainings" />
          <section className="hidden sm:block">
            <Table data={data.data.slice(0, 5)} />
          </section>
          <section className="sm:hidden">
            <List data={data.data.slice(0, 5)} />
          </section>

          <div className="mt-2 flex h-[48px] items-center justify-between gap-3">
            <p>
              Total: <b>{data.data.length} elementos</b>
            </p>
            {data.data.length > 5 && (
              <Button onClick={handleSeeMore}>Ver más</Button>
            )}
          </div>
        </>
      )}

      {!isFetching && data?.data && data.data.length === 0 && (
        <p className="my-3 text-center">No hay capacitaciones registradas</p>
      )}

      {createPortal(<Modal data={data?.data || []} />, document.body)}
      {createPortal(<NewModal />, document.body)}
    </>
  );
};
export default Results;
