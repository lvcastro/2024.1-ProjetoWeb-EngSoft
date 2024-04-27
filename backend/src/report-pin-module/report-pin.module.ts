import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ReportPin,
  ReportPinSchema,
} from '../report-pin-module/schemas/report-pin.schema';
import { ReportPinService } from './report-pin.service';
import { ReportPinController } from './report-pin.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ReportPin.name, schema: ReportPinSchema },
    ]),
  ],
  providers: [ReportPinService],
  controllers: [ReportPinController],
})
export class ReportPinModule {}
