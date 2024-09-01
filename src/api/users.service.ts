import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/prisma.service';
import * as bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async register(name: string, email: string, password: string) {
    // hash password
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // create user
    return await this.prismaService.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
  }
}
