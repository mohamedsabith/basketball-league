import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNotEmpty, IsDefined, IsOptional } from 'class-validator';
export class SignUpDto {
  @IsDefined()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @ApiProperty({ type: 'string', format: 'binary' })
  @IsOptional()
  image: any;

  @ApiProperty({ type: 'array', format: 'binary' })
  @IsOptional()
  thump_image: any;

  @IsNotEmpty()
  @IsDefined()
  @ApiProperty()
  longitude: string;

  @IsNotEmpty()
  @IsDefined()
  @ApiProperty()
  latitude: string;

  @IsNotEmpty()
  @IsDefined()
  @ApiProperty()
  address: string;

  @IsOptional()
  @IsDefined()
  @ApiProperty()
  @IsNumber()
  zipcode: number;
}
