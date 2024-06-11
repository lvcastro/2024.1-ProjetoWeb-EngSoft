import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ReportPinDocument = HydratedDocument<ReportPin>;

@Schema({ _id: false })
export class ReporterContactInfo {
  @Prop()
  email?: string;

  @Prop()
  phoneNumber?: string;
}

@Schema()
export class ReportPin {
  @Prop({ required: true })
  coordinates: string;

  @Prop({ type: ReporterContactInfo })
  contactInfo?: ReporterContactInfo;
}

export const ReportPinSchema = SchemaFactory.createForClass(ReportPin);
