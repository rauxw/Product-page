import express from "express";
import productModel from "../models/product.model.js";
import mongoose from "mongoose";
import {
  deleteProduct,
  getProduct,
  postProduct,
  putProduct,
} from "../controllers/product.controller.js";

const productRoute = express.Router();

productRoute.post("/", postProduct);

productRoute.put("/:id", putProduct);

productRoute.delete("/:id", deleteProduct);

productRoute.get("/", getProduct);

export default productRoute;
