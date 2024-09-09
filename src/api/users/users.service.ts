import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/prisma.service';
import * as bcrypt from 'bcrypt';
import { authConstants } from '../auth/constants';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(name: string, email: string, password: string): Promise<User> {
    // hash password
    const hashedPassword = await bcrypt.hash(
      password,
      authConstants.saltRounds,
    );

    return await this.prismaService.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
  }

  async findOne(email: string): Promise<User | null> {
    return await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });
  }
}
