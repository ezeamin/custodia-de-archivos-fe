import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import Swal from 'sweetalert2';

import { putCreateAdminFn } from '@/api/api-calls/users';

import { Button } from '@/components/ui';

import { displayLabelRole } from '@/utilities/utils';

import { CreateAdminResultsElement } from '@/components/interface/views';

const ResultsTableRow = (props: CreateAdminResultsElement) => {
  const { user } = props;

  const navigate = useNavigate();

  const isUserAlreadyAdmin = user.role.description === 'ADMIN';

  // -------------------------------------------------
  // API
  // -------------------------------------------------

  const [isLoading, setIsLoading] = useState(false);

  const queryClient = useQueryClient();

  const { mutate: createAdmin } = useMutation({
    mutationFn: putCreateAdminFn,
    onError: () => {
      setIsLoading(false);
    },
    onSuccess: () => {
      setIsLoading(false);
      toast.success('El usuario ahora es administrador');

      queryClient.invalidateQueries({
        queryKey: ['users'],
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
    if (isUserAlreadyAdmin) return;

    Swal.fire({
      title: '¿Está seguro?',
      text: `Va a convertir a ${user.firstname} ${user.lastname} en administrador`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, hacer administrador',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
    }).then((result) => {
      if (result.isConfirmed) {
        setIsLoading(true);
        createAdmin(user.id);
      }
    });
  };

  // -------------------------------------------------
  // RENDER
  // -------------------------------------------------

  const role = displayLabelRole(user.role.description);
  const dni = user.username.replace(/(\d{2})(\d{3})(\d{3})/, '$1.$2.$3');

  return (
    <tr>
      <td>
        <img
          alt={`${user.lastname}, ${user.firstname}`}
          className="min-w-[50px] rounded-md object-cover"
          height={80}
          src={user.imgSrc}
          width={80}
        />
      </td>
      <td>
        <p className="font-bold lg:font-normal">{`${user.lastname}, ${user.firstname}`}</p>
        <p className="text-xs lg:hidden">DNI: {dni}</p>
        <p className="text-xs lg:hidden">Rol: {role}</p>
      </td>
      <td className="hidden lg:table-cell">{dni}</td>
      <td className="hidden lg:table-cell">{role}</td>
      <td className="text-end">
        <Button
          colorLight="btn-primary"
          disabled={isUserAlreadyAdmin}
          loading={isLoading}
          textColorLight="text-white"
          onClick={handleClick}
        >
          {isUserAlreadyAdmin ? 'YA ES ADMIN' : 'HACER ADMIN'}
        </Button>
      </td>
    </tr>
  );
};
export default ResultsTableRow;
