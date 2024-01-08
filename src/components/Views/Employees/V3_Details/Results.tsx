import { useNavigate, useParams } from 'react-router-dom';

import EmployeeStatus from '../V1_List/Results/EmployeeStatus';
import EmployeeInfo from './EmployeeInfo/EmployeeInfo';
import { mockedEmployee } from './mocked';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

import { getEmployeeFn } from '@/api/api-calls/employees';

import { useLoading } from '@/hooks';

import Title from '@/components/Common/Title';
import { Alert } from '@/components/ui';

import { uuidRegex } from '@/constants/regex/regex';
import { paths } from '@/constants/routes/paths';

const data = mockedEmployee;
const isError = false;
const isLoading = false;

const Results = () => {
  // -------------------------------------------------
  // STATE & PARAMS
  // -------------------------------------------------

  const params = useParams();
  const { id: employeeId } = params;

  const navigate = useNavigate();

  if (!employeeId || !uuidRegex.test(employeeId)) {
    toast.error('El ID del empleado es inválido');
    navigate(paths.EMPLOYEES.MAIN);
  }

  // -------------------------------------------------
  // API
  // -------------------------------------------------

  const { /* data, isLoading, isError, */ refetch, status } = useQuery({
    queryKey: [`employee_${employeeId}`],
    queryFn: () => getEmployeeFn(employeeId!),
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
        <Title title="Error" />
        <Alert className="mt-3 animate-in-right a-delay-500" type="error">
          <p>
            Ocurrió un error leyendo la información. Por favor, intente
            nuevamente en unos instantes o reintente utilizando el botón debajo
            de este mensaje.
          </p>
          <button className="btn mt-2" type="button" onClick={handleRetry}>
            Reintentar
          </button>
        </Alert>
      </>
    );
  }

  if (data?.data) {
    return (
      <>
        <div className="flex gap-4 items-center">
          <h1 className="text-4xl font-bold">{`${data.data.lastname}, ${data.data.firstname}`}</h1>
          <EmployeeStatus
            expanded
            className="hidden md:inline-flex"
            status={data.data.status}
          />
        </div>
        <div className="divider mt-1" />
        <section className="mt-5 overflow-hidden">
          <EmployeeInfo data={data.data} />
        </section>
      </>
    );
  }

  return <Title title="Cargando..." />;
};

export default Results;
