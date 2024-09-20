import { createZodDto } from 'nestjs-zod';
import { registerRequestSchema } from '../../schemas/user';

export class RegisterUserDto extends createZodDto(registerRequestSchema) {}
