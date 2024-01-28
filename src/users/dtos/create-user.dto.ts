import { IsEmail, IsString } from 'class-validator';

export class CreateUestDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
