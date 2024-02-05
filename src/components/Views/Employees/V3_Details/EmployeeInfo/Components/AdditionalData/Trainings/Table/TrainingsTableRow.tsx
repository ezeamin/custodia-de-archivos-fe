import { useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { FaEye } from 'react-icons/fa6';
import { useParams } from 'react-router-dom';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { toast } from 'sonner';
import Swal from 'sweetalert2';

import { deleteEmployeeTrainingFn } from '@/api/api-calls/employees';

import { useLoading } from '@/hooks';
import { useObservation } from '@/stores/useObservation';

import { IconButton } from '@/components/ui';

import { TrainingsElementProps } from '@/components/interface/views';

const TrainingsTableRow = (props: TrainingsElementProps) => {
  const { data } = props;

  const { id: employeeId } = useParams();

  const { setObservationData } = useObservation();

  const formattedDate = dayjs(data.date).format('DD/MM/YYYY');

  // -------------------------------------------------
  // API
  // -------------------------------------------------

  const queryClient = useQueryClient();

  const [isLoading, setIsLoading] = useState(false);

  const { mutate: removeTraining, status } = useMutation({
    mutationFn: deleteEmployeeTrainingFn,
    onError: () => {
      setIsLoading(false);
    },
    onSuccess: () => {
      setIsLoading(false);
      toast.success('Capacitación eliminada con éxito');
      queryClient.invalidateQueries({
        queryKey: ['employeeTrainings', employeeId],
      });
    },
  });

  useLoading(isLoading, status);

  // -------------------------------------------------
  // HANDLERS
  // -------------------------------------------------

  const handleClickObservations = () => {
    if (!data.observations) return;

    setObservationData({ id: 'trainings', message: data.observations });
  };

  const handleClickDelete = () => {
    Swal.fire({
      title: '¿Está seguro?',
      html: `<p>Eliminará la capacitación <b>"${data.reason}"</b> con fecha <b>"${formattedDate}"</b> de este empleado. Esta acción no se puede revertir.</p>`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        setIsLoading(true);
        removeTraining({ employeeId: employeeId!, trainingId: data.id });
      }
    });
  };

  // -------------------------------------------------
  // RENDER
  // -------------------------------------------------

  return (
    <tr>
      <td>{formattedDate}</td>
      <td>{data.type.description}</td>
      <td>{data.reason}</td>
      <td align="center">
        {data.observations ? (
          <IconButton
            iconComponent={<FaEye />}
            onClick={handleClickObservations}
          />
        ) : (
          'N/A'
        )}
      </td>
      <td align="center">
        <IconButton
          className="tooltip tooltip-left text-red-500"
          iconComponent={<FaTrash />}
          label="Eliminar"
          onClick={handleClickDelete}
        />
      </td>
    </tr>
  );
};
export default TrainingsTableRow;
