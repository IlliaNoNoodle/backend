import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type UsersDocument = HydratedDocument<Users>;

@Schema({
  collection: 'users',
  timestamps: true,
  versionKey: false,
})
export class Users {
  @Prop({ type: String, required: true })
  name: string;
  @Prop({ type: String, required: true, unique: true })
  email: string;

  @Prop({ type: String, required: false })
  password: string;
}

export const UsersSchema = SchemaFactory.createForClass(Users);
