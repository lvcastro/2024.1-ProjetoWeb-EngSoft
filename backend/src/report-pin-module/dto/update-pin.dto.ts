import { IsNotEmpty, IsString } from 'class-validator';

export class UpdatePinDto {
  @IsNotEmpty()
  @IsString()
  status: string;
}
