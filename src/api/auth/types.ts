import { Request } from 'express';
import { User } from 'src/schemas/user';

export type RequestWithUser = Request & { user: User };

export type Token = {
  email: string;
  sub: string;
  iss: string;
  iat: number;
  exp: number;
};
