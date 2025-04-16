import { HttpStatus } from "@nestjs/common";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { Test, TestingModule } from "@nestjs/testing";

import { BooksController } from "@api/books/books.controller";
import { BooksService } from "@api/books/books.service";
import { CreateBookDto } from "@api/books/dto/create-book.dto";
import { UpdateBookDto } from "@api/books/dto/update-book.dto";

describe("BooksController (e2e)", () => {
  let app: NestFastifyApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [
        {
          provide: BooksService,
          useValue: {
            create: jest.fn().mockResolvedValue({
              author: "Test Author",
              createdAt: new Date(),
              id: 1,
              title: "Test Book",
              updatedAt: new Date(),
            }),
            findAll: jest.fn().mockResolvedValue([
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
            ]),
            findOne: jest.fn().mockResolvedValue({
              author: "Test Author",
              createdAt: new Date(),
              id: 1,
              title: "Test Book",
              updatedAt: new Date(),
            }),
            remove: jest.fn().mockResolvedValue(undefined),
            update: jest.fn().mockResolvedValue({
              author: "Test Author",
              createdAt: new Date(),
              id: 1,
              title: "Updated Book",
              updatedAt: new Date(),
            }),
          },
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter(),
    );

    await app.init();
    await app.getHttpAdapter().getInstance().ready();
  });

  afterEach(async () => {
    await app.close();
  });

  it("/books (POST) - should create a book", async () => {
    const createBookDto: CreateBookDto = {
      author: "Test Author",
      title: "Test Book",
    };

    return app
      .inject({
        body: createBookDto,
        method: "POST",
        url: "/books",
      })
      .then((result) => {
        expect(result.statusCode).toEqual(HttpStatus.CREATED);
        expect(JSON.parse(result.payload)).toEqual({
          author: "Test Author",
          createdAt: expect.any(String),
          id: 1,
          title: "Test Book",
          updatedAt: expect.any(String),
        });
      });
  });

  it("/books (GET) - should get all books", async () => {
    return app
      .inject({
        method: "GET",
        url: "/books",
      })
      .then((result) => {
        expect(result.statusCode).toEqual(HttpStatus.OK);
        expect(JSON.parse(result.payload)).toEqual([
          {
            author: "Author 1",
            createdAt: expect.any(String),
            id: 1,
            title: "Book 1",
            updatedAt: expect.any(String),
          },
          {
            author: "Author 2",
            createdAt: expect.any(String),
            id: 2,
            title: "Book 2",
            updatedAt: expect.any(String),
          },
        ]);
      });
  });

  it("/books/:id (GET) - should get a single book", async () => {
    return app
      .inject({
        method: "GET",
        url: "/books/1",
      })
      .then((result) => {
        expect(result.statusCode).toEqual(HttpStatus.OK);
        expect(JSON.parse(result.payload)).toEqual({
          author: "Test Author",
          createdAt: expect.any(String),
          id: 1,
          title: "Test Book",
          updatedAt: expect.any(String),
        });
      });
  });

  it("/books/:id (PATCH) - should update a book", async () => {
    const updateBookDto: UpdateBookDto = { title: "Updated Book" };

    return app
      .inject({
        body: updateBookDto,
        method: "PATCH",
        url: "/books/1",
      })
      .then((result) => {
        expect(result.statusCode).toEqual(HttpStatus.OK);
        expect(JSON.parse(result.payload)).toEqual({
          author: "Test Author",
          createdAt: expect.any(String),
          id: 1,
          title: "Updated Book",
          updatedAt: expect.any(String),
        });
      });
  });

  it("/books/:id (DELETE) - should delete a book", async () => {
    return app
      .inject({
        method: "DELETE",
        url: "/books/1",
      })
      .then((result) => {
        expect(result.statusCode).toEqual(HttpStatus.NO_CONTENT);
      });
  });
});
