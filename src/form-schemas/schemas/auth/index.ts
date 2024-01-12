import type { LoginSchema } from './loginSchema';
import type { RecoverPasswordSchema } from './recoverPasswordSchema';

// Join other Login schemas with "|"
export type LoginSchemas = LoginSchema | RecoverPasswordSchema;
