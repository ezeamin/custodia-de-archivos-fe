import { z } from 'zod';

export const loginSchema = z.object({
  username: z.string().min(3, {
    message: 'El nombre de usuario debe tener al menos 3 caracteres',
  }),
  password: z.string().min(3, {
    message: 'La contraseña debe tener al menos 3 caracteres',
  }),
});

export type LoginSchema = z.infer<typeof loginSchema>;
