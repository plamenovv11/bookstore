import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private userService: UserService,
    ) { }

    @Post('register')
    async register(
        @Body('email') email: string,
        @Body('password') password: string,
    ) {
        const user = await this.authService.register(email, password);
        return { message: 'User registered successfully', user };
    }

    @Post('login')
    async login(
        @Body('email') email: string,
        @Body('password') password: string,
        @Req() req: Request,
        @Res() res: Response,
    ) {
        const user = await this.authService.validateUser(email, password);
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const loginResponse = await this.authService.login(user, req.session);
        return res.status(200).json(loginResponse);
    }
}
