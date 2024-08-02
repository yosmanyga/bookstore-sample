# Entities and relations

There are **Books**, with basic fields like title, author, and publication year.

There are **Users**, with basic fields like username and password.

There are **Favorites**, used to store the books that a user likes.
It's a many-to-many relation between Users and Books.

A User can have many Books as Favorites. A Book can be a Favorite of many Users.

## Technology

The backend uses **Prisma** to manage the database.

**MySQL** is used as the database.

# Api

There is an HTTP API consumed by the frontend.

## Technology

The API is a RESTful API.

The framework used is **Express**, along with other libraries like **cors**, **express-validator**.

# Authentication

The authentication is a basic username & password.

## Technology

The authentication is done implementing **JWT**.

The password is hashed with `bcrypt`. It also uses a **salt** to make the hash unique.

The password comparison is done with `bcrypt`. To avoid **timing attacks**, it uses the `compare` function.

# Frontend

The frontend is a simple web application.

## Technology

The javascript framework used is **React**.

The ui library used is **Material-UI**.

It uses **React-Query** to manage the data fetching.

# Structure

Both frontend and backend are in the same repository, as a monorepo.

## Technology

For the monorepo, **Nx** is used.

# Infrastructure

## Technology

The infrastructure is managed with **Docker** and **Docker Compose**.

