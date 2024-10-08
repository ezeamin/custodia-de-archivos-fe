import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import Swal from 'sweetalert2';

import { deleteAdminFn } from '@/api/api-calls/users';

import { Button } from '@/components/ui';

import { userRoles } from '@/constants/userRoles/userRoles';
import { formatCuil } from '@/utilities/utils';

import { CreateAdminResultsElement } from '@/components/interface/views';

const ResultsTableRow = (props: CreateAdminResultsElement) => {
  const { user } = props;

  const navigate = useNavigate();

  // -------------------------------------------------
  // API
  // -------------------------------------------------

  const [isLoading, setIsLoading] = useState(false);

  const queryClient = useQueryClient();

  const { mutate: deleteAdmin } = useMutation({
    mutationFn: deleteAdminFn,
    onError: () => {
      setIsLoading(false);
    },
    onSuccess: () => {
      setIsLoading(false);
      toast.success('El usuario ya no es administrador');

      queryClient.invalidateQueries({
        queryKey: ['users', userRoles.EMPLOYEE, userRoles.ADMIN],
      });
      queryClient.invalidateQueries({
        queryKey: ['adminUsers'],
      });

      // clear query from URLSearchParams, if it exists
      const url = new URL(window.location.href);
      url.searchParams.delete('query');
      navigate(url.pathname + url.search);
    },
  });

  // -------------------------------------------------
  // HANDLERS
  // -------------------------------------------------

  const handleClick = () => {
    Swal.fire({
      title: '¿Está seguro?',
      text: `Va a quitar los permisos de ${user.firstname} ${user.lastname} para acceder a las funcionalidades de administrador`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, quitar permisos',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
    }).then((result) => {
      if (result.isConfirmed) {
        setIsLoading(true);
        deleteAdmin(user.id);
      }
    });
  };

  // -------------------------------------------------
  // RENDER
  // -------------------------------------------------

  const cuil = formatCuil(user.username);

  return (
    <tr>
      <td>
        <img
          alt={`${user.lastname}, ${user.firstname}`}
          className="h-[50px] w-[50px] min-w-[50px] rounded-md object-cover"
          height={80}
          src={user.imgSrc}
          width={80}
        />
      </td>
      <td>
        <p className="font-bold lg:font-normal">{`${user.lastname}, ${user.firstname}`}</p>
        <p className="text-xs lg:hidden">CUIL: {cuil}</p>
      </td>
      <td className="hidden lg:table-cell">{cuil}</td>
      <td className="text-end">
        <Button
          colorLight="btn-primary"
          loading={isLoading}
          textColorLight="text-white"
          onClick={handleClick}
        >
          QUITAR PERMISOS
        </Button>
      </td>
    </tr>
  );
};
export default ResultsTableRow;
