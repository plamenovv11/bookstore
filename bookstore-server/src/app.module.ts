import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';  // Import ServeStaticModule
import * as path from 'path'; // To resolve paths
import { AppController } from './app.controller';
import { ImagesController } from './images/images.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { DATABASE_CONNECTION } from './config/constants';

@Module({
  imports: [
    MongooseModule.forRoot(DATABASE_CONNECTION),
    BooksModule,

    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',  
    }),
  ],
  controllers: [AppController, ImagesController],
  providers: [AppService],
})
export class AppModule { }
