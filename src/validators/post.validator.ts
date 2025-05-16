import { z } from 'zod';

/**
 * Esquemas Zod para validar Posts
 */
export const postSchema = z.object({
  id: z.number().int().positive(),
  userId: z.number().int().positive(),
  title: z.string().min(1),
  body: z.string().min(1),
});

export const createPostSchema = z.object({
  userId: z.number().int().positive(),
  title: z.string().min(1),
  body: z.string().min(1),
});

export const updatePostSchema = z
  .object({
    userId: z.number().int().positive().optional(),
    title: z.string().min(1).optional(),
    body: z.string().min(1).optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: 'Al menos un campo debe ser proporcionado para la actualización',
  });

export type PostSchemaType = z.infer<typeof postSchema>;
export type CreatePostSchemaType = z.infer<typeof createPostSchema>;
export type UpdatePostSchemaType = z.infer<typeof updatePostSchema>;
