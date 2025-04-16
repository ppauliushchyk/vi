import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import Joi from "joi";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

import { BooksModule } from "./books/books.module";
import appConfig from "./common/config/app.config";
import databaseConfig from "./common/config/database.config";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig],
      validationSchema: Joi.object({
        DATABASE_DB: Joi.string().required(),
        DATABASE_HOST: Joi.string().required(),
        DATABASE_PASSWORD: Joi.string().required(),
        DATABASE_PORT: Joi.number().required(),
        DATABASE_USER: Joi.string().required(),

        NODE_ENV: Joi.string()
          .valid("development", "production")
          .default("development"),
        PORT: Joi.number().port().default(3000),
      }),
    }),
    TypeOrmModule.forRootAsync(
      databaseConfig.asProvider() as Partial<PostgresConnectionOptions>,
    ),
    BooksModule,
  ],
})
export class AppModule {}
