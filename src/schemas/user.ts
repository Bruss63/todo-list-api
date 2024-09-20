import { z } from 'nestjs-zod/z';

export const userSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  name: z.string(),
  password: z.string(),
});

export const tokenSchema = z.object({
  token: z.string(),
});

export const registerRequestSchema = userSchema.omit({ id: true });
export const loginRequestSchema = userSchema.omit({ id: true, name: true });

export type User = Omit<z.infer<typeof userSchema>, 'password'>;
