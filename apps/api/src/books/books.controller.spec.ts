import { Test, TestingModule } from "@nestjs/testing";

import { BooksController } from "./books.controller";
import { BooksService } from "./books.service";
import { CreateBookDto } from "./dto/create-book.dto";
import { UpdateBookDto } from "./dto/update-book.dto";
import { Book } from "./models/book.entity";

describe("BooksController", () => {
  let booksController: BooksController;
  let booksService: BooksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [
        {
          provide: BooksService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            remove: jest.fn(),
            update: jest.fn(),
          },
        },
      ],
    }).compile();

    booksController = module.get<BooksController>(BooksController);
    booksService = module.get<BooksService>(BooksService);
  });

  it("should be defined", () => {
    expect(booksController).toBeDefined();
  });

  describe("create", () => {
    it("should create a book and return it", async () => {
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

      (booksService.create as jest.Mock).mockResolvedValue(createdBook);

      const result = await booksController.create(createBookDto);

      expect(booksService.create).toHaveBeenCalledWith(createBookDto);
      expect(result).toEqual(createdBook);
    });
  });

  describe("findAll", () => {
    it("should return all books", async () => {
      const books: Book[] = [
        {
          author: "Author 1",
          createdAt: new Date(),
          id: 1,
          title: "Book 1",
          updatedAt: new Date(),
        },
        {
          author: "Author 2",
          createdAt: new Date(),
          id: 2,
          title: "Book 2",
          updatedAt: new Date(),
        },
      ];

      (booksService.findAll as jest.Mock).mockResolvedValue(books);

      const result = await booksController.findAll();

      expect(booksService.findAll).toHaveBeenCalled();
      expect(result).toEqual(books);
    });
  });

  describe("findOne", () => {
    it("should return a book by ID", async () => {
      const book: Book = {
        author: "Test Author",
        createdAt: new Date(),
        id: 1,
        title: "Test Book",
        updatedAt: new Date(),
      };

      (booksService.findOne as jest.Mock).mockResolvedValue(book);

      const result = await booksController.findOne(1);

      expect(booksService.findOne).toHaveBeenCalledWith(1);
      expect(result).toEqual(book);
    });
  });

  describe("update", () => {
    it("should update a book and return the updated book", async () => {
      const updateBookDto: UpdateBookDto = { title: "Updated Title" };
      const updatedBook: Book = {
        author: "Test Author",
        createdAt: new Date(),
        id: 1,
        title: "Updated Title",
        updatedAt: new Date(),
      };

      (booksService.update as jest.Mock).mockResolvedValue(updatedBook);

      const result = await booksController.update("1", updateBookDto);

      expect(booksService.update).toHaveBeenCalledWith(1, updateBookDto);
      expect(result).toEqual(updatedBook);
    });
  });

  describe("remove", () => {
    it("should delete a book and return void", async () => {
      (booksService.remove as jest.Mock).mockResolvedValue(undefined);

      const result = await booksController.remove("1");

      expect(booksService.remove).toHaveBeenCalledWith(1);
      expect(result).toBeUndefined();
    });
  });
});
