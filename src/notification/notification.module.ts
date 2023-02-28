import { NotificationGateway } from './notification.gateway';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [NotificationGateway],
  imports: [
    JwtModule.registerAsync({
      imports: [],
      useFactory: () => ({
        secret: process.env.JWT_ACCESS_TOKEN_SECRET,
      }),
    }),
  ],
})
export class NotificationModule {}
