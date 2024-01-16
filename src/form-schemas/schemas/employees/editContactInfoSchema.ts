import { z } from 'zod';

import {
  emailRules,
  phoneRules,
  textRules,
  typeRules,
} from '@/form-schemas/rules/rules';

export const editContactInfoSchema = z.object({
  email: emailRules(true),
  phone: phoneRules(false),
  street: textRules(true, 'campo Calle'),
  streetNumber: z.coerce.number().int().positive(),
  apt: textRules(false, 'campo Departamento'),
  state: typeRules(true, 'campo Provincia'),
  locality: typeRules(true, 'campo Localidad'),
});

export type EditContactInfoSchema = z.infer<typeof editContactInfoSchema>;
