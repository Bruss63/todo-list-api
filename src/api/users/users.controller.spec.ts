import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from '../auth/auth.service';
import { RegisterUserDto } from '../../dtos/users/register.dto';
import { TokenDto } from '../../dtos/users/token.dto';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

describe('UsersController', () => {
  let controller: UsersController;
  let usersService: UsersService;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            create: jest.fn(),
            findOne: jest.fn(),
          },
        },
        {
          provide: AuthService,
          useValue: {
            generateToken: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('register', () => {
    it('should register a user and return a token', async () => {
      const registerUserDto: RegisterUserDto = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: 'password123',
      };

      const user: User = {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: 'hashedPassword',
      };

      const tokenDto: TokenDto = { token: 'jwtToken' };

      jest.spyOn(usersService, 'create').mockResolvedValue(user);
      jest
        .spyOn(authService, 'generateToken')
        .mockResolvedValue(tokenDto.token);

      const result = await controller.register(registerUserDto);

      expect(usersService.create).toHaveBeenCalledWith(
        registerUserDto.name,
        registerUserDto.email,
        registerUserDto.password,
      );
      expect(authService.generateToken).toHaveBeenCalledWith(user);
      expect(result).toEqual(tokenDto);
    });
  });

  describe('login', () => {
    it('should login a user and return a token', async () => {
      const req = {
        user: {
          id: 1,
          name: 'John Doe',
          email: 'john.doe@example.com',
        },
      };

      const tokenDto: TokenDto = { token: 'jwtToken' };

      jest
        .spyOn(authService, 'generateToken')
        .mockResolvedValue(tokenDto.token);

      const result = await controller.login(req as any);

      expect(authService.generateToken).toHaveBeenCalledWith(req.user);
      expect(result).toEqual(tokenDto);
    });
  });
});
