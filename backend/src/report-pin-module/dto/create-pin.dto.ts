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
  lat: number;

  @IsLongitude()
  @IsNotEmpty()
  lng: number;
}

export class CreatePinDto {
  @IsObject()
  @Type(() => Coord)
  @ValidateNested()
  coord: Coord;

  @IsString()
  @IsNotEmpty()
  problem: string;

  @IsOptional()
  @IsEmail()
  contactEmail?: string;
}
