import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { BooksController } from "./books.controller";
import { BooksService } from "./books.service";
import { Book } from "./models/book.entity";

@Module({
  controllers: [BooksController],
  imports: [TypeOrmModule.forFeature([Book])],
  providers: [BooksService],
})
export class BooksModule {}
