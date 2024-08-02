import express from "express";
import cors from 'cors';
import {authRouter, bookRouter, favoriteRouter} from "./route";

const app = express();

// Allow CORS
app.use(cors())

// Convert request body to JSON
app.use(express.json());

// Health check used by Docker to determine if the container is healthy
app.use("/health", (req, res) => {
  res.status(200).json({status: "UP"});
});

// Routes
app.use("/auth", authRouter);
app.use("/books", bookRouter);
app.use("/favorites", favoriteRouter);

// Port from Docker environment variable
const port = process.env.PORT;

const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});

server.on('error', console.error);
