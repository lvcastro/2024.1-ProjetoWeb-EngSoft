import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type ReportPinDocument = HydratedDocument<ReportPin>;

@Schema()
export class ReporterContactInfo {
  @Prop()
  email: string;

  @Prop()
  phoneNumber: string;
}

@Schema()
export class ReportPin {
  @Prop({ type: Types.Map, required: true })
  coordinates: string;

  @Prop({ type: ReporterContactInfo })
  contactInfo: ReporterContactInfo;
}

export const ReportPinSchema = SchemaFactory.createForClass(ReportPin);
