import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Cart extends Document {
    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    userId: Types.ObjectId;

    @Prop({
        type: [
            {
                book: { type: Types.ObjectId, ref: 'Book', required: true },
                quantity: { type: Number, required: true },
            },
        ],
        required: true,
    })
    items: {
        book: Types.ObjectId;
        quantity: number;
    }[];
}

export const CartSchema = SchemaFactory.createForClass(Cart);
