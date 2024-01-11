import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { getEmployeeTrainingTypeFn } from '@/api/api-calls/employees';

import { useLoading, useZodForm } from '@/hooks';

import { Button, Grid, TextAreaInput, TextInput } from '@/components/ui';

import { paths } from '@/constants/routes/paths';

import {
  postEmployeeTrainingTypeFn,
  putEmployeeTrainingTypeFn,
} from '@/api/api-calls/typesList';
import {
  TrainingTypeSchema,
  trainingTypeSchema,
} from '@/form-schemas/schemas/typesList/trainingsTypeSchema';

const TypesForm = () => {
  const { control, onSubmitMiddleware, areAllFieldsFilled, setValue, reset } =
    useZodForm(trainingTypeSchema);

  const [isLoading, setIsLoading] = useState(false);
  const { search } = useLocation(); // ?edit=true&id=*
  const navigate = useNavigate();

  const isEditing = search.includes('edit=true') && search.includes('id=');
  const idBeingEdited = isEditing ? search.split('id=')[1] : null;

  // -----------------------------------------------------
  // API
  // -----------------------------------------------------

  const queryClient = useQueryClient();

  const {
    data: dataBeingEdited,
    isError: isErrorEditedData,
    isLoading: isLoadingEditedData,
    isSuccess: isSuccessEditedData,
    status: statusEditedData,
  } = useQuery({
    queryKey: [
      `employeeTrainingType_${idBeingEdited}`,
      isEditing && idBeingEdited,
    ],
    queryFn: () => getEmployeeTrainingTypeFn(idBeingEdited ?? ''),
    enabled: !!(isEditing && idBeingEdited),
  });

  const { mutate: createType } = useMutation({
    mutationFn: postEmployeeTrainingTypeFn,
    onError: (error) => {
      setIsLoading(false);
      toast.error(error.message);
    },
    onSuccess: () => {
      setIsLoading(false);
      reset();
      toast.success('Tipo de Licencia creada con éxito');
      queryClient.invalidateQueries({ queryKey: ['employeeTrainingsTypes'] });
    },
  });

  const { mutate: editType } = useMutation({
    mutationFn: putEmployeeTrainingTypeFn,
    onError: (error) => {
      setIsLoading(false);
      toast.error(error.message);
    },
    onSuccess: () => {
      setIsLoading(false);
      reset(); // Clear form values
      toast.success('Tipo de Licencia modificada con éxito');
      queryClient.invalidateQueries({ queryKey: ['employeeTrainingsTypes'] });
    },
  });

  useLoading(isLoadingEditedData, statusEditedData);

  if (isErrorEditedData) {
    toast.error('Ocurrió un error al obtener la información');
    navigate(paths.TYPES_LIST.TRAININGS);
  }

  // -----------------------------------------------------
  // HANDLERS
  // -----------------------------------------------------

  const handleSubmit = (data: TrainingTypeSchema) => {
    setIsLoading(true);

    console.log(data);

    if (isEditing) {
      editType({ ...data, id: idBeingEdited });
    } else {
      createType(data);
    }
  };

  const handleCancelEdit = () => {
    navigate(paths.TYPES_LIST.TRAININGS);
  };

  // -----------------------------------------------------
  // EFFECTS
  // -----------------------------------------------------

  // Set values in form if editing
  useEffect(() => {
    if (isEditing && isSuccessEditedData && dataBeingEdited?.data) {
      setValue('title', dataBeingEdited?.data.title);
      setValue('description', dataBeingEdited?.data.description);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccessEditedData, isEditing, setValue]);

  // -----------------------------------------------------
  // RENDER
  // -----------------------------------------------------

  return (
    <form
      className="card content-card animate-in-bottom a-delay-400"
      onSubmit={onSubmitMiddleware(handleSubmit)}
    >
      <Grid container gap={2}>
        <Grid item xs={12}>
          <TextInput
            className="w-full"
            control={control}
            disabled={isLoading}
            label="Nombre"
            name="title"
            placeholder="Capacitación de género"
          />
        </Grid>
        <Grid item xs={12}>
          <TextAreaInput
            className="w-full"
            control={control}
            disabled={isLoading}
            label="Descripción"
            name="description"
            placeholder="Este tipo de capacitación es para..."
          />
        </Grid>
      </Grid>
      <Grid container className="mt-4" gap={2}>
        <Grid item sm={isEditing ? 9 : 12} xs={12}>
          <Button
            className="w-full"
            colorLight="btn-primary"
            disabled={!areAllFieldsFilled || isLoadingEditedData}
            loading={isLoading}
            type="submit"
          >
            Guardar
          </Button>
        </Grid>
        <Grid item sm={3} xs={12}>
          {isEditing && (
            <Button
              className="w-full"
              disabled={isLoadingEditedData}
              loading={isLoading}
              onClick={handleCancelEdit}
            >
              Cancelar edición
            </Button>
          )}
        </Grid>
      </Grid>
    </form>
  );
};
export default TypesForm;
