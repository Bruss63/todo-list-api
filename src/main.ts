import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { authConstants } from './api/auth/constants';

function validateConfig() {
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
