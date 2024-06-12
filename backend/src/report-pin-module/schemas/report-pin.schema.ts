import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ReportPinDocument = HydratedDocument<ReportPin>;

@Schema()
export class ReportPin {
  @Prop({ required: true })
  coordinates: string;

  @Prop({ required: true })
  tipoDoProblema: string;

  @Prop()
  emailContato?: string;
}

export const ReportPinSchema = SchemaFactory.createForClass(ReportPin);
