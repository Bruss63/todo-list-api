import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { authConstants } from './api/auth/constants';

function validateConfig() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not defined');
  }

  if (!authConstants.jwtSecret) {
    throw new Error('JWT_SECRET is not defined');
  }
}

async function bootstrap() {
  validateConfig();

  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
