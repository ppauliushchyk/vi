import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";

import { BooksService } from "./books.service";
import { CreateBookDto } from "./dto/create-book.dto";
import { UpdateBookDto } from "./dto/update-book.dto";
import { Book } from "./models/book.entity";

@Controller("books")
@ApiTags("Books")
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: "Create a new book" })
  @ApiCreatedResponse({
    description: "The book has been successfully created.",
    type: Book,
  })
  @ApiBadRequestResponse({ description: "Invalid input data." })
  async create(@Body() createBookDto: CreateBookDto): Promise<Book> {
    return this.booksService.create(createBookDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Get all books" })
  @ApiOkResponse({ description: "A list of books", type: [Book] })
  async findAll(): Promise<Book[]> {
    return this.booksService.findAll();
  }

  @Get(":id")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Get a book by ID" })
  @ApiOkResponse({ description: "The book with the specified ID", type: Book })
  @ApiNotFoundResponse({ description: "Book not found" })
  @ApiBadRequestResponse({ description: "Invalid ID format" })
  async findOne(@Param("id", ParseIntPipe) id: number): Promise<Book> {
    return this.booksService.findOne(+id);
  }

  @Patch(":id")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Update a book by ID" })
  @ApiOkResponse({ description: "The updated book", type: Book })
  @ApiNotFoundResponse({ description: "Book not found" })
  @ApiBadRequestResponse({ description: "Invalid input data or ID format" })
  async update(
    @Param("id") id: string,
    @Body() updateBookDto: UpdateBookDto,
  ): Promise<Book> {
    return this.booksService.update(+id, updateBookDto);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: "Delete a book by ID" })
  @ApiNotFoundResponse({ description: "Book not found" })
  @ApiBadRequestResponse({ description: "Invalid ID format" })
  @ApiNoContentResponse({
    description: "The book has been successfully deleted.",
  })
  async remove(@Param("id") id: string): Promise<void> {
    await this.booksService.remove(+id);
  }
}
