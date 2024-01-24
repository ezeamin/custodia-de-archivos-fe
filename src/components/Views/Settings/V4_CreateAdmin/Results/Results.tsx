import ResultsList from './List/ResultsList';
import ResultsTable from './Table/ResultsTable';
import { useQuery } from '@tanstack/react-query';

import { getUsersFn } from '@/api/api-calls/users';

import { useLoading } from '@/hooks';

import ErrorMessage from '@/components/Error/ErrorMessage';
import { Alert, Pagination } from '@/components/ui';

import { BasicUser } from '@/api/interface/users';

const Results = () => {
  // -------------------------------------------------
  // API
  // -------------------------------------------------

  const { data, isLoading, isError, refetch, status } = useQuery({
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
    if (data.data.length === 0 && !window.location.search.includes('query'))
      return (
        <section className="mt-5 overflow-hidden">
          <Alert className="mb-3">
            <p>
              Atencion! No hay usuarios creados aún. Para crear un usuario, debe
              crear primero un empleado. Puede crear uno nuevo desde
            </p>
            <p className="my-3 text-center font-bold">
              &quot;Empleados&quot; &gt; &quot;CREAR NUEVO EMPLEADO&quot;
            </p>
            <p>
              Luego, desde el detalle del empleado creado, podrá crearle un
              usuario. Posteriormente, vuelva a esta página.
            </p>
          </Alert>
        </section>
      );

    if (data.data.length === 0 && window.location.search.includes('query'))
      return (
        <section className="mt-5 overflow-hidden">
          <Alert className="mb-3" type="warning">
            <p>
              No se encontraron resultados para la búsqueda realizada. Intente
              con otros valores
            </p>
          </Alert>
        </section>
      );

    return (
      <section className="mt-5 overflow-hidden">
        <ResultsTable data={data.data as BasicUser[]} />
        <ResultsList data={data.data as BasicUser[]} />

        <Pagination queryKey="users" totalElements={data.totalElements || 0} />
      </section>
    );
  }

  return null;
};
export default Results;
