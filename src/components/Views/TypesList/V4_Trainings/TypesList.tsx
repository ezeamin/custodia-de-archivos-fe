import ResultsList from './List/ResultsList';
import { useQuery } from '@tanstack/react-query';

import { getEmployeeTrainingsTypesFn } from '@/api/api-calls/employees';

import { useLoading } from '@/hooks';

import ErrorMessage from '@/components/Error/ErrorMessage';
import { Alert } from '@/components/ui';

const TypesList = () => {
  // -------------------------------------------------
  // API
  // -------------------------------------------------

  const { data, isLoading, isError, refetch, status } = useQuery({
    queryKey: ['employeeTrainingsTypes'],
    queryFn: getEmployeeTrainingsTypesFn,
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
    return <ErrorMessage refetch={handleRetry} />;
  }

  if (data?.data) {
    if (data.data.length === 0)
      return (
        <section className="mt-5 overflow-hidden">
          <Alert className="mb-3">
            <p>Aún no hay tipos de capacitaciones creadas.</p>
          </Alert>
        </section>
      );

    return (
      <section className="animate-in-bottom a-delay-600 mt-4 overflow-hidden">
        <ResultsList data={data.data} />
      </section>
    );
  }

  return null;
};
export default TypesList;
