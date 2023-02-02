import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { MailService } from '../../mail/mail.service';
import { AuthController } from './auth.controller';
import { User } from './entities/user.entity';

//jet strategy
import { JwtStrategy } from '../auth/jwt/jwt-strategy';
import { JwtRefreshStrategy } from '../auth/jwt/jwt-refresh-strategy';
import { JwtForgotPasswordStrategy } from '../auth/jwt/jwt-forgot-password-strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule.register({}),
    JwtModule.register({}),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    JwtRefreshStrategy,
    JwtForgotPasswordStrategy,
    MailService,
  ],
  exports: [JwtStrategy, JwtRefreshStrategy, PassportModule],
})
export class AuthModule {}
