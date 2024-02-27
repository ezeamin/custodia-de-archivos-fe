import { cuilRules } from '../../rules/rules';
import { z } from 'zod';

export const recoverPasswordSchema = z.object({
  username: cuilRules(true),
});

export type RecoverPasswordSchema = z.infer<typeof recoverPasswordSchema>;
