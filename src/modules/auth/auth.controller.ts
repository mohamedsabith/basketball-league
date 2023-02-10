import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtRefreshTokenGuard } from '../../guards/jwt-refresh-token.guard';
import { JwtForgotPasswordGuard } from '../../guards/jwt-forgot-password.guard';
import { AuthService } from './auth.service';
import { User } from './entities/user.entity';
import { GetUser } from '../../common';

//dto
import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() signUpDto: SignUpDto) {
    return this.authService.signup(signUpDto);
  }

  @Post('login')
  login(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @Post('forgot-password')
  forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    this.authService.forgotPassword(forgotPasswordDto);
    return { success: true, msg: 'Message has been sent successfully' };
  }

  @UseGuards(JwtForgotPasswordGuard)
  @Post('reset-password')
  resetPassword(
    @GetUser() user: User,
    @Body() resetPasswordDto: ResetPasswordDto,
  ) {
    this.authService.resetPassword(resetPasswordDto, user.id);
    return { success: true, msg: 'Password changed successfully' };
  }

  @ApiBearerAuth()
  @UseGuards(JwtRefreshTokenGuard)
  @Post('refresh-token')
  async refreshToken(@GetUser() user: User, @Body() token: RefreshTokenDto) {
    const user_info = await this.authService.getUserIfRefreshTokenMatches(
      token.refresh_token,
      user.username,
    );
    if (user_info) {
      const userInfo = {
        username: user_info.username,
        email: user_info.email,
        role: user_info.role,
      };

      return this.authService.getNewAccessAndRefreshToken(userInfo);
    } else {
      return null;
    }
  }
}
