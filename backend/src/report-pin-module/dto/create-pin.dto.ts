import {
  IsEmail,
  IsLatLong,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreatePinDto {
  @IsLatLong()
  coordinates: string;

  @IsString()
  @IsNotEmpty()
  problem: string;

  @IsOptional()
  @IsEmail()
  contactEmail?: string;
}
