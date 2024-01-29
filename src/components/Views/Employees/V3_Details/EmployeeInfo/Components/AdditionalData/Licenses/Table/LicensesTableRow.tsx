import { useState } from 'react';
import { FaEye, FaTrash } from 'react-icons/fa6';
import { useParams } from 'react-router-dom';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { toast } from 'sonner';
import Swal from 'sweetalert2';

import { deleteEmployeeLicenseFn } from '@/api/api-calls/employees';

import { useLoading } from '@/hooks';
import { useObservation } from '@/stores/useObservation';

import { IconButton } from '@/components/ui';

import { LicensesElementProps } from '@/components/interface/views';

const LicensesTableRow = (props: LicensesElementProps) => {
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

  const { mutate: removeLicense, status } = useMutation({
    mutationFn: deleteEmployeeLicenseFn,
    onError: () => {
      setIsLoading(false);
    },
    onSuccess: () => {
      setIsLoading(false);
      toast.success('Licencia eliminada con éxito');
      queryClient.invalidateQueries({
        queryKey: [`employeeLicenses_${employeeId}`],
      });
    },
  });

  useLoading(isLoading, status);

  // -------------------------------------------------
  // HANDLERS
  // -------------------------------------------------

  const handleClickObservations = () => {
    if (!data.observations) return;

    setObservationData({ id: 'licenses', message: data.observations });
  };

  const handleClickDelete = () => {
    Swal.fire({
      title: '¿Está seguro?',
      html: `<p>Eliminará la licencia <b>"${data.type.description}"</b> de este usuario. Esta acción no se puede revertir.</p>`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        setIsLoading(true);
        removeLicense({ employeeId: employeeId!, licenseId: data.id });
      }
    });
  };

  // -------------------------------------------------
  // RENDER
  // -------------------------------------------------

  return (
    <tr>
      <td>{data.type.description}</td>
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
          className="tooltip tooltip-left text-red-500"
          iconComponent={<FaTrash />}
          label="Eliminar"
          onClick={handleClickDelete}
        />
      </td>
    </tr>
  );
};
export default LicensesTableRow;
