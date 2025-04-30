import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } //to make sure you createdAt and updatedAt
);

const productModel = mongoose.model("product", productSchema);

export default productModel;
