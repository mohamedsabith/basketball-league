import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsDefined, IsOptional } from 'class-validator';

export class UpdateCourtDto {
  @IsDefined()
  @IsOptional()
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

  @IsOptional()
  @IsDefined()
  @ApiProperty()
  longitude: number;

  @IsOptional()
  @IsDefined()
  @ApiProperty()
  latitude: number;

  @IsOptional()
  @IsDefined()
  @ApiProperty()
  address: string;

  @IsOptional()
  @IsDefined()
  @ApiProperty()
  @IsNumber()
  zipcode: number;
}
