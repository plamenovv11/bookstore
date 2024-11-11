import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Book extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  author: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  publishedDate: Date;

  @Prop()
  genre: string;

  @Prop()
  imageUrl?: string;
}

export const BookSchema = SchemaFactory.createForClass(Book);
