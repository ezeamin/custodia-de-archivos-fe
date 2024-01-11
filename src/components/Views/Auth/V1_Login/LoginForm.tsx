import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
} from '@/form-schemas/schemas/login/loginSchema';

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
    onError: (error) => {
      setIsLoading(false);
      toast.error(error.message);
    },
    onSuccess: (data) => {
      setIsLoading(false);
      toast.success('Bienvenido!');

      // Store in session
      if (data.data) login(data.data.token);

      window.setTimeout(() => {
        navigate(paths.HOME);
      }, 1000);
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
        className="w-full animate-in-left a-delay-400"
        control={control}
        label="Nombre de usuario"
        name="username"
        placeholder="DNI"
      />
      <PasswordInput
        className="w-full mt-2 animate-in-left a-delay-500"
        control={control}
        label="Contraseña"
        name="password"
        placeholder="Ingrese una contraseña"
      />
      <Button
        unbordered
        className="w-full mt-3 hover:bg-gray-800 dark:hover:bg-gray-400"
        colorDark="dark:bg-gray-300"
        colorLight="bg-gray-900"
        loading={isLoading}
        textColorDark="dark:text-gray-900"
        textColorLight="text-white"
        type="submit"
      >
        Ingresar
      </Button>
    </form>
  );
};
export default LoginForm;
