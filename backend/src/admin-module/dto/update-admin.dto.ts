import { IsOptional, IsString } from 'class-validator';

export class UpdateAdminDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  password?: string;
}
