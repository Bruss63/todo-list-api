import { Request } from 'express';
import { User } from 'src/schemas/user';

export type RequestWithUser = Request & { user: User };
