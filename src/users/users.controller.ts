import { Body, Controller, Post } from '@nestjs/common';
import { CreateUestDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Post('/signup')
  createUser(@Body() body: CreateUestDto) {
    console.log(body);
    this.usersService.create(body.email, body.password);
  }
}
