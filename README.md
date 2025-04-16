# `vi` Monorepo

This is the `vi` monorepo, built using [Turborepo](https://turbo.build/) for managing multiple applications and packages efficiently.

## What's inside?

This monorepo includes the following apps and packages:

### Apps

- `api`: A [NestJS](https://nestjs.com/) application providing a RESTful API for managing books.

### Packages

- `@repo/eslint-config`: Shared `eslint` configurations.
- `@repo/typescript-config`: Shared `tsconfig.json` configurations.

Each app and package is written in [TypeScript](https://www.typescriptlang.org/).

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

3. Follow the setup instructions for individual apps:
   - [API Setup](./apps/api/README.md)

## Build

To build all apps and packages, run the following command from the root:

```bash
npm run build
```

## Develop

To develop all apps and packages, run the following command from the root:

```bash
npm run dev
```

## Testing

Run tests for all apps and packages:

```bash
npm run test
```

## Remote Caching

Turborepo supports [Remote Caching](https://turbo.build/docs/core-concepts/remote-caching) to share build artifacts across machines. To enable it:

1. Authenticate with Vercel:

   ```bash
   npx turbo login
   ```

2. Link your Turborepo to your Vercel account:

   ```bash
   npx turbo link
   ```

## Useful Links

Learn more about the tools and concepts used in this monorepo:

- [Turborepo Documentation](https://turbo.build/docs)
- [NestJS Documentation](https://nestjs.com/)
- [Next.js Documentation](https://nextjs.org/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
