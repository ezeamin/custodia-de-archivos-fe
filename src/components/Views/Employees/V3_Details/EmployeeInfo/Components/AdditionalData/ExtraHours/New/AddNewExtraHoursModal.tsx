import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { postEmployeeExtraHoursFn } from '@/api/api-calls/employees';

import { useZodForm } from '@/hooks';
import { useModal } from '@/stores/useModal';

import { DateInput, Modal, TextAreaInput, TextInput } from '@/components/ui';

import {
  AddNewExtraHoursSchema,
  addNewExtraHoursSchema,
} from '@/form-schemas/schemas/employees/addNewExtraHoursSchema';

const AddNewExtraHoursModal = () => {
  // -------------------------------------------------
  // STATE & FORM
  // -------------------------------------------------

  const params = useParams();
  const { id: employeeId } = params;

  const { closeModal } = useModal();
  const { control, onSubmitMiddleware, reset } = useZodForm(
    addNewExtraHoursSchema
  );

  const [isLoading, setIsLoading] = useState(false);

  // -------------------------------------------------
  // API
  // -------------------------------------------------

  const queryClient = useQueryClient();

  const { mutate: addExtraHours } = useMutation({
    mutationFn: postEmployeeExtraHoursFn,
    onError: () => {
      setIsLoading(false);
      closeModal();
      reset();
      toast.error(
        'Ocurrió un error guardando el registro. Intente nuevamente más tarde'
      );
    },
    onSuccess: () => {
      setIsLoading(false);
      closeModal();
      reset();
      toast.success(`Las horas extras fueron registradas correctamente`);
      queryClient.invalidateQueries({
        queryKey: ['employeeExtraHours', employeeId],
      });
    },
  });

  // -------------------------------------------------
  // HANDLERS
  // -------------------------------------------------

  const handleSubmit = (formData: AddNewExtraHoursSchema) => {
    setIsLoading(true);

    if (!employeeId) {
      toast.error('No se pudo obtener el id del empleado');
      return;
    }

    addExtraHours({
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
        id="addNewExtraHours"
        loading={isLoading}
        title="Nuevas Horas Extra"
      >
        <DateInput
          className="mb-2"
          control={control}
          disabled={isLoading}
          label="Fecha *"
          name="date"
        />
        <TextInput
          className="mb-2 w-full"
          control={control}
          disabled={isLoading}
          label="Cantidad de horas extra *"
          name="hours"
          type="number"
        />
        <TextAreaInput
          className="w-full"
          control={control}
          disabled={isLoading}
          label="Observaciones"
          name="observations"
          placeholder="Durante estas horas extra..."
        />
      </Modal>
    </form>
  );
};
export default AddNewExtraHoursModal;
