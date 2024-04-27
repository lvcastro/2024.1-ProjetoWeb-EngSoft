import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReportPinModule } from './report-pin-module/report-pin.module';
import { DatabaseModule } from './database-module/database.module';
import { LoggerModule } from './logger-module/logger.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ReportPinModule, DatabaseModule, LoggerModule, ConfigModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
