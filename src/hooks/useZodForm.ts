import { useEffect } from 'react';
import { useForm as useFormRHF } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import type { z, ZodSchema } from 'zod';

import type { UseZodForm } from './interface';

export const useZodForm = <T extends ZodSchema>(
  validationSchema: T
): UseZodForm<T> => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useFormRHF<z.infer<typeof validationSchema>>({
    resolver: zodResolver(validationSchema),
  });

  useEffect(() => {
    Object.values(errors).forEach((error) => {
      toast.error(error?.message?.toString() || 'Revise los campos');
    });
  }, [errors]);

  return {
    onSubmitMiddleware: handleSubmit,
    control,
    reset,

    // Optional usage - Discouraged
    errors,
  };
};
