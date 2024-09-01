import { z } from 'nestjs-zod/z';

export const userSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string(),
  password: z.string(),
});

export const registerUserSchema = userSchema.omit({ id: true });
