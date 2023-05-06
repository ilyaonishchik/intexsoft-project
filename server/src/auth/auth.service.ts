import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AuthService {
  constructor(private mailerService: MailerService) {}

  async sendVerificationMail(to: string, link: string) {
    await this.mailerService.sendMail({
      to,
      from: process.env.MAIL_USER,
      subject: 'Confirm email address',
      text: '',
      html: `
            <div>
              <h1>You must follow this link to verify your account:</h1>
              <a href='${link}'>${link}</a>
            </div>
          `,
    });
  }
}
