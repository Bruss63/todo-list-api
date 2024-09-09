import { createZodDto } from 'nestjs-zod';
import { registerRequestSchema } from 'src/schemas/user';

export class RegisterUserDto extends createZodDto(registerRequestSchema) {}
