import express from "express";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";

import { ENV } from "./config/env.config";
import { connectToDB } from "./config/db.config";

const app = express();
const PORT = ENV.PORT;

app.use(express.json());
app.use(cors());
app.use(clerkMiddleware());

const startServer = async () => {
  await connectToDB();

  app.listen(() => {
    console.log(`Server running on PORT:${PORT}`);
  });
};

startServer();
