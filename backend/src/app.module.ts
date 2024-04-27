import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReportPinModule } from './report-pin-module/report-pin.module';
import { DatabaseModule } from './database-module/database.module';
import { LoggerModule } from './logger-module/logger.module';

@Module({
  imports: [ReportPinModule, DatabaseModule, LoggerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
