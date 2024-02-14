import { z } from 'zod';

import {
  dateRules,
  dniRules,
  lastnameRules,
  nameRules,
  textRules,
  typeRules,
} from '@/form-schemas/rules/rules';

export const beneficiaryFormSchema = z.object({
  name: nameRules(true),
  lastname: lastnameRules(true),
  dni: dniRules(true),
  gender: typeRules(true, 'género'),
  birthdate: dateRules(false).default('1970-01-01T00:00:00.000Z'),
  relationship: typeRules(true, 'parentesco'),
  street: z.union([typeRules(true, 'campo Calle'), z.null()]),
  streetNumber: z.coerce
    .number({
      invalid_type_error: 'El campo Nro. de Calle debe ser un número',
    })
    .int({
      message: 'El campo Nro. de Calle debe ser un número entero',
    })
    .positive({
      message: 'El campo Nro. de Calle debe ser un número positivo',
    }),
  apt: textRules(false, 'campo Departamento'),
  state: z.union([typeRules(true, 'campo Provincia'), z.null()]),
  locality: z.union([typeRules(true, 'campo Localidad'), z.null()]),
});

export type BeneficiaryFormSchema = z.infer<typeof beneficiaryFormSchema>;
