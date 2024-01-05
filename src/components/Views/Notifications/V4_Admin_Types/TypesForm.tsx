import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { userRoles } from './mocked';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import {
  getNotificationType,
  postNotificationType,
  putNotificationType,
} from '@/api/api-calls/notifications';

import { useLoading, useZodForm } from '@/hooks';

import {
  Button,
  Grid,
  HourInput,
  MultipleComboBoxInput,
  TextInput,
} from '@/components/ui';

import { paths } from '@/constants/routes/paths';

import {
  TypeSchema,
  typeSchema,
} from '@/form-schemas/schemas/notifications/typeSchema';

const TypesForm = () => {
  const { control, onSubmitMiddleware, areAllFieldsFilled, setValue, reset } =
    useZodForm(typeSchema);

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
  } = useQuery({
    queryKey: ['notificationTypes', isEditing && idBeingEdited],
    queryFn: () => getNotificationType(idBeingEdited ?? ''),
    enabled: !!(isEditing && idBeingEdited),
  });

  const { mutate: createType } = useMutation({
    mutationFn: postNotificationType,
    onError: (error) => {
      setIsLoading(false);
      toast.error(error.message);
    },
    onSuccess: () => {
      setIsLoading(false);
      reset();
      toast.success('Tipo de Notificación creada con éxito');
      queryClient.invalidateQueries({ queryKey: ['notificationTypes'] });
    },
  });

  const { mutate: editType } = useMutation({
    mutationFn: putNotificationType,
    onError: (error) => {
      setIsLoading(false);
      toast.error(error.message);
    },
    onSuccess: () => {
      setIsLoading(false);
      reset(); // Clear form values
      toast.success('Tipo de Notificación modificada con éxito');
      queryClient.invalidateQueries({ queryKey: ['notificationTypes'] });
    },
  });

  useLoading(isLoadingEditedData);

  if (isErrorEditedData) {
    toast.error('Ocurrió un error al obtener la información');
    navigate(paths.NOTIFICATIONS.ADMIN_TYPES);
  }

  // -----------------------------------------------------
  // HANDLERS
  // -----------------------------------------------------

  const handleSubmit = (data: TypeSchema) => {
    setIsLoading(true);

    console.log(data);

    if (isEditing) {
      editType({ ...data, id: idBeingEdited });
    } else {
      createType(data);
    }
  };

  const handleCancelEdit = () => {
    navigate(paths.NOTIFICATIONS.ADMIN_TYPES);
  };

  // -----------------------------------------------------
  // EFFECTS
  // -----------------------------------------------------

  // Set values in form if editing
  useEffect(() => {
    if (isEditing && isSuccessEditedData && dataBeingEdited?.data) {
      setValue('title', dataBeingEdited?.data.title);
      setValue('description', dataBeingEdited?.data.description);
      setValue('startHour', dataBeingEdited?.data.startHour);
      setValue('endHour', dataBeingEdited?.data.endHour);
      setValue('allowedRoles', dataBeingEdited?.data.allowedRoles);
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
        <Grid item lg={4} xs={12}>
          <TextInput<TypeSchema>
            className="w-full"
            control={control}
            disabled={isLoading}
            label="Título"
            name="title"
            placeholder="Nueva documentación"
          />
        </Grid>
        <Grid item lg={8} xs={12}>
          <TextInput<TypeSchema>
            className="w-full"
            control={control}
            disabled={isLoading}
            label="Descripción"
            name="description"
            placeholder="Este tipo de notificación es para..."
          />
        </Grid>
        <Grid item lg={4} sm={6} xs={12}>
          <HourInput<TypeSchema>
            className="w-full"
            control={control}
            disabled={isLoading}
            label="Hora de inicio"
            name="startHour"
            placeholder="08:00"
          />
        </Grid>
        <Grid item lg={4} sm={6} xs={12}>
          <HourInput<TypeSchema>
            className="w-full"
            control={control}
            disabled={isLoading}
            label="Hora de fin"
            name="endHour"
            placeholder="15:00"
          />
        </Grid>
        <Grid item lg={4} sm={6} xs={12}>
          <MultipleComboBoxInput<TypeSchema>
            className="w-full"
            control={control}
            disabled={isLoading}
            label="Roles habilitados"
            name="allowedRoles"
            options={userRoles}
            placeholder="Elige uno o más roles"
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
