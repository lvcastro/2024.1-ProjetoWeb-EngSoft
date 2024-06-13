import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ReportPinDocument = HydratedDocument<ReportPin>;

@Schema()
export class ReportPin {
  @Prop({ required: true })
  coordinates: string;

  @Prop({ required: true })
  problem: string;

  @Prop()
  conctactEmail?: string;
}

export const ReportPinSchema = SchemaFactory.createForClass(ReportPin);
