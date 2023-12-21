import type {
  Control,
  FieldErrors,
  UseFormHandleSubmit,
  UseFormReset,
} from 'react-hook-form';
import type { z } from 'zod';

export interface Sizes {
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
}

export interface UseZodForm<T extends ZodSchema> {
  onSubmitMiddleware: UseFormHandleSubmit<z.TypeOf<T>>;
  control: Control<z.TypeOf<T>>;
  errors: FieldErrors<z.TypeOf<T>>;
  reset: UseFormReset<z.TypeOf<T>>;
}
