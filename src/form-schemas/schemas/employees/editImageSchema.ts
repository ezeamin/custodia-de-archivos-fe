import { z } from 'zod';

export const editImageSchema = z.object({
  imgFile: z.instanceof(File, {
    message: 'El archivo es requerido',
  }),
});

export type EditImageSchema = z.infer<typeof editImageSchema>;
