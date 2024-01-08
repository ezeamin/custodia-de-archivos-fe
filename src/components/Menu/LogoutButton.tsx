import { FiLogOut } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

import { toast } from 'sonner';
import Swal from 'sweetalert2';

import { usePortraitMenu } from '@/stores/usePortraitMenu';

import { Button, Icon } from '@/components/ui';

import { paths } from '@/constants/routes/paths';
import { cn } from '@/utilities';

import { type LogoutButtonProps } from '../interface';

const LogoutButton = (props: LogoutButtonProps): JSX.Element => {
  const { className } = props;

  const navigate = useNavigate();
  const { closeMenu } = usePortraitMenu();

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
          sessionStorage.removeItem('refresh_token'); //! TODO: Check if it saves here or in cookies
          navigate(paths.AUTH.LOGIN);
        }
      })
      .catch((err) => {
        if (err instanceof Error) {
          toast.error(err.message);
        }
      });
  };

  // Renderizo
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
