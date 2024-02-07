import { z } from 'zod';

import { nameRules } from '@/form-schemas/rules/rules';

export const addLifeInsuranceSchema = z.object({
  name: nameRules(true),
  policyNumber: z.coerce
    .number({
      invalid_type_error: 'El número de póliza debe ser un número',
    })
    .int({
      message: 'El número de póliza debe ser un número entero',
    })
    .positive({
      message: 'El número de póliza debe ser un número positivo',
    }),
});

export type AddLifeInsuranceSchema = z.infer<typeof addLifeInsuranceSchema>;
