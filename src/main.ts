import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { rateLimit } from 'express-rate-limit';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import {
  appendRequestIdToLogger,
  LoggingInterceptor,
  morganRequestLogger,
  morganResponseLogger,
  appendIdToRequest,
} from 'nestjs-winston-logger';
import {
  E_TOO_MANY_REQUESTS,
  HttpExceptionFilter,
  globalLogger,
  APP_NAME,
  APP_DESCRIPTION,
  APP_VERSION,
} from './common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  // -- Helmet
  app.use(helmet());

  // -- Cors setup
  app.enableCors({
    origin: false,
  });

  app.use(bodyParser.json({ limit: '30mb' }));
  app.use(
    bodyParser.urlencoded({
      limit: '30mb',
      extended: true,
      parameterLimit: 2000,
    }),
  );

  // -- Rate limiting: Limits the number of requests from the same IP in a period of time.
  app.use(
    rateLimit({
      windowMs: 10 * 60 * 1000, // 10 minutes
      max: 100, // Limit each IP to 100 requests per `window` (here, per 10 minutes)
      standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
      legacyHeaders: false, // Disable the `X-RateLimit-*` headers,
      skipSuccessfulRequests: false, // The counting will skip all successful requests and just count the errors. Instead of removing rate-limiting, it's better to set this to true to limit the number of times a request fails. Can help prevent against brute-force attacks
      message: { message: E_TOO_MANY_REQUESTS, statusCode: 403 },
    }),
  );

  // base routing
  app.setGlobalPrefix('api/v1');

  // Use Global Pipes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useLogger(globalLogger);

  //append id to identify request
  app.use(appendIdToRequest);
  app.use(appendRequestIdToLogger(globalLogger));

  app.use(morganRequestLogger(globalLogger));
  app.use(morganResponseLogger(globalLogger));

  app.useGlobalInterceptors(new LoggingInterceptor(globalLogger));

  const options = new DocumentBuilder()
    .setTitle(APP_NAME)
    .setVersion(APP_VERSION)
    .setDescription(APP_DESCRIPTION)
    .setExternalDoc('For more information', 'http://swagger.io')
    .addBearerAuth()
    .addTag('mohamedsabith', 'developer')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  // Port
  const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 3000;

  // -- Start listening
  await app
    .listen(PORT)
    .then(() => console.log(`Server started at http://localhost:${PORT}`))
    .catch((err) => {
      console.log(`Server started failed ${err}`);
      process.exit();
    });
}
bootstrap();
