import dayjs from 'dayjs';
import { z } from 'zod';

import {
  dateRules,
  dniRules,
  lastnameRules,
  nameRules,
  typeRules,
} from '@/form-schemas/rules/rules';

export const editPersonalInfoSchema = z
  .object({
    name: nameRules(true),
    lastname: lastnameRules(true),
    dni: dniRules(true),
    gender: typeRules(true, 'género'),
    birthdate: dateRules(true),
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

export type EditPersonalInfoSchema = z.infer<typeof editPersonalInfoSchema>;
