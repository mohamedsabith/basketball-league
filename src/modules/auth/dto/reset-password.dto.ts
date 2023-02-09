import {
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsString,
  IsDefined,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Match } from '../../../common/decorator/match.decorator';

export class ResetPasswordDto {
  //password
  @IsDefined()
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(20)
  password: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Match('password')
  @IsDefined()
  @ApiProperty()
  confirmPassword: string;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @ApiProperty()
  token: string;
}
