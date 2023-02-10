import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsDate,
  MinDate,
  IsNumber,
  IsMilitaryTime,
  Contains,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLeagueDto {
  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({ type: 'string', format: 'binary' })
  @IsOptional()
  image: any;

  @IsNotEmpty()
  @Transform(({ value }) => value && new Date(value))
  @IsDate({
    message:
      'The date is invalid. Please enter a date in the format YYYY-MM-DD (eg:2019-12-31)',
  })
  @MinDate(new Date())
  @ApiProperty({ format: 'date', pattern: 'YYYY-MM-DD', example: '2022-12-31' })
  date: Date;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    pattern: 'HH:mm',
    example: '23:00',
  })
  @IsMilitaryTime({
    message:
      'To write time in the 24-hour system, always specify both the hour and the minute',
  })
  @Contains(':', { message: "Time must contain ':' in format HH:MM" })
  time: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsNumber()
  entryFee: number;

  @IsNotEmpty()
  @ApiProperty()
  @IsNumber()
  duration: number;

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  details: string;
}
