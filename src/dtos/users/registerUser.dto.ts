import { createZodDto } from 'nestjs-zod';
import { registerUserSchema } from 'src/schemas/user';

export class RegisterUserDto extends createZodDto(registerUserSchema) {}
