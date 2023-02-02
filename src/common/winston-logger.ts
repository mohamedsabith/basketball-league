import { NestjsWinstonLoggerService } from 'nestjs-winston-logger';
import { format, transports, config } from 'winston';

export const globalLogger = new NestjsWinstonLoggerService({
  levels: config.syslog.levels,
  format: format.combine(
    format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss A' }),
    format.json(),
    format.align(),
    format.colorize({ all: true }),
    format.errors({ stack: true }),
    format.printf(
      (info) =>
        `\x1b[34mLevel:[${info.level}]  LogTime: [ ${info.timestamp} ]  Message:- [${info.message} ] \x1b[0m`,
    ),
  ),
  transports: [
    new transports.File({ filename: 'logs/error.log', level: 'error' }),
    new transports.File({
      filename: 'logs/combined.log',
      handleExceptions: true,
    }),
    new transports.Console(),
  ],
});
