import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReportPinModule } from './report-pin-module/report-pin.module';

@Module({
  imports: [ReportPinModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
