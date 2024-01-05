import { FormSchemas } from '@/form-schemas';

import { FormHandling } from '@/components/interface/ui';

export interface FileInputProps<T extends FormSchemas>
  extends FormHandling<T, true> {
  label: string;
  className?: string;
  disabled?: boolean;
  hideLabel?: boolean;
}
