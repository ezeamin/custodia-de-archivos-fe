import { createPortal } from 'react-dom';
import { useParams } from 'react-router-dom';

import { mockedExtraHours } from '../../../../mocked';
import Modal from './ExtraHoursModal';
import List from './List/ExtraHoursList';
import Table from './Table/ExtraHoursTable';
import { useQuery } from '@tanstack/react-query';

import { getEmployeeExtraHoursFn } from '@/api/api-calls/employees';

import { useLoading } from '@/hooks';
import { useModal } from '@/stores/useModal';

import ErrorMessage from '@/components/Error/ErrorMessage';
import { Button } from '@/components/ui';

const data = mockedExtraHours;
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
    queryKey: [`employeeExtraHours_${employeeId}`],
    queryFn: () => getEmployeeExtraHoursFn(employeeId!),
  });

  useLoading(isLoading, status);

  // -------------------------------------------------
  // HANDLERS
  // -------------------------------------------------

  const handleRetry = () => {
    refetch();
  };

  const handleSeeMore = () => {
    openModal('extraHours');
  };

  // -------------------------------------------------
  // RENDER
  // -------------------------------------------------

  if (isError) {
    return (
      <>
        <h2 className="text-lg font-bold mb-3">Horas extra</h2>
        <ErrorMessage refetch={handleRetry} />
      </>
    );
  }

  return (
    <>
      <h2 className="text-lg font-bold mb-3">Horas extra</h2>
      {isLoading && (
        <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row gap-3">
          <div className="rounded-md custom-skeleton w-full sm:w-1/2 md:w-full lg:w-1/2 h-[100px]" />
          <div className="rounded-md custom-skeleton w-full sm:w-1/2 md:w-full lg:w-1/2 h-[100px]" />
        </div>
      )}

      {data.data && data.data.length > 0 && (
        <>
          <section className="hidden sm:block">
            <Table data={data.data.slice(0, 10)} />
          </section>
          <section className="sm:hidden">
            <List data={data.data.slice(0, 10)} />
          </section>

          <div className="flex justify-between items-center gap-3 mt-2">
            <p>
              Total: <b>{data.data.length} elementos</b>
            </p>
            {data.data.length > 10 && (
              <Button onClick={handleSeeMore}>Ver más</Button>
            )}
          </div>
        </>
      )}

      {data.data && data.data.length === 0 && (
        <p className="text-center my-3">No hay horas extra registradas</p>
      )}

      {createPortal(<Modal data={data?.data} />, document.body)}
    </>
  );
};
export default Results;
