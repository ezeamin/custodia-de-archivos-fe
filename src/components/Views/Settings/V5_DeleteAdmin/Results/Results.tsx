import ResultsList from './List/ResultsList';
import ResultsTable from './Table/ResultsTable';
import { useQuery } from '@tanstack/react-query';

import { getUsersFn } from '@/api/api-calls/users';

import { useLoading } from '@/hooks';

import EmptyAlert from '@/components/Common/EmptyAlert';
import ErrorMessage from '@/components/Error/ErrorMessage';
import { Alert, Pagination } from '@/components/ui';

import { userRoles } from '@/constants/userRoles/userRoles';

import { BasicUser } from '@/api/interface/users';

const Results = () => {
  // -------------------------------------------------
  // API
  // -------------------------------------------------

  const { data, isLoading, isFetching, isError, refetch, status } = useQuery({
    queryKey: ['adminUsers'],
    queryFn: () => getUsersFn({ role: userRoles.ADMIN }),
  });

  useLoading(isLoading, status, isFetching);

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
    if (data.data.length === 0 && !window.location.search.includes('query'))
      return (
        <section className="mt-5 overflow-hidden">
          <Alert className="mb-3">
            <p>
              Atencion! No hay usuarios con permisos de administrador, y no se
              puede autorevocar el permiso. Puede crear uno nuevo desde
            </p>
            <p className="my-3 text-center font-bold">
              &quot;Ajustes&quot; &gt; &quot;Hacer administrador a otro
              usuario&quot;
            </p>
          </Alert>
        </section>
      );

    if (data.data.length === 0 && window.location.search.includes('query'))
      return (
        <section className="mt-5 overflow-hidden">
          <EmptyAlert queryKey="adminUsers" />
        </section>
      );

    return (
      <section className="mt-5 overflow-hidden">
        <ResultsTable data={data.data as BasicUser[]} />
        <ResultsList data={data.data as BasicUser[]} />

        {data.data.length > 10 && (
          <Pagination
            queryKey={['adminUsers']}
            totalElements={data.totalElements || 1}
          />
        )}
      </section>
    );
  }

  return null;
};
export default Results;
