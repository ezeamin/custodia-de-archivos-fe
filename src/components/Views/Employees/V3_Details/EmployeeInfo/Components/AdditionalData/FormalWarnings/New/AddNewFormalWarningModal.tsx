import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { postEmployeeFormalWarningFn } from '@/api/api-calls/employees';

import { useZodForm } from '@/hooks';
import { useModal } from '@/stores/useModal';

import { Alert, DateInput, Modal, TextAreaInput } from '@/components/ui';

import {
  AddNewFormalWarningSchema,
  addNewFormalWarningSchema,
} from '@/form-schemas/schemas/employees/addNewFormalWarningSchema';

const AddNewFormalWarningModal = () => {
  // -------------------------------------------------
  // STATE & FORM
  // -------------------------------------------------

  const params = useParams();
  const { id: employeeId } = params;

  const { closeModal } = useModal();
  const { control, onSubmitMiddleware } = useZodForm(addNewFormalWarningSchema);

  const [isLoading, setIsLoading] = useState(false);

  // -------------------------------------------------
  // API
  // -------------------------------------------------

  const queryClient = useQueryClient();

  const { mutate: addFormalWarning } = useMutation({
    mutationFn: postEmployeeFormalWarningFn,
    onError: () => {
      setIsLoading(false);
      closeModal();
      toast.error(
        'Ocurrió un error guardando el llamado de atención. Intente nuevamente más tarde'
      );
    },
    onSuccess: () => {
      setIsLoading(false);
      closeModal();
      toast.success(`El llamado de atención fue registrado correctamente`);
      queryClient.invalidateQueries({
        queryKey: [`employeeFormalWarnings_${employeeId}`],
      });
    },
  });

  // -------------------------------------------------
  // HANDLERS
  // -------------------------------------------------

  const handleSubmit = (formData: AddNewFormalWarningSchema) => {
    setIsLoading(true);

    if (!employeeId) {
      toast.error('No se pudo obtener el id del empleado');
      return;
    }

    addFormalWarning({
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
        id="addNewFormalWarning"
        loading={isLoading}
        title="Nuevo Llamado de Atención"
      >
        <Alert className="mb-3">
          <b>Atención:</b> Una vez cargado el llamado de atención, no se podrá
          editar ni eliminar del sistema.
        </Alert>
        <DateInput
          control={control}
          disabled={isLoading}
          label="Fecha del suceso *"
          name="date"
        />
        <TextAreaInput
          className="mt-3 w-full"
          control={control}
          disabled={isLoading}
          label="Motivo *"
          name="reason"
          placeholder="El empleado fue encontrado..."
        />
      </Modal>
    </form>
  );
};
export default AddNewFormalWarningModal;
