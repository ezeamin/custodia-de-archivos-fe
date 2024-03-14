import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { postReadOnlyUserFn } from '@/api/api-calls/users';

import { useZodForm } from '@/hooks';

import { Alert, Button, Grid, TextInput } from '@/components/ui';

import { paths } from '@/constants/routes/paths';

import {
  CreateReadOnlySchema,
  createReadOnlySchema,
} from '@/form-schemas/schemas/settings/createReadOnlySchema';

const CreateForm = () => {
  // -------------------------------------------------
  // FORM & STATES
  // -------------------------------------------------

  const { control, onSubmitMiddleware, areAllFieldsFilled, reset } =
    useZodForm(createReadOnlySchema);

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  // -------------------------------------------------
  // API
  // -------------------------------------------------

  const { mutate: createReadOnlyUser } = useMutation({
    mutationFn: postReadOnlyUserFn,
    onError: () => {
      setIsLoading(false);
    },
    onSuccess: () => {
      setIsLoading(false);
      reset();
      toast.success('Usuario creado y habilitado con éxito');
      window.setTimeout(() => {
        navigate(paths.SETTINGS.MAIN);
      }, 1000);
    },
  });

  // -------------------------------------------------
  // HANDLERS
  // -------------------------------------------------

  const handleSubmit = (data: CreateReadOnlySchema) => {
    setIsLoading(true);

    createReadOnlyUser(data);
  };

  // -------------------------------------------------
  // RENDER
  // -------------------------------------------------

  return (
    <>
      <Alert className="mb-3">
        Tras la creación de este usuario, le llegará al mail que debajo indique,
        su usuario y una contraseña temporal que luego deberá cambiar.
      </Alert>
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
              label="Nombre *"
              name="name"
              placeholder="Juan"
            />
          </Grid>
          <Grid item lg={4} sm={6} xs={12}>
            <TextInput
              className="w-full"
              control={control}
              disabled={isLoading}
              label="Apellido *"
              name="lastname"
              placeholder="Pérez"
            />
          </Grid>
          <Grid item lg={4} sm={6} xs={12}>
            <TextInput
              className="w-full"
              control={control}
              disabled={isLoading}
              label="CUIL (Sin puntos) *"
              maxLength={11}
              name="cuil"
              placeholder="12345678910"
            />
          </Grid>
          <Grid item sm={6} xs={12}>
            <TextInput
              className="w-full"
              control={control}
              disabled={isLoading}
              label="Email *"
              name="email"
              placeholder="juanperez@gmail.com"
            />
          </Grid>
          <Grid item sm={6} xs={12}>
            <TextInput
              className="w-full"
              control={control}
              disabled={isLoading}
              label="Descripción *"
              name="description"
              placeholder="Contador de la empresa"
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
    </>
  );
};
export default CreateForm;
