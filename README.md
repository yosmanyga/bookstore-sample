# TLDR

```bash
docker-compose -f docker/all.yml -p bookstore up
```

Open http://localhost

# Description

This is a bookstore application sample.
It allows to browse and search books, as well as to see details of each book.
It also allows users to register, login, and add books to their favorites.

You can see some recorded sessions in the [doc](doc) folder.

# Installation

```bash
docker-compose -f docker/all.yml -p bookstore up
```

## Defaults

- Requires mysql and node docker images
- On first launch, it will install javascript dependencies and will generate prisma client. See docker/backend/entrypoint.sh for details.
- The database comes pre-populated with some books and an admin user.
- The backend container will take a while to start (because of the npm install).
- The frontend container will start once the backend is ready.
- The admin user is `admin` and the password is `admin`.
- To test the features related to favorites, you need to register a new user.

# Development

## Backend Tests

```bash
docker exec -it bookstore_backend sh
npm run test
```

## Design

See [doc/DESIGN.md](doc/DESIGN.md)
