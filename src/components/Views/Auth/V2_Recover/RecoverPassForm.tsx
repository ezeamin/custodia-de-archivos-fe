import { useState } from 'react';
import { IoMdSend } from 'react-icons/io';
import { IoArrowBackOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { postRecoverPasswordFn } from '@/api/api-calls/auth';

import { useZodForm } from '@/hooks';

import { Alert, Button, Icon, TextInput } from '@/components/ui';

import { paths } from '@/constants/routes/paths';

import {
  RecoverPasswordSchema,
  recoverPasswordSchema,
} from '@/form-schemas/schemas/auth/recoverPasswordSchema';

const RecoverPassForm = () => {
  // -------------------------------------------------
  // STATE & FORMS
  // -------------------------------------------------

  const { control, onSubmitMiddleware, watch } = useZodForm(
    recoverPasswordSchema
  );

  const username = watch('username');

  // -------------------------------------------------
  // API
  // -------------------------------------------------

  const [isLoading, setIsLoading] = useState(false);

  const {
    data: responseData,
    mutate: postRecoverPassword,
    isSuccess,
  } = useMutation({
    mutationFn: postRecoverPasswordFn,
    onError: () => {
      setIsLoading(false);
    },
    onSuccess: () => {
      setIsLoading(false);
      toast.success('Email enviado!');
    },
  });

  // -------------------------------------------------
  // HANDLERS
  // -------------------------------------------------

  const handleSubmit = (data: RecoverPasswordSchema) => {
    setIsLoading(true);
    postRecoverPassword(data);
  };

  // -------------------------------------------------
  // RENDER
  // -------------------------------------------------

  return (
    <form onSubmit={onSubmitMiddleware(handleSubmit)}>
      {responseData?.data?.email && (
        <Alert className="mb-3 mt-2">
          Se ha enviado un mail al correo electrónico asociado a {username}:
          {responseData.data.email}
        </Alert>
      )}
      <TextInput
        className="w-full animate-in-left a-delay-400"
        control={control}
        label="Nombre de usuario"
        maxLength={8}
        name="username"
        placeholder="DNI"
      />
      <Button
        unbordered
        className="w-full mt-3 hover:bg-gray-800 dark:hover:bg-gray-400"
        colorDark="dark:bg-gray-300"
        colorLight="bg-gray-900"
        disabled={isSuccess}
        loading={isLoading}
        textColorDark="dark:text-gray-900"
        textColorLight="text-white"
        type="submit"
      >
        <Icon iconComponent={<IoMdSend />} title="Enviar" />
        ENVIAR MAIL
      </Button>
      <Link className="btn mt-2 w-full" to={paths.AUTH.LOGIN}>
        <Icon iconComponent={<IoArrowBackOutline />} title="Volver" />
        VOLVER
      </Link>
    </form>
  );
};
export default RecoverPassForm;
