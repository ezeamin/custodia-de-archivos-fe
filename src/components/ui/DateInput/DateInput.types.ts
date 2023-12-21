import type { FormSchemas } from 'form-schemas';

import type { DataTestId, FormHandling } from '../../types';

export interface InputProps<T extends FormSchemas>
  extends FormHandling<T>,
    DataTestId,
    Omit<React.InputHTMLAttributes<HTMLInputElement>, 'required' | 'name'> {
  label: string;
  className?: string;
}
