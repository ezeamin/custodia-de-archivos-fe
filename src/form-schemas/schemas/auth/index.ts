import type { LoginSchema } from './loginSchema';
import type { RecoverPasswordSchema } from './recoverPasswordSchema';
import { ResetPasswordSchema } from './resetPasswordSchema';

// Join other Login schemas with "|"
export type LoginSchemas =
  | LoginSchema
  | RecoverPasswordSchema
  | ResetPasswordSchema;
