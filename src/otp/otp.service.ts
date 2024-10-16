import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as sgMail from '@sendgrid/mail';

@Injectable()
export class OtpService {
  constructor(private configService: ConfigService) {
    sgMail.setApiKey(this.configService.get<string>('SENDGRID_API_KEY'));
    console.log(`SENDGRID_API_KEY: ${this.configService.get<string>('SENDGRID_API_KEY')}`);
  }

  generateOtp(): string {
    // Generate a 6-digit OTP
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  async sendOtpEmail(to: string, otp: string): Promise<void> {
    const msg = {
      to,
      from: this.configService.get<string>('FROM_EMAIL'),
      subject: 'Building and managing apps in the cloud just got easier. Now that you have joined. Your OTP for Authentication',
      text: `Input your OTP showing below.`,
      html: `<strong>Your OTP: ${otp}</strong>`,
    };

    try {
      const response = await sgMail.send(msg);
      console.log('OTP email sent successfully with response:');
      console.log(response);
    } catch (error) {
      console.error('Error sending OTP email:', error);
      throw new Error('Failed to send OTP email');
    }
  }

  async generateAndSendOtp(email: string): Promise<string> {
    const otp = this.generateOtp();
    await this.sendOtpEmail(email, otp);
    return otp;
  }
}
