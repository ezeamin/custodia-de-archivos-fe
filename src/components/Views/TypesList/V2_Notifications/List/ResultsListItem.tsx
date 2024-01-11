import { useState } from 'react';
import { FaArrowRightLong } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import Swal from 'sweetalert2';

import { useLoading } from '@/hooks';
import { useModal } from '@/stores/useModal';

import { Button, Grid, Icon } from '@/components/ui';

import { paths } from '@/constants/routes/paths';

import { deleteNotificationTypeFn } from '@/api/api-calls/typesList';
import { NotificationsTypeResultsListItemProps } from '@/components/interface/views';

const ResultsListItem = (props: NotificationsTypeResultsListItemProps) => {
  const { notificationType, index } = props;

  // -----------------------------------------------------
  // STATE & STORES
  // -----------------------------------------------------

  const [isLoading, setIsLoading] = useState(false);
  const { openModal, setModalData } = useModal();

  // -----------------------------------------------------
  // API
  // -----------------------------------------------------

  const queryClient = useQueryClient();

  const { mutate: removeType, status } = useMutation({
    mutationFn: deleteNotificationTypeFn,
    onError: (error) => {
      setIsLoading(false);
      toast.error(error.message);
    },
    onSuccess: () => {
      setIsLoading(false);
      toast.success('Tipo de Notificación eliminada con éxito');
      queryClient.invalidateQueries({ queryKey: ['notificationTypes'] });
    },
  });

  useLoading(isLoading, status);

  // -----------------------------------------------------
  // HANDLERS
  // -----------------------------------------------------

  const handleDelete = () => {
    Swal.fire({
      title: '¿Estás seguro?',
      html: `<p>Eliminarás el tipo <b>"${notificationType.title}"</b>. Esta acción no se puede revertir. Esto NO eliminará las notificaciones ya creadas con este tipo.</p>`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        setIsLoading(true);
        removeType(notificationType.id);
      }
    });
  };

  const handleDescription = () => {
    setModalData(notificationType);
    openModal('notificationTypeDescription');
  };

  return (
    <article
      className="content-card animate-in-bottom indicator w-full h-full"
      style={{ animationDelay: `${index * 200}ms` }}
    >
      <div className="card-body flex flex-col justify-between p-0">
        <div>
          <h2 className="card-title mb-3">{notificationType.title}</h2>
          <div className="flex flex-col justify-between gap-2">
            <div className="flex flex-col gap-1">
              <div className="flex justify-start items-center gap-3">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Tiempo:
                </span>
                <span className="text-sm">{notificationType.startHour}</span>
                <Icon
                  iconComponent={<FaArrowRightLong size="0.75em" />}
                  title="Hasta"
                />
                <span className="text-sm">{notificationType.endHour}</span>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Roles permitidos:
              </span>
              <div className="flex gap-1">
                {notificationType.allowedRoles.map((role) => (
                  <span
                    className="text-xs text-gray-500 bg-gray-200 dark:bg-gray-600 dark:text-gray-400 px-2 py-1 rounded-md"
                    key={role.id}
                  >
                    {role.description}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <footer>
          <div className="divider my-0" />
          <Button
            className="mb-2 w-full text-white"
            colorLight="btn-primary"
            onClick={handleDescription}
          >
            VER DESCRIPCION
          </Button>
          <Grid container gap={2}>
            <Grid item sm={6} xs={12}>
              <Link
                className="btn btn-outline btn-primary w-full hover:text-white"
                to={`${paths.TYPES_LIST.NOTIFICATIONS}?edit=true&id=${notificationType.id}`}
              >
                EDITAR
              </Link>
            </Grid>
            <Grid item sm={6} xs={12}>
              <Button
                outlineButton
                className="w-full hover:text-white"
                colorLight="btn-error"
                onClick={handleDelete}
              >
                ELIMINAR
              </Button>
            </Grid>
          </Grid>
        </footer>
      </div>
    </article>
  );
};
export default ResultsListItem;
