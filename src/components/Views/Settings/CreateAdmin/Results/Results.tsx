import ResultsList from './List/ResultsList';
import { mockedUserList } from './mocked';
import ResultsTable from './Table/ResultsTable';
import { useQuery } from '@tanstack/react-query';

import { getUsersFn } from '@/api/api-calls/users';

import { useLoading } from '@/hooks';

import ErrorMessage from '@/components/Error/ErrorMessage';
import { Alert, Pagination } from '@/components/ui';

const data = mockedUserList;
const isLoading = false;
const isError = false;

const Results = () => {
  // -------------------------------------------------
  // API
  // -------------------------------------------------

  const { /* data, isLoading, isError, */ refetch, status } = useQuery({
    queryKey: ['users'],
    queryFn: () => getUsersFn({}),
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
    if (data.data.length === 0)
      return (
        <section className="mt-5 overflow-hidden">
          <Alert className="mb-3" type="warning">
            <p>
              Atencion! No hay usuarios creados aún. Para crear un usuario, debe
              crear primero un empleado. Puede crear uno nuevo desde
            </p>
            <p className="my-3 text-center font-bold">
              &quot;Empleados&quot; &gt; &quot;Crear nuevo empleado&quot;
            </p>
            <p>
              Luego, desde el detalle del empleado creado, podrá crearle un
              usuario.
            </p>
            <p className="my-3 text-center font-bold">
              &quot;Ajustes&quot; &gt; &quot;Hacer administrador a otro
              usuario&quot;
            </p>
          </Alert>
        </section>
      );

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
