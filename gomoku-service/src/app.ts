import express, { Express, Request, Response } from "express";
import { createServer } from 'http'
import cors from 'cors'
import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "./utils/connectDB";

import gameHandler from "./handler/game.handler";
import validationHandler from "./handler/validation.handler";

dotenv.config();
//  Connect to database.
connectDB();
const app: Express = express();
app.use(
  cors({
    origin: process.env.allowHost || true,
  })
)
// const port = 8080;
const port = process.env.PORT;
app.use(express.json());
app.use("/api/auth", validationHandler);
app.use("/api/games", gameHandler);

// app.get('/', (req: Request, res: Response)=>{
//     res.send('Hello World!');
// });

mongoose.connection.once("connected", () => {
  console.log(`⚡️[server]: Connected to MongoDB.`);
  app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
  });
});

export const server = createServer(app)

export default app