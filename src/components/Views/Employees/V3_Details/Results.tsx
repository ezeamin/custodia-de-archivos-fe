import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import EmployeeJobDetails from './EmployeeInfo/EmployeeJobDetails';
import EmployeeTabs from './EmployeeInfo/EmployeeTabs';
import NewUserModal from './EmployeeInfo/NewUserModal';
import { mockedEmployee } from './mocked';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { getEmployeeFn, postUserFn } from '@/api/api-calls/employees';

import { useLoading, usePortrait } from '@/hooks';
import { useModal } from '@/stores/useModal';

import { Alert, Button } from '@/components/ui';

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
  const { id: employeeId, tab: currentTab } = params;

  const navigate = useNavigate();

  if (!employeeId || !uuidRegex.test(employeeId)) {
    toast.error('El ID del empleado es inválido');
    navigate(paths.EMPLOYEES.MAIN);
  }

  const isPortrait = usePortrait();

  const { openModal, setModalData } = useModal();

  // -------------------------------------------------
  // API
  // -------------------------------------------------

  const [isLoadingCreateUser, setIsLoadingCreateUser] = useState(false);

  const queryClient = useQueryClient();

  const { /* data, isLoading, isError, */ refetch, status } = useQuery({
    queryKey: [`employee_${employeeId}`],
    queryFn: () => getEmployeeFn(employeeId!),
  });

  const { mutate: createUser } = useMutation({
    mutationFn: postUserFn,
    onError: (error) => {
      setIsLoadingCreateUser(false);
      toast.error(error.message);
    },
    onSuccess: (res) => {
      setIsLoadingCreateUser(false);
      setModalData(res);
      openModal('newUser');
      queryClient.invalidateQueries({
        queryKey: [`employee_${employeeId}`],
      });
    },
  });

  useLoading(isLoading, status);

  // -------------------------------------------------
  // HANDLERS
  // -------------------------------------------------

  const handleRetry = () => {
    refetch();
  };

  const handleCreateUser = () => {
    setIsLoadingCreateUser(true);
    createUser(employeeId!);
  };

  // -------------------------------------------------
  // RENDER
  // -------------------------------------------------

  if (isError) {
    return (
      <Alert className="mt-3 animate-in-right a-delay-500" type="error">
        <p>
          Ocurrió un error leyendo la información. Por favor, intente nuevamente
          en unos instantes o reintente utilizando el botón debajo de este
          mensaje.
        </p>
        <button className="btn mt-2" type="button" onClick={handleRetry}>
          Reintentar
        </button>
      </Alert>
    );
  }

  const showJobDetails =
    !isPortrait || (currentTab === 'personal' && isPortrait);

  if (data?.data) {
    return (
      <>
        {!data.data.user && (
          <Alert closable className="mb-3">
            <b>Atencion: este empleado no tiene usuario asignado</b>. Si desea
            hacerlo, haga click en el siguiente botón.
            <div>
              <Button
                className="mt-3"
                loading={isLoadingCreateUser}
                onClick={handleCreateUser}
              >
                Crear usuario
              </Button>
            </div>
          </Alert>
        )}
        <section className="mt-5 overflow-hidden flex flex-col-reverse lg:flex-row gap-3">
          <article className="md:w-[100%] lg:w-[30%] xl:w-[20%]">
            {showJobDetails && <EmployeeJobDetails data={data.data} />}
          </article>
          <article className="md:w-[100%] lg:w-[70%] xl:w-[80%]">
            <EmployeeTabs />
          </article>
        </section>
        <NewUserModal />
      </>
    );
  }

  return null;
};

export default Results;
