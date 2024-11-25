import { Controller, Post, Put, Body, UseGuards, Req, Get, Delete, Param } from '@nestjs/common';
import { SessionGuard } from '../auth/session.guard';
import { CartService } from './carts.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { Request } from 'express';

@Controller('carts')
@UseGuards(SessionGuard)
export class CartController {
    constructor(private readonly cartService: CartService) { }

    @Get()
    async getCart(@Req() req: Request) {
        const userId = req.session.user._id;
        const cart = await this.cartService.getCart(userId);
        return { cart };
    }

    @Post()
    async createCart(
        @Body() cartData: CreateCartDto,
        @Req() req: Request,
    ) {
        const userId = req.session.user._id;
        try {
            const newCart = await this.cartService.createCart(userId, cartData);
            return { message: 'Cart created successfully', cart: newCart };
        } catch (error) {
            return { message: error.message };
        }
    }

    @Put()
    async updateCart(
        @Body() cartData: CreateCartDto,
        @Req() req: Request,
    ) {
        const userId = req.session.user._id;
        try {
            const updatedCart = await this.cartService.updateCart(userId, cartData);
            return { message: 'Cart updated successfully', cart: updatedCart };
        } catch (error) {
            return { message: error.message };
        }
    }

    @Delete(':bookId')
    async deleteItemFromCart(
        @Param('bookId') bookId: string,
        @Req() req: Request,
    ) {
        const userId = req.session.user._id;
        try {
            const updatedCart = await this.cartService.deleteItemFromCart(userId, bookId);
            return { message: 'Item deleted successfully', cart: updatedCart };
        } catch (error) {
            return { message: error.message };
        }
    }
}
