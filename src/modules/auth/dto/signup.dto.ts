import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNumber,
  IsNotEmpty,
  MinLength,
  IsDefined,
  MaxLength,
  IsEnum,
  IsOptional,
  ValidateIf,
} from 'class-validator';
import { UserRole, Gender } from 'src/common';
export class SignUpDto {
  //email
  @IsDefined()
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string;
  //password
  @IsDefined()
  @IsNotEmpty({ message: 'password should not be empty' })
  @ApiProperty()
  @MinLength(8, {
    message: 'password is too short. Minimal length is 8 characters',
  })
  @MaxLength(20, {
    message: 'Password is too long. Maximal length is20 characters',
  })
  password: string;

  @IsNotEmpty()
  @IsDefined()
  @ApiProperty()
  username: string;

  @IsNotEmpty()
  @IsEnum(UserRole)
  @IsDefined()
  @ApiProperty()
  role: UserRole;

  @ValidateIf((val) => val.role === UserRole.PLAYER)
  @IsNumber()
  @IsNotEmpty()
  @IsDefined()
  @ApiProperty()
  height: number;

  @ValidateIf((val) => val.role === UserRole.PLAYER)
  @IsNotEmpty()
  @IsDefined()
  @IsNumber()
  @ApiProperty()
  weight: number;

  @ValidateIf((val) => val.role === UserRole.PLAYER)
  @IsOptional()
  @IsDefined()
  @ApiProperty()
  @IsNumber()
  zipcode: number;

  @ValidateIf((val) => val.role === UserRole.PLAYER)
  @IsOptional()
  @IsDefined()
  @ApiProperty()
  school: string;

  @IsEnum(Gender)
  @IsOptional()
  @ApiProperty()
  gender: Gender;
}
