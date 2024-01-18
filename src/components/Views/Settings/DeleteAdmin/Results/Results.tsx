import ResultsList from './List/ResultsList';
import { mockedUserList } from './mocked';
import ResultsTable from './Table/ResultsTable';
import { useQuery } from '@tanstack/react-query';

import { getUsersFn } from '@/api/api-calls/users';

import { useLoading } from '@/hooks';

import ErrorMessage from '@/components/Error/ErrorMessage';
import { Pagination } from '@/components/ui';

const data = {
  ...mockedUserList,
  data: mockedUserList.data.filter((user) => user.role.description === 'ADMIN'),
};
const isLoading = false;
const isError = false;

const Results = () => {
  // -------------------------------------------------
  // API
  // -------------------------------------------------

  const { /* data, isLoading, isError, */ refetch, status } = useQuery({
    queryKey: ['adminUsers'],
    queryFn: () => getUsersFn({ admin: true }),
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
      <section className="mt-5 overflow-hidden">
        <ErrorMessage refetch={handleRetry} />
      </section>
    );
  }

  if (data?.data) {
    return (
      <section className="mt-5 overflow-hidden">
        <ResultsTable data={data.data} />
        <ResultsList data={data.data} />

        <Pagination totalElements={data.totalElements} />
      </section>
    );
  }

  return null;
};
export default Results;
