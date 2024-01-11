import { createPortal } from 'react-dom';
import { useParams } from 'react-router-dom';

import { mockedVacations } from '../../../../mocked';
import AddNewButton from '../NewButton/NewButton';
import ObservationsMessage from '../Observations/ObservationsMessage';
import List from './List/VacationsList';
import NewModal from './New/AddNewVacationModal';
import Table from './Table/VacationsTable';
import Modal from './VacationsModal';
import { useQuery } from '@tanstack/react-query';

import { getEmployeeVacationsFn } from '@/api/api-calls/employees';

import { useLoading } from '@/hooks';
import { useModal } from '@/stores/useModal';

import ErrorMessage from '@/components/Error/ErrorMessage';
import { Alert, Button } from '@/components/ui';

const data = mockedVacations;
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
    queryKey: [`employeeVacations_${employeeId}`],
    queryFn: () => getEmployeeVacationsFn(employeeId!),
  });

  useLoading(isLoading, status);

  // -------------------------------------------------
  // HANDLERS
  // -------------------------------------------------

  const handleRetry = () => {
    refetch();
  };

  const handleSeeMore = () => {
    openModal('vacations');
  };

  // -------------------------------------------------
  // RENDER
  // -------------------------------------------------

  if (isError) {
    return (
      <>
        <div className="mb-3 gap-2 flex sm:items-center lg:items-center flex-col sm:flex-row md:flex-col lg:flex-row sm:justify-between md:justify-between">
          <h2 className="text-lg font-bold">Vacaciones</h2>
          <AddNewButton disabled modalName="addNewVacation" />
        </div>
        <ErrorMessage refetch={handleRetry} />
      </>
    );
  }

  return (
    <>
      <div className="mb-3 gap-2 flex sm:items-center lg:items-center flex-col sm:flex-row md:flex-col lg:flex-row sm:justify-between md:justify-between">
        <h2 className="text-lg font-bold">Vacaciones</h2>
        <AddNewButton modalName="addNewVacation" />
      </div>
      {isLoading && (
        <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row gap-3">
          <div className="rounded-md custom-skeleton w-full sm:w-1/2 md:w-full lg:w-1/2 h-[100px]" />
          <div className="rounded-md custom-skeleton w-full sm:w-1/2 md:w-full lg:w-1/2 h-[100px]" />
        </div>
      )}

      {data.data && data.data.length > 0 && (
        <>
          <Alert className="mb-3">
            La diferencia de días incluye fines de semana y feriados. No se hace
            distinción de días hábiles y no hábiles.
          </Alert>
          <ObservationsMessage id="vacations" />
          <section className="hidden sm:block md:hidden xl:block">
            <Table data={data.data.slice(0, 5)} />
          </section>
          <section className="sm:hidden md:block xl:hidden">
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
        <p className="text-center my-3">No hay vacaciones registradas</p>
      )}

      {createPortal(<Modal data={data?.data} />, document.body)}
      {createPortal(<NewModal />, document.body)}
    </>
  );
};
export default Results;
