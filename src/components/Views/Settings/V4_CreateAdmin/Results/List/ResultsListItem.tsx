import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import Swal from 'sweetalert2';

import { putCreateAdminFn } from '@/api/api-calls/users';

import { Button } from '@/components/ui';

import { userRoles } from '@/constants/userRoles/userRoles';
import { displayLabelRole, formatCuil } from '@/utilities/utils';

import { CreateAdminResultsElement } from '@/components/interface/views';

const ResultsListItem = (props: CreateAdminResultsElement) => {
  const { user, index } = props;

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
  const cuil = formatCuil(user.username);

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
              Rol: <span className="font-bold">{role}</span>
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
            disabled={isUserAlreadyAdmin}
            loading={isLoading}
            textColorLight="text-white"
            onClick={handleClick}
          >
            {isUserAlreadyAdmin ? 'YA ES ADMIN' : 'HACER ADMIN'}
          </Button>
        </div>
      </div>
    </article>
  );
};
export default ResultsListItem;
