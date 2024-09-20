import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from '../../infrastructure/prisma.service';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

describe('UsersService', () => {
  let service: UsersService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              create: jest.fn(),
              findUnique: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const name = 'John Doe';
      const email = 'john.doe@example.com';
      const password = 'password123';
      const hashedPassword = 'hashedPassword';

      const user: User = {
        id: 1,
        name,
        email,
        password: 'hashedPassword',
      };

      jest.spyOn(prismaService.user, 'create').mockResolvedValue(user);
      jest.spyOn(bcrypt, 'hash').mockImplementation(async () => hashedPassword);

      const result = await service.create(name, email, password);

      expect(result).toEqual(user);
      expect(prismaService.user.create).toHaveBeenCalledWith({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });
    });
  });

  describe('findOne', () => {
    it('should return a user if found', async () => {
      const email = 'john.doe@example.com';
      const user: User = {
        id: 1,
        name: 'John Doe',
        email,
        password: 'hashedPassword',
      };

      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(user);

      const result = await service.findOne(email);

      expect(result).toEqual(user);
      expect(prismaService.user.findUnique).toHaveBeenCalledWith({
        where: { email },
      });
    });

    it('should return null if user not found', async () => {
      const email = 'john.doe@example.com';

      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(null);

      const result = await service.findOne(email);

      expect(result).toBeNull();
      expect(prismaService.user.findUnique).toHaveBeenCalledWith({
        where: { email },
      });
    });
  });
});
