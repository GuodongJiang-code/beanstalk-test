import { Injectable } from '@nestjs/common';
import { OtpService } from '../otp/otp.service';

@Injectable()
export class AuthService {
  constructor(private otpService: OtpService) {}

  async sendOtp(email: string) {
    const otp = await this.otpService.generateAndSendOtp(email);
    // In a real-world scenario, you'd want to store this OTP securely (e.g., in a database) for later verification
    // For now, we'll just return a success message
    return { message: 'OTP sent successfully' };
  }
}
