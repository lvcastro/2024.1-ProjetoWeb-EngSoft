import { IsEmail, IsString } from 'class-validator';

export class CreateAdminDto {
  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsString()
  password: string;
}
