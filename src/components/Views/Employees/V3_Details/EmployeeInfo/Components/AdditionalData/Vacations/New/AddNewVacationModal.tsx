import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { postEmployeeVacationFn } from '@/api/api-calls/employees';

import { useZodForm } from '@/hooks';
import { useModal } from '@/stores/useModal';

import { DateInput, Modal, TextAreaInput } from '@/components/ui';

import {
  AddNewVacationSchema,
  addNewVacationSchema,
} from '@/form-schemas/schemas/employees/addNewVacationSchema';

const AddNewVacationModal = () => {
  // -------------------------------------------------
  // STATE & FORM
  // -------------------------------------------------

  const params = useParams();
  const { id: employeeId } = params;

  const { closeModal } = useModal();
  const { control, onSubmitMiddleware, reset } =
    useZodForm(addNewVacationSchema);

  const [isLoading, setIsLoading] = useState(false);

  // -------------------------------------------------
  // API
  // -------------------------------------------------

  const queryClient = useQueryClient();

  const { mutate: addVacation } = useMutation({
    mutationFn: postEmployeeVacationFn,
    onError: () => {
      setIsLoading(false);
      closeModal();
      reset();
      toast.error(
        'Ocurrió un error guardando las vacaciones. Intente nuevamente más tarde'
      );
    },
    onSuccess: () => {
      setIsLoading(false);
      closeModal();
      reset();
      toast.success(`Las vacaciones fueron registradas correctamente`);
      queryClient.invalidateQueries({
        queryKey: [`employeeVacations_${employeeId}`],
      });
    },
  });

  // -------------------------------------------------
  // HANDLERS
  // -------------------------------------------------

  const handleSubmit = (formData: AddNewVacationSchema) => {
    setIsLoading(true);

    if (!employeeId) {
      toast.error('No se pudo obtener el id del empleado');
      return;
    }

    addVacation({
      employeeId,
      ...formData,
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
        id="addNewVacation"
        loading={isLoading}
        title="Nuevas Vacaciones"
      >
        <DateInput
          className="mb-2 w-full"
          control={control}
          disabled={isLoading}
          label="Inicio de vacaciones *"
          name="fromDate"
          placeholder="Seleccione fecha de inicio"
        />
        <DateInput
          className="mb-2 w-full"
          control={control}
          disabled={isLoading}
          label="Fin de vacaciones *"
          name="toDate"
          placeholder="Seleccione fecha de fin"
        />
        <TextAreaInput
          className="w-full"
          control={control}
          disabled={isLoading}
          label="Observaciones"
          name="observations"
          placeholder="Estas vacaciones se pidieron porque..."
        />
      </Modal>
    </form>
  );
};
export default AddNewVacationModal;
