import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CartController } from './carts.controller';
import { Cart, CartSchema } from './schemas/cart.schema';
import { CartService } from './carts.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Cart.name, schema: CartSchema }]),
  ],
  providers: [CartService],
  controllers: [CartController]
})

export class CartsModule { }
