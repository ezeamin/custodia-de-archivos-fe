import { z } from 'zod';

import {
  cuilRules,
  dateRules,
  lastnameRules,
  nameRules,
  textRules,
  typeRules,
} from '@/form-schemas/rules/rules';

export const beneficiaryFormSchema = z.object({
  name: nameRules(true),
  lastname: lastnameRules(true),
  cuil: cuilRules(true),
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
  addressObservations: textRules(false, 'campo Observaciones'),
  percentage: z.coerce
    .number({
      invalid_type_error: 'El campo Porcentaje debe ser un número',
    })
    .int({
      message: 'El campo Porcentaje debe ser un número entero',
    })
    .positive({
      message: 'El campo Porcentaje debe ser un número positivo',
    })
    .max(100, 'El campo Porcentaje no puede ser mayor a 100')
    .default(100),
});

export type BeneficiaryFormSchema = z.infer<typeof beneficiaryFormSchema>;
