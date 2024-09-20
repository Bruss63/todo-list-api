import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ZodSerializerDto } from 'nestjs-zod';
import { TokenDto } from 'src/dtos/users/token.dto';
import { RegisterUserDto } from '../../dtos/users/register.dto';
import { AuthService } from '../auth/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { RequestWithUser } from '../auth/types';

@Controller()
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post('/register')
  @ZodSerializerDto(RegisterUserDto)
  async register(
    @Body() { name, email, password }: RegisterUserDto,
  ): Promise<TokenDto> {
    const user = await this.usersService.create(name, email, password);

    const token = await this.authService.generateToken(user);

    return { token };
  }

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('local'))
  async login(@Request() req: RequestWithUser) {
    const token = await this.authService.generateToken(req.user);

    return { token };
  }
}
