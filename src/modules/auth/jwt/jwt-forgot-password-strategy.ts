import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { User } from '../entities/user.entity';
import { JwtPayload } from '../interface/jwt-payload.interface';
import 'dotenv/config';

@Injectable()
export class JwtForgotPasswordStrategy extends PassportStrategy(
  Strategy,
  'jwt-forgot-password-token',
) {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('token'),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_FORGOT_PASSWORD_TOKEN_SECRET,
    });
  }

  async validate(payload: JwtPayload) {
    const { username } = payload;
    const user = await this.userRepository.findOne({
      where: {
        username,
      },
    });

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
