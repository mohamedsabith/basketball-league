import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNotEmpty, IsDefined, IsOptional } from 'class-validator';

export class CreateCourtDto {
  @IsDefined()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @ApiProperty({ type: 'string', format: 'binary', required: false })
  @IsOptional()
  image: any;

  @ApiProperty({
    type: 'array',
    items: {
      type: 'string',
      format: 'binary',
    },
    required: false,
  })
  @IsOptional()
  thumb_image: any;

  @IsNotEmpty()
  @IsDefined()
  @ApiProperty()
  longitude: number;

  @IsNotEmpty()
  @IsDefined()
  @ApiProperty()
  latitude: number;

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
