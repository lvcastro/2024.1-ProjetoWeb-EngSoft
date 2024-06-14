import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ReportPinDocument = HydratedDocument<ReportPin>;

@Schema({ timestamps: true })
export class ReportPin {
  @Prop({ required: true })
  coordinates: string;

  @Prop({ required: true })
  problem: string;

  @Prop()
  contactEmail?: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const ReportPinSchema = SchemaFactory.createForClass(ReportPin);
