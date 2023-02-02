import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtForgotPasswordGuard extends AuthGuard(
  'jwt-forgot-password-token',
) {}
