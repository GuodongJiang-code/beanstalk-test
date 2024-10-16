import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configService } from './utils/config.util';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = configService.getPort();
  await app.listen(port);
  console.log(`Application is running on: ${await app.getUrl()}`);
  console.log(`Test env: ${configService.get('DB_NAME')}`);
}
bootstrap();
