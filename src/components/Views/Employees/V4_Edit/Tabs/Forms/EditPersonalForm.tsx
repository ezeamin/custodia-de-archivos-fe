import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { editEmployeeFn } from '@/api/api-calls/employees';
import {
  getCivilStatusOptionsFn,
  getGenderOptionsFn,
} from '@/api/api-calls/params';

import { useLoading, useZodForm } from '@/hooks';

import {
  Button,
  ComboBoxInput,
  DateInput,
  Grid,
  TextInput,
} from '@/components/ui';

import {
  EditPersonalInfoSchema,
  editPersonalInfoSchema,
} from '@/form-schemas/schemas/employees/editPersonalInfoSchema';

import { EmployeeInfoProps } from '@/components/interface/views';

const EditPersonalForm = (props: EmployeeInfoProps) => {
  const { data: employeeOriginalData } = props;

  // -------------------------------------------------
  // FORM & STATES
  // -------------------------------------------------

  const { control, onSubmitMiddleware, areAllFieldsFilled, setValue, reset } =
    useZodForm(editPersonalInfoSchema);

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  // -------------------------------------------------
  // API
  // -------------------------------------------------

  const queryClient = useQueryClient();

  const {
    data: civilStatusOptions,
    isLoading: isLoadingCivilStatus,
    isError: isErrorCivilStatus,
    status: statusCivilStatus,
  } = useQuery({
    queryKey: ['civilStatusOptions'],
    queryFn: getCivilStatusOptionsFn,
  });

  const {
    data: genderOptions,
    isLoading: isLoadingGenders,
    isError: isErrorGenders,
    status: statusGenders,
  } = useQuery({
    queryKey: ['genderOptions'],
    queryFn: getGenderOptionsFn,
  });

  const { mutate: editEmployee } = useMutation({
    mutationFn: editEmployeeFn,
    onError: () => {
      setIsLoading(false);
    },
    onSuccess: () => {
      setIsLoading(false);
      reset();
      toast.success('Información personal editada con éxito');
      queryClient.invalidateQueries({
        queryKey: ['employee', employeeOriginalData.id],
      });
      navigate(`/employees/${employeeOriginalData.id}/personal`);
    },
  });

  useLoading(isLoadingGenders, statusGenders);
  useLoading(isLoadingCivilStatus, statusCivilStatus);

  if (isErrorGenders || isErrorCivilStatus) {
    toast.error(
      'Error al cargar datos necesarios para editar el empleado. Reintente más tarde'
    );
    navigate(`/employees/${employeeOriginalData.id}/personal`);
  }

  // -------------------------------------------------
  // HANDLERS
  // -------------------------------------------------

  const handleSubmit = (data: EditPersonalInfoSchema) => {
    setIsLoading(true);
    editEmployee({ ...data, id: employeeOriginalData.id });
  };

  // -------------------------------------------------
  // EFFECTS
  // -------------------------------------------------

  useEffect(() => {
    if (employeeOriginalData) {
      setValue('name', employeeOriginalData.firstname);
      setValue('lastname', employeeOriginalData.lastname);
      setValue('cuil', employeeOriginalData.cuil.toString());
      setValue('gender', employeeOriginalData.gender);
      setValue('birthdate', employeeOriginalData.birthdate);
      setValue('civilStatus', employeeOriginalData.civilStatus);
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
      <Grid container gap={2}>
        <Grid item lg={4} sm={6} xs={12}>
          <TextInput
            className="w-full"
            control={control}
            disabled={isLoading}
            label="Nombre"
            name="name"
            placeholder="Juan"
          />
        </Grid>
        <Grid item lg={4} sm={6} xs={12}>
          <TextInput
            className="w-full"
            control={control}
            disabled={isLoading}
            label="Apellido"
            name="lastname"
            placeholder="Pérez"
          />
        </Grid>
        <Grid item lg={4} sm={6} xs={12}>
          <TextInput
            className="w-full"
            control={control}
            disabled={isLoading}
            label="CUIL"
            name="cuil"
            placeholder="15235647"
          />
        </Grid>
        <Grid item lg={4} sm={6} xs={12}>
          <ComboBoxInput
            className="w-full"
            control={control}
            disabled={isLoading}
            label="Género"
            name="gender"
            options={genderOptions?.data || []}
            placeholder="Seleccione un género"
          />
        </Grid>
        <Grid item lg={4} sm={6} xs={12}>
          <ComboBoxInput
            className="w-full"
            control={control}
            disabled={isLoading}
            label="Estado Civil"
            name="civilStatus"
            options={civilStatusOptions?.data || []}
            placeholder="Seleccione un estado civil"
          />
        </Grid>
        <Grid item lg={4} sm={6} xs={12}>
          <DateInput
            className="w-full"
            control={control}
            disabled={isLoading}
            label="Fecha de nacimiento"
            name="birthdate"
            placeholder="01/01/2024"
          />
        </Grid>
      </Grid>
      <Button
        className="mt-4"
        colorLight="btn-primary"
        disabled={!areAllFieldsFilled}
        loading={isLoading}
        textColorLight="text-white"
        type="submit"
      >
        Guardar
      </Button>
    </form>
  );
};
export default EditPersonalForm;
