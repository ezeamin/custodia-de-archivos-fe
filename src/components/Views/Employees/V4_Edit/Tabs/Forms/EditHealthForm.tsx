import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { editEmployeeFn } from '@/api/api-calls/employees';

import { useZodForm } from '@/hooks';

import {
  Button,
  CheckboxInput,
  Grid,
  TextAreaInput,
  TextInput,
} from '@/components/ui';

import {
  EditHealthInfoSchema,
  editHealthInfoSchema,
} from '@/form-schemas/schemas/employees/editHealthInfoSchema';

import { EmployeeInfoProps } from '@/components/interface/views';

const EditHealthForm = (props: EmployeeInfoProps) => {
  const { data: employeeOriginalData } = props;

  // -------------------------------------------------
  // FORM & STATES
  // -------------------------------------------------

  const { control, onSubmitMiddleware, setValue, reset } =
    useZodForm(editHealthInfoSchema);

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  // -------------------------------------------------
  // API
  // -------------------------------------------------

  const queryClient = useQueryClient();

  const { mutate: editEmployee } = useMutation({
    mutationFn: editEmployeeFn,
    onError: () => {
      setIsLoading(false);
    },
    onSuccess: () => {
      setIsLoading(false);
      reset();
      toast.success('Información de salud editada con éxito');
      queryClient.invalidateQueries({
        queryKey: ['employee', employeeOriginalData.id],
      });
      navigate(`/employees/${employeeOriginalData.id}/personal`);
    },
  });

  // -------------------------------------------------
  // HANDLERS
  // -------------------------------------------------

  const handleSubmit = (data: EditHealthInfoSchema) => {
    setIsLoading(true);

    const formattedData = {
      healthInsurance: {
        name: data.insuranceName,
        affiliateNumber: data.affiliateNumber,
      },
      preoccupationalCheckup: {
        fit: !!data.preoccupationalCheckupFit,
        observations: data.preoccupationalCheckupObs,
      },
    };

    editEmployee({ ...formattedData, id: employeeOriginalData.id });
  };

  // -------------------------------------------------
  // EFFECTS
  // -------------------------------------------------

  useEffect(() => {
    if (employeeOriginalData) {
      if (employeeOriginalData.healthInsurance) {
        setValue('insuranceName', employeeOriginalData.healthInsurance.name);
        setValue(
          'affiliateNumber',
          employeeOriginalData.healthInsurance?.affiliateNumber
        );
      }
      if (employeeOriginalData.preoccupationalCheckup) {
        setValue(
          'preoccupationalCheckupFit',
          !!employeeOriginalData.preoccupationalCheckup.fit
        );
        setValue(
          'preoccupationalCheckupObs',
          employeeOriginalData.preoccupationalCheckup.observations
        );
      }
    }
  }, [employeeOriginalData, setValue]);

  // -------------------------------------------------
  // RENDER
  // -------------------------------------------------

  return (
    <form
      className="content-card animate-in-bottom a-delay-200 card"
      onSubmit={onSubmitMiddleware(handleSubmit)}
    >
      <h2 className="text-2xl">Obra social</h2>
      <div className="divider mb-1 mt-0" />
      <Grid container gap={2}>
        <Grid item sm={6} xs={12}>
          <TextInput
            className="w-full"
            control={control}
            disabled={isLoading}
            label="Nombre"
            name="insuranceName"
            placeholder="Seguro de Salud"
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <TextInput
            className="w-full"
            control={control}
            disabled={isLoading}
            label="Nro. Afiliado"
            name="affiliateNumber"
            placeholder="123456"
            type="number"
          />
        </Grid>
      </Grid>
      <div className="mt-5 flex flex-col justify-between gap-2 md:flex-row md:items-center">
        <h2 className="text-2xl">Preocupacionales</h2>
        <CheckboxInput
          control={control}
          disabled={isLoading}
          label="Apto"
          name="preoccupationalCheckupFit"
        />
      </div>
      <div className="divider mb-1 mt-0" />
      <TextAreaInput
        className="w-full"
        control={control}
        disabled={isLoading}
        label="Observaciones"
        name="preoccupationalCheckupObs"
        placeholder="El empleado ..."
      />
      <Button
        className="mt-4"
        colorLight="btn-primary"
        loading={isLoading}
        textColorLight="text-white"
        type="submit"
      >
        Guardar
      </Button>
    </form>
  );
};
export default EditHealthForm;
