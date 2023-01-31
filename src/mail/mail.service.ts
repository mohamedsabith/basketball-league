import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendMail(
    email: string,
    name: string,
    template: string,
    subject: string,
    context: any,
  ) {
    console.log(email);
    await this.mailerService.sendMail({
      to: email,
      subject,
      template,
      context: { context },
    });
  }
}
