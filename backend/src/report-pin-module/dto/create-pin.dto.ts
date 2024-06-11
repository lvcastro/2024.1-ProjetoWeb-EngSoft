import { Type } from 'class-transformer';
import {
  IsEmail,
  IsPhoneNumber,
  IsNotEmpty,
  IsLatLong,
  ValidateNested,
  IsOptional,
} from 'class-validator';

export class ReporterContactInfoDto {
  @IsEmail({})
  @IsOptional()
  email?: string;

  @IsPhoneNumber('BR')
  @IsOptional()
  phoneNumber?: string;
}

export class CreatePinDto {
  @IsNotEmpty()
  @IsLatLong()
  coordinates: string;

  @ValidateNested()
  @IsOptional()
  @Type(() => ReporterContactInfoDto)
  contactInfo?: ReporterContactInfoDto;
}
