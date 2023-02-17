import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class LeagueRequestParamDto {
  @IsNotEmpty()
  @ApiProperty()
  @IsUUID()
  id: string;
}
