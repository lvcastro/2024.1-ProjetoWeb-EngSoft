import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ReportPin } from 'src/report-pin-module/schemas/report-pin.schema';
import { ReportPinService } from './report-pin.service';
import { CreatePinDto } from './dto/create-pin.dto';
import { Public } from 'src/custom-decorators/decorators';

@Controller('reports')
export class ReportPinController {
  constructor(private reportPinService: ReportPinService) {}

  @Public()
  @Get()
  async get() {
    return this.reportPinService.getPins();
  }

  @Public()
  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async create(@Body() createPinDto: CreatePinDto) {
    return this.reportPinService.create(createPinDto);
  }
}
