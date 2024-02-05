import { useState } from 'react';
import { MdLogin } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { postLoginFn } from '@/api/api-calls/auth';

import { useZodForm } from '@/hooks';
import { useSession } from '@/stores/useSession';

import { Button, PasswordInput, TextInput } from '@/components/ui';

import { paths } from '@/constants/routes/paths';

import {
  LoginSchema,
  loginSchema,
} from '@/form-schemas/schemas/auth/loginSchema';

const LoginForm = () => {
  // -------------------------------------------------
  // STATE & FORMS
  // -------------------------------------------------

  const { control, onSubmitMiddleware } = useZodForm(loginSchema);
  const { login } = useSession();
  const navigate = useNavigate();

  // -------------------------------------------------
  // API
  // -------------------------------------------------

  const [isLoading, setIsLoading] = useState(false);

  const { mutate: postLogin } = useMutation({
    mutationFn: postLoginFn,
    onError: () => {
      setIsLoading(false);
    },
    onSuccess: (data) => {
      setIsLoading(false);

      // Store in session
      if (data.data) {
        if (data.data.shouldChangePass) {
          navigate(
            `/auth/reset-password?token=${data.data.token}&continue=true`
          );
          return;
        }

        toast.success('Inicio de sesión exitoso');
        login(data.data.token);
      }
    },
  });

  // -------------------------------------------------
  // HANDLERS
  // -------------------------------------------------

  const handleSubmit = (data: LoginSchema) => {
    setIsLoading(true);
    postLogin(data);
  };

  // -------------------------------------------------
  // RENDER
  // -------------------------------------------------

  return (
    <form onSubmit={onSubmitMiddleware(handleSubmit)}>
      <TextInput
        autoComplete="username"
        className="animate-in-left a-delay-400 w-full"
        control={control}
        label="Nombre de usuario"
        maxLength={8}
        name="username"
        placeholder="DNI"
      />
      <PasswordInput
        autoComplete="current-password"
        className="animate-in-right a-delay-500 mt-2 w-full"
        control={control}
        label="Contraseña"
        name="password"
        placeholder="Ingrese una contraseña"
      />
      <div className="animate-in-left a-delay-600 my-1">
        <Link className="underline" to={paths.AUTH.RECOVER_PASS}>
          ¿Olvidó su contraseña?
        </Link>
      </div>
      <Button
        unbordered
        className="mt-3 w-full hover:bg-gray-800 dark:hover:bg-gray-400"
        colorDark="dark:bg-gray-200"
        colorLight="bg-gray-900"
        loading={isLoading}
        startIcon={<MdLogin />}
        textColorDark="dark:text-gray-900"
        textColorLight="text-white"
        type="submit"
      >
        INGRESAR
      </Button>
    </form>
  );
};
export default LoginForm;
