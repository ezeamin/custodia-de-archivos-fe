import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { areaOptions } from '../../../V2_Create/mocked';
import { mockedStatus } from '../../../V3_Details/mocked';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

import { editEmployeeFn } from '@/api/api-calls/employees';
import { getAreaOptionsFn, getStatusOptionsFn } from '@/api/api-calls/params';

import { useLoading, useZodForm } from '@/hooks';

import {
  Alert,
  Button,
  ComboBoxInput,
  DateInput,
  Grid,
  TextInput,
} from '@/components/ui';

import { displayStatusLabel } from '@/utilities/utils';

import {
  EditJobInfoSchema,
  editJobInfoSchema,
} from '@/form-schemas/schemas/employees/editJobInfoSchema';

import { EmployeeInfoProps } from '@/components/interface/views';

const statusOptions = mockedStatus;
const EditJobForm = (props: EmployeeInfoProps) => {
  const { data: employeeOriginalData } = props;

  // -------------------------------------------------
  // FORM & STATES
  // -------------------------------------------------

  const { control, onSubmitMiddleware, setValue, reset, watch } =
    useZodForm(editJobInfoSchema);

  const status = watch('status');
  const fileNumber = watch('fileNumber');
  const area = watch('area');
  const position = watch('position');
  const startDate = watch('startDate');

  const areAllMandatoryFieldsFilled =
    status && fileNumber && area && position && startDate;

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  // -------------------------------------------------
  // API
  // -------------------------------------------------

  const {
    // data: statusOptions,
    isLoading: isLoadingStatus,
    isError: isErrorStatus,
    status: statusStatusOpt,
  } = useQuery({
    queryKey: ['statusOptions'],
    queryFn: getStatusOptionsFn,
  });

  const {
    // data: areaOptions,
    isLoading: isLoadingAreas,
    isError: isErrorAreas,
    status: statusAreas,
  } = useQuery({
    queryKey: ['areaOptions'],
    queryFn: getAreaOptionsFn,
  });

  const { mutate: editEmployee } = useMutation({
    mutationFn: editEmployeeFn,
    onError: () => {
      setIsLoading(false);
    },
    onSuccess: () => {
      setIsLoading(false);
      reset();
      toast.success('Información laboral editada con éxito');
      window.setTimeout(() => {
        navigate(`/employees/${employeeOriginalData.id}/personal`);
      }, 1000);
    },
  });

  useLoading(isLoadingAreas, statusAreas);
  useLoading(isLoadingStatus, statusStatusOpt);

  if (isErrorAreas || isErrorStatus) {
    toast.error(
      'Error al cargar datos necesarios para editar el empleado. Reintente más tarde'
    );
    navigate(`/employees/${employeeOriginalData.id}/personal`);
  }

  // -------------------------------------------------
  // HANDLERS
  // -------------------------------------------------

  const handleSubmit = (data: EditJobInfoSchema) => {
    setIsLoading(true);
    editEmployee({ ...data, id: employeeOriginalData.id });
  };

  // -------------------------------------------------
  // EFFECTS
  // -------------------------------------------------

  useEffect(() => {
    if (employeeOriginalData) {
      setValue('status', {
        id: employeeOriginalData.status.id,
        description: displayStatusLabel(
          employeeOriginalData.status.description
        ),
      });
      setValue('fileNumber', employeeOriginalData.fileNumber);
      setValue('area', employeeOriginalData.area);
      setValue('position', employeeOriginalData.position);
      setValue('startDate', employeeOriginalData.startDate);
      setValue('endDate', employeeOriginalData.endDate);
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
      {status &&
        (status.description === 'Eliminado' ||
          status.description === 'Inactivo') && (
          <Alert className="mb-3" type="warning">
            Atención: Esto marcará al empleado como &quot;{status.description}
            &quot; y no podrá iniciar sesión.
          </Alert>
        )}
      <Grid container gap={2}>
        <Grid item lg={4} sm={6} xs={12}>
          <ComboBoxInput
            className="w-full"
            control={control}
            disabled={isLoading}
            label="Estado *"
            name="status"
            options={statusOptions.data.map((el) => ({
              id: el.id,
              description: displayStatusLabel(el.description),
            }))}
            placeholder="Seleccione un estado"
          />
        </Grid>
        <Grid item lg={4} sm={6} xs={12}>
          <TextInput
            className="w-full"
            control={control}
            disabled={isLoading}
            label="Nro. de legajo *"
            name="fileNumber"
            placeholder="100"
          />
        </Grid>
        <Grid item lg={4} sm={6} xs={12}>
          <ComboBoxInput
            className="w-full"
            control={control}
            disabled={isLoading}
            label="Area *"
            name="area"
            options={areaOptions.data}
            placeholder="Seleccione un area"
          />
        </Grid>
        <Grid item lg={4} sm={6} xs={12}>
          <TextInput
            className="w-full"
            control={control}
            disabled={isLoading}
            label="Puesto *"
            name="position"
            placeholder="Ingeniero de Software"
          />
        </Grid>
        <Grid item lg={4} sm={6} xs={12}>
          <DateInput
            className="w-full"
            control={control}
            disabled={isLoading}
            label="Fecha de ingreso *"
            name="startDate"
            placeholder="01/01/2024"
          />
        </Grid>
        <Grid item lg={4} sm={6} xs={12}>
          <DateInput
            className="w-full"
            control={control}
            disabled={isLoading}
            label="Fecha de egreso"
            name="endDate"
            placeholder="01/01/2024"
          />
        </Grid>
      </Grid>
      <Button
        className="mt-4"
        colorLight="btn-primary"
        disabled={!areAllMandatoryFieldsFilled}
        loading={isLoading}
        textColorLight="text-white"
        type="submit"
      >
        Guardar
      </Button>
    </form>
  );
};
export default EditJobForm;
