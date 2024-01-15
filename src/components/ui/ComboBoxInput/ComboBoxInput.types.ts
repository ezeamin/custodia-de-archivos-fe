import type { FormSchemas } from '@/form-schemas';

import type { FormHandling } from '@/components/interface/ui';
import type { BasicList } from '@/interface';

export interface ComboBoxInputProps<T extends FormSchemas>
  extends FormHandling<T, false>,
    Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'required' | 'name'> {
  label: string;
  className?: string;
  helperText?: string;
  hideLabel?: boolean;
  inputClassName?: string;
  options: BasicList[];
  placeholder?: string;
}
