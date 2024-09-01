import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterUserDto } from 'src/dtos/users/registerUser.dto';
import { ZodSerializerDto } from 'nestjs-zod';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/register')
  @ZodSerializerDto(RegisterUserDto)
  async register(@Body() { name, email, password }: RegisterUserDto) {
    const user = this.usersService.register(name, email, password);
    return user;
  }
}
