import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { MailService } from '../../mail/mail.service';
import { AuthController } from './auth.controller';
import { NotificationGateway } from 'src/notification/notification.gateway';

import { User } from './entities/user.entity';
import { Player } from '../player/entities/player.entity';
import { LeagueAdmin } from '../league-admin/entities/league-admin.entity';

//jet strategy
import { JwtStrategy } from './jwt/jwt-strategy';
import { JwtRefreshStrategy } from './jwt/jwt-refresh-strategy';
import { JwtForgotPasswordStrategy } from './jwt/jwt-forgot-password-strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Player, LeagueAdmin]),
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
    NotificationGateway,
  ],
  exports: [JwtStrategy, JwtRefreshStrategy, PassportModule],
})
export class AuthModule {}
