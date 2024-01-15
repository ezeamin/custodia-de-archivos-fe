import { z } from 'zod';

import { passwordRules } from '@/form-schemas/rules/rules';

export const resetPasswordSchema = z
  .object({
    password: passwordRules(true),
    repeatPassword: passwordRules(true),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['repeatPassword'],
  });

export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;
