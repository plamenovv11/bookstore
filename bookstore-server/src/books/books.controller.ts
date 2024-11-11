import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { BooksService } from './books.service';
import { Book } from './schemas/book.schema';
import { CreateBookDto } from './dto/create-book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  async createBook(@Body() createBookDto: CreateBookDto): Promise<Book> {
    return this.booksService.createBook(createBookDto);
  }

  @Get()
  async getAllBooks(): Promise<Book[]> {
    return this.booksService.findAllBooks();
  }

  @Get(':id')
  async getBookById(@Param('id') id: string): Promise<Book> {
    return this.booksService.findBookById(id);
  }

  @Put(':id')
  async updateBook(@Param('id') id: string, @Body() createBookDto: CreateBookDto): Promise<Book> {
    return this.booksService.updateBook(id, createBookDto);
  }

  @Delete(':id')
  async deleteBook(@Param('id') id: string): Promise<Book> {
    return this.booksService.deleteBook(id);
  }
}
