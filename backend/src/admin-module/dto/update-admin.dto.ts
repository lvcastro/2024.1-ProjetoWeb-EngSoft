import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateAdminDto {
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  name?: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  password?: string;
}
