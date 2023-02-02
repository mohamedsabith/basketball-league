import { IsNotEmpty, MinLength, MaxLength, IsString } from 'class-validator';
import { Match } from '../decorator/match.decorator';

export class ResetPasswordDto {
  //password
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(20)
  password: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Match('password')
  confirmPassword: string;

  @IsString()
  @IsNotEmpty()
  token: string;
}
