import dotenv from "dotenv";
dotenv.config();

import express from "express";
import path from "path";
import { connectDB } from "./config/db.js";
import productRoute from "./routes/product.route.js";

const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

app.use(express.json());

app.use("/apiv1/product", productRoute);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
}

async function main() {
  try {
    connectDB();
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
  }
}

main();
