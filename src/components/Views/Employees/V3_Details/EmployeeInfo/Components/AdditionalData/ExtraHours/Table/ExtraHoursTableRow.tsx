import { useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { FaEye } from 'react-icons/fa6';
import { useParams } from 'react-router-dom';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { toast } from 'sonner';
import Swal from 'sweetalert2';

import { deleteEmployeeExtraHoursFn } from '@/api/api-calls/employees';

import { useLoading } from '@/hooks';
import { useObservation } from '@/stores/useObservation';

import { IconButton } from '@/components/ui';

import { ExtraHoursElementProps } from '@/components/interface/views';

const ExtraHoursTableRow = (props: ExtraHoursElementProps) => {
  const { data } = props;

  const { id: employeeId } = useParams();

  const { setObservationData } = useObservation();

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
    <tr>
      <td className="w-[20%]">{formattedDate}</td>
      <td className="w-[80%]">{data.hours} horas</td>
      <td align="right">
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
export default ExtraHoursTableRow;
