import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/auth.dto';
import {
  E_PASSWORD_INCORRECT,
  E_USER_EMAIL_TAKEN,
  E_USER_NOT_FOUND,
} from '../../common/exceptions';
import { PASSWORD_HASH_SALT } from '../../common/constants';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { Auth } from './entities/auth.entity';
import { JwtPayload } from '../auth/interface/jwt-payload.interface';
import {
  JWT_ACCESS_TOKEN_EXPIRATION_TIME,
  JWT_REFRESH_TOKEN_EXPIRATION_TIME,
} from '../../common/constants';
import 'dotenv/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private authRepository: Repository<Auth>,
    private jwtService: JwtService,
  ) {}

  //Verify user Password
  async verifyPassword(id: number, password: string) {
    const user = await this.authRepository.findOneById(id);
    if (!user) throw new NotFoundException(E_USER_NOT_FOUND);
    if (!(await bcrypt.compare(password, user.password)))
      throw new NotAcceptableException(E_PASSWORD_INCORRECT);
  }

  //Access Token Creation
  getAccessToken(payload: JwtPayload) {
    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_ACCESS_TOKEN_SECRET,
      expiresIn: JWT_ACCESS_TOKEN_EXPIRATION_TIME,
    });
    return accessToken;
  }

  //Refresh Token Creation
  getRefreshToken(payload: JwtPayload) {
    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_TOKEN_SECRET,
      expiresIn: JWT_REFRESH_TOKEN_EXPIRATION_TIME,
    });
    return refreshToken;
  }

  //Signup
  async signup(createAuthDto: CreateAuthDto) {
    // Check if there is a user with the same email
    const existingUser = await this.authRepository.findOne({
      where: { email: createAuthDto.email },
    });
    if (existingUser) {
      throw new NotAcceptableException(E_USER_EMAIL_TAKEN);
    }

    // Hashing the password: So that they are protected from whoever can access the database.
    const hashedPassword = await bcrypt.hash(
      createAuthDto.password,
      PASSWORD_HASH_SALT,
    );

    //User Toekn Creation
    const accessToken = await this.getAccessToken({
      username: createAuthDto.username,
      email: createAuthDto.email,
    });
    const refreshToken = await this.getRefreshToken({
      username: createAuthDto.username,
      email: createAuthDto.email,
    });

    // Save & return the new user
    return this.authRepository.save({
      ...createAuthDto,
      password: hashedPassword,
      accessToken,
      refreshToken,
    });
  }
}
