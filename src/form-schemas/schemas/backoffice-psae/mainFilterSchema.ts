import { z } from 'zod';

export const mainFilterSchema = z
  .object({
    search: z.string().optional(),
    isEnabled: z.string().transform((value) => {
      let retValue = 'NONE';
      switch (value) {
        case 'Si': {
          retValue = 'YES';
          break;
        }
        case 'No': {
          retValue = 'NO';
          break;
        }
        default: {
          break;
        }
      }

      return retValue;
    }),
  })
  .refine(
    (values) => {
      if (values.isEnabled === 'NONE' && !values.search) {
        return false;
      }

      return true;
    },
    {
      message: 'Por lo menos un campo debe tener valores',
    }
  );

export type MainFilterSchema = z.infer<typeof mainFilterSchema>;
