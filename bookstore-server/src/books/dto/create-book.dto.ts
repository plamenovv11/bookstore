import { Transform } from 'class-transformer';
import { IsString, IsNumber, IsDate, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateBookDto {
  @IsString()
  title: string;

  @IsString()
  author: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsNumber()
  price: number;

  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  publishedDate: Date;

  @IsOptional()
  @IsString()
  genre: string;

  @IsOptional()
  @IsString()
  imageUrl: string;
}
