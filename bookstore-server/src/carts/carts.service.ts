import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cart } from './schemas/cart.schema';
import { CreateCartDto } from './dto/create-cart.dto';

@Injectable()
export class CartService {
    constructor(@InjectModel(Cart.name) private readonly cartModel: Model<Cart>) { }

    async getCart(userId: string): Promise<Cart> {
        const cart = await this.cartModel
            .findOne({ userId })
            .populate('items.book', 'title author price imageUrl');

        if (!cart) {
            throw new NotFoundException('No cart found for this user');
        }
        return cart;
    }

    async createCart(userId: string, cartData: CreateCartDto): Promise<Cart> {
        const existingCart = await this.cartModel.findOne({ userId });

        if (existingCart) {
            throw new Error('Cart already exists. Use PUT /carts to update the cart.');
        }

        const newCart = new this.cartModel({
            userId,
            items: cartData.items,
        });

        return newCart.save();
    }

    async updateCart(userId: string, cartData: CreateCartDto): Promise<Cart> {
        const existingCart = await this.cartModel.findOne({ userId });

        if (!existingCart) {
            throw new NotFoundException('Cart not found. Use POST /carts to create a new cart.');
        }

        existingCart.items = cartData.items;

        await existingCart.save();

        return existingCart;
    }


    async deleteItemFromCart(userId: string, bookId: string) {
        const existingCart = await this.cartModel.findOne({ userId });

        if (!existingCart) {
            throw new NotFoundException('Cart not found');
        }

        const itemIndex = existingCart.items.findIndex(
            (item) => item.book.toString() === bookId
        );

        if (itemIndex === -1) {
            throw new NotFoundException('Item not found in cart');
        }

        existingCart.items.splice(itemIndex, 1);
        await existingCart.save();

        return existingCart;
    }
}