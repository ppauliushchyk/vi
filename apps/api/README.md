# API Application

This is the API application for the `vi` monorepo. It is built using [NestJS](https://nestjs.com/) and provides a RESTful API for managing books.

## Features

- **CRUD Operations**: Create, read, update, and delete books.
- **Validation**: Input validation using `class-validator`.
- **Swagger Documentation**: API documentation available at `/api/doc`.
- **Database Integration**: Uses PostgreSQL with TypeORM for data persistence.
- **E2E Testing**: End-to-end tests using Jest.

## Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/ppauliushchyk/vi.git
   cd vi
   ```

2. Install dependencies from the root of the monorepo:

   ```bash
   npm install
   ```

3. Navigate to the `api` application directory:

   ```bash
   cd apps/api
   ```

4. Configure environment variables:
   Create a `.env` file in the root of the `api` application and provide the following variables:

   ```
   DATABASE_HOST=localhost
   DATABASE_PORT=5432
   DATABASE_USER=your_user
   DATABASE_PASSWORD=your_password
   DATABASE_NAME=your_database
   ```

5. Start the application:

   ```bash
   npm run start:dev
   ```

## Usage

- Access the API at `http://localhost:3000`.
- View API documentation at `http://localhost:3000/api/doc`.

### Example Endpoints

- **GET /books**: Retrieve a list of books.
- **POST /books**: Create a new book.
- **PUT /books/:id**: Update an existing book.
- **DELETE /books/:id**: Delete a book.

## Testing

Run unit and end-to-end tests using Jest:

```bash
npm run test
npm run test:e2e
```
