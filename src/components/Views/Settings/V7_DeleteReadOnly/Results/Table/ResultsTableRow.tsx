import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import Swal from 'sweetalert2';

import { deleteReadOnlyUserFn } from '@/api/api-calls/users';

import { Button } from '@/components/ui';

import { DeleteReadOnlyUserResultsElement } from '@/components/interface/views';

const ResultsTableRow = (props: DeleteReadOnlyUserResultsElement) => {
  const { user } = props;

  const navigate = useNavigate();

  const dni = user.username.replace(/(\d{2})(\d{3})(\d{3})/, '$1.$2.$3');

  // -------------------------------------------------
  // API
  // -------------------------------------------------

  const [isLoading, setIsLoading] = useState(false);

  const queryClient = useQueryClient();

  const { mutate: deleteReadOnlyUser } = useMutation({
    mutationFn: deleteReadOnlyUserFn,
    onError: () => {
      setIsLoading(false);
    },
    onSuccess: () => {
      setIsLoading(false);
      toast.success('El usuario ya no existe.');

      queryClient.invalidateQueries({
        queryKey: ['users'],
      });
      queryClient.invalidateQueries({
        queryKey: ['readOnlyUsers'],
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
      text: `Este usuario dejará de existir: ${user.firstname} ${user.lastname}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
    }).then((result) => {
      if (result.isConfirmed) {
        setIsLoading(true);
        deleteReadOnlyUser(user.id);
      }
    });
  };

  // -------------------------------------------------
  // RENDER
  // -------------------------------------------------

  return (
    <tr>
      <td className="hidden lg:table-cell">
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
        <p className="text-xs lg:hidden">DNI: {dni}</p>
      </td>
      <td className="hidden lg:table-cell">{dni}</td>
      <td>{user.description}</td>
      <td className="text-end">
        <Button
          colorLight="btn-primary"
          loading={isLoading}
          textColorLight="text-white"
          onClick={handleClick}
        >
          ELIMINAR USUARIO
        </Button>
      </td>
    </tr>
  );
};
export default ResultsTableRow;
