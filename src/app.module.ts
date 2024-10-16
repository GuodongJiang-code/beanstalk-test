import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OtpModule } from './otp/otp.module';
import { AuthModule } from './auth/auth.module';
// import { configValidationSchema } from './utils/config.util';

@Module({
  imports: [
    ConfigModule.forRoot({
      // validationSchema: configValidationSchema,
      isGlobal: true,
    }),
    OtpModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
