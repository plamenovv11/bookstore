import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book } from './schemas/book.schema';
import { CreateBookDto } from './dto/create-book.dto';

@Injectable()
export class BooksService {
  constructor(@InjectModel(Book.name) private bookModel: Model<Book>) {}

  async createBook(createBookDto: CreateBookDto): Promise<Book> {
    const newBook = new this.bookModel(createBookDto);
    return newBook.save();
  }

  async findAllBooks(): Promise<Book[]> {
    return this.bookModel.find().exec();
  }

  async findBookById(id: string): Promise<Book> {
    const book = await this.bookModel.findById(id).exec();
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    return book;
  }

  async updateBook(id: string, createBookDto: CreateBookDto): Promise<Book> {
    const updatedBook = await this.bookModel.findByIdAndUpdate(id, createBookDto, { new: true }).exec();
    if (!updatedBook) {
      throw new NotFoundException('Book not found');
    }
    return updatedBook;
  }

  async deleteBook(id: string): Promise<Book> {
    const deletedBook = await this.bookModel.findByIdAndDelete(id).exec();
    if (!deletedBook) {
      throw new NotFoundException('Book not found');
    }
    return deletedBook;
  }
}
