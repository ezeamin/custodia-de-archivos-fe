import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import Swal from 'sweetalert2';

import { deleteReadOnlyUserFn } from '@/api/api-calls/users';

import { Button } from '@/components/ui';

import { DeleteReadOnlyUserResultsElement } from '@/components/interface/views';

const ResultsListItem = (props: DeleteReadOnlyUserResultsElement) => {
  const { user, index } = props;

  const navigate = useNavigate();

  const cuil = user.username.replace(/(\d{2})(\d{3})(\d{3})/, '$1.$2.$3');

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
    <article
      className="content-card animate-in-bottom"
      style={{ animationDelay: `${index! * 200}ms` }}
    >
      <div className="card-body p-0">
        <h2 className="card-title">
          {user.lastname}, {user.firstname}
        </h2>
        <div className="flex justify-between gap-3">
          <div>
            <p>
              CUIL: <span className="font-bold">{cuil}</span>
            </p>
            <p>
              Descripción: <span className="font-bold">{user.description}</span>
            </p>
          </div>
          <div>
            <img
              alt={`${user.lastname}, ${user.firstname}`}
              className="h-[70px] w-[70px] min-w-[70px] rounded-md object-cover sm:h-[100px] sm:w-[100px]"
              height={70}
              src={user.imgSrc}
              width={70}
            />
          </div>
        </div>
        <div className="divider my-0" />
        <div className="card-actions">
          <Button
            className="w-full"
            colorLight="btn-primary"
            loading={isLoading}
            textColorLight="text-white"
            onClick={handleClick}
          >
            ELIMINAR USUARIO
          </Button>
        </div>
      </div>
    </article>
  );
};
export default ResultsListItem;
