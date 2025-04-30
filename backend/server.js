import dotenv from "dotenv";

dotenv.config();

import express from "express";
import { connectDB } from "./config/db.js";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Hello</h1>");
});

async function main() {
  try {
    connectDB();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log(`${error}`);
  }
}

main();
