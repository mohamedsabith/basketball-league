import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtRefreshTokenGuard } from '../../guards/jwt-refresh-token.guard';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';
import { User } from './entities/user.entity';
import { GetUser } from './decorator/get-user.decorator';
import { RefreshTokenDto } from './dto/refresh-token.dto';

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

  @ApiBearerAuth()
  @UseGuards(JwtRefreshTokenGuard)
  @Post('/refresh-token')
  async refreshToken(@GetUser() user: User, @Body() token: RefreshTokenDto) {
    const user_info = await this.authService.getUserIfRefreshTokenMatches(
      token.refresh_token,
      user.username,
    );
    if (user_info) {
      const userInfo = {
        username: user_info.username,
        email: user_info.email,
      };

      return this.authService.getNewAccessAndRefreshToken(userInfo);
    } else {
      return null;
    }
  }
}
