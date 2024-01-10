import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { postEmployeeLateArrivalFn } from '@/api/api-calls/employees';

import { useZodForm } from '@/hooks';
import { useModal } from '@/stores/useModal';

import { Alert, DateInput, HourInput, Modal } from '@/components/ui';

import {
  AddNewLateArrivalSchema,
  addNewLateArrivalSchema,
} from '@/form-schemas/schemas/employees/addNewLateArrivalSchema';

const AddNewLateArrivalModal = () => {
  // -------------------------------------------------
  // STATE & FORM
  // -------------------------------------------------

  const params = useParams();
  const { id: employeeId } = params;

  const { closeModal } = useModal();
  const { control, onSubmitMiddleware, reset } = useZodForm(
    addNewLateArrivalSchema
  );

  const [isLoading, setIsLoading] = useState(false);

  // -------------------------------------------------
  // API
  // -------------------------------------------------

  const queryClient = useQueryClient();

  const { mutate: addLateArrival } = useMutation({
    mutationFn: postEmployeeLateArrivalFn,
    onError: () => {
      setIsLoading(false);
      closeModal();
      reset();
      toast.error(
        'Ocurrió un error guardando la llegada tarde. Intente nuevamente más tarde'
      );
    },
    onSuccess: () => {
      setIsLoading(false);
      closeModal();
      reset();
      toast.success(`La llegada tarde fue registrada correctamente`);
      queryClient.invalidateQueries({
        queryKey: [`employeeLateArrivals_${employeeId}`],
      });
    },
  });

  // -------------------------------------------------
  // HANDLERS
  // -------------------------------------------------

  const handleSubmit = (formData: AddNewLateArrivalSchema) => {
    setIsLoading(true);

    if (!employeeId) {
      toast.error('No se pudo obtener el id del empleado');
      return;
    }

    addLateArrival({
      employeeId,
      body: formData,
    });
  };

  // -------------------------------------------------
  // RENDER
  // -------------------------------------------------

  return (
    <form onSubmit={onSubmitMiddleware(handleSubmit)}>
      <Modal
        submitButton
        className="overflow-x-hidden p-1 pt-0"
        id="addNewLateArrival"
        loading={isLoading}
        title="Nueva Llegada Tarde"
      >
        <Alert className="mb-3">
          <b>Atención:</b> Una vez cargada la llegada tarde, no se podrá editar
          ni eliminar del sistema.
        </Alert>
        <DateInput
          className="mb-2"
          control={control}
          disabled={isLoading}
          label="Fecha de llegada tarde"
          name="date"
        />
        <HourInput
          control={control}
          disabled={isLoading}
          label="Horario de llegada"
          name="hour"
        />
      </Modal>
    </form>
  );
};
export default AddNewLateArrivalModal;
