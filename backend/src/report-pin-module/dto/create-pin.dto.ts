import {
  IsEmail,
  IsNotEmpty,
  IsLatLong,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreatePinDto {
  @IsNotEmpty()
  @IsLatLong()
  coordinates: string;

  @IsString()
  problem: string;

  @IsOptional()
  @IsEmail()
  contactEmail?: string;
}
