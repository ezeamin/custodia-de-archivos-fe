import { z } from 'zod';

import {
  emailRules,
  lastnameRules,
  nameRules,
  usernameRules,
} from '../../rules/rules';

export const createSchema = z.object({
  email: emailRules(true),
  firstname: nameRules(true),
  lastname: lastnameRules(true),
  username: usernameRules(true),
});

export type CreateSchema = z.infer<typeof createSchema>;
