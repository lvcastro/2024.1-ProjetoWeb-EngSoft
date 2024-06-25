import {
  Body,
  Param,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ReportPinService } from './report-pin.service';
import { CreatePinDto } from './dto/create-pin.dto';
import { Public } from 'src/custom-decorators/public.decorator';
import { UpdatePinDto } from './dto/update-pin.dto';

@Controller('reports')
export class ReportPinController {
  constructor(private reportPinService: ReportPinService) {}

  @Public()
  @Get()
  get() {
    return this.reportPinService.getPins();
  }

  @Public()
  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  create(@Body() createPinDto: CreatePinDto) {
    return this.reportPinService.create(createPinDto);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  update(@Param('id') id: string, @Body() updatePinDto: UpdatePinDto) {
    return this.reportPinService.update(id, updatePinDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reportPinService.remove(id);
  }
}
