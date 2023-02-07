import {
  IsEmail,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsDefined,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
  //email
  @IsDefined()
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;
  //password
  @IsDefined()
  @ApiProperty()
  @IsNotEmpty()
  @MinLength(8, {
    message: 'password is too short. Minimal length is 8 characters',
  })
  @MaxLength(20, {
    message: 'Password is too long. Maximal length is20 characters',
  })
  password: string;
}
