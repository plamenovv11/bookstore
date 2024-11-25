import { IsNotEmpty, ArrayNotEmpty } from 'class-validator';
import { Types } from 'mongoose';

export class CreateCartDto {
    @IsNotEmpty()
    @ArrayNotEmpty()
    items: {
        book: Types.ObjectId;
        quantity: number;
    }[]
}
