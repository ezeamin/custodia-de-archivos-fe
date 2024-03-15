import { useEffect, useMemo, useState } from 'react';
import { IoMdSave } from 'react-icons/io';
import { IoArrowBackOutline } from 'react-icons/io5';
import { Link, useSearchParams } from 'react-router-dom';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { putResetPasswordFn } from '@/api/api-calls/auth';

import { useZodForm } from '@/hooks';
import { useSession } from '@/stores/useSession';

import { Alert, Button, Icon, PasswordInput } from '@/components/ui';

import { paths } from '@/constants/routes/paths';

import {
  ResetPasswordSchema,
  resetPasswordSchema,
} from '@/form-schemas/schemas/auth/resetPasswordSchema';

const ResetPassForm = () => {
  // -------------------------------------------------
  // STATE & FORMS
  // -------------------------------------------------

  const { control, onSubmitMiddleware } = useZodForm(resetPasswordSchema);
  const { login } = useSession();
  const searchParams = useSearchParams();
  const token = searchParams[0].get('token') ?? '';
  const shouldContinue = useMemo(
    () => !!searchParams[0].get('continue') ?? '',
    [searchParams]
  );

  // -------------------------------------------------
  // API
  // -------------------------------------------------

  const [isLoading, setIsLoading] = useState(false);

  const { mutate: putResetPassword, isSuccess } = useMutation({
    mutationFn: putResetPasswordFn,
    onError: () => {
      setIsLoading(false);
    },
    onSuccess: () => {
      setIsLoading(false);
      if (shouldContinue) {
        toast.success('Contraseña cambiada correctamente. Bienvenido');
        login(token);
      }
    },
  });

  // -------------------------------------------------
  // HANDLERS
  // -------------------------------------------------

  const handleSubmit = (data: ResetPasswordSchema) => {
    setIsLoading(true);
    putResetPassword({ password: data.password, token });
  };

  // -------------------------------------------------
  // EFFECTS
  // -------------------------------------------------

  useEffect(() => {
    if (shouldContinue) {
      toast.info(
        'Bienvenido al Portal de Empleados de Custodia de Archivos Noroeste S.R.L. Por favor, para continuar le pedimos que cree una nueva contraseña, siguiendo las indicaciones para su seguridad',
        {
          duration: 10000,
          position: 'bottom-right',
        }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // -------------------------------------------------
  // RENDER
  // -------------------------------------------------

  return (
    <form onSubmit={onSubmitMiddleware(handleSubmit)}>
      {isSuccess && (
        <Alert className="mb-3 mt-2" type="success">
          Contraseña cambiada correctamente. Ahora puede volver a loguearse.
        </Alert>
      )}
      <PasswordInput
        autoComplete="new-password"
        className="animate-in-left a-delay-400 w-full"
        control={control}
        helperText="La contraseña debe tener al menos 6 caracteres, entre ellos: una mayúscula, una minúscula y un número"
        label="Nueva contraseña"
        maxLength={30}
        name="password"
        placeholder="Ingrese nueva contraseña"
      />
      <PasswordInput
        autoComplete="new-password"
        className="animate-in-left a-delay-400 mt-3 w-full"
        control={control}
        label="Repetir nueva contraseña"
        maxLength={30}
        name="repeatPassword"
        placeholder="Repita nueva contraseña"
      />
      <Button
        unbordered
        className="mt-3 w-full hover:bg-gray-800 dark:hover:bg-gray-400"
        colorDark="dark:bg-gray-300"
        colorLight="bg-gray-900"
        disabled={isSuccess}
        loading={isLoading}
        startIcon={<IoMdSave />}
        textColorDark="dark:text-gray-900"
        textColorLight="text-white"
        type="submit"
      >
        GUARDAR
      </Button>
      <Link className="btn mt-2 w-full" to={paths.AUTH.LOGIN}>
        <Icon iconComponent={<IoArrowBackOutline />} title="Volver" />
        VOLVER A LOGIN
      </Link>
    </form>
  );
};
export default ResetPassForm;
