import { useRouter } from 'next/navigation';

import { Button, Icon } from 'ui';

import { cn } from 'utilities';

import { DTI, DTI_LIST } from 'dti';

import { FiLogOut } from 'react-icons/fi';
import { toast } from 'sonner';
import Swal from 'sweetalert2';

import { type LogoutButtonProps } from '../interface';

const LogoutButton = (props: LogoutButtonProps): JSX.Element => {
  const { className, open = true } = props;

  const router = useRouter();

  const handleLogout = (): void => {
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
          sessionStorage.removeItem('token');
          router.push('/auth');
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
        `duration-300 hover:bg-red-500 hover:dark:bg-red-700 flex items-center py-2 text-center border-0`,
        className
      )}
      colorDark="dark:bg-error"
      colorLight="bg-red-300"
      dti={DTI(DTI_LIST.BUTTON('logout'))}
      onClick={handleLogout}
      textColorDark="dark:text-white"
      textColorLight="text-dark"
      type="button"
    >
      <Icon
        iconComponent={
          <FiLogOut
            className="inline-block text-xl"
            data-testid={DTI(DTI_LIST.BUTTON('logout-icon'))}
          />
        }
        title="Cerrar Sesión"
      />

      <p
        className={`inline-block ml-2 origin-left ${
          !open ? 'delay-0 scale-0 hidden' : ''
        } ${open ? 'delay-100 duration-200' : ''}`}
      >
        Cerrar Sesión
      </p>
    </Button>
  );
};

export default LogoutButton;
