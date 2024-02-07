import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { postLifeInsuranceFn } from '@/api/api-calls/employees';

import { useZodForm } from '@/hooks';
import { useModal } from '@/stores/useModal';

import { Grid, Modal, TextInput } from '@/components/ui';

import {
  AddLifeInsuranceSchema,
  addLifeInsuranceSchema,
} from '@/form-schemas/schemas/employees/addLifeInsuranceSchema';

const CreateLifeInsuranceModal = () => {
  const { id: employeeId } = useParams();
  const { closeModal } = useModal();

  // -------------------------------------------------
  // FORM & STATES
  // -------------------------------------------------

  const { control, onSubmitMiddleware, reset, areAllFieldsFilled } = useZodForm(
    addLifeInsuranceSchema
  );

  // -------------------------------------------------
  // API
  // -------------------------------------------------

  const [isLoading, setIsLoading] = useState(false);

  const queryClient = useQueryClient();

  const { mutate: createLifeInsurance } = useMutation({
    mutationFn: postLifeInsuranceFn,
    onError: () => {
      setIsLoading(false);
    },
    onSuccess: () => {
      setIsLoading(false);
      reset();
      toast.success('Seguro de vida agregado con éxito');
      queryClient.invalidateQueries({
        queryKey: ['employee', employeeId],
      });
      closeModal();
    },
  });

  // -------------------------------------------------
  // HANDLERS
  // -------------------------------------------------

  const handleSubmit = (data: AddLifeInsuranceSchema) => {
    setIsLoading(true);

    createLifeInsurance({
      ...data,
      id: employeeId,
    });
  };

  // -------------------------------------------------
  // RENDER
  // -------------------------------------------------

  return (
    <form onSubmit={onSubmitMiddleware(handleSubmit)}>
      <Modal
        submitButton
        className="overflow-x-hidden px-1 pb-1"
        disabledSubmitButton={!areAllFieldsFilled}
        id="lifeInsuranceForm"
        title="Crear Seguro de Vida"
        onClose={reset}
      >
        <Grid container gap={2}>
          <Grid item sm={6} xs={12}>
            <TextInput
              className="w-full"
              control={control}
              disabled={isLoading}
              label="Nombre *"
              name="name"
              placeholder="Sancor"
            />
          </Grid>
          <Grid item sm={6} xs={12}>
            <TextInput
              className="w-full"
              control={control}
              disabled={isLoading}
              label="Nro. Póliza *"
              name="policyNumber"
              placeholder="12345"
              type="number"
            />
          </Grid>
        </Grid>
      </Modal>
    </form>
  );
};
export default CreateLifeInsuranceModal;
