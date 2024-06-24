import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReportPin, ReportPinSchema } from './schemas/report-pin.schema';
import { ReportPinService } from './report-pin.service';
import { ReportPinController } from './report-pin.controller';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ReportPin.name, schema: ReportPinSchema },
    ]),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        auth: {
          user: 'alertaquidenuncias@gmail.com',
          pass: 'yasykjuimfaqbmso',
        },
      },
    }),
  ],
  providers: [ReportPinService],
  controllers: [ReportPinController],
})
export class ReportPinModule {}
