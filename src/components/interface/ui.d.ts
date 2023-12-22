import type { Control } from 'react-hook-form';

import type { FormSchemas } from '@/form-schemas';

export interface FormHandling<T extends FormSchemas> {
  control: Control<T>;
  name: keyof T;
}

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions -- it needs to be a type for the forwardRef to work fine
export type ListOption = {
  id: number;
  description: string;
};
