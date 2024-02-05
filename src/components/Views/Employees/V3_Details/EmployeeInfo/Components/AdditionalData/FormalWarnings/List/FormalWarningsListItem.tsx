import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { toast } from 'sonner';
import Swal from 'sweetalert2';

import { deleteEmployeeFormalWarningFn } from '@/api/api-calls/employees';

import { useLoading } from '@/hooks';

import { Button } from '@/components/ui';

import { FormalWarningsElementProps } from '@/components/interface/views';

const FormalWarningsListItem = (props: FormalWarningsElementProps) => {
  const { data } = props;

  const { id: employeeId } = useParams();

  const formattedDate = dayjs(data.date).format('DD/MM/YYYY');

  // -------------------------------------------------
  // API
  // -------------------------------------------------

  const queryClient = useQueryClient();

  const [isLoading, setIsLoading] = useState(false);

  const { mutate: removeFormalWarning, status } = useMutation({
    mutationFn: deleteEmployeeFormalWarningFn,
    onError: () => {
      setIsLoading(false);
    },
    onSuccess: () => {
      setIsLoading(false);
      toast.success('Llamado de atención eliminado con éxito');
      queryClient.invalidateQueries({
        queryKey: ['employeeFormalWarnings', employeeId],
      });
    },
  });

  useLoading(isLoading, status);

  // -------------------------------------------------
  // HANDLERS
  // -------------------------------------------------

  const handleClickDelete = () => {
    Swal.fire({
      title: '¿Está seguro?',
      html: `<p>Eliminará el llamado de atención de fecha <b>"${formattedDate}"</b> de este empleado. Esta acción no se puede revertir.</p>`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        setIsLoading(true);
        removeFormalWarning({
          employeeId: employeeId!,
          formalWarningId: data.id,
        });
      }
    });
  };

  // -------------------------------------------------
  // RENDER
  // -------------------------------------------------

  return (
    <article className="content-card">
      <ul>
        <li>
          Fecha: <b>{formattedDate}</b>
        </li>
        <li>
          Razón: <b>{data.reason}</b>
        </li>
      </ul>
      <Button
        outlineButton
        className="btn-error mt-2 w-full"
        onClick={handleClickDelete}
      >
        Eliminar
      </Button>
    </article>
  );
};
export default FormalWarningsListItem;
