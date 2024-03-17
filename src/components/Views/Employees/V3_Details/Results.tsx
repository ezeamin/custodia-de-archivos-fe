import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import EmployeeJobDetails from './EmployeeInfo/EmployeeJobDetails';
import EmployeeTabs from './EmployeeInfo/EmployeeTabs';
import NewUserModal from './EmployeeInfo/NewUserModal';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { getEmployeeFn } from '@/api/api-calls/employees';
import { postUserFn } from '@/api/api-calls/users';

import { useLoading, usePortrait } from '@/hooks';
import { useModal } from '@/stores/useModal';
import { useSession } from '@/stores/useSession';

import ErrorMessage from '@/components/Error/ErrorMessage';
import { Alert, Button } from '@/components/ui';

import { uuidRegex } from '@/constants/regex/regex';
import { paths } from '@/constants/routes/paths';
import { userRoles } from '@/constants/userRoles/userRoles';

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

  const { user: loggedInUser } = useSession();

  // -------------------------------------------------
  // API
  // -------------------------------------------------

  const [isLoadingCreateUser, setIsLoadingCreateUser] = useState(false);

  const queryClient = useQueryClient();

  const { data, isLoading, isError, refetch, status } = useQuery({
    queryKey: ['employee', employeeId],
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
      setModalData(res.data);
      openModal('newUser');
      queryClient.invalidateQueries({
        queryKey: ['employee', employeeId],
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
    if (loggedInUser?.role === userRoles.THIRD_PARTY) return;

    setIsLoadingCreateUser(true);
    createUser(employeeId!);
  };

  // -------------------------------------------------
  // RENDER
  // -------------------------------------------------

  if (isError) {
    return <ErrorMessage refetch={handleRetry} />;
  }

  const showJobDetails =
    !isPortrait || (currentTab === 'personal' && isPortrait);

  if (data?.data) {
    return (
      <>
        {!data.data.user && loggedInUser?.role !== userRoles.THIRD_PARTY && (
          <Alert closable className="mb-3">
            <b>Atención: este empleado no tiene usuario asignado</b>. Si desea
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
        <section className="mt-5 flex flex-col-reverse gap-3 pb-6 lg:flex-row">
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
