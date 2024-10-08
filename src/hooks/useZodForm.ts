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
    watch,
    setValue,
  } = useFormRHF<z.infer<typeof validationSchema>>({
    resolver: zodResolver(validationSchema),
  });

  // Watch all fields
  const watchAllFields = watch();

  // Check if all fields are filled
  const areAllFieldsFilled =
    Object.values(watchAllFields).length > 0 &&
    Object.values(watchAllFields).every((value) =>
      Array.isArray(value) ? value.length > 0 : !!value
    );

  useEffect(() => {
    Object.values(errors).forEach((error) => {
      toast.warning(error?.message?.toString() || 'Revise los campos');
    });
  }, [errors]);

  return {
    onSubmitMiddleware: handleSubmit,
    control,

    // Optional usage
    reset,
    areAllFieldsFilled,

    // Optional usage - Discouraged
    errors,
    watch,
    setValue,
  };
};
