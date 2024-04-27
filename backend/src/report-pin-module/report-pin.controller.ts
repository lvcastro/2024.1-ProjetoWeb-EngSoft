import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ReportPin } from 'src/report-pin-module/schemas/report-pin.schema';
import { ReportPinService } from './report-pin.service';

@Controller('reports')
export class ReportPinController {
  constructor(private reportPinService: ReportPinService) {}

  @Get()
  async get(): Promise<ReportPin[]> {
    try {
      return this.reportPinService.getPins();
    } catch (error) {
      throw new HttpException('Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post()
  async create(): Promise<ReportPin> {
    return this.reportPinService.create({});
  }
}
