import express from "express";
import {
  deleteProduct,
  getProduct,
  postProduct,
  putProduct,
} from "../controller/product.controller.js";

const productRoute = express.Router();

productRoute.post("/", postProduct);

productRoute.put("/:id", putProduct);

productRoute.delete("/:id", deleteProduct);

productRoute.get("/", getProduct);

export default productRoute;
