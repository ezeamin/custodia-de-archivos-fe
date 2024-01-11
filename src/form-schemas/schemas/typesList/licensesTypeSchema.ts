import { z } from 'zod';

import { nameRules, textRules } from '@/form-schemas/rules/rules';

export const licenseTypeSchema = z.object({
  title: nameRules(true),
  description: textRules(true),
});

export type LicenseTypeSchema = z.infer<typeof licenseTypeSchema>;
