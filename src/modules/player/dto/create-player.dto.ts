import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsDefined, IsNumber } from 'class-validator';

export class CreatePlayerDto {
  @IsNotEmpty()
  @IsDefined()
  @ApiProperty()
  userId: string;

  @IsNumber()
  @IsNotEmpty()
  @IsDefined()
  @ApiProperty()
  height: number;

  @IsNumber()
  @IsNotEmpty()
  @IsDefined()
  @ApiProperty()
  weight: number;

  @IsDefined()
  @ApiProperty()
  school: string;

  @IsNumber()
  @IsNotEmpty()
  @IsDefined()
  @ApiProperty()
  zipcode: number;
}
