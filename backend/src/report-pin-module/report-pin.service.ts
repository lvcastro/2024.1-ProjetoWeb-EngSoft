import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ReportPin } from './schemas/report-pin.schema';
import { CreatePinDto } from './dto/create-pin.dto';

@Injectable()
export class ReportPinService {
  constructor(
    @InjectModel(ReportPin.name) private reportPinModel: Model<ReportPin>,
  ) {}

  async create(dto: CreatePinDto) {
    const pin = new this.reportPinModel(dto);
    return pin.save();
  }

  async getPins() {
    const res = await this.reportPinModel.find().exec();
    return res;
  }
}
