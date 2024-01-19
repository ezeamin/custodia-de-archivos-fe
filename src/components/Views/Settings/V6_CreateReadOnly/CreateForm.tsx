import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { postReadOnlyUserFn } from '@/api/api-calls/users';

import { useZodForm } from '@/hooks';

import { Button, Grid, PasswordInput, TextInput } from '@/components/ui';

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
    <form
      className="content-card animate-in-bottom a-delay-200 card"
      onSubmit={onSubmitMiddleware(handleSubmit)}
    >
      <Grid container gap={2}>
        <Grid item sm={6} xs={12}>
          <TextInput
            autoComplete="one-time-code"
            className="w-full"
            control={control}
            disabled={isLoading}
            label="D.N.I. (sin puntos)"
            name="username"
            placeholder="12345678"
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <PasswordInput
            autoComplete="one-time-code"
            className="w-full"
            control={control}
            disabled={isLoading}
            helperText="La contraseña debe tener al menos 6 caracteres, entre ellos: una mayúscula, una minúscula y un número"
            label="Contraseña"
            name="password"
            placeholder="*******"
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
export default CreateForm;
