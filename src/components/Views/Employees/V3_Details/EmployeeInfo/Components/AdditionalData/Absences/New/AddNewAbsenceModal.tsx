import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { postEmployeeAbsenceFn } from '@/api/api-calls/employees';

import { useZodForm } from '@/hooks';
import { useModal } from '@/stores/useModal';

import { DateInput, Modal, TextAreaInput } from '@/components/ui';

import {
  AddNewAbsenceSchema,
  addNewAbsenceSchema,
} from '@/form-schemas/schemas/employees/addNewAbsenceSchema';

const AddNewAbsenceModal = () => {
  // -------------------------------------------------
  // STATE & FORM
  // -------------------------------------------------

  const params = useParams();
  const { id: employeeId } = params;

  const { closeModal } = useModal();
  const { control, onSubmitMiddleware } = useZodForm(addNewAbsenceSchema);

  const [isLoading, setIsLoading] = useState(false);

  // -------------------------------------------------
  // API
  // -------------------------------------------------

  const queryClient = useQueryClient();

  const { mutate: addAbsence } = useMutation({
    mutationFn: postEmployeeAbsenceFn,
    onError: () => {
      setIsLoading(false);
      closeModal();
      toast.error(
        'Ocurrió un error guardando la inasistencia. Intente nuevamente más tarde'
      );
    },
    onSuccess: () => {
      setIsLoading(false);
      closeModal();
      toast.success(`La inasistencia fue registrada correctamente`);
      queryClient.invalidateQueries({
        queryKey: ['employeeAbsences', employeeId],
      });
    },
  });

  // -------------------------------------------------
  // HANDLERS
  // -------------------------------------------------

  const handleSubmit = (formData: AddNewAbsenceSchema) => {
    setIsLoading(true);

    if (!employeeId) {
      toast.error('No se pudo obtener el id del empleado');
      return;
    }

    addAbsence({
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
        id="addNewAbsence"
        loading={isLoading}
        title="Nueva Inasistencia"
      >
        <DateInput
          control={control}
          disabled={isLoading}
          label="Fecha de inasistencia *"
          name="date"
        />
        <TextAreaInput
          className="mt-3 w-full"
          control={control}
          disabled={isLoading}
          label="Motivo *"
          name="reason"
          placeholder="No se encontraba bien ..."
        />
      </Modal>
    </form>
  );
};
export default AddNewAbsenceModal;
