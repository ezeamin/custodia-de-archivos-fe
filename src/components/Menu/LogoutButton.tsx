import { FiLogOut } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import Swal from 'sweetalert2';

import { postLogoutFn } from '@/api/api-calls/auth';

import { usePortraitMenu } from '@/stores/usePortraitMenu';
import { useSession } from '@/stores/useSession';

import { Button, Icon } from '@/components/ui';

import { cn } from '@/utilities';

import { type LogoutButtonProps } from '../interface';

let loadingToastId: string | number = '';

const LogoutButton = (props: LogoutButtonProps): JSX.Element => {
  const { className } = props;

  const { closeMenu } = usePortraitMenu();
  const { logout } = useSession();
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { mutate: postLogout } = useMutation({
    mutationFn: postLogoutFn,
    onError: () => {
      // Its an error, but we should provide the user the ability to logout even if it fails
      toast.dismiss(loadingToastId);
      queryClient.clear();
      // Navigate home so that "redirectTo" doesn't get called
      navigate('/');
      logout();
    },
    onSuccess: () => {
      toast.dismiss(loadingToastId);
      queryClient.clear();
      // Navigate home so that "redirectTo" doesn't get called
      navigate('/');
      logout();
    },
  });

  const handleLogout = (): void => {
    closeMenu();
    Swal.fire({
      title: '¿Está seguro?',
      text: '¿Quiere cerrar sesión?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, salir',
      cancelButtonText: 'No',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
    })
      .then((action) => {
        if (action.isConfirmed) {
          loadingToastId = toast.loading('Cerrando sesión...');
          postLogout();
        }
      })
      .catch((err) => {
        if (err instanceof Error) {
          toast.error(err.message);
        }
      });
  };

  return (
    <Button
      className={cn(
        'flex flex-nowrap items-center border-0 py-2 text-center hover:bg-red-500 hover:dark:bg-red-700',
        className
      )}
      colorDark="dark:bg-red-800"
      colorLight="bg-red-300"
      textColorDark="dark:text-white"
      textColorLight="text-dark"
      onClick={handleLogout}
    >
      <Icon
        iconComponent={<FiLogOut className="inline-block" size="1.5em" />}
        title="Cerrar Sesión"
      />

      <p className="ml-2 inline-block">Cerrar Sesión</p>
    </Button>
  );
};

export default LogoutButton;
