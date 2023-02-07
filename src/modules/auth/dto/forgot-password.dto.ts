import { IsEmail, IsNotEmpty, IsDefined } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ForgotPasswordDto {
  //email
  @IsDefined()
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
