import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, Logger } from '@nestjs/common';
import * as request from 'supertest';
import { PrismaService } from '../src/infrastructure/prisma.service';
import { UsersModule } from '../src/api/users/users.module';
import { User } from '@prisma/client';
import { AuthService } from '../src/api/auth/auth.service';

describe(' Users Controller (e2e)', () => {
  let app: INestApplication;

  const user: User = {
    id: 1,
    name: 'John Doe',
    email: 'test@test.com',
    password: 'hashedpassword123',
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UsersModule],
    })
      .overrideProvider(PrismaService)
      .useValue({
        user: {
          create: jest.fn().mockResolvedValue(user),
          findUnique: jest.fn().mockResolvedValue(user),
        },
      })
      .overrideProvider(AuthService)
      .useValue({
        validateUser: jest.fn().mockResolvedValue(user),
        generateToken: jest.fn().mockResolvedValue('token'),
      })
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/register (POST)', () => {
    return request(app.getHttpServer())
      .post('/register')
      .send({
        name: 'John Doe',
        email: 'test@test.com',
        password: 'password123',
      })
      .expect(201)
      .expect(({ body }) => {
        expect(body.token).toBeDefined();
      });
  });

  it('/login (POST)', () => {
    return request(app.getHttpServer())
      .post('/login')
      .send({
        email: 'test@test.com',
        password: 'password123',
      })
      .expect(200)
      .expect(({ body }) => {
        expect(body.token).toBeDefined();
      });
  });
});
