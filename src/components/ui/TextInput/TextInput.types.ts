import type { FormSchemas } from '@/form-schemas';

import type { FormHandling } from '@/components/interface/ui';

export interface InputProps<T extends FormSchemas>
  extends FormHandling<T>,
    Omit<React.InputHTMLAttributes<HTMLInputElement>, 'required' | 'name'> {
  label: string;
  className?: string;
  hideLabel?: boolean;
}
