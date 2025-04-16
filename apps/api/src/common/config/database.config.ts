import { registerAs } from "@nestjs/config";

export default registerAs("database", () => ({
  autoLoadEntities: true,
  database: process.env.DATABASE_DB,
  host: process.env.DATABASE_HOST,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT,
  synchronize: true,
  type: "postgres",
  username: process.env.DATABASE_USER,
}));
