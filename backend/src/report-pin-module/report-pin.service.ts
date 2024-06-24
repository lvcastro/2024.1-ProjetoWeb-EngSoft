import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ReportPin } from './schemas/report-pin.schema';
import { CreatePinDto } from './dto/create-pin.dto';

@Injectable()
export class ReportPinService {
  constructor(
    @InjectModel(ReportPin.name) private reportPinModel: Model<ReportPin>,
  ) {}

  async create(createPinDto: CreatePinDto) {
    const problems = [
      'buraco',
      'arvore-caida',
      'falta-de-sinalizacao',
      'falta-de-iluminacao',
    ];

    if (!problems.includes(createPinDto.problem))
      throw new UnauthorizedException('Tipo de problema inválido.');

    await this.reportPinModel.create(createPinDto);
    return { statusCode: 201, message: 'Denúncia feita com sucesso.' };
  }

  async getPins() {
    const res = await this.reportPinModel.find().select('-updatedAt').exec();
    return res;
  }
}
