import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AdminDocument = HydratedDocument<Admin>;

@Schema()
export class Admin {
  // ID é automatico no mongo, não precisa definir no schema
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, select: false }) // Não retornar a senha salva automaticamente
  password: string;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
