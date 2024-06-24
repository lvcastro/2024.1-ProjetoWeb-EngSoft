import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ReportPin } from './schemas/report-pin.schema';
import { CreatePinDto } from './dto/create-pin.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { UpdatePinDto } from './dto/update-pin.dto';

@Injectable()
export class ReportPinService {
  constructor(
    @InjectModel(ReportPin.name) private reportPinModel: Model<ReportPin>,
    private readonly mailService: MailerService,
  ) {}

  async create(createPinDto: CreatePinDto) {
    const problems = [
      'buraco',
      'arvore-caida',
      'falta-de-sinalizacao',
      'falta-de-iluminacao',
    ];

    if (!problems.includes(createPinDto.problem))
      throw new BadRequestException('Tipo de problema inválido.');

    await this.reportPinModel.create(createPinDto);
    return { statusCode: 201, message: 'Denúncia feita com sucesso.' };
  }

  getPins() {
    return this.reportPinModel.find().select('-updatedAt').exec();
  }

  update(id: string, updatePinDto: UpdatePinDto) {
    const status = ['analise', 'conserto', 'resolvido'];

    if (!status.includes(updatePinDto.status))
      throw new BadRequestException('Status inválido.');

    return this.reportPinModel.findByIdAndUpdate(id, updatePinDto, {
      new: true,
    });
  }

  remove(id: string) {
    return this.reportPinModel.findByIdAndDelete(id);
  }

  sendEmail() {
    this.mailService.sendMail({
      from: '🗨 Alertaqui 🚨<alertaquidenuncias@gmail.com>',
      to: 'murilo.zbtt@gmail.com',
      subject: 'Testezudo',
      text: 'Teste',
    });
  }
}
