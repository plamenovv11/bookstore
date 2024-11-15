import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
import { AppController } from './app.controller';
import { ImagesController } from './images/images.controller';
import { AuthController } from './auth/auth.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { DATABASE_CONNECTION } from './config/constants';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './auth/user.module';
import { UserService } from './auth/user.service';
import { AuthService } from './auth/auth.service';

@Module({
  imports: [
    AuthModule,
    UserModule,
    MongooseModule.forRoot(DATABASE_CONNECTION),
    BooksModule,
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
  ],
  controllers: [AppController, ImagesController, AuthController],
  providers: [AppService, UserService, AuthService],
})
export class AppModule { }
