import { IsNotEmpty, IsString } from 'class-validator';

export class AuthPayloadDto {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
