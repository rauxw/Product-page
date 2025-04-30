import dotenv from "dotenv";

dotenv.config();

import express from "express";
import { connectDB } from "./config/db.js";
import productModel from "./models/product.model.js";
import mongoose from "mongoose";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.post("/apiv1/product", async (req, res) => {
  const product = req.body;

  if (!product.name || !product.price || !product.img) {
    return res
      .status(403)
      .json({ success: false, message: "Provide all details" });
  }

  try {
    const newProduct = await productModel.create(product);
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    return res
      .status(403)
      .json({ success: false, message: "Failed to save product" });
  }
});

app.patch("/apiv1/product/:id", async (req, res) => {
  const { id } = req.params;
  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid Product Id" });
  }
  try {
    const productUpdate = await productModel.findByIdAndUpdate(id, product, {
      new: true,
    });
    if (!productUpdate) {
      return res.status(404).json({
        success: false,
        message: "Failed to update product or product doesn't exists!",
      });
    }
    return res.status(201).json({ success: true, data: productUpdate });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
});

app.delete("/apiv1/product/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deleteProduct = await productModel.deleteOne({ _id: id });

    if (deleteProduct.deletedCount === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found!" });
    }
    res.status(201).json({
      success: true,
      message: `Product deleted with id:${id}`,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: `Failed to delete product with id:${id}`,
    });
  }
});

app.get("/apiv1/product", async (req, res) => {
  try {
    const products = await productModel.find({});

    if (products.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No Products Exists! Create One" });
    }

    return res.json({ success: true, products: products });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
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
