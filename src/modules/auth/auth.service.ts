import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import {
  E_PASSWORD_INCORRECT,
  E_USER_EMAIL_TAKEN,
  E_USER_NOT_FOUND,
  E_USER_USERNAME_TAKEN,
  PASSWORD_HASH_SALT,
  JWT_ACCESS_TOKEN_EXPIRATION_TIME,
  JWT_REFRESH_TOKEN_EXPIRATION_TIME,
  JWT_FORGOT_PASSWORD_TOKEN_EXPIRATION_TIME,
} from '../../common';
import { User } from './entities/user.entity';
import { JwtPayload } from '../auth/interface/jwt-payload.interface';
import { MailService } from '../../mail/mail.service';
import 'dotenv/config';
//dto
import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}

  //Verify user Password
  async verifyPassword(id: number, password: string) {
    const user = await this.userRepository.findOneById(id);
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
  async signup(SignUpDto: SignUpDto) {
    // Check if there is a user with the same email
    const existingMail = await this.userRepository.findOne({
      where: { email: SignUpDto.email },
    });
    if (existingMail) {
      throw new NotAcceptableException(E_USER_EMAIL_TAKEN);
    }

    // Check if there is a user with the same username
    const existingUsername = await this.userRepository.findOne({
      where: { username: SignUpDto.username },
    });
    if (existingUsername) {
      throw new NotAcceptableException(E_USER_USERNAME_TAKEN);
    }

    // Hashing the password: So that they are protected from whoever can access the database.
    const hashedPassword = await bcrypt.hash(
      SignUpDto.password,
      PASSWORD_HASH_SALT,
    );

    //User Token Creation
    const accessToken = await this.getAccessToken({
      username: SignUpDto.username,
      email: SignUpDto.email,
    });
    const refreshToken = await this.getRefreshToken({
      username: SignUpDto.username,
      email: SignUpDto.email,
    });

    // Save & return the new user
    return this.userRepository.save({
      ...SignUpDto,
      password: hashedPassword,
      accessToken,
      refreshToken,
      refresh_token: await bcrypt.hash(refreshToken, 10),
    });
  }

  //Login
  async signIn(
    signInDto: SignInDto,
  ): Promise<{ accessToken: string; refreshToken: string; user: JwtPayload }> {
    const user = await this.userRepository.findOne({
      where: { email: signInDto.email },
    });

    if (!user) throw new NotFoundException(E_USER_NOT_FOUND);

    if (!(await bcrypt.compare(signInDto.password, user.password)))
      throw new NotAcceptableException(E_PASSWORD_INCORRECT);

    const accessToken = await this.getAccessToken({
      username: user.username,
      email: user.email,
    });
    const refreshToken = await this.getRefreshToken({
      username: user.username,
      email: user.email,
    });

    await this.updateRefreshTokenInUser(refreshToken, user.username);

    return {
      accessToken,
      refreshToken,
      user,
    };
  }

  //logout
  async signOut(user: User) {
    await this.updateRefreshTokenInUser(null, user.username);
  }

  //Update Refresh Token
  async updateRefreshTokenInUser(refreshToken, username) {
    if (refreshToken) {
      refreshToken = await bcrypt.hash(refreshToken, 10);
    }

    await this.userRepository.update(
      { username: username },
      { refresh_token: refreshToken },
    );
  }

  async getUserInfoByUsername(username: string) {
    const auth = await this.userRepository.findOne({ where: { username } });
    if (auth) {
      return auth;
    } else {
      return null;
    }
  }

  async getUserIfRefreshTokenMatches(refreshToken: string, username: string) {
    const user = await this.getUserInfoByUsername(username);

    const isRefreshTokenMatching = await bcrypt.compare(
      refreshToken,
      user.refresh_token,
    );

    if (isRefreshTokenMatching) {
      await this.updateRefreshTokenInUser(null, username);
      return user;
    } else {
      throw new UnauthorizedException();
    }
  }

  async getNewAccessAndRefreshToken(payload: JwtPayload) {
    const refreshToken = await this.getRefreshToken(payload);
    await this.updateRefreshTokenInUser(refreshToken, payload.username);

    return {
      accessToken: await this.getAccessToken(payload),
      refreshToken: refreshToken,
    };
  }

  async forgotPassword(forgotPassordDto: ForgotPasswordDto) {
    // Checking if user exist
    const user = await this.userRepository.findOne({
      where: { email: forgotPassordDto.email },
    });

    if (!user) throw new NotFoundException(E_USER_NOT_FOUND);

    const token = await this.jwtService.sign(
      { username: user.username, email: user.email, date: Date.now() },
      {
        secret: process.env.JWT_FORGOT_PASSWORD_TOKEN_SECRET,
        expiresIn: JWT_FORGOT_PASSWORD_TOKEN_EXPIRATION_TIME,
      },
    );

    return await this.mailService.sendMail(
      user.email,
      'We received a request to reset your password',
      './forgot-password',
      {
        username: user.username,
        link: `${process.env.CLIENT_URL}/resetPassword/${token}`,
      },
    );
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto, userId: string) {
    // Hashing the password: So that they are protected from whoever can access the database.
    const hashedPassword = await bcrypt.hash(
      resetPasswordDto.password,
      PASSWORD_HASH_SALT,
    );

    return await this.userRepository.update(
      { id: userId },
      { password: hashedPassword },
    );
  }
}
