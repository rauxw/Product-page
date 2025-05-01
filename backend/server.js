import dotenv from "dotenv";

dotenv.config();

import express from "express";
import { connectDB } from "./config/db.js";
import productRoute from "./routes/product.route.js";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.use("/apiv1/product", productRoute);

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
