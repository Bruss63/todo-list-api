import { createZodDto } from 'nestjs-zod';
import { loginRequestSchema } from 'src/schemas/user';

export class LoginUserDto extends createZodDto(loginRequestSchema) {}
