import { useState } from 'react';
import { IoMdSave } from 'react-icons/io';
import { IoArrowBackOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';

import { useMutation } from '@tanstack/react-query';

import { putResetPasswordFromSettingsFn } from '@/api/api-calls/auth';

import { useZodForm } from '@/hooks';

import { Alert, Button, Grid, Icon, PasswordInput } from '@/components/ui';

import { paths } from '@/constants/routes/paths';

import {
  ResetPasswordSchema,
  resetPasswordSchema,
} from '@/form-schemas/schemas/auth/resetPasswordSchema';

const ChangePasswordForm = () => {
  // -------------------------------------------------
  // STATE & FORMS
  // -------------------------------------------------

  const { control, onSubmitMiddleware } = useZodForm(resetPasswordSchema);

  // -------------------------------------------------
  // API
  // -------------------------------------------------

  const [isLoading, setIsLoading] = useState(false);

  const { mutate: putResetPassword, isSuccess } = useMutation({
    mutationFn: putResetPasswordFromSettingsFn,
    onError: () => {
      setIsLoading(false);
    },
    onSuccess: () => {
      setIsLoading(false);
    },
  });

  // -------------------------------------------------
  // HANDLERS
  // -------------------------------------------------

  const handleSubmit = (data: ResetPasswordSchema) => {
    setIsLoading(true);
    putResetPassword(data);
  };

  // -------------------------------------------------
  // RENDER
  // -------------------------------------------------

  return (
    <form className="content-card" onSubmit={onSubmitMiddleware(handleSubmit)}>
      {isSuccess && (
        <Alert className="mb-3 mt-2" type="success">
          Contraseña cambiada correctamente.
        </Alert>
      )}
      <Alert className="mb-3">
        La contraseña debe tener al menos 6 caracteres, entre ellos al menos:
        una mayúscula, una minúscula y un número
      </Alert>
      <Grid container gap={3}>
        <Grid item lg={6} md={12} sm={6} xs={12}>
          <PasswordInput
            autoComplete="new-password"
            className="animate-in-left a-delay-400 w-full"
            control={control}
            label="Nueva contraseña"
            maxLength={8}
            name="password"
            placeholder="Ingrese nueva contraseña"
          />
        </Grid>
        <Grid item lg={6} md={12} sm={6} xs={12}>
          <PasswordInput
            autoComplete="new-password"
            className="animate-in-left a-delay-400 w-full"
            control={control}
            label="Repetir nueva contraseña"
            maxLength={8}
            name="repeatPassword"
            placeholder="Repita nueva contraseña"
          />
        </Grid>
      </Grid>
      <div className="mt-3 flex flex-col-reverse justify-end gap-3 sm:flex-row">
        <Link className="btn" to={paths.SETTINGS.MAIN}>
          <Icon iconComponent={<IoArrowBackOutline />} title="Volver" />
          {isSuccess ? 'VOLVER' : 'CANCELAR Y VOLVER'}
        </Link>
        <Button
          unbordered
          colorLight="btn-primary"
          disabled={isSuccess}
          loading={isLoading}
          textColorLight="text-white"
          type="submit"
        >
          <Icon iconComponent={<IoMdSave />} title="Guardar" />
          GUARDAR
        </Button>
      </div>
    </form>
  );
};
export default ChangePasswordForm;
