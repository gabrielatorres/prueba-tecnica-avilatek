import { Document } from 'mongoose';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User extends Document {
  @Prop({
    unique: true,
    index: true,
  })
  email: string;

  @Prop({
    unique: true,
    index: true,
  })
  password: string;

  @Prop()
  fullName: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
