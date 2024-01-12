import { FiLogOut } from 'react-icons/fi';

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

  const queryClient = useQueryClient();

  const { mutate: postLogout } = useMutation({
    mutationFn: postLogoutFn,
    onError: () => {
      toast.dismiss(loadingToastId);
    },
    onSuccess: () => {
      toast.dismiss(loadingToastId);
      queryClient.clear();
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
        'hover:bg-red-500 hover:dark:bg-red-700 flex items-center py-2 text-center border-0 flex-nowrap',
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

      <p className="inline-block ml-2">Cerrar Sesión</p>
    </Button>
  );
};

export default LogoutButton;
