import { createZodDto } from 'nestjs-zod';
import { tokenSchema } from 'src/schemas/user';

export class TokenDto extends createZodDto(tokenSchema) {}
