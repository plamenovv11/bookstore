// src/auth/auth.service.ts

import { Injectable } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './schemas/user.schema';

@Injectable()
export class AuthService {
    constructor(private userService: UserService) { }

    // Register a new user
    async register(email: string, password: string): Promise<User> {
        return this.userService.register(email, password);
    }

    // Validate user credentials (for login)
    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.userService.findByEmail(email);
        if (!user) {
            return null;
        }
        const isPasswordValid = await this.userService.validatePassword(
            password,
            user.password,
        );
        if (!isPasswordValid) {
            return null;
        }
        return { email: user.email };
    }

    // Store user session on login
    async login(user: any, session: any) {
        // Store user in session
        session.user = user;
        return { message: 'Logged in successfully', sessionId: session.id };
    }

    // Logout (clear session)
    async logout(session: any) {
        session.destroy();
    }
}
