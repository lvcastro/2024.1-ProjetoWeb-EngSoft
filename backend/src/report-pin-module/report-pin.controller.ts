import { Controller, Get, Post } from '@nestjs/common';
import { ReportPin } from 'src/report-pin-module/schemas/report-pin.schema';
import { ReportPinService } from './report-pin.service';

@Controller('reports')
export class ReportPinController {
  constructor(private reportPinService: ReportPinService) {}

  @Get()
  async get(): Promise<ReportPin[]> {
    return this.reportPinService.getPins();
  }

  @Post()
  async create(): Promise<ReportPin> {
    return this.reportPinService.create({});
  }
}
