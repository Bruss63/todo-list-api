import { Module } from '@nestjs/common';
import { UsersController } from './api/users.controller';
import { UsersService } from './api/users.service';
import { PrismaService } from './infrastructure/prisma.service';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { ZodSerializerInterceptor, ZodValidationPipe } from 'nestjs-zod';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ZodSerializerInterceptor,
    },
    PrismaService,
    UsersService,
  ],
})
export class AppModule {}
