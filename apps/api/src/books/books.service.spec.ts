import { NotFoundException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Equal, Repository } from "typeorm";

import { BooksService } from "./books.service";
import { CreateBookDto } from "./dto/create-book.dto";
import { UpdateBookDto } from "./dto/update-book.dto";
import { Book } from "./models/book.entity";

describe("BooksService", () => {
  let booksService: BooksService;
  let bookRepository: Repository<Book>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        {
          provide: getRepositoryToken(Book),
          useValue: {
            create: jest.fn(),
            delete: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            merge: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    booksService = module.get<BooksService>(BooksService);
    bookRepository = module.get<Repository<Book>>(getRepositoryToken(Book));
  });

  it("should be defined", () => {
    expect(booksService).toBeDefined();
  });

  describe("create", () => {
    it("should create a book", async () => {
      const createBookDto: CreateBookDto = {
        author: "Test Author",
        title: "Test Book",
      };
      const createdBook: Book = {
        author: "Test Author",
        createdAt: new Date(),
        id: 1,
        title: "Test Book",
        updatedAt: new Date(),
      };

      (bookRepository.create as jest.Mock).mockReturnValue(createdBook);
      (bookRepository.save as jest.Mock).mockResolvedValue(createdBook);

      const result = await booksService.create(createBookDto);

      expect(bookRepository.create).toHaveBeenCalledWith(createBookDto);
      expect(bookRepository.save).toHaveBeenCalledWith(createdBook);
      expect(result).toEqual(createdBook);
    });
  });

  describe("findAll", () => {
    it("should return all books", async () => {
      const books: Book[] = [
        {
          author: "Test Author 1",
          createdAt: new Date(),
          deletedAt: undefined,
          id: 1,
          title: "Test Book 1",
          updatedAt: new Date(),
        },
        {
          author: "Test Author 2",
          createdAt: new Date(),
          deletedAt: undefined,
          id: 2,
          title: "Test Book 2",
          updatedAt: new Date(),
        },
      ];

      (bookRepository.find as jest.Mock).mockResolvedValue(books);

      const result = await booksService.findAll();

      expect(bookRepository.find).toHaveBeenCalled();
      expect(result).toEqual(books);
    });
  });

  describe("findOne", () => {
    it("should return a book by ID", async () => {
      const book: Book = {
        author: "Test Author",
        createdAt: new Date(),
        deletedAt: undefined,
        id: 1,
        title: "Test Book",
        updatedAt: new Date(),
      };

      (bookRepository.findOne as jest.Mock).mockResolvedValue(book);

      const result = await booksService.findOne(1);

      expect(bookRepository.findOne).toHaveBeenCalledWith({
        where: { id: Equal(1) },
      });
      expect(result).toEqual(book);
    });

    it("should throw NotFoundException if book is not found", async () => {
      (bookRepository.findOne as jest.Mock).mockResolvedValue(null);

      await expect(booksService.findOne(1)).rejects.toThrow(NotFoundException);
      expect(bookRepository.findOne).toHaveBeenCalledWith({
        where: { id: Equal(1) },
      });
    });
  });

  describe("update", () => {
    it("should update a book", async () => {
      const existingBook: Book = {
        author: "Test Author",
        createdAt: new Date(),
        deletedAt: undefined,
        id: 1,
        title: "Test Book",
        updatedAt: new Date(),
      };
      const updateBookDto: UpdateBookDto = { title: "Updated Book" };
      const updatedBook: Book = {
        author: "Test Author",
        createdAt: new Date(),
        deletedAt: undefined,
        id: 1,
        title: "Updated Book",
        updatedAt: new Date(),
      };

      (bookRepository.findOne as jest.Mock).mockResolvedValue(existingBook);
      (bookRepository.merge as jest.Mock).mockReturnValue(updatedBook);
      (bookRepository.save as jest.Mock).mockResolvedValue(updatedBook);

      const result = await booksService.update(1, updateBookDto);

      expect(bookRepository.findOne).toHaveBeenCalledWith({
        where: { id: Equal(1) },
      });
      expect(bookRepository.merge).toHaveBeenCalledWith(
        existingBook,
        updateBookDto,
      );
      expect(bookRepository.save).toHaveBeenCalledWith(updatedBook);
      expect(result).toEqual(updatedBook);
    });
  });

  describe("remove", () => {
    it("should delete a book", async () => {
      const existingBook: Book = {
        author: "Test Author",
        createdAt: new Date(),
        deletedAt: undefined,
        id: 1,
        title: "Test Book",
        updatedAt: new Date(),
      };

      (bookRepository.findOne as jest.Mock).mockResolvedValue(existingBook);
      (bookRepository.delete as jest.Mock).mockResolvedValue(undefined);

      await booksService.remove(1);

      expect(bookRepository.findOne).toHaveBeenCalledWith({
        where: { id: Equal(1) },
      });
      expect(bookRepository.delete).toHaveBeenCalledWith(1);
    });
  });
});
