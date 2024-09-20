import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../infrastructure/prisma.service';
import * as bcrypt from 'bcrypt';
import { authConstants } from '../auth/constants';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(private readonly prismaService: PrismaService) {}

  async create(name: string, email: string, password: string): Promise<User> {
    this.logger.debug(`Creating user with email: ${email}`);

    return await this.prismaService.user.create({
      data: {
        name,
        email,
        password: await bcrypt.hash(password, authConstants.saltRounds),
      },
    });
  }

  async findOne(email: string): Promise<User | null> {
    this.logger.debug(`Finding user with email: ${email}`);

    return await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });
  }
}
