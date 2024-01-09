import { z } from 'zod';

export const changeDocNameSchema = z.object({
  newName: z
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(35, {
      message: 'El nombre debe tener menos de 35 caracteres',
    })
    .regex(/^[a-zA-Z0-9]+$/, {
      message:
        'El nombre no puede contener espacios, caracteres especiales ni puntos',
    }),
});

export type ChangeDocNameSchema = z.infer<typeof changeDocNameSchema>;
