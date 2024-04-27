import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerService } from './logger-module/logger.service';
import { ConfigService } from '@nestjs/config';
import { config } from 'process';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = app.get(LoggerService);

  const configService = app.get(ConfigService);
  const env = configService.get<string>('NODE_ENV');
  const host = configService.get<string>('SERVER_HOST');
  const port = configService.get<number>('SERVER_PORT');

  await app.listen(3000);
  logger.log(
    'Bootstrap',
    `Server running on host:${host} and port:${port} in ${env} mode`,
  );
}
bootstrap();
