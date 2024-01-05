import { FormSchemas } from '@/form-schemas';

import { FormHandling } from '@/components/interface/ui';

export interface MultipleFileInputProps<T extends FormSchemas>
  extends FormHandling<T, true> {
  className?: string;
  disabled?: boolean;
  maxFiles?: number;
  maxSize?: number;
}
