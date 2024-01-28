import { Body, Controller, Post } from '@nestjs/common';
import { CreateUestDto } from './dtos/create-user.dto';

@Controller('auth')
export class UsersController {
  @Post('/signup')
  createUser(@Body() body: CreateUestDto) {
    console.log(body);
  }
}
