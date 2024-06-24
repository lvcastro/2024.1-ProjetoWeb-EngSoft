import { Type } from 'class-transformer';
import {
  IsEmail,
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

class Coord {
  @IsLatitude()
  @IsNotEmpty()
  lat: number;

  @IsLongitude()
  @IsNotEmpty()
  lng: number;
}

export class CreatePinDto {
  @Type(() => Coord)
  @ValidateNested()
  @IsObject()
  coord: Coord;

  @IsNotEmpty()
  @IsString()
  problem: string;

  @IsEmail()
  @IsOptional()
  contactEmail?: string;
}
