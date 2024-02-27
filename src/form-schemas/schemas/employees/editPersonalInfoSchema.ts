import dayjs from 'dayjs';
import { z } from 'zod';

import {
  cuilRules,
  dateRules,
  lastnameRules,
  nameRules,
  typeRules,
} from '@/form-schemas/rules/rules';

export const editPersonalInfoSchema = z
  .object({
    name: nameRules(true),
    lastname: lastnameRules(true),
    cuil: cuilRules(true),
    gender: typeRules(true, 'Género'),
    birthdate: dateRules(true),
    civilStatus: typeRules(true, 'Estado Civil'),
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
