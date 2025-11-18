import mongoose, { Document, Schema } from "mongoose";

export interface IProduct extends Document {
  name: string;
  shortDesc: string;
  price: number;
  image: string;
  status: boolean;
}

const ProductSchema: Schema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    shortDesc: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    status: { type: Boolean, default: true },
    category: { type: Schema.Types.ObjectId, ref: "Category" },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Product =
  mongoose.models.Product ||
  mongoose.model<IProduct>("Product", ProductSchema, "products");

export default Product;
