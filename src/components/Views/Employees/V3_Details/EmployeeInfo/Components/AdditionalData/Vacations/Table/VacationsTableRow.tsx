import { useState } from 'react';
import { FaEye, FaTrash } from 'react-icons/fa6';
import { useParams } from 'react-router-dom';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { toast } from 'sonner';
import Swal from 'sweetalert2';

import { deleteEmployeeVacationsFn } from '@/api/api-calls/employees';

import { useLoading } from '@/hooks';
import { useObservation } from '@/stores/useObservation';

import { IconButton } from '@/components/ui';

import { VacationsElementProps } from '@/components/interface/views';

const VacationsTableRow = (props: VacationsElementProps) => {
  const { data } = props;

  const { id: employeeId } = useParams();
  const { setObservationData } = useObservation();

  // -------------------------------------------------
  // DATA
  // -------------------------------------------------

  const startDate = dayjs(data.startDate);
  const endDate = dayjs(data.endDate);

  // calculate working days between two dates
  const days = endDate.diff(startDate, 'day') + 1;

  // -------------------------------------------------
  // API
  // -------------------------------------------------

  const queryClient = useQueryClient();

  const [isLoading, setIsLoading] = useState(false);

  const { mutate: removeVacation, status } = useMutation({
    mutationFn: deleteEmployeeVacationsFn,
    onError: () => {
      setIsLoading(false);
    },
    onSuccess: () => {
      setIsLoading(false);
      toast.success('Licencia eliminada con éxito');
      queryClient.invalidateQueries({
        queryKey: [`employeeVacations_${employeeId}`],
      });
    },
  });

  useLoading(isLoading, status);

  // -------------------------------------------------
  // HANDLERS
  // -------------------------------------------------

  const handleClickObservations = () => {
    if (!data.observations) return;

    setObservationData({ id: 'vacations', message: data.observations });
  };

  const handleClickDelete = () => {
    Swal.fire({
      title: '¿Estás seguro?',
      html: `<p>Eliminarás las vacaciones del <b>${startDate.format(
        'DD/MM/YYYY'
      )}</b> al <b>${endDate.format(
        'DD/MM/YYYY'
      )}</b> de este usuario. Esta acción no se puede revertir.</p>`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        setIsLoading(true);
        removeVacation({ employeeId: employeeId!, vacationsId: data.id });
      }
    });
  };

  // -------------------------------------------------
  // RENDER
  // -------------------------------------------------

  return (
    <tr>
      <td>{startDate.format('DD/MM/YYYY')}</td>
      <td>{endDate.format('DD/MM/YYYY')}</td>
      <td>{days}</td>
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
          className="text-red-500 tooltip tooltip-left"
          iconComponent={<FaTrash />}
          label="Eliminar"
          onClick={handleClickDelete}
        />
      </td>
    </tr>
  );
};
export default VacationsTableRow;
