import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ReportPinDocument = HydratedDocument<ReportPin>;

@Schema()
class Coord {
  @Prop({ required: true })
  lat: number;

  @Prop({ required: true })
  lng: number;
}

@Schema({ timestamps: true })
export class ReportPin {
  @Prop({ _id: false, required: true })
  coord: Coord;

  @Prop({ required: true })
  problem: string;

  @Prop()
  contactEmail?: string;
}

export const ReportPinSchema = SchemaFactory.createForClass(ReportPin);
