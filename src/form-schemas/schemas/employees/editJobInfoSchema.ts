import { z } from 'zod';

import { dateRules, textRules, typeRules } from '@/form-schemas/rules/rules';

export const editJobInfoSchema = z.object({
  status: typeRules(true, 'campo Estado'),
  fileNumber: z.coerce
    .number({
      invalid_type_error: 'El campo Nro. de Legajo debe ser un número',
    })
    .int({
      message: 'El campo Nro. de Legajo debe ser un número entero',
    })
    .positive({
      message: 'El campo Nro. de Legajo debe ser un número positivo',
    }),
  area: z.union([typeRules(true, 'campo Area'), z.null()]),
  position: textRules(true, 'campo Puesto'),
  startDate: dateRules(true),
  endDate: z.union([dateRules(false), z.null()]),
  workingHours: z.coerce
    .number({
      invalid_type_error: 'El campo Horas de trabajo debe ser un número',
    })
    .int({
      message: 'El campo Horas de trabajo debe ser un número entero',
    })
    .positive({
      message: 'El campo Horas de trabajo debe ser un número positivo',
    }),
  driversLicenseDate: dateRules(false),
});

export type EditJobInfoSchema = z.infer<typeof editJobInfoSchema>;
