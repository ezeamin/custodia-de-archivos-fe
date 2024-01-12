import { dniRules } from '../../rules/rules';
import { z } from 'zod';

export const recoverPasswordSchema = z.object({
  username: dniRules(true),
});

export type RecoverPasswordSchema = z.infer<typeof recoverPasswordSchema>;
