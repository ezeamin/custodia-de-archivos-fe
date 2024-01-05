import { useEffect, useState } from 'react';

import { userRoles } from './mocked';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import {
  postNotificationType,
  putNotificationType,
} from '@/api/api-calls/notifications';

import { useZodForm } from '@/hooks';
import { useIdBeingEdited } from '@/stores/useIdBeingEdited';

import {
  Button,
  Grid,
  HourInput,
  MultipleComboBoxInput,
  TextInput,
} from '@/components/ui';

import {
  TypeSchema,
  typeSchema,
} from '@/form-schemas/schemas/notifications/typeSchema';

import { BasicList } from '@/interface';

const TypesForm = () => {
  const { control, onSubmitMiddleware, areAllFieldsFilled, setValue, reset } =
    useZodForm(typeSchema);

  const [isLoading, setIsLoading] = useState(false);

  // -----------------------------------------------------
  // STORES
  // -----------------------------------------------------

  const { idBeingEdited, data: dataBeingEdited, clear } = useIdBeingEdited();
  const isEditing = !!idBeingEdited;

  // -----------------------------------------------------
  // API
  // -----------------------------------------------------

  const queryClient = useQueryClient();

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
      clear(); // Clear editing store values
      toast.success('Tipo de Notificación modificada con éxito');
      queryClient.invalidateQueries({ queryKey: ['notificationTypes'] });
    },
  });

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

  // -----------------------------------------------------
  // EFFECTS
  // -----------------------------------------------------

  // Set values in form if editing
  useEffect(() => {
    if (isEditing) {
      setValue('title', dataBeingEdited?.title as string);
      setValue('description', dataBeingEdited?.description as string);
      setValue('startHour', dataBeingEdited?.startHour as string);
      setValue('endHour', dataBeingEdited?.endHour as string);
      setValue('allowedRoles', dataBeingEdited?.allowedRoles as BasicList[]);
    }
  }, [
    dataBeingEdited?.allowedRoles,
    dataBeingEdited?.description,
    dataBeingEdited?.endHour,
    dataBeingEdited?.startHour,
    dataBeingEdited?.title,
    idBeingEdited,
    isEditing,
    setValue,
  ]);

  // -----------------------------------------------------
  // RENDER
  // -----------------------------------------------------

  return (
    <form
      className="card content-card"
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
      <Button
        className="mt-4"
        colorLight="btn-primary"
        disabled={!areAllFieldsFilled}
        loading={isLoading}
        type="submit"
      >
        Guardar
      </Button>
    </form>
  );
};
export default TypesForm;
