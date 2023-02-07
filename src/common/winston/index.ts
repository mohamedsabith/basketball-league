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
    new transports.File({
      filename: 'src/logs/info.log',
      level: 'info',
    }),
    new transports.File({
      filename: 'src/logs/error.log',
      level: 'error',
    }),
    new transports.File({
      filename: 'src/logs/warn.log',
      level: 'warn',
    }),
    new transports.File({
      filename: 'src/logs/debug.log',
      level: 'debug',
    }),
    new transports.File({
      filename: 'src/logs/verbose.log',
      level: 'verbose',
    }),
    new transports.Console(),
  ],
  exitOnError: false,
});
