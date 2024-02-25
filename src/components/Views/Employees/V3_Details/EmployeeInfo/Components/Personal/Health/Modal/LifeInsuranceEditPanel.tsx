import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { putLifeInsuranceFn } from '@/api/api-calls/employees';

import { useZodForm } from '@/hooks';
import { useModal } from '@/stores/useModal';

import { Button, Grid, TextInput } from '@/components/ui';

import {
  AddLifeInsuranceSchema,
  addLifeInsuranceSchema,
} from '@/form-schemas/schemas/employees/addLifeInsuranceSchema';

import { LifeInsuranceEditPanelProps } from '@/components/interface/views';

const LifeInsuranceEditPanel = (props: LifeInsuranceEditPanelProps) => {
  const { data, onFinishEdit } = props;

  const { id: employeeId } = useParams();
  const { closeModal } = useModal();

  // -------------------------------------------------
  // FORM & STATES
  // -------------------------------------------------

  const { control, onSubmitMiddleware, reset, areAllFieldsFilled, setValue } =
    useZodForm(addLifeInsuranceSchema);

  // -------------------------------------------------
  // API
  // -------------------------------------------------

  const [isLoading, setIsLoading] = useState(false);

  const queryClient = useQueryClient();

  const { mutate: editLifeInsurance } = useMutation({
    mutationFn: putLifeInsuranceFn,
    onError: () => {
      setIsLoading(false);
    },
    onSuccess: () => {
      setIsLoading(false);
      reset();
      toast.success('Seguro de vida editado con éxito');
      queryClient.invalidateQueries({
        queryKey: ['employee', employeeId],
      });
      closeModal();
      onFinishEdit();
    },
  });

  // -------------------------------------------------
  // HANDLERS
  // -------------------------------------------------

  const handleSubmit = (formData: AddLifeInsuranceSchema) => {
    setIsLoading(true);

    editLifeInsurance({
      name: formData.name,
      policyNumber: formData.policyNumber.toString(),
      employeeId,
      lifeInsuranceId: data.id,
    });
  };

  // -------------------------------------------------
  // EFFECTS
  // -------------------------------------------------

  useEffect(() => {
    if (data && data.name && data.policyNumber !== undefined) {
      setValue('name', data.name);
      setValue('policyNumber', +data.policyNumber);
    }
  }, [data, setValue]);

  // -------------------------------------------------
  // RENDER
  // -------------------------------------------------

  return (
    <Grid
      container
      component="form"
      gap={2}
      onSubmit={onSubmitMiddleware(handleSubmit)}
    >
      <Grid item lg={4} xs={12}>
        <TextInput
          className="w-full"
          control={control}
          disabled={isLoading}
          label="Nombre *"
          name="name"
          placeholder="Sancor"
        />
      </Grid>
      <Grid item lg={4} xs={12}>
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
      <Grid item lg={2} xs={12}>
        <Button
          className="h-[48px] w-full flex-nowrap md:mt-[32px]"
          colorLight="btn-primary"
          disabled={!areAllFieldsFilled}
          loading={isLoading}
          textColorLight="text-white"
          type="submit"
        >
          Guardar
        </Button>
      </Grid>
      <Grid item lg={2} xs={12}>
        <Button
          className="h-[48px] w-full md:mt-[32px]"
          disabled={isLoading}
          onClick={onFinishEdit}
        >
          Cancelar
        </Button>
      </Grid>
    </Grid>
  );
};
export default LifeInsuranceEditPanel;
