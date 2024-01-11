import ResultsList from '../V1_List/List/ResultsList';
import { mockedData } from '../V1_List/mocked';
import { useQuery } from '@tanstack/react-query';

import { getNotificationsFn } from '@/api/api-calls/notifications';

import { useLoading } from '@/hooks';

import ErrorMessage from '@/components/Error/ErrorMessage';
import { Pagination } from '@/components/ui';

const data = {
  ...mockedData,
  data: mockedData.data.filter((item) => item.hasBeenRead === true),
};
const isError = false;
const isLoading = false;

const Results = () => {
  // -------------------------------------------------
  // API
  // -------------------------------------------------

  const { /* data, isLoading, isError, */ refetch, status } = useQuery({
    queryKey: ['notifications'],
    queryFn: () => getNotificationsFn(true),
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
        <ResultsList hasBeenRead data={data.data} />
        <Pagination totalElements={data.totalElements} />
      </section>
    );
  }

  return null;
};
export default Results;
