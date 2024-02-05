import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { toast } from 'sonner';
import Swal from 'sweetalert2';

import { deleteEmployeeExtraHoursFn } from '@/api/api-calls/employees';

import { useLoading } from '@/hooks';
import { useObservation } from '@/stores/useObservation';

import { Button } from '@/components/ui';

import { ExtraHoursElementProps } from '@/components/interface/views';

const ExtraHoursListItem = (props: ExtraHoursElementProps) => {
  const { data } = props;

  const { id: employeeId } = useParams();

  const { message, setObservationData } = useObservation();

  const formattedDate = dayjs(data.date).format('DD/MM/YYYY');

  // -------------------------------------------------
  // API
  // -------------------------------------------------

  const queryClient = useQueryClient();

  const [isLoading, setIsLoading] = useState(false);

  const { mutate: removeExtraHours, status } = useMutation({
    mutationFn: deleteEmployeeExtraHoursFn,
    onError: () => {
      setIsLoading(false);
    },
    onSuccess: () => {
      setIsLoading(false);
      toast.success('Horas extra eliminadas con éxito');
      queryClient.invalidateQueries({
        queryKey: ['employeeExtraHours', employeeId],
      });
    },
  });

  useLoading(isLoading, status);

  // -------------------------------------------------
  // HANDLERS
  // -------------------------------------------------

  const handleClickObservations = () => {
    if (!data.observations) return;

    setObservationData({ id: 'extraHours', message: data.observations });
  };

  const handleClickDelete = () => {
    Swal.fire({
      title: '¿Está seguro?',
      html: `<p>Eliminará las horas extra de fecha <b>"${formattedDate}"</b> de este empleado. Esta acción no se puede revertir.</p>`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        setIsLoading(true);
        removeExtraHours({ employeeId: employeeId!, extraHoursId: data.id });
      }
    });
  };

  // -------------------------------------------------
  // RENDER
  // -------------------------------------------------

  return (
    <article className="content-card flex h-full flex-col justify-between">
      <ul>
        <li>
          Fecha: <b>{formattedDate}</b>
        </li>
        <li>
          Cantidad de horas extra: <b>{data.hours}</b>
        </li>
      </ul>
      <footer>
        <div className="divider" />
        {!data.observations && (
          <p className="-mt-1 text-center">Sin observaciones</p>
        )}
        {data.observations && data.observations !== message && (
          <Button className="-mt-1 w-full" onClick={handleClickObservations}>
            Ver observaciones
          </Button>
        )}
        {data.observations && data.observations === message && (
          <Button
            disabled
            className="-mt-1 w-full"
            onClick={handleClickObservations}
          >
            Observaciones visibles
          </Button>
        )}
        <Button
          outlineButton
          className="btn-error mt-2 w-full"
          onClick={handleClickDelete}
        >
          Eliminar
        </Button>
      </footer>
    </article>
  );
};
export default ExtraHoursListItem;
