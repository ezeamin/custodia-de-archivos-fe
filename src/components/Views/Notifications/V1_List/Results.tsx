import ResultsList from './List/ResultsList';
import { mockedData } from './mocked';
import { useQuery } from '@tanstack/react-query';

import { getNotificationsFn } from '@/api/api-calls/notifications';

import { useLoading } from '@/hooks';

import ErrorMessage from '@/components/Error/ErrorMessage';
import { Pagination } from '@/components/ui';

const data = {
  ...mockedData,
  data: mockedData.data.filter((item) => item.hasBeenRead === false),
};
const isError = false;
const isLoading = false;

const Results = () => {
  // -------------------------------------------------
  // API
  // -------------------------------------------------

  const { /* data, isLoading, isError, */ refetch, status } = useQuery({
    queryKey: ['notifications'],
    queryFn: () => getNotificationsFn(false),
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
    return (
      <section className="mt-5 overflow-hidden">
        <ResultsList data={data.data} hasBeenRead={false} />
        <Pagination totalElements={data.totalElements} />
      </section>
    );
  }

  return null;
};
export default Results;
