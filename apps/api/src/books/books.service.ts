import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Equal, Repository } from "typeorm";

import { CreateBookDto } from "./dto/create-book.dto";
import { UpdateBookDto } from "./dto/update-book.dto";
import { Book } from "./models/book.entity";

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}

  /**
   * Creates a new book.
   *
   * @param createBookDto - The data for the new book.
   * @returns A promise that resolves to the created book.
   */
  async create(createBookDto: CreateBookDto): Promise<Book> {
    const book: Book = this.bookRepository.create(createBookDto);

    return this.bookRepository.save(book);
  }

  /**
   * Retrieves all books.
   *
   * @returns A promise that resolves to an array of all books.
   */
  async findAll(): Promise<Book[]> {
    return this.bookRepository.find();
  }

  /**
   * Retrieves a single book by its ID.
   *
   * @param id - The ID of the book to retrieve.
   * @returns A promise that resolves to the found book.
   * @throws NotFoundException If the book with the given ID is not found.
   */
  async findOne(id: number): Promise<Book> {
    const book = await this.bookRepository.findOne({
      where: { id: Equal(id) },
    });

    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }

    return book;
  }

  /**
   * Updates an existing book.
   *
   * @param id - The ID of the book to update.
   * @param updateBookDto - The data to update the book with.
   * @returns A promise that resolves to the updated book.
   */
  async update(id: number, updateBookDto: UpdateBookDto): Promise<Book> {
    const existingBook = await this.findOne(id);
    const mergedBook = this.bookRepository.merge(existingBook, updateBookDto);

    return this.bookRepository.save(mergedBook);
  }

  /**
   * Deletes a book by its ID.
   *
   * @param id - The ID of the book to delete.
   * @returns A promise that resolves to void.
   */
  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.bookRepository.delete(id);
  }
}
