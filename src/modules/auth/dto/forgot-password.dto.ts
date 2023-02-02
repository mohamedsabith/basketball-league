import { IsEmail, IsNotEmpty } from 'class-validator';

export class ForgotPasswordDto {
  //email
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
