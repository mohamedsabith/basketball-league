import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import * as Joi from '@hapi/joi';
import { join } from 'path';
import { AppService } from './app.service';
import { DatabaseModule } from './config/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { MailService } from './mail/mail.service';
import { LoggerMiddleware } from './common';
import { PlayerModule } from './modules/player/player.module';
import { LeagueAdminModule } from './modules/league-admin/league-admin.module';
import { SuperadminModule } from './modules/superadmin/superadmin.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { NotificationGateway } from './notification/notification.gateway';
import { NotificationModule } from './notification/notification.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DATABASE: Joi.string().required(),
        PORT: Joi.number().default(3000),
        NODE_ENV: Joi.string().default('development'),
        JWT_ACCESS_TOKEN_SECRET: Joi.string().required(),
        JWT_REFRESH_TOKEN_SECRET: Joi.string().required(),
        JWT_FORGOT_PASSWORD_TOKEN_SECRET: Joi.string().required(),
        GOOGLE_APP_EMAIL: Joi.string().required(),
        GOOGLE_APP_PASS: Joi.string().required(),
      }),
      isGlobal: true,
      envFilePath: '.env',
    }),
    JwtModule.register({}),
    MailerModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: 'smtp.gmail.com',
          secure: false,
          auth: {
            user: configService.get('GOOGLE_APP_EMAIL'),
            pass: configService.get('GOOGLE_APP_PASS'),
          },
        },
        defaults: {
          from: configService.get('GOOGLE_APP_EMAIL'),
        },
        template: {
          dir: join(__dirname, 'templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),
    DatabaseModule,
    AuthModule,
    PlayerModule,
    LeagueAdminModule,
    SuperadminModule,
    CloudinaryModule,
    NotificationModule,
  ],
  controllers: [AppController],
  providers: [AppService, MailService, NotificationGateway],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
