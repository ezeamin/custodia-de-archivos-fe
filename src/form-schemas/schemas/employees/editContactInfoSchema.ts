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
  street: z.union([typeRules(true, 'campo Calle'), z.null()]),
  streetNumber: z.coerce
    .number({
      invalid_type_error: 'El campo Nro. de Calle debe ser un número',
    })
    .int({
      message: 'El campo Nro. de Calle debe ser un número entero',
    })
    .nonnegative({
      message: 'El campo Nro. de Calle debe ser un número positivo',
    }),
  apt: textRules(false, 'campo Departamento'),
  state: z.union([typeRules(true, 'campo Provincia'), z.null()]),
  locality: z.union([typeRules(true, 'campo Localidad'), z.null()]),
  addressObservations: textRules(false, 'campo Observaciones'),
});

export type EditContactInfoSchema = z.infer<typeof editContactInfoSchema>;
