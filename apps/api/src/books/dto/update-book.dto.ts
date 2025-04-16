import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateBookDto {
  @ApiProperty({
    description: "The author of the book",
    example: "J.R.R. Tolkien",
    required: false,
  })
  @IsOptional()
  @IsString()
  author?: string;

  @ApiProperty({
    description: "A description of the book",
    example: "An epic fantasy novel.",
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: "The ISBN of the book",
    example: "978-0547928227",
    required: false,
  })
  @IsOptional()
  @IsString()
  isbn?: string;

  @ApiProperty({
    description: "The publisher of the book",
    example: "Houghton Mifflin Harcourt",
    required: false,
  })
  @IsOptional()
  @IsString()
  publisher?: string;

  @ApiProperty({
    description: "The publication year of the book",
    example: 1954,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  publicationYear?: number;

  @ApiProperty({
    description: "The title of the book",
    example: "The Lord of the Rings",
    required: false,
  })
  @IsOptional()
  @IsString()
  title?: string;
}
