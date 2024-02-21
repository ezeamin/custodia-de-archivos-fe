import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { useLoading, useZodForm } from '@/hooks';

import { Button, Grid, TextInput } from '@/components/ui';

import { paths } from '@/constants/routes/paths';

import { getAreaFn, postAreaFn, putAreaFn } from '@/api/api-calls/typesList';
import {
  AreasTypeSchema,
  areasTypeSchema,
} from '@/form-schemas/schemas/typesList/areasTypeSchema';

const TypesForm = () => {
  const { control, onSubmitMiddleware, areAllFieldsFilled, setValue, reset } =
    useZodForm(areasTypeSchema);

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
    queryKey: ['areaOptions', idBeingEdited, isEditing && idBeingEdited],
    queryFn: () => getAreaFn(idBeingEdited ?? ''),
    enabled: !!(isEditing && idBeingEdited),
  });

  const { mutate: createType } = useMutation({
    mutationFn: postAreaFn,
    onError: () => {
      setIsLoading(false);
    },
    onSuccess: () => {
      setIsLoading(false);
      reset();
      toast.success('Area creada con éxito');
      queryClient.invalidateQueries({ queryKey: ['areaOptions'] });
    },
  });

  const { mutate: editType } = useMutation({
    mutationFn: putAreaFn,
    onError: () => {
      setIsLoading(false);
    },
    onSuccess: () => {
      setIsLoading(false);
      reset(); // Clear form values
      toast.success('Area modificada con éxito');
      queryClient.invalidateQueries({ queryKey: ['areaOptions'] });
      navigate(paths.TYPES_LIST.AREAS);
    },
  });

  useLoading(isLoadingEditedData, statusEditedData);

  if (isErrorEditedData) {
    toast.error('Ocurrió un error al obtener la información');
    navigate(paths.TYPES_LIST.AREAS);
  }

  // -----------------------------------------------------
  // HANDLERS
  // -----------------------------------------------------

  const handleSubmit = (data: AreasTypeSchema) => {
    setIsLoading(true);

    if (isEditing) {
      editType({ ...data, id: idBeingEdited });
    } else {
      createType(data);
    }
  };

  const handleCancelEdit = () => {
    reset();
    navigate(paths.TYPES_LIST.AREAS);
  };

  // -----------------------------------------------------
  // EFFECTS
  // -----------------------------------------------------

  // Set values in form if editing
  useEffect(() => {
    if (isEditing && isSuccessEditedData && dataBeingEdited?.data) {
      setValue('title', dataBeingEdited?.data.description);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccessEditedData, isEditing, setValue]);

  // -----------------------------------------------------
  // RENDER
  // -----------------------------------------------------

  return (
    <form
      className="content-card animate-in-bottom a-delay-400 card"
      onSubmit={onSubmitMiddleware(handleSubmit)}
    >
      <TextInput
        className="w-full"
        control={control}
        disabled={isLoading}
        label="Nombre del área"
        name="title"
        placeholder="Sistemas"
      />
      <Grid container className="mt-4" gap={2}>
        <Grid item sm={isEditing ? 9 : 12} xs={12}>
          <Button
            className="w-full"
            colorLight="btn-primary"
            disabled={!areAllFieldsFilled || isLoadingEditedData}
            loading={isLoading}
            textColorLight="text-white"
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
