import { FiLogOut } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

import { toast } from 'sonner';
import Swal from 'sweetalert2';

import { Button, Icon } from '@/components/ui';

import { cn } from '@/utilities';

import { type LogoutButtonProps } from '../interface';

const LogoutButton = (props: LogoutButtonProps): JSX.Element => {
  const { className, open = true } = props;

  const navigate = useNavigate();

  const handleLogout = (): void => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres cerrar sesión?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, salir',
      cancelButtonText: 'No',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
    })
      .then((action) => {
        if (action.isConfirmed) {
          sessionStorage.removeItem('token');
          navigate('/auth');
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
        `duration-300 hover:bg-red-500 hover:dark:bg-red-700 flex items-center py-2 text-center border-0 ${
          !open ? 'flex-col' : ''
        }`,
        className
      )}
      colorDark="dark:bg-red-800"
      colorLight="bg-red-300"
      textColorDark="dark:text-white"
      textColorLight="text-dark"
      type="button"
      onClick={handleLogout}
    >
      <Icon
        iconComponent={<FiLogOut className="inline-block text-xl" />}
        title="Cerrar Sesión"
      />

      <p
        className={`inline-block font-light ml-2 origin-left ${
          !open ? 'delay-0 scale-0' : ''
        } ${open ? 'delay-200 duration-200' : ''}`}
      >
        Cerrar Sesión
      </p>
    </Button>
  );
};

export default LogoutButton;
