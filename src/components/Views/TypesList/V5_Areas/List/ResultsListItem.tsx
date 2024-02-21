import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import Swal from 'sweetalert2';

import { useLoading } from '@/hooks';

import { Button, Grid } from '@/components/ui';

import { paths } from '@/constants/routes/paths';

import { deleteAreaFn } from '@/api/api-calls/typesList';
import { AreaResultsListItemProps } from '@/components/interface/views';

const ResultsListItem = (props: AreaResultsListItemProps) => {
  const { area, index } = props;

  // -----------------------------------------------------
  // STATE & STORES
  // -----------------------------------------------------

  const [isLoading, setIsLoading] = useState(false);

  // -----------------------------------------------------
  // API
  // -----------------------------------------------------

  const queryClient = useQueryClient();

  const { mutate: removeType, status } = useMutation({
    mutationFn: deleteAreaFn,
    onError: () => {
      setIsLoading(false);
    },
    onSuccess: () => {
      setIsLoading(false);
      toast.success('Area eliminada con éxito');
      queryClient.invalidateQueries({ queryKey: ['areaOptions'] });
    },
  });

  useLoading(isLoading, status);

  // -----------------------------------------------------
  // HANDLERS
  // -----------------------------------------------------

  const handleDelete = () => {
    Swal.fire({
      title: '¿Está seguro?',
      html: `<p>Eliminará el área <b>"${area.description}"</b>. Esta acción no se puede revertir. Esto NO eliminará el área de los empleados con este tipo.</p>`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        setIsLoading(true);
        removeType(area.id);
      }
    });
  };

  return (
    <article
      className="content-card animate-in-bottom indicator h-full w-full"
      style={{ animationDelay: `${index * 200}ms` }}
    >
      <div className="card-body flex flex-col justify-between p-0">
        <div>
          <h2 className="card-title">{area.description}</h2>
        </div>
        <footer>
          <div className="divider my-0" />
          <Grid container className="mt-1" gap={2}>
            <Grid item sm={6} xs={12}>
              <Link
                className="btn btn-outline btn-primary w-full hover:text-white"
                to={`${paths.TYPES_LIST.AREAS}?edit=true&id=${area.id}`}
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
