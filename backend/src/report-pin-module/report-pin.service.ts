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
    // Retornar apenas problemas pendentes
    return this.reportPinModel
      .find({ status: { $ne: 'resolvido' } })
      .select('-updatedAt')
      .exec();
  }

  async update(id: string, updatePinDto: UpdatePinDto) {
    const status = ['analise', 'conserto', 'resolvido'];

    if (!status.includes(updatePinDto.status)) {
      throw new BadRequestException('Status inválido.');
    }

    if (updatePinDto.status === 'resolvido') {
      const pin: any = await this.reportPinModel.findById(id).exec();
      if (pin && pin.contactEmail)
        this.sendEmail(pin.contactEmail, pin.createdAt, pin.coord);
    }

    return this.reportPinModel
      .findByIdAndUpdate(id, updatePinDto, {
        new: true,
      })
      .exec();
  }

  remove(id: string) {
    return this.reportPinModel.findByIdAndDelete(id);
  }

  async sendEmail(dest: string, dateStr: string, coord: any) {
    try {
      const date = new Date(dateStr).toLocaleString('pt-BR');

      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${coord.lat}&lon=${coord.lng}`,
      );

      if (!response.ok) {
        throw new Error('Problema ao buscar geolocalização');
      }

      const { address } = await response.json();

      let components = [];
      const fields = ['building', 'house_number', 'road', 'suburb'];

      for (const f of fields) {
        if (address[f]) components.push(address[f]);
      }
      let addr = components.join(', ');
      let msg = `Sua denúncia feita em ${date}, foi resolvida!`;

      if (addr) msg += ` Endereço aproximado do problema relatado: ${addr}.`;

      await this.mailService.sendMail({
        from: '🗨 Alertaqui 🚨<alertaquidenuncias@gmail.com>',
        to: dest,
        subject: 'Resolução de denúncia de problema em São Carlos',
        text: msg,
      });
    } catch (error) {
      console.error('Erro ao enviar email:', error.message);
    }
  }
}
