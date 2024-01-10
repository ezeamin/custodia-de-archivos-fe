import { useParams } from 'react-router-dom';

import { mockedVacations } from '../../../../mocked';
import { useQuery } from '@tanstack/react-query';

import { getEmployeeVacationsFn } from '@/api/api-calls/employees';

import { useLoading } from '@/hooks';

import ErrorMessage from '@/components/Error/ErrorMessage';

const data = mockedVacations;
const isLoading = false;
const isError = false;

const Results = () => {
  // -------------------------------------------------
  // STATE & PARAMS
  // -------------------------------------------------

  const params = useParams();
  const { id: employeeId } = params;

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

  // -------------------------------------------------
  // RENDER
  // -------------------------------------------------

  if (isError) {
    return (
      <>
        <h2 className="text-lg font-bold mb-3">Historial de cambios</h2>
        <ErrorMessage refetch={handleRetry} />
      </>
    );
  }

  return <div>Results</div>;
};
export default Results;
