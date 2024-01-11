import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { toast } from 'sonner';
import Swal from 'sweetalert2';

import { deleteEmployeeLicenseFn } from '@/api/api-calls/employees';

import { useLoading } from '@/hooks';
import { useObservation } from '@/stores/useObservation';

import { Button } from '@/components/ui';

import { LicensesElementProps } from '@/components/interface/views';

const LicensesListItem = (props: LicensesElementProps) => {
  const { data } = props;

  const { id: employeeId } = useParams();
  const { message, setObservationData } = useObservation();

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
      title: '¿Estás seguro?',
      html: `<p>Eliminarás la licencia <b>"${data.type.description}"</b> de este usuario. Esta acción no se puede revertir.</p>`,
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
    <article className="card content-card flex flex-col justify-between h-full">
      <ul>
        <li>
          Tipo: <b>{data.type.description}</b>
        </li>
        <li>
          Fecha de inicio: <b>{startDate.format('DD/MM/YYYY')}</b>
        </li>
        <li>
          Fecha de fin: <b>{endDate.format('DD/MM/YYYY')}</b>
        </li>
        <li>
          Dias totales: <b>{days}</b>
        </li>
      </ul>
      <footer>
        <div className="divider" />
        {!data.observations && (
          <p className="text-center -mt-1">Sin observaciones</p>
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
          className="w-full btn-error mt-2"
          onClick={handleClickDelete}
        >
          Eliminar
        </Button>
      </footer>
    </article>
  );
};
export default LicensesListItem;
