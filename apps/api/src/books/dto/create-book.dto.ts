import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateBookDto {
  @ApiProperty({
    description: "The author of the book",
    example: "J.R.R. Tolkien",
  })
  @IsNotEmpty()
  @IsString()
  author: string;

  @ApiProperty({
    description: "A description of the book",
    example: "An epic fantasy novel.",
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: "The ISBN of the book",
    example: "978-0547928227",
  })
  @IsOptional()
  @IsString()
  isbn?: string;

  @ApiProperty({
    description: "The publisher of the book",
    example: "Houghton Mifflin Harcourt",
  })
  @IsOptional()
  @IsString()
  publisher?: string;

  @ApiProperty({
    description: "The publication year of the book",
    example: 1954,
  })
  @IsOptional()
  @IsNumber()
  publicationYear?: number;

  @ApiProperty({
    description: "The title of the book",
    example: "The Lord of the Rings",
  })
  @IsNotEmpty()
  @IsString()
  title: string;
}
