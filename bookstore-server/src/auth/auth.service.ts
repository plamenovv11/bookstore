import { Injectable } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './schemas/user.schema';

@Injectable()
export class AuthService {
    constructor(private userService: UserService) { }

    async register(email: string, password: string): Promise<User> {
        return this.userService.register(email, password);
    }

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

    async login(user: any, session: any) {
        session.user = user;
        return { message: 'Logged in successfully', sessionId: session.id };
    }
}
