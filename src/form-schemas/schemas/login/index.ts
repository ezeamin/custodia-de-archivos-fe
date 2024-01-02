import type { LoginSchema } from './loginSchema';
import type { RestoreSchema } from './restoreSchema';

// Join other Login schemas with "|"
export type LoginSchemas = LoginSchema | RestoreSchema;
