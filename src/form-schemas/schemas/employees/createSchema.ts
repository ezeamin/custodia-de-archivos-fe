import dayjs from 'dayjs';
import { z } from 'zod';

import {
  dateRules,
  dniRules,
  emailRules,
  lastnameRules,
  nameRules,
  positionRules,
  typeRules,
} from '@/form-schemas/rules/rules';

export const createSchema = z
  .object({
    name: nameRules(true),
    lastname: lastnameRules(true),
    email: emailRules(true),
    dni: dniRules(true),
    gender: typeRules(true, 'género'),
    startDate: dateRules(true),
    birthdate: dateRules(true),
    position: positionRules(true),
    area: typeRules(true, 'área'),
    fileNumber: z.coerce
      .number({
        invalid_type_error: `Debe ingresar un Nro de Legajo válido`,
      })
      .int({
        message: 'Debe ingresar un número entero en Nro de Legajo',
      })
      .positive({
        message: 'Debe ingresar un número positivo en Nro de Legajo',
      }),
    imgFile: z.instanceof(File, {
      message: 'El archivo es requerido',
    }),
  })
  .refine(
    (data) => {
      const { birthdate } = data;
      const todayObj = dayjs();
      const birthdateObj = dayjs(birthdate);

      return !birthdateObj.isAfter(todayObj);
    },
    {
      message:
        'La fecha de nacimiento no puede ser posterior a la fecha actual',
      path: ['birthdate'],
    }
  );

export type CreateSchema = z.infer<typeof createSchema>;
