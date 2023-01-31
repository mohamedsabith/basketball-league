import {
  IsEmail,
  IsNotEmpty,
  MinLength,
  MaxLength,
  ValidationArguments,
} from 'class-validator';

export class SignInDto {
  //email
  @IsEmail()
  @IsNotEmpty()
  email: string;
  //password
  @IsNotEmpty()
  @MinLength(8, {
    message: (args: ValidationArguments) => {
      if (!args.value) {
        return null;
      }

      if (args.value.length < 8) {
        return `${args.property} is too short. Minimal length is $constraint1 characters, but actual is ${args.value.length} characters only`;
      }
    },
  })
  @MaxLength(20, {
    message:
      'Password is too long. Maximal length is $constraint1 characters, but actual is $value',
  })
  password: string;
}
